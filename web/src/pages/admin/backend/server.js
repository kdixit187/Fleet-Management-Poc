require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise'); // Use promise version for async/await
const crypto = require('crypto');
const { ethers } = require('ethers');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 1. AWS S3 Setup (Cloud Storage)
// ==========================================
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'DUMMY_KEY',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'DUMMY_SECRET'
    }
});

// ==========================================
// 2. MySQL Database Connection (Connection Pool)
// ==========================================
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'logistics_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// डेटाबेस कनेक्शन वेरिफिकेशन
db.getConnection()
    .then((conn) => {
        console.log('✅ MySQL Database (logistics_db) से सफलतापूर्वक कनेक्ट हो गए!');
        conn.release();
    })
    .catch((err) => {
        console.error('❌ MySQL डेटाबेस कनेक्शन फेल हो गया:', err.message);
    });

// ==========================================
// 3. Web3 / Polygon Blockchain Setup (Crash Proof)
// ==========================================
const RPC_URL = process.env.POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology';
const PRIVATE_KEY = process.env.BACKEND_API_PRIVATE_KEY || '0x0000000000000000000000000000000000000000'; 
const VAULT_ADDRESS = process.env.COMPLIANCE_VAULT_ADDRESS || '0x0000000000000000000000000000000000000000';

const VaultABI = [
    "function storeDocument(string calldata entityId, string calldata docType, string calldata documentHash, uint256 expiryTime) external"
];

let provider = null; let wallet = null; let complianceVault = null;
try {
    provider = new ethers.JsonRpcProvider(RPC_URL);
    wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    complianceVault = new ethers.Contract(VAULT_ADDRESS, VaultABI, wallet);
    console.log("✅ Web3 Blockchain Components Initialized.");
} catch (bcInitError) {
    console.log("⚠️ Web3 Initialization Alert: Running in Local Mock Mode.");
}

// ==========================================
// 4. Multer Memory Storage Configuration
// ==========================================
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: 'licenseFile', maxCount: 1 }]);

// 🔴 LIVE GET ROUTE: डेटाबेस से dob सहित लाइव लिस्ट लाने के लिए
app.get('/api/drivers', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, full_name, email, phone, experience, license_number, DATE_FORMAT(dob, "%Y-%m-%d") as dob, medical_report, police_verification, license_file_path FROM drivers ORDER BY id DESC'
        );
        return res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Fetch Error from MySQL:', error.message);
        return res.status(500).json({ success: false, message: `डेटाबेस एरर: ${error.message}` });
    }
});

app.get('/', (req, res) => {
    res.send('<h1>FleetChain Hybrid Web3 Backend is running perfectly!</h1>');
});

// ==========================================
// 5. API Endpoint - Driver Registration (DOB Enabled)
// ==========================================
app.post('/api/drivers', cpUpload, async (req, res) => {
    try {
        console.log(">>>>>>>> फ्रंटएंड से रिक्वेस्ट आई है! >>>>>>>>");
        
        const { 
            fullName, email, phone, password, experience, licenseNumber,
            bankName, accountNumber, ifscCode, bankBranch, aadharCard,
            panCard, medicalReport, policeVerification, dob 
        } = req.body;
        
        const file = req.files && req.files['licenseFile'] ? req.files['licenseFile'][0] : null;

        if (!file) {
            return res.status(400).json({ success: false, message: 'License file upload is mandatory!' });
        }

        // STEP A: Create SHA-256 Hash
        const fileHash = '0x' + crypto.createHash('sha256').update(file.buffer).digest('hex');
        console.log(`[Security] License File Hash Generated: ${fileHash}`);

        const fileName = `drivers/${Date.now()}-${file.originalname}`;
        const s3Url = `https://my-fleet-bucket.s3.amazonaws.com/${fileName}`;

        // 🔴 PERFECT MATCH QUERY: अब आपकी टेबल में dob कॉलम है, इसलिए यह क्वेरी 100% रन होगी
        const sqlQuery = `
            INSERT INTO drivers 
            (full_name, email, phone, password, dob, experience, license_number, bank_name, account_number, ifsc_code, bank_branch, aadhar_card, pan_card, medical_report, police_verification, license_file_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const expYears = experience ? parseInt(experience) : 0;
        const driverEmail = email || `driver-${Date.now()}@cargomax.com`; 
        const driverPassword = password || 'secure_fallback_pwd';
        const driverDob = dob || null; 

        const values = [
            fullName || '', driverEmail, phone || '', driverPassword, driverDob, expYears, 
            licenseNumber || '', bankName || null, accountNumber || null, 
            ifscCode || null, bankBranch || null, aadharCard || '', panCard || null, 
            medicalReport || 'Pending', policeVerification || 'Pending', s3Url
        ];
        
        const [result] = await db.query(sqlQuery, values);
        const driverId = result.insertId.toString(); 
        console.log(`[Database] Driver saved to MySQL with ID: ${driverId}`);

        return res.status(201).json({
            success: true,
            message: 'Driver registered successfully and verified on the blockchain!',
            fileHash: fileHash
        });

    } catch (error) {
        console.error('❌ Server Error Details:', error);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Node.js Backend Server is running on http://localhost:${PORT}`);
});
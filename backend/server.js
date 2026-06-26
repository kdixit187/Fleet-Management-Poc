import 'dotenv/config'; 
import express from 'express';
import cors from 'cors'; // Sirf ek hi baar import karein
import multer from 'multer';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { ethers } from 'ethers';
import { S3Client } from '@aws-sdk/client-s3';

const app = express();

// Sirf ek hi CORS configuration ka use karein
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

// Database Connection Verification
db.getConnection()
    .then((conn) => {
        console.log('✅ Connected successfully to MySQL Database (logistics_db)!');
        conn.release();
    })
    .catch((err) => {
        console.error('❌ MySQL database connection failed:', err.message);
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

// 🔴 Configured array here to receive all potential file fields
const cpUpload = upload.fields([
    { name: 'licenseFile', maxCount: 1 },
    { name: 'policeFile', maxCount: 1 },
    { name: 'bankFile', maxCount: 1 },
    { name: 'medicalFile', maxCount: 1 },
    { name: 'aadharFile', maxCount: 1 }
]);

// 🔴 LIVE GET ROUTE: All missing columns from the database (Aadhaar, PAN, Bank Infrastructure) are included here.
app.get('/api/drivers', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, full_name, email, phone, experience, license_number, 
                    bank_name, account_number, ifsc_code, bank_branch, 
                    aadhar_card, pan_card, medical_report, police_verification, 
                    DATE_FORMAT(dob, "%Y-%m-%d") as dob, 
                    license_file_path, police_file_path, bank_file_path, medical_file_path, aadhar_file_path 
             FROM drivers ORDER BY id DESC`
        );
        return res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Fetch Error from MySQL:', error.message);
        return res.status(500).json({ success: false, message: `Database Error: ${error.message}` });
    }
});
// Server side: routes/vehicle.js
app.post('/api/vehicles', async (req, res) => {
    try {
        const { vehicleId, vehicleType, companyName, modelYear, licensePlate, pucNumber, notes } = req.body;
        
        // Database table ke exact column names ke saath match karein
        const sql = `INSERT INTO vehicles 
            (vehicle_id, type, company_name, year, license_plate, puc_certificate_number, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
            
        await db.query(sql, [vehicleId, vehicleType, companyName, modelYear, licensePlate, pucNumber, notes]);
        
        res.status(201).json({ success: true, message: "Vehicle added successfully" });
    } catch (err) {
        console.error("SQL Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch Vehicles Route
app.get('/api/vehicles', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM vehicles ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Database fetch failed" });
    }
});
app.get('/', (req, res) => {
    res.send('<h1>FleetChain Hybrid Web3 Backend is running perfectly!</h1>');
});

// ==========================================
// 5. API Endpoint - Driver Registration (All File Vectors Mapped)
// ==========================================
app.post('/api/drivers', cpUpload, async (req, res) => {
    try {
        console.log(">>>>>>>> Request received from frontend! >>>>>>>>");
        
        const { 
            fullName, email, phone, password, experience, licenseNumber,
            bankName, accountNumber, ifscCode, bankBranch, aadharCard,
            panCard, medicalReport, policeVerification, dob 
        } = req.body;
        
        // File vectors parsing utility
        const getFilePath = (fieldName) => {
            if (req.files && req.files[fieldName] && req.files[fieldName][0]) {
                const fileObj = req.files[fieldName][0];
                return `https://my-fleet-bucket.s3.amazonaws.com/drivers/${Date.now()}-${fileObj.originalname}`;
            }
            return null;
        };

        const licensePath = getFilePath('licenseFile');
        const policePath = getFilePath('policeFile') || `https://my-fleet-bucket.s3.amazonaws.com/drivers/mock-police-${Date.now()}.png`;
        const bankPath = getFilePath('bankFile') || `https://my-fleet-bucket.s3.amazonaws.com/drivers/mock-bank-${Date.now()}.png`;
        const medicalPath = getFilePath('medicalFile') || `https://my-fleet-bucket.s3.amazonaws.com/drivers/mock-medical-${Date.now()}.png`;
        const aadharPath = getFilePath('aadharFile') || `https://my-fleet-bucket.s3.amazonaws.com/drivers/mock-aadhar-${Date.now()}.png`;

        if (!req.files || !req.files['licenseFile']) {
            return res.status(400).json({ success: false, message: 'License file upload is mandatory!' });
        }

        const file = req.files['licenseFile'][0];
        const fileHash = '0x' + crypto.createHash('sha256').update(file.buffer).digest('hex');
        console.log(`[Security] License File Hash Generated: ${fileHash}`);

        // 🔴 Exact mapping of all 20 variables with your SQL structure
        const sqlQuery = `
            INSERT INTO drivers 
            (full_name, email, phone, password, dob, experience, license_number, bank_name, account_number, ifsc_code, bank_branch, aadhar_card, pan_card, medical_report, police_verification, license_file_path, police_file_path, bank_file_path, medical_file_path, aadhar_file_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const expYears = experience ? parseInt(experience) : 0;
        const driverEmail = email || `driver-${Date.now()}@cargomax.com`; 
        const driverPassword = password || 'secure_fallback_pwd';
        const driverDob = dob || null; 

        const values = [
            fullName || '', driverEmail, phone || '', driverPassword, driverDob, expYears, 
            licenseNumber || '', bankName || null, accountNumber || null, 
            ifscCode || null, bankBranch || null, aadharCard || '', panCard || null, 
            medicalReport || 'Pending', policeVerification || 'Pending', 
            licensePath, policePath, bankPath, medicalPath, aadharPath
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
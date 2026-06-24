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

// ==========================================
// 3. Web3 / Polygon Blockchain Setup
// ==========================================
const RPC_URL = process.env.POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology';
const PRIVATE_KEY = process.env.BACKEND_API_PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000000'; // Insert your actual private key here
const VAULT_ADDRESS = process.env.COMPLIANCE_VAULT_ADDRESS || '0x0000000000000000000000000000000000000000';

const VaultABI = [
    "function storeDocument(string calldata entityId, string calldata docType, string calldata documentHash, uint256 expiryTime) external"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const complianceVault = new ethers.Contract(VAULT_ADDRESS, VaultABI, wallet);

// ==========================================
// 4. Multer Memory Storage Configuration
// ==========================================
// Modification: We are using memoryStorage instead of diskStorage 
// so the file stays in RAM to create a hash and upload directly to S3.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cpUpload = upload.fields([
    { name: 'licenseFile', maxCount: 1 }
    // Add additional file fields here as needed
]);

app.get('/', (req, res) => {
    res.send('<h1>FleetChain Hybrid Web3 Backend is running!</h1>');
});

// ==========================================
// 5. API Endpoint - Driver Registration
// ==========================================
app.post('/api/drivers', cpUpload, async (req, res) => {
    try {
        const { fullName, phone, aadharCard, licenseNumber } = req.body;
        const file = req.files['licenseFile'] ? req.files['licenseFile'][0] : null;

        if (!file) {
            return res.status(400).json({ success: false, message: 'License file upload is mandatory!' });
        }

        // STEP A: Create SHA-256 Hash (Digital Fingerprint) of the file
        const fileHash = '0x' + crypto.createHash('sha256').update(file.buffer).digest('hex');
        console.log(`[Security] License File Hash Generated: ${fileHash}`);

        // STEP B: Upload file to AWS S3 (to keep the local server clean)
        const fileName = `drivers/${Date.now()}-${file.originalname}`;
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME || 'my-fleet-bucket',
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        });
        
        // Note: This line might throw an error if you don't have actual AWS keys yet. 
        // You can leave it commented out during local testing.
        // await s3Client.send(command); 
        const s3Url = `https://my-fleet-bucket.s3.amazonaws.com/${fileName}`;

        // STEP C: Save private data (Name, Phone, etc.) to MySQL
        const sqlQuery = `
            INSERT INTO drivers (full_name, phone, aadhar_card, license_number, license_file_url, license_hash) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [fullName, phone, aadharCard, licenseNumber, s3Url, fileHash];
        
        // Execute database query using async/await
        const [result] = await db.query(sqlQuery, values);
        const driverId = result.insertId.toString(); // ID returned from MySQL
        console.log(`[Database] Driver saved to MySQL with ID: ${driverId}`);

        // STEP D: Save the hash to the Blockchain
        // Set expiryTime to 1 year (365 days) from now
        const expiryTime = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60); 
        
        try {
            console.log(`[Blockchain] Sending hash to Polygon for Driver ${driverId}...`);
            // This line calls the smart contract function
            const tx = await complianceVault.storeDocument(driverId, "DL", fileHash, expiryTime);
            await tx.wait(); // Wait for confirmation on the blockchain network
            console.log(`[Blockchain] Success! Transaction Hash: ${tx.hash}`);
        } catch (bcError) {
            console.error('[Blockchain Error] Failed to save on Polygon:', bcError.message);
            // Note: If blockchain fails, you might want to rollback the MySQL insert here.
        }

        // Send success response to the frontend
        return res.status(201).json({
            success: true,
            message: 'Driver registered successfully and verified on the blockchain!',
            fileHash: fileHash
        });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Node.js Backend Server is running on http://localhost:${PORT}`);
});
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { ethers } from 'ethers';
import { S3Client } from '@aws-sdk/client-s3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();

// ==========================================
// CORS Configuration
// ==========================================
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
// 2. MySQL Database Connection
// ==========================================
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'logistics_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});

// Test Database Connection
const testConnection = async () => {
    try {
        const conn = await db.getConnection();
        console.log('✅ Connected successfully to MySQL Database (logistics_db)!');
        conn.release();
        return true;
    } catch (err) {
        console.error('❌ MySQL database connection failed:', err.message);
        console.log('\n📌 Fix these issues:');
        console.log('1️⃣ Make sure MySQL is running:');
        console.log('   Windows: Open Services > Find MySQL80 > Start');
        console.log('   Or run: net start MySQL80');
        console.log('2️⃣ Check your MySQL password in the connection config');
        console.log('3️⃣ Create database: CREATE DATABASE logistics_db;');
        console.log('4️⃣ Try changing host to "127.0.0.1" instead of "localhost"');
        return false;
    }
};

testConnection();

// ==========================================
// 3. Web3 / Polygon Blockchain Setup
// ==========================================
const RPC_URL = process.env.POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology';
const PRIVATE_KEY = process.env.BACKEND_API_PRIVATE_KEY || '0x0000000000000000000000000000000000000000';
const VAULT_ADDRESS = process.env.COMPLIANCE_VAULT_ADDRESS || '0x0000000000000000000000000000000000000000';

const VaultABI = [
    "function storeDocument(string calldata entityId, string calldata docType, string calldata documentHash, uint256 expiryTime) external"
];

let provider = null;
let wallet = null;
let complianceVault = null;
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

const cpUpload = upload.fields([
    { name: 'licenseFile', maxCount: 1 },
    { name: 'policeFile', maxCount: 1 },
    { name: 'bankFile', maxCount: 1 },
    { name: 'medicalFile', maxCount: 1 },
    { name: 'aadharFile', maxCount: 1 }
]);

// ==========================================
// 5. Helper Functions
// ==========================================
const generateTrackingId = (id) => {
    const prefix = 'TRK';
    const year = new Date().getFullYear();
    const paddedId = String(id).padStart(4, '0');
    return `${prefix}-${year}-${paddedId}`;
};

/// ==========================================
// 6. LOGIN ROUTE (UPDATED with Role)
// ==========================================
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [drivers] = await db.query('SELECT * FROM drivers WHERE email = ?', [email]);

        if (drivers.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const driver = drivers[0];
        const isMatch = (password === driver.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // 🔴 Check if user is admin or driver
        const isAdmin = (email === 'admin' || email === 'admin@cargomax.com');
        
        // You can also add a role column in database for more flexibility
        const role = isAdmin ? 'admin' : 'driver';

        const token = jwt.sign(
            { id: driver.id, email: driver.email, role: role },
            process.env.JWT_SECRET || 'your-secret-key-change-this',
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            role: role,  // 🔴 Send role to frontend
            driver: {
                id: driver.id,
                name: driver.full_name,
                email: driver.email,
                role: role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});
// ==========================================
// 7. SHIPMENT ROUTES
// ==========================================

app.get('/api/shipments', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT s.*, 
                   d.full_name as driver_name,
                   v.vehicle_id as vehicle_code
            FROM shipments s
            LEFT JOIN drivers d ON s.driver_id = d.id
            LEFT JOIN vehicles v ON s.vehicle_id = v.id
            ORDER BY s.id ASC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching shipments:', error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/shipments', async (req, res) => {
    try {
        const { destination, client, weight, driver_id, vehicle_id, eta, status, notes } = req.body;

        const [result] = await db.query(
            `INSERT INTO shipments 
             (destination, client, weight, driver_id, vehicle_id, eta, status, notes) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [destination, client, weight, driver_id, vehicle_id, eta, status, notes]
        );

        const trackingId = generateTrackingId(result.insertId);

        await db.query(
            `UPDATE shipments SET tracking_id = ? WHERE id = ?`,
            [trackingId, result.insertId]
        );

        res.status(201).json({
            id: result.insertId,
            tracking_id: trackingId,
            message: 'Shipment created successfully'
        });
    } catch (error) {
        console.error('Error creating shipment:', error);
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/shipments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { destination, client, weight, driver_id, vehicle_id, eta, status, notes } = req.body;

        await db.query(
            `UPDATE shipments SET 
             destination = ?, 
             client = ?, 
             weight = ?, 
             driver_id = ?, 
             vehicle_id = ?, 
             eta = ?, 
             status = ?, 
             notes = ?
             WHERE id = ?`,
            [destination, client, weight, driver_id, vehicle_id, eta, status, notes, id]
        );

        res.json({ message: 'Shipment updated successfully' });
    } catch (error) {
        console.error('Error updating shipment:', error);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/shipments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM shipments WHERE id = ?', [id]);
        res.json({ message: 'Shipment deleted successfully' });
    } catch (error) {
        console.error('Error deleting shipment:', error);
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// 8. SYSTEM LOGS ROUTES
// ==========================================

app.get('/api/logs', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 50'
        );
        console.log(`📋 Found ${rows.length} logs`);
        res.json(rows || []);
    } catch (error) {
        console.error('❌ Error fetching logs:', error);
        res.json([]);
    }
});

app.post('/api/logs', async (req, res) => {
    try {
        const { type, title, description, time } = req.body;

        const [result] = await db.query(
            `INSERT INTO system_logs (type, title, description, time) 
             VALUES (?, ?, ?, ?)`,
            [type, title, description, time || new Date().toLocaleString()]
        );

        console.log('✅ Log created:', title);
        res.status(201).json({
            id: result.insertId,
            message: 'Log created successfully'
        });
    } catch (error) {
        console.error('❌ Error creating log:', error);
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 9. MAINTENANCE LOGS ROUTES
// ==========================================

app.get('/api/maintenance', async (req, res) => {
    try {
        const query = `
            SELECT 
                ml.*,
                v.vehicle_id,
                v.license_plate,
                v.company_name,
                v.type as vehicle_type
            FROM maintenance_logs ml
            LEFT JOIN vehicles v ON ml.vehicle_id = v.id
            ORDER BY ml.created_at DESC
        `;
        const [rows] = await db.query(query);
        console.log(`📋 Fetched ${rows.length} maintenance logs`);
        res.json(rows);
    } catch (error) {
        console.error('❌ Error fetching maintenance logs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch maintenance logs',
            error: error.message
        });
    }
});

app.post('/api/maintenance', async (req, res) => {
    try {
        console.log('📝 Creating maintenance log...');
        console.log('Request body:', req.body);

        const {
            vehicle_id,
            maintenance_type,
            category,
            description,
            service_date,
            cost,
            status = 'In Progress'
        } = req.body;

        if (!vehicle_id) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle ID is required'
            });
        }
        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Description is required'
            });
        }
        if (!service_date) {
            return res.status(400).json({
                success: false,
                message: 'Service date is required'
            });
        }

        const [vehicleCheck] = await db.query(
            'SELECT id FROM vehicles WHERE id = ?',
            [vehicle_id]
        );

        if (vehicleCheck.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        const query = `
            INSERT INTO maintenance_logs 
            (vehicle_id, maintenance_type, category, description, service_date, cost, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [
            vehicle_id,
            maintenance_type || null,
            category || null,
            description,
            service_date,
            cost || 0,
            status
        ]);

        const [newLog] = await db.query(
            `SELECT 
                ml.*,
                v.vehicle_id,
                v.license_plate,
                v.company_name
            FROM maintenance_logs ml
            LEFT JOIN vehicles v ON ml.vehicle_id = v.id
            WHERE ml.id = ?`,
            [result.insertId]
        );

        console.log('✅ Maintenance log created with ID:', result.insertId);
        res.status(201).json({
            success: true,
            message: 'Maintenance log created successfully',
            data: newLog[0]
        });

    } catch (error) {
        console.error('❌ Error creating maintenance log:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create maintenance log',
            error: error.message
        });
    }
});

app.put('/api/maintenance/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            maintenance_type,
            category,
            description,
            service_date,
            cost,
            status
        } = req.body;

        const [existingLog] = await db.query(
            'SELECT id FROM maintenance_logs WHERE id = ?',
            [id]
        );

        if (existingLog.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Maintenance log not found'
            });
        }

        const query = `
            UPDATE maintenance_logs 
            SET 
                maintenance_type = ?,
                category = ?,
                description = ?,
                service_date = ?,
                cost = ?,
                status = ?
            WHERE id = ?
        `;

        await db.query(query, [
            maintenance_type || null,
            category || null,
            description,
            service_date,
            cost || 0,
            status || 'In Progress',
            id
        ]);

        const [updatedLog] = await db.query(
            `SELECT 
                ml.*,
                v.vehicle_id,
                v.license_plate,
                v.company_name
            FROM maintenance_logs ml
            LEFT JOIN vehicles v ON ml.vehicle_id = v.id
            WHERE ml.id = ?`,
            [id]
        );

        res.json({
            success: true,
            message: 'Maintenance log updated successfully',
            data: updatedLog[0]
        });

    } catch (error) {
        console.error('❌ Error updating maintenance log:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update maintenance log',
            error: error.message
        });
    }
});

app.delete('/api/maintenance/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [existingLog] = await db.query(
            'SELECT id FROM maintenance_logs WHERE id = ?',
            [id]
        );

        if (existingLog.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Maintenance log not found'
            });
        }

        await db.query(
            'DELETE FROM maintenance_logs WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Maintenance log deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting maintenance log:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete maintenance log',
            error: error.message
        });
    }
});

// ==========================================
// 10. DRIVERS ROUTES
// ==========================================

// GET all drivers
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

// POST - Register new driver (FIXED - Email & Password saved properly)
app.post('/api/drivers', cpUpload, async (req, res) => {
    try {
        console.log(">>>>>>>> Request received from frontend! >>>>>>>>");

        const {
            fullName, email, phone, password, experience, licenseNumber,
            bankName, accountNumber, ifscCode, bankBranch, aadharCard,
            panCard, medicalReport, policeVerification, dob
        } = req.body;

        console.log('📝 Driver Data:', { fullName, email, phone, password });

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required!' 
            });
        }

        // Check if email already exists
        const [existingDriver] = await db.query(
            'SELECT id FROM drivers WHERE email = ?',
            [email]
        );

        if (existingDriver.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered! Please use a different email.'
            });
        }

        // File upload handling code...
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

        // 🔴 FIX: Directly use email and password from frontend
        const driverEmail = email;      // ✅ Frontend se direct email
        const driverPassword = password; // ✅ Frontend se direct password

        const sqlQuery = `
            INSERT INTO drivers 
            (full_name, email, phone, password, dob, experience, license_number, 
             bank_name, account_number, ifsc_code, bank_branch, aadhar_card, pan_card, 
             medical_report, police_verification, license_file_path, police_file_path, 
             bank_file_path, medical_file_path, aadhar_file_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const expYears = experience ? parseInt(experience) : 0;
        const driverDob = dob || null;

        const values = [
            fullName || '', 
            driverEmail,  // ✅ Frontend se direct email
            phone || '', 
            driverPassword,  // ✅ Frontend se direct password
            driverDob, 
            expYears,
            licenseNumber || '', 
            bankName || null, 
            accountNumber || null,
            ifscCode || null, 
            bankBranch || null, 
            aadharCard || '', 
            panCard || null,
            medicalReport || 'Pending', 
            policeVerification || 'Pending',
            licensePath, 
            policePath, 
            bankPath, 
            medicalPath, 
            aadharPath
        ];

        const [result] = await db.query(sqlQuery, values);
        const driverId = result.insertId.toString();
        console.log(`[Database] Driver saved to MySQL with ID: ${driverId}, Email: ${driverEmail}`);

        return res.status(201).json({
            success: true,
            message: 'Driver registered successfully!',
            fileHash: fileHash,
            driverId: driverId
        });

    } catch (error) {
        console.error('❌ Server Error Details:', error);
        res.status(500).json({ 
            success: false, 
            message: `Internal Server Error: ${error.message}` 
        });
    }
});

// ==========================================
// 🔴🔴🔴 NEW - DELETE Driver Route 🔴🔴🔴
// ==========================================
app.delete('/api/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if driver exists
        const [existingDriver] = await db.query(
            'SELECT id FROM drivers WHERE id = ?',
            [id]
        );

        if (existingDriver.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Driver not found'
            });
        }

        // Check if driver has any shipments
        const [shipments] = await db.query(
            'SELECT id FROM shipments WHERE driver_id = ?',
            [id]
        );

        if (shipments.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete driver. They have active shipments. Please reassign shipments first.'
            });
        }

        // Delete the driver
        await db.query('DELETE FROM drivers WHERE id = ?', [id]);

        console.log(`✅ Driver with ID ${id} deleted successfully`);
        
        res.json({
            success: true,
            message: 'Driver deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting driver:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete driver',
            error: error.message
        });
    }
});

// ==========================================
// 🔴🔴🔴 NEW - UPDATE Driver Route 🔴🔴🔴
// ==========================================
app.put('/api/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            fullName, email, phone, experience, licenseNumber,
            bankName, accountNumber, ifscCode, bankBranch, aadharCard,
            panCard, medicalReport, policeVerification, dob
        } = req.body;

        // Check if driver exists
        const [existingDriver] = await db.query(
            'SELECT id FROM drivers WHERE id = ?',
            [id]
        );

        if (existingDriver.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Driver not found'
            });
        }

        // Check if email is already used by another driver
        if (email) {
            const [emailCheck] = await db.query(
                'SELECT id FROM drivers WHERE email = ? AND id != ?',
                [email, id]
            );
            if (emailCheck.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use by another driver'
                });
            }
        }

        const query = `
            UPDATE drivers 
            SET 
                full_name = ?,
                email = ?,
                phone = ?,
                dob = ?,
                experience = ?,
                license_number = ?,
                bank_name = ?,
                account_number = ?,
                ifsc_code = ?,
                bank_branch = ?,
                aadhar_card = ?,
                pan_card = ?,
                medical_report = ?,
                police_verification = ?
            WHERE id = ?
        `;

        const [result] = await db.query(query, [
            fullName || null,
            email || null,
            phone || null,
            dob || null,
            experience || 0,
            licenseNumber || null,
            bankName || null,
            accountNumber || null,
            ifscCode || null,
            bankBranch || null,
            aadharCard || null,
            panCard || null,
            medicalReport || 'Pending',
            policeVerification || 'Pending',
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Driver not found or no changes made'
            });
        }

        // Get updated driver data
        const [updatedDriver] = await db.query(
            `SELECT id, full_name, email, phone, experience, license_number, 
                    bank_name, account_number, ifsc_code, bank_branch, 
                    aadhar_card, pan_card, medical_report, police_verification, 
                    DATE_FORMAT(dob, "%Y-%m-%d") as dob 
            FROM drivers WHERE id = ?`,
            [id]
        );

        console.log(`✅ Driver with ID ${id} updated successfully`);
        
        res.json({
            success: true,
            message: 'Driver updated successfully',
            driver: updatedDriver[0]
        });

    } catch (error) {
        console.error('❌ Error updating driver:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update driver',
            error: error.message
        });
    }
});

// ==========================================
// 11. VEHICLES ROUTES
// ==========================================

app.get('/api/vehicles', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM vehicles ORDER BY id DESC");
        console.log(`📋 Fetched ${rows.length} vehicles`);
        res.json(rows);
    } catch (err) {
        console.error("❌ Database fetch failed:", err);
        res.status(500).json({
            success: false,
            error: "Database fetch failed"
        });
    }
});

app.post('/api/vehicles', async (req, res) => {
    try {
        const { vehicleId, vehicleType, companyName, modelYear, licensePlate, pucNumber, notes } = req.body;

        console.log('📦 Adding vehicle:', req.body);

        const sql = `INSERT INTO vehicles 
            (vehicle_id, type, company_name, year, license_plate, puc_certificate_number, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.query(sql, [
            vehicleId,
            vehicleType,
            companyName,
            modelYear,
            licensePlate,
            pucNumber,
            notes
        ]);

        console.log('✅ Vehicle added with ID:', result.insertId);

        res.status(201).json({
            success: true,
            message: "Vehicle added successfully",
            id: result.insertId
        });
    } catch (err) {
        console.error("❌ SQL Error:", err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.put('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const { vehicle_id, type, company_name, year, license_plate, puc_certificate_number, notes } = req.body;

        console.log('🔄 Updating vehicle ID:', vehicleId);
        console.log('📦 Received data:', req.body);

        const [existingVehicle] = await db.query(
            'SELECT * FROM vehicles WHERE id = ?',
            [vehicleId]
        );

        if (existingVehicle.length === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const [result] = await db.query(
            `UPDATE vehicles 
             SET vehicle_id = ?, 
                 type = ?, 
                 company_name = ?, 
                 year = ?, 
                 license_plate = ?, 
                 puc_certificate_number = ?, 
                 notes = ?
             WHERE id = ?`,
            [
                vehicle_id || existingVehicle[0].vehicle_id,
                type || existingVehicle[0].type,
                company_name || existingVehicle[0].company_name,
                year || existingVehicle[0].year,
                license_plate || existingVehicle[0].license_plate,
                puc_certificate_number || existingVehicle[0].puc_certificate_number,
                notes || existingVehicle[0].notes,
                vehicleId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vehicle not found or no changes made' });
        }

        const [updatedVehicle] = await db.query(
            'SELECT * FROM vehicles WHERE id = ?',
            [vehicleId]
        );

        console.log('✅ Vehicle updated successfully:', updatedVehicle[0]);

        res.json({
            success: true,
            message: 'Vehicle updated successfully',
            vehicle: updatedVehicle[0]
        });
    } catch (error) {
        console.error('❌ Error updating vehicle:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.delete('/api/vehicles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [existingVehicle] = await db.query(
            'SELECT id FROM vehicles WHERE id = ?',
            [id]
        );
        
        if (existingVehicle.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }
        
        await db.query('DELETE FROM vehicles WHERE id = ?', [id]);
        
        res.json({
            success: true,
            message: 'Vehicle deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting vehicle:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete vehicle',
            error: error.message
        });
    }
});

// ==========================================
// 12. HOME ROUTE
// ==========================================
app.get('/', (req, res) => {
    res.send('<h1>FleetChain Hybrid Web3 Backend is running perfectly!</h1>');
});

// ==========================================
// 13. START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Node.js Backend Server is running on http://localhost:${PORT}`);
});
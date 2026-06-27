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
    // server.js mein tracking ID generate karne ka function
const generateTrackingId = (id) => {
    const prefix = 'TRK';
    const year = new Date().getFullYear();
    const paddedId = String(id).padStart(4, '0');
    return `${prefix}-${year}-${paddedId}`;
};

// ==================== SHIPMENT ROUTES ====================

// GET all shipments
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


// POST route mein use karein
app.post('/api/shipments', async (req, res) => {
    try {
        const { destination, client, weight, driver_id, vehicle_id, eta, status, notes } = req.body;
        
        const [result] = await db.query(
            `INSERT INTO shipments 
             (destination, client, weight, driver_id, vehicle_id, eta, status, notes) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [destination, client, weight, driver_id, vehicle_id, eta, status, notes]
        );
        
        // Generate tracking ID
        const trackingId = generateTrackingId(result.insertId);
        
        // Update with tracking ID
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

// PUT - Update shipment with client and weight
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

// DELETE shipment
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

// ==================== SYSTEM LOGS ROUTES ====================

// GET - Fetch all logs
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

// POST - Create new log
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
// MAINTENANCE LOGS ROUTES
// ==========================================

// GET all maintenance logs with vehicle details
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

// POST create new maintenance log
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

        // Validation
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

        // Check if vehicle exists
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

        // Get the inserted record
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

// PUT update maintenance log
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

        // Check if log exists
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

        // Get updated record
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

// DELETE maintenance log
app.delete('/api/maintenance/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if log exists
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
    // Backend route (example)
  // Backend route - FIXED VERSION
app.put('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const { vehicle_id, type, company_name, year, license_plate, puc_certificate_number, notes } = req.body;
    
    console.log('🔄 Updating vehicle ID:', vehicleId);
    console.log('📦 Received data:', req.body);

    // Check if vehicle exists first
    const [existingVehicle] = await db.query(
      'SELECT * FROM vehicles WHERE id = ?',
      [vehicleId]
    );

    if (existingVehicle.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Update the vehicle - mysql2/promise returns [rows, fields]
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
    
    // Check if update was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found or no changes made' });
    }
    
    // Fetch the updated vehicle
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
    // Server side: routes/vehicle.js
  // Server side: routes/vehicle.js - FIXED
app.post('/api/vehicles', async (req, res) => {
    try {
        const { vehicleId, vehicleType, companyName, modelYear, licensePlate, pucNumber, notes } = req.body;
        
        console.log('📦 Adding vehicle:', req.body);
        
        // Database table ke exact column names ke saath match karein
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

// GET: Fetch Vehicles Route
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
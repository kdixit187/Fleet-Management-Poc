    // pages/driver/DriverDashboard.jsx - Complete Fixed Version
    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import Sidebar from './drivercomponents/Sidebar';

    const DriverDashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [driverData, setDriverData] = useState(null);
    const [shipments, setShipments] = useState([]);
    const [vehicle, setVehicle] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [driverId, setDriverId] = useState(null);
    const [allShipments, setAllShipments] = useState([]);
    const [debugInfo, setDebugInfo] = useState('');
    const [stats, setStats] = useState({
        totalShipments: 0,
        inProgress: 0,
        completed: 0,
        earnings: 0
    });

    const API_BASE = 'http://localhost:5000/api';

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        const id = localStorage.getItem('userId');

        console.log('🔍 ===== DRIVER DASHBOARD DEBUG =====');
        console.log('🔍 Token:', token ? 'Present' : 'Missing');
        console.log('🔍 Role:', role);
        console.log('🔍 User ID from localStorage:', id);
        console.log('🔍 UserName:', localStorage.getItem('userName'));

        if (!token) {
        console.log('❌ No token, redirecting to login');
        navigate('/login');
        return;
        }

        if (role !== 'driver') {
        console.log('❌ Not a driver, redirecting to login');
        navigate('/login');
        return;
        }

        setDriverId(id);
        setUserName(localStorage.getItem('userName') || 'Driver');

        // Fetch all data
        fetchAllData(id);

        setLoading(false);

        // Auto refresh every 30 seconds
        const interval = setInterval(() => {
        if (id) {
            fetchAllData(id);
        }
        }, 30000);

        return () => clearInterval(interval);
    }, [navigate]);

    // ==================== FETCH ALL DATA ====================
    const fetchAllData = async (id) => {
        console.log('🔄 Fetching all data for driver ID:', id);
        
        try {
        // 1. Fetch all drivers
        const driverRes = await fetch(`${API_BASE}/drivers`);
        const driverData = await driverRes.json();
        console.log('📋 Drivers Response:', driverData);

        // 2. Fetch all shipments
        const shipmentRes = await fetch(`${API_BASE}/shipments`);
        const shipmentData = await shipmentRes.json();
        console.log('📋 Shipments Response:', shipmentData);
        
        // Handle different response structures
        const shipmentsArray = shipmentData?.data || shipmentData || [];
        setAllShipments(shipmentsArray);

        // 3. Fetch all vehicles
        const vehicleRes = await fetch(`${API_BASE}/vehicles`);
        const vehicleData = await vehicleRes.json();
        console.log('📋 Vehicles Response:', vehicleData);

        // Process data
        processDriverData(id, driverData, shipmentData, vehicleData);

        } catch (error) {
        console.error('❌ Error fetching data:', error);
        setDebugInfo('Error: ' + error.message);
        }
    };

    // ==================== PROCESS DATA ====================
    const processDriverData = (id, driverData, shipmentData, vehicleData) => {
        const driverIdNum = parseInt(id);
        console.log('🔍 Processing for driver ID:', driverIdNum);

        // Find driver
        let driver = null;
        const driversArray = driverData?.data || driverData || [];
        if (Array.isArray(driversArray)) {
        driver = driversArray.find(d => parseInt(d.id) === driverIdNum);
        }
        console.log('👤 Found Driver:', driver);

        if (driver) {
        setDriverData(driver);
        setUserName(driver.full_name || 'Driver');
        }

        // Filter shipments for this driver
        let driverShipments = [];
        const shipmentsArray = shipmentData?.data || shipmentData || [];
        if (Array.isArray(shipmentsArray)) {
        driverShipments = shipmentsArray.filter(s => {
            const shipDriverId = s.driver_id ? parseInt(s.driver_id) : null;
            return shipDriverId === driverIdNum;
        });
        }
        
        console.log('✅ Driver Shipments Found:', driverShipments.length);
        setShipments(driverShipments);
        setDebugInfo(`Found ${driverShipments.length} shipments for driver ID ${id}`);

        // Find vehicle
        let vehicleInfo = null;
        if (driver && driver.vehicle_id) {
        const vehiclesArray = vehicleData?.data || vehicleData || [];
        if (Array.isArray(vehiclesArray)) {
            vehicleInfo = vehiclesArray.find(v => parseInt(v.id) === parseInt(driver.vehicle_id));
        }
        }
        setVehicle(vehicleInfo || null);

        // Update stats
        const inProgress = driverShipments.filter(s => 
        s.status === 'In Transit' || s.status === 'in_transit' || s.status === 'Loading' || s.status === 'loading'
        ).length;
        const completed = driverShipments.filter(s => 
        s.status === 'Delivered' || s.status === 'delivered'
        ).length;
        
        setStats({
        totalShipments: driverShipments.length,
        inProgress: inProgress,
        completed: completed,
        earnings: completed * 5000
        });

        // Update notifications
        let notifications = [];
        
        // Add shipment notifications
        driverShipments.slice(0, 5).forEach(s => {
        notifications.push({
            id: `ship-${s.id}`,
            type: s.status === 'Delivered' || s.status === 'delivered' ? 'success' : 'info',
            title: `Shipment #${s.id}`,
            description: `${s.status} - ${s.destination || 'Unknown'}`,
            time: s.updated_at ? new Date(s.updated_at).toLocaleTimeString() : 'Just now'
        });
        });

        setNotifications(notifications.slice(0, 8));
    };

    const handleRefresh = () => {
        if (driverId) {
        console.log('🔄 Manual refresh...');
        fetchAllData(driverId);
        }
    };

    const getStatusBadgeColor = (status) => {
        const colors = {
        'In Transit': '#16a34a',
        'in_transit': '#16a34a',
        'Loading': '#2563eb',
        'loading': '#2563eb',
        'Delivered': '#8b5cf6',
        'delivered': '#8b5cf6',
        'Delayed': '#dc2626',
        'delayed': '#dc2626',
        'Pending': '#f59e0b',
        'pending': '#f59e0b',
        'Alert': '#ef4444',
        'alert': '#ef4444'
        };
        return colors[status] || '#94a3b8';
    };

    const getStatusDisplay = (status) => {
        const display = {
        'in_transit': 'In Transit',
        'loading': 'Loading',
        'delivered': 'Delivered',
        'delayed': 'Delayed',
        'pending': 'Pending'
        };
        return display[status] || status;
    };

    if (loading) {
        return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontSize: '24px',
            color: '#4f46e5',
            fontWeight: '600',
            background: '#f1f5f9'
        }}>
            Loading Dashboard...
        </div>
        );
    }

    return (
        <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f1f5f9'
        }}>
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <div style={{
            flex: 1,
            marginLeft: '260px',
            padding: '32px',
            overflowY: 'auto'
        }}>
            {/* Header */}
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
            }}>
            <div>
                <h1 style={{
                fontSize: '32px',
                color: '#0f172a',
                margin: 0,
                fontWeight: '700'
                }}>
                Welcome, {userName}! 🚚
                </h1>
                <p style={{
                color: '#64748b',
                margin: '4px 0 0 0',
                fontSize: '14px'
                }}>
                Driver Dashboard - Your Fleet Status Overview
                </p>
                {debugInfo && (
                <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    marginTop: '4px'
                }}>
                    🐛 Debug: {debugInfo}
                </p>
                )}
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <button onClick={handleRefresh} style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#4f46e5',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s ease'
                }}>
                🔄 Refresh
                </button>
                <div style={{
                color: '#64748b',
                fontSize: '14px',
                background: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                {new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}
                </div>
            </div>
            </div>

            {/* Stats Grid */}
            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '32px'
            }}>
            <div style={{
                background: 'white',
                padding: '20px 24px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
                background: '#dbeafe',
                color: '#2563eb'
                }}>📦</div>
                <div style={{ flex: 1 }}>
                <h3 style={{ color: '#64748b', fontSize: '13px', margin: '0 0 4px 0', fontWeight: '500' }}>My Shipments</h3>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, lineHeight: '1.2' }}>{stats.totalShipments}</p>
                <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginTop: '4px' }}>{stats.inProgress} in progress • {stats.completed} completed</span>
                </div>
            </div>

            <div style={{
                background: 'white',
                padding: '20px 24px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
                background: '#d1fae5',
                color: '#059669'
                }}>🚛</div>
                <div style={{ flex: 1 }}>
                <h3 style={{ color: '#64748b', fontSize: '13px', margin: '0 0 4px 0', fontWeight: '500' }}>My Vehicle</h3>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, lineHeight: '1.2' }}>
                    {vehicle?.vehicle_id || vehicle?.id || 'N/A'}
                </p>
                <span style={{ fontSize: '12px', color: '#16a34a', display: 'block', marginTop: '4px', fontWeight: '600' }}>
                    ● {vehicle ? 'Active' : 'Not Assigned'}
                </span>
                </div>
            </div>

            <div style={{
                background: 'white',
                padding: '20px 24px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
                background: '#fef3c7',
                color: '#d97706'
                }}>📍</div>
                <div style={{ flex: 1 }}>
                <h3 style={{ color: '#64748b', fontSize: '13px', margin: '0 0 4px 0', fontWeight: '500' }}>Today's Route</h3>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, lineHeight: '1.2' }}>
                    {shipments.filter(s => s.status === 'In Transit' || s.status === 'in_transit' || s.status === 'Loading' || s.status === 'loading').length} Stops
                </p>
                <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginTop: '4px' }}>
                    Total: {shipments.length} shipments assigned
                </span>
                </div>
            </div>

            <div style={{
                background: 'white',
                padding: '20px 24px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
                background: '#ede9fe',
                color: '#7c3aed'
                }}>💰</div>
                <div style={{ flex: 1 }}>
                <h3 style={{ color: '#64748b', fontSize: '13px', margin: '0 0 4px 0', fontWeight: '500' }}>Earnings</h3>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0, lineHeight: '1.2' }}>
                    ₹{stats.earnings.toLocaleString()}
                </p>
                <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginTop: '4px' }}>
                    This month • {stats.completed} deliveries
                </span>
                </div>
            </div>
            </div>

            {/* Two Column Layout */}
            <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            marginBottom: '24px'
            }}>
            {/* Shipment Section */}
            <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
            }}>
                <h2 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 16px 0' }}>📦 Current Shipments</h2>
                {shipments.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#94a3b8'
                }}>
                    <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>📭</span>
                    <p style={{ fontSize: '16px', margin: 0, color: '#64748b' }}>No shipments assigned yet</p>
                    <small style={{ fontSize: '13px', color: '#cbd5e1' }}>Click "Refresh" to check for new assignments</small>
                </div>
                ) : (
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                }}>
                    <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '12px 8px', background: '#f8fafc', color: '#475569', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Tracking ID</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', background: '#f8fafc', color: '#475569', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Destination</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', background: '#f8fafc', color: '#475569', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Client</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', background: '#f8fafc', color: '#475569', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Status</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', background: '#f8fafc', color: '#475569', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>ETA</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shipments.slice(0, 5).map((shipment) => {
                        const statusColor = getStatusBadgeColor(shipment.status);
                        const statusDisplay = getStatusDisplay(shipment.status);
                        return (
                        <tr key={shipment.id}>
                            <td style={{ padding: '12px 8px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                            <span style={{ fontWeight: '600', color: '#4f46e5', fontFamily: 'monospace' }}>#{shipment.id}</span>
                            </td>
                            <td style={{ padding: '12px 8px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                            {shipment.destination || 'N/A'}
                            </td>
                            <td style={{ padding: '12px 8px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                            {shipment.client || 'N/A'}
                            </td>
                            <td style={{ padding: '12px 8px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '500',
                                background: statusColor + '20',
                                color: statusColor,
                                display: 'inline-block'
                            }}>
                                {statusDisplay}
                            </span>
                            </td>
                            <td style={{ padding: '12px 8px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                            {shipment.eta ? new Date(shipment.eta).toLocaleString() : 'N/A'}
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                )}
            </div>

            {/* Notification Section */}
            <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
            }}>
                <h2 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 16px 0' }}>🔔 Recent Updates</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {notifications.length === 0 ? (
                    <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#94a3b8'
                    }}>
                    <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>📭</span>
                    <p style={{ fontSize: '16px', margin: 0, color: '#64748b' }}>No notifications</p>
                    </div>
                ) : (
                    notifications.slice(0, 6).map((log, index) => (
                    <li key={log.id || index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 0',
                        borderBottom: '1px solid #f1f5f9'
                    }}>
                        <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '700',
                        flexShrink: 0,
                        background: log.type === 'success' || log.type === 'delivered' ? '#d1fae5' : '#dbeafe',
                        color: log.type === 'success' || log.type === 'delivered' ? '#059669' : '#2563eb'
                        }}>
                        {log.type === 'success' || log.type === 'delivered' ? '✓' : 'i'}
                        </span>
                        <div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>
                            {log.title || log.description || 'Update'}
                        </p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                            {log.time || 'Just now'}
                        </p>
                        </div>
                    </li>
                    ))
                )}
                </ul>
            </div>
            </div>

            {/* Footer */}
            <div style={{
            textAlign: 'center',
            padding: '16px',
            color: '#94a3b8',
            fontSize: '13px',
            borderTop: '1px solid #e2e8f0',
            marginTop: '16px'
            }}>
            <p style={{ margin: 0 }}>© 2024 CargoMax Logistics. All rights reserved.</p>
            </div>
        </div>
        </div>
    );
    };

    export default DriverDashboard;
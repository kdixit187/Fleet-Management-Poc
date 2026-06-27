    // components/DriverDashboard.jsx
    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import styled from 'styled-components';

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
        console.log('❌ Not a driver, redirecting to dashboard');
        navigate('/dashboard');
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
        setAllShipments(shipmentData);

        // 3. Fetch all vehicles
        const vehicleRes = await fetch(`${API_BASE}/vehicles`);
        const vehicleData = await vehicleRes.json();
        console.log('📋 Vehicles Response:', vehicleData);

        // 4. Fetch logs
        const logsRes = await fetch(`${API_BASE}/logs`);
        const logsData = await logsRes.json();
        console.log('📋 Logs Response:', logsData);

        // Process data
        processDriverData(id, driverData, shipmentData, vehicleData, logsData);

        } catch (error) {
        console.error('❌ Error fetching data:', error);
        setDebugInfo('Error: ' + error.message);
        }
    };

    // ==================== PROCESS DATA ====================
    const processDriverData = (id, driverData, shipmentData, vehicleData, logsData) => {
        const driverIdNum = parseInt(id);
        console.log('🔍 Processing for driver ID:', driverIdNum);

        // Find driver
        let driver = null;
        if (driverData && driverData.data) {
        driver = driverData.data.find(d => d.id === driverIdNum);
        }
        console.log('👤 Found Driver:', driver);

        if (driver) {
        setDriverData(driver);
        setUserName(driver.full_name || 'Driver');
        }

        // Filter shipments for this driver
        let driverShipments = [];
        if (shipmentData && Array.isArray(shipmentData)) {
        driverShipments = shipmentData.filter(s => {
            const shipDriverId = s.driver_id ? parseInt(s.driver_id) : null;
            const match = shipDriverId === driverIdNum;
            console.log(`🔍 Shipment #${s.id}: driver_id=${s.driver_id}, match=${match}`);
            return match;
        });
        }
        
        console.log('✅ Driver Shipments Found:', driverShipments.length);
        setShipments(driverShipments);
        setDebugInfo(`Found ${driverShipments.length} shipments for driver ID ${id}`);

        // Find vehicle
        let vehicleInfo = null;
        if (driver && driver.vehicle_id && vehicleData && Array.isArray(vehicleData)) {
        vehicleInfo = vehicleData.find(v => v.id === driver.vehicle_id);
        }
        setVehicle(vehicleInfo || null);

        // Update stats
        const inProgress = driverShipments.filter(s => s.status === 'In Transit' || s.status === 'Loading').length;
        const completed = driverShipments.filter(s => s.status === 'Delivered').length;
        
        setStats({
        totalShipments: driverShipments.length,
        inProgress: inProgress,
        completed: completed,
        earnings: completed * 5000
        });

        // Update notifications
        let notifications = [];
        if (logsData && Array.isArray(logsData)) {
        notifications = logsData.slice(0, 8);
        }
        
        // Add shipment notifications
        driverShipments.forEach(s => {
        notifications.unshift({
            id: `ship-${s.id}`,
            type: s.status === 'Delivered' ? 'success' : 'info',
            title: `Shipment #${s.id}`,
            description: `${s.status} - ${s.destination}`,
            time: s.updated_at ? new Date(s.updated_at).toLocaleTimeString() : 'Just now'
        });
        });

        setNotifications(notifications.slice(0, 8));
    };

    // ==================== STATE ====================
    const [stats, setStats] = useState({
        totalShipments: 0,
        inProgress: 0,
        completed: 0,
        earnings: 0
    });

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
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
        'Loading': '#2563eb',
        'Delivered': '#8b5cf6',
        'Delayed': '#dc2626',
        'Pending': '#f59e0b',
        'Alert': '#ef4444'
        };
        return colors[status] || '#94a3b8';
    };

    if (loading) {
        return <LoadingWrapper>Loading Dashboard...</LoadingWrapper>;
    }

    return (
        <DashboardWrapper>
        <Sidebar>
            <div className="logo">🚛 CargoMax</div>
            <nav>
            <a href="#" className="active">📊 My Dashboard</a>
            <a href="#shipments">📦 My Shipments</a>
            <a href="#vehicle">🚛 My Vehicle</a>
            <a href="#tracking">📍 Live Tracking</a>
            <a href="#reports">📋 Reports</a>
            <a href="#profile">⚙️ Profile</a>
            </nav>
            <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
        </Sidebar>

        <MainContent>
            <Header>
            <div>
                <h1>Welcome, {userName}! 🚚</h1>
                <p>Driver Dashboard - Your Fleet Status Overview</p>
                <DebugInfo style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                🐛 Debug: {debugInfo}
                </DebugInfo>
            </div>
            <div className="header-actions">
                <button className="refresh-btn" onClick={handleRefresh}>
                🔄 Refresh
                </button>
                <div className="time">
                <span>{new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</span>
                </div>
            </div>
            </Header>

            {/* All Shipments Debug Info */}
            <DebugCard>
            <h4>🔍 Debug Information</h4>
            <p><strong>Driver ID:</strong> {driverId || 'Not set'}</p>
            <p><strong>Total Shipments in DB:</strong> {allShipments.length}</p>
            <p><strong>My Shipments:</strong> {shipments.length}</p>
            <p><strong>Driver Name:</strong> {driverData?.full_name || 'Not found'}</p>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                <p><strong>All Shipments:</strong></p>
                {allShipments.map(s => (
                <div key={s.id}>
                    #{s.id} → driver_id: {s.driver_id || 'null'} → {s.destination}
                    {parseInt(s.driver_id) === parseInt(driverId) && ' ✅ MATCH'}
                </div>
                ))}
            </div>
            </DebugCard>

            <StatsGrid>
            <StatCard>
                <div className="icon" style={{ background: '#dbeafe', color: '#2563eb' }}>📦</div>
                <div className="stat-info">
                <h3>My Shipments</h3>
                <p className="number">{stats.totalShipments}</p>
                <span className="sub">{stats.inProgress} in progress • {stats.completed} completed</span>
                </div>
            </StatCard>

            <StatCard>
                <div className="icon" style={{ background: '#d1fae5', color: '#059669' }}>🚛</div>
                <div className="stat-info">
                <h3>My Vehicle</h3>
                <p className="number">{vehicle?.vehicle_id || 'N/A'}</p>
                <span className="sub status-active">● {vehicle ? 'Active' : 'Not Assigned'}</span>
                </div>
            </StatCard>

            <StatCard>
                <div className="icon" style={{ background: '#fef3c7', color: '#d97706' }}>📍</div>
                <div className="stat-info">
                <h3>Today's Route</h3>
                <p className="number">{shipments.filter(s => s.status === 'In Transit' || s.status === 'Loading').length} Stops</p>
                <span className="sub">Total: {shipments.length} shipments assigned</span>
                </div>
            </StatCard>

            <StatCard>
                <div className="icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>💰</div>
                <div className="stat-info">
                <h3>Earnings</h3>
                <p className="number">₹{stats.earnings.toLocaleString()}</p>
                <span className="sub">This month • {stats.completed} deliveries</span>
                </div>
            </StatCard>
            </StatsGrid>

            <TwoColumnLayout>
            <ShipmentSection>
                <h2>📦 Current Shipments</h2>
                {shipments.length === 0 ? (
                <EmptyState>
                    <span>📭</span>
                    <p>No shipments assigned yet</p>
                    <small>Click "Refresh" to check for new assignments</small>
                </EmptyState>
                ) : (
                <Table>
                    <thead>
                    <tr>
                        <th>Tracking ID</th>
                        <th>Destination</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>ETA</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shipments.slice(0, 5).map((shipment) => (
                        <tr key={shipment.id}>
                        <td><span className="tracking-id">#{shipment.id}</span></td>
                        <td>{shipment.destination}</td>
                        <td>{shipment.client || 'N/A'}</td>
                        <td>
                            <StatusBadge color={getStatusBadgeColor(shipment.status)}>
                            {shipment.status}
                            </StatusBadge>
                        </td>
                        <td>{shipment.eta ? new Date(shipment.eta).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                )}
            </ShipmentSection>

            <NotificationSection>
                <h2>🔔 Recent Updates</h2>
                <NotificationList>
                {notifications.length === 0 ? (
                    <EmptyState>
                    <span>📭</span>
                    <p>No notifications</p>
                    </EmptyState>
                ) : (
                    notifications.slice(0, 6).map((log, index) => (
                    <li key={log.id || index}>
                        <span className={`badge ${log.type === 'success' || log.type === 'delivered' ? 'success' : 'info'}`}>
                        {log.type === 'success' || log.type === 'delivered' ? '✓' : 'i'}
                        </span>
                        <div>
                        <p className="title">{log.title || log.description || 'Update'}</p>
                        <p className="time">{log.time || 'Just now'}</p>
                        </div>
                    </li>
                    ))
                )}
                </NotificationList>
            </NotificationSection>
            </TwoColumnLayout>

            <Footer>
            <p>© 2024 CargoMax Logistics. All rights reserved.</p>
            </Footer>
        </MainContent>
        </DashboardWrapper>
    );
    };

    // ============================================
    // STYLED COMPONENTS
    // ============================================

    const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-size: 24px;
    color: #4f46e5;
    font-weight: 600;
    `;

    const DashboardWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    background: #f1f5f9;
    `;

    const Sidebar = styled.div`
    width: 260px;
    background: #0f172a;
    color: white;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 100;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);

    .logo {
        font-size: 24px;
        font-weight: 800;
        padding: 16px 12px;
        margin-bottom: 32px;
        color: #4f46e5;
        letter-spacing: -0.5px;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;

        a {
        padding: 12px 16px;
        border-radius: 8px;
        color: #94a3b8;
        text-decoration: none;
        transition: all 0.2s ease;
        font-size: 14px;
        font-weight: 500;

        &:hover {
            background: #1e293b;
            color: white;
        }

        &.active {
            background: #4f46e5;
            color: white;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
        }
    }

    .logout-btn {
        padding: 12px 16px;
        border: none;
        border-radius: 8px;
        background: #dc2626;
        color: white;
        font-weight: 600;
        cursor: pointer;
        margin-top: 16px;
        transition: all 0.2s ease;
        font-size: 14px;

        &:hover {
        background: #b91c1c;
        transform: translateY(-1px);
        }
    }
    `;

    const MainContent = styled.div`
    flex: 1;
    margin-left: 260px;
    padding: 32px;
    overflow-y: auto;

    @media (max-width: 768px) {
        margin-left: 0;
        padding: 16px;
    }
    `;

    const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;

    h1 {
        font-size: 32px;
        color: #0f172a;
        margin: 0;
        font-weight: 700;
    }

    p {
        color: #64748b;
        margin: 4px 0 0 0;
        font-size: 14px;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .refresh-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        background: #4f46e5;
        color: white;
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;

        &:hover {
        background: #4338ca;
        transform: translateY(-1px);
        }
    }

    .time {
        color: #64748b;
        font-size: 14px;
        background: white;
        padding: 8px 16px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    `;

    const DebugCard = styled.div`
    background: #fef9c3;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
    
    h4 {
        margin: 0 0 8px 0;
        color: #92400e;
    }
    
    p {
        margin: 4px 0;
        font-size: 14px;
        color: #78350f;
    }
    
    div {
        font-size: 12px;
        color: #64748b;
    }
    `;

    const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 32px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
    `;

    const StatCard = styled.div`
    background: white;
    padding: 20px 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
    }

    .icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        flex-shrink: 0;
    }

    .stat-info {
        flex: 1;
    }

    h3 {
        color: #64748b;
        font-size: 13px;
        margin: 0 0 4px 0;
        font-weight: 500;
    }

    .number {
        font-size: 24px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
        line-height: 1.2;
    }

    .sub {
        font-size: 12px;
        color: #94a3b8;
        display: block;
        margin-top: 4px;
    }

    .status-active {
        color: #16a34a;
        font-weight: 600;
    }
    `;

    const TwoColumnLayout = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
    `;

    const ShipmentSection = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;

    h2 {
        font-size: 18px;
        color: #0f172a;
        margin: 0 0 16px 0;
    }
    `;

    const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    th {
        text-align: left;
        padding: 12px 8px;
        background: #f8fafc;
        color: #475569;
        font-weight: 600;
        border-bottom: 2px solid #e2e8f0;
    }

    td {
        padding: 12px 8px;
        border-bottom: 1px solid #f1f5f9;
        color: #1e293b;
    }

    tr:hover {
        background: #fafafa;
    }

    .tracking-id {
        font-weight: 600;
        color: #4f46e5;
        font-family: monospace;
    }
    `;

    const StatusBadge = styled.span`
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background: ${props => props.color}20;
    color: ${props => props.color};
    display: inline-block;
    `;

    const ViewAllLink = styled.a`
    display: block;
    text-align: right;
    margin-top: 16px;
    color: #4f46e5;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
    `;

    const NotificationSection = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;

    h2 {
        font-size: 18px;
        color: #0f172a;
        margin: 0 0 16px 0;
    }
    `;

    const NotificationList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;

        &:last-child {
        border-bottom: none;
        }

        .badge {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;

        &.success {
            background: #d1fae5;
            color: #059669;
        }

        &.info {
            background: #dbeafe;
            color: #2563eb;
        }

        &.warning {
            background: #fef3c7;
            color: #d97706;
        }
        }

        .title {
        margin: 0;
        font-size: 14px;
        color: #0f172a;
        font-weight: 500;
        }

        .time {
        margin: 2px 0 0 0;
        font-size: 12px;
        color: #94a3b8;
        }
    }
    `;

    const EmptyState = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: #94a3b8;

    span {
        font-size: 40px;
        display: block;
        margin-bottom: 12px;
    }

    p {
        font-size: 16px;
        margin: 0;
        color: #64748b;
    }

    small {
        font-size: 13px;
        color: #cbd5e1;
    }
    `;

    const Footer = styled.div`
    text-align: center;
    padding: 16px;
    color: #94a3b8;
    font-size: 13px;
    border-top: 1px solid #e2e8f0;
    margin-top: 16px;

    p {
        margin: 0;
    }
    `;

    export default DriverDashboard;
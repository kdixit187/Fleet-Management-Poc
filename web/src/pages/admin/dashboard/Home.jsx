import React from 'react';
import styled from 'styled-components';

export default function HomeDashboard() {
  const recentShipments = [
    { id: '#TRK-8902', destination: 'Mumbai Hub', driver: 'Rajesh Kumar', initials: 'RK', status: 'In Transit', eta: '14:30 PM', statusType: 'transit' },
    { id: '#TRK-8903', destination: 'Delhi Terminus', driver: 'Amit Singh', initials: 'AS', status: 'Delayed', eta: '17:45 PM', statusType: 'delayed' },
    { id: '#TRK-8904', destination: 'Bangalore WH', driver: 'Vijay Yadav', initials: 'VY', status: 'Loading', eta: 'Tomorrow', statusType: 'loading' },
    { id: '#TRK-8905', destination: 'Chennai Port', driver: 'Suresh Reddy', initials: 'SR', status: 'Delivered', eta: '09:15 AM', statusType: 'delivered' },
  ];

  const logEntries = [
    { id: 1, type: 'delivered', text: 'Shipment #TRK-8901 Delivered', detail: 'Cleared terminal gateway', time: '10 mins ago' },
    { id: 2, type: 'alert', text: 'Route Hazard Alert', detail: 'Heavy traffic delay on NH-48 for #TRK-8903', time: '34 mins ago' },
    { id: 3, type: 'dispatch', text: 'New Dispatch Scheduled', detail: 'Assigned Driver Vijay Yadav', time: '1 hour ago' },
    { id: 4, type: 'maintenance', text: 'Vehicle #VH-203 Maintained', detail: 'Service completed at workshop', time: '2 hours ago' },
  ];

  return (
    <DashboardWrapper>
      {/* Top Header Section */}
      <HeaderSection>
        <div>
          <h1>Overview Dashboard</h1>
          <p>Real-time summary of your fleet operations</p>
        </div>
        <ActionButtons>
          {/* <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            Share
          </button> */}
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Export
          </button>
          <button className="btn-primary">+ New Shipment</button>
        </ActionButtons>
      </HeaderSection>

      {/* Metrics Row */}
      <MetricsGrid>
        <MetricCard>
          <IconCircle color="#eff6ff" stroke="#2563eb">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </IconCircle>
          <div>
            <span className="card-label">Active Shipments</span>
            <span className="card-value">42</span>
            <span className="card-trend trend-up">↑ 12% from yesterday</span>
          </div>
        </MetricCard>

        <MetricCard>
          <IconCircle color="#f0fdf4" stroke="#16a34a">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </IconCircle>
          <div>
            <span className="card-label">Vehicles En Route</span>
            <span className="card-value">38 <span className="sub-value">/ 45</span></span>
            <span className="card-trend text-muted">84% utilization</span>
          </div>
        </MetricCard>

        <MetricCard>
          <IconCircle color="#fef2f2" stroke="#dc2626">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
          </IconCircle>
          <div>
            <span className="card-label">Alerts / Delays</span>
            <span className="card-value value-danger">3</span>
            <span className="card-trend trend-down">↑ 2 new today</span>
          </div>
        </MetricCard>

        <MetricCard>
          <IconCircle color="#fffbeb" stroke="#d97706">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          </IconCircle>
          <div>
            <span className="card-label">Delivered Today</span>
            <span className="card-value">18</span>
            <span className="card-trend trend-up">↑ 5 more than yesterday</span>
          </div>
        </MetricCard>
      </MetricsGrid>

      {/* Main Splitscreen Content */}
      <ContentGrid>
        {/* Recent Shipments Table Container */}
        <TableCard>
          <div className="card-header">
            <h2>Recent Shipments</h2>
            <a href="#view-all" className="view-all-link">View All <span>&gt;</span></a>
          </div>
          <TableResponsiveWrapper>
            <ShipmentsTable>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Destination</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>ETA</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td className="font-mono">{shipment.id}</td>
                    <td>{shipment.destination}</td>
                    <td>
                      <DriverCell>
                        <Avatar>{shipment.initials}</Avatar>
                        {shipment.driver}
                      </DriverCell>
                    </td>
                    <td>
                      <StatusBadge type={shipment.statusType}>
                        {shipment.status}
                      </StatusBadge>
                    </td>
                    <td className={shipment.statusType === 'delayed' ? 'text-danger font-bold' : (shipment.statusType === 'delivered' ? 'text-success font-bold' : 'font-bold')}>
                      {shipment.eta}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <IconButton aria-label="View Details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ShipmentsTable>
          </TableResponsiveWrapper>
        </TableCard>

        {/* Live System Logs Panel */}
        <LogsCard>
          <div className="card-header">
            <h2>Live System Logs</h2>
            <LiveIndicator>● Live</LiveIndicator>
          </div>
          <LogsList>
            {logEntries.map((log) => (
              <LogItem key={log.id}>
                <LogDot type={log.type} />
                <LogContent>
                  <p className="log-title">{log.text}</p>
                  <p className="log-subtitle">{log.detail} • {log.time}</p>
                </LogContent>
              </LogItem>
            ))}
          </LogsList>
        </LogsCard>
      </ContentGrid>
    </DashboardWrapper>
  );
}

/* ---------------- Layout & Layout Core Styles ---------------- */

const DashboardWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 4px 0;
  }
  p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;

  button {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }

  .btn-secondary {
    background-color: #ffffff;
    border: 1px solid #cbd5e1;
    color: #475569;
    &:hover { background-color: #f1f5f9; }
  }

  .btn-primary {
    background-color: #2563eb;
    border: 1px solid #2563eb;
    color: #ffffff;
    &:hover { background-color: #1d4ed8; }
  }
`;

/* ---------------- KPI Metric Cards ---------------- */

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const MetricCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;

  .card-label {
    display: block;
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .card-value {
    display: block;
    font-size: 26px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;
    margin-bottom: 8px;
    
    .sub-value {
      font-size: 16px;
      color: #94a3b8;
      font-weight: 500;
    }
  }
  .value-danger { color: #dc2626; }
  
  .card-trend {
    display: block;
    font-size: 12px;
    font-weight: 500;
  }
  .trend-up { color: #16a34a; }
  .trend-down { color: #dc2626; }
  .text-muted { color: #64748b; }
`;

const IconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: ${props => props.color};
  color: ${props => props.stroke};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/* ---------------- Grid Split Layout ---------------- */

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

/* ---------------- Recent Shipment Module ---------------- */

const TableCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    h2 { font-size: 16px; font-weight: 600; color: #1e293b; margin: 0; }
    .view-all-link {
      font-size: 13px;
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
      &:hover { text-decoration: underline; }
    }
  }
`;

const TableResponsiveWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const ShipmentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;

  th {
    color: #64748b;
    font-weight: 600;
    padding: 12px;
    border-bottom: 1px solid #f1f5f9;
  }

  td {
    padding: 14px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #334155;
    vertical-align: middle;
  }

  .font-mono { font-family: monospace; font-size: 13px; color: #1e293b; font-weight: 600; }
  .font-bold { font-weight: 600; }
  .text-danger { color: #dc2626; }
  .text-success { color: #16a34a; }
`;

const DriverCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #64748b;
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  
  background-color: ${props => 
    props.type === 'transit' ? '#ecfdf5' : 
    props.type === 'delayed' ? '#fffbeb' : 
    props.type === 'loading' ? '#e0f2fe' : '#f0fdf4'};
    
  color: ${props => 
    props.type === 'transit' ? '#059669' : 
    props.type === 'delayed' ? '#d97706' : 
    props.type === 'loading' ? '#0284c7' : '#16a34a'};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  &:hover { color: #475569; background-color: #f1f5f9; }
`;

/* ---------------- Logs Module ---------------- */

const LogsCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 { font-size: 16px; font-weight: 600; color: #1e293b; margin: 0; }
  }
`;

const LiveIndicator = styled.span`
  background-color: #f0fdf4;
  color: #16a34a;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LogItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px solid #f8fafc;
  &:last-child { border-bottom: none; padding-bottom: 0; }
`;

const LogDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
  
  background-color: ${props => 
    props.type === 'delivered' ? '#16a34a' : 
    props.type === 'alert' ? '#dc2626' : 
    props.type === 'dispatch' ? '#2563eb' : '#16a34a'};
`;

const LogContent = styled.div`
  .log-title {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 2px 0;
  }
  .log-subtitle {
    font-size: 11px;
    color: #64748b;
    margin: 0;
  }
`;
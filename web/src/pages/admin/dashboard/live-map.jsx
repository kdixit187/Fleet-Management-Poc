import React, { useState } from 'react';
import styled from 'styled-components';

export default function FleetStatusDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState('TRK-4022');
  const [searchQuery, setSearchQuery] = useState('');

  const liveVehicles = [
    { id: 'TRK-4022', driver: 'Rajesh Kumar', route: 'Mumbai → Delhi', status: 'On Time', load: 'Electronic Items (14 Tons)', speed: '68 km/h', eta: '4 hrs' },
    { id: 'TRK-8819', driver: 'Amit Sharma', route: 'Jaipur → Udaipur', status: 'Delayed', load: 'Industrial Gears (22 Tons)', speed: '45 km/h', eta: '1.5 hrs' },
    { id: 'TRK-1092', driver: 'Vikram Singh', route: 'Ahmedabad → Bhilwara', status: 'On Time', load: 'Textile Fabric (8 Tons)', speed: '72 km/h', eta: '35 mins' },
    { id: 'TRK-5541', driver: 'Sanjay Dutt', route: 'Delhi → Chandigarh', status: 'Critical', load: 'Perishable Dairy (6 Tons)', speed: '0 km/h (Stopped)', eta: 'Unknown' },
  ];

  // Filtering logic if needed for extensions
  const filteredVehicles = liveVehicles.filter(truck => 
    truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    truck.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    truck.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageWrapper>
      {/* Title Section */}
      <HeaderSection>
        <h2>Fleet Status Dashboard</h2>
        <p>Real-time asset telemetry configurations, operational health metrics, and breakdown logs.</p>
      </HeaderSection>

      {/* KPI Index Row */}
      <MetricsGrid>
        <KpiCard border="#2563eb">
          <p className="kpi-label">Total Assets Index</p>
          <h3 className="kpi-value text-dark">124 Trucks</h3>
        </KpiCard>

        <KpiCard border="#16a34a">
          <p className="kpi-label">Available (Ready)</p>
          <h3 className="kpi-value text-success">74 Active</h3>
        </KpiCard>

        <KpiCard border="#0ea5e9">
          <p className="kpi-label">In Transit (On Duty)</p>
          <h3 className="kpi-value text-info">35 Fleet</h3>
        </KpiCard>

        <KpiCard border="#eab308">
          <p className="kpi-label">Under Maintenance</p>
          <h3 className="kpi-value text-warning">15 Workshop</h3>
        </KpiCard>
      </MetricsGrid>

      {/* Main Content Split View */}
      <ContentSplitGrid>
        {/* Efficiency Utilization Card */}
        <ContentCard>
          <h4 className="card-title">Fleet Deployment Efficiency</h4>
          <EfficiencyWrapper>
            <CircularProgress>
              <span className="percentage">88%</span>
              <span className="subtext">Utilization</span>
            </CircularProgress>

            <ProgressBarGroup>
              <ProgressItem>
                <div className="progress-label">
                  <span>Available Assets</span>
                  <span>60%</span>
                </div>
                <BarBase>
                  <BarFill color="#16a34a" width="60%" />
                </BarBase>
              </ProgressItem>

              <ProgressItem>
                <div className="progress-label">
                  <span>Active Deployment</span>
                  <span>28%</span>
                </div>
                <BarBase>
                  <BarFill color="#0ea5e9" width="28%" />
                </BarBase>
              </ProgressItem>

              <ProgressItem>
                <div className="progress-label">
                  <span>Workshop Repair</span>
                  <span>12%</span>
                </div>
                <BarBase>
                  <BarFill color="#eab308" width="12%" />
                </BarBase>
              </ProgressItem>
            </ProgressBarGroup>
          </EfficiencyWrapper>
        </ContentCard>

        {/* Critical Alerts Card */}
        <ContentCard>
          <h4 className="card-title">Critical Fleet Alerts</h4>
          <AlertsListGroup>
            {/* Critical Alert Item */}
            <AlertItem bg="rgba(239, 68, 68, 0.08)" border="#f87171">
              <div className="alert-header">
                <span className="truck-tag">TRK-4022</span>
                <span className="alert-id">ALT-9082</span>
              </div>
              <p className="alert-message">Engine Coolant Temperature Exceeded Critical Threshold (115°C)</p>
              <div className="alert-footer">
                <span className="location">📍 NH-48, Near Jaipur Bypass</span>
                <span className="status-pill badge-danger">Critical</span>
              </div>
            </AlertItem>

            {/* Warning Alert Item */}
            <AlertItem bg="rgba(234, 179, 8, 0.08)" border="#facc15">
              <div className="alert-header">
                <span className="truck-tag">TRK-1092</span>
                <span className="alert-id">ALT-1104</span>
              </div>
              <p className="alert-message">Sudden Brake Pad Wear Sensor Telemetry Warning Triggered</p>
              <div className="alert-footer">
                <span className="location">📍 Bhilwara Industrial Area</span>
                <span className="status-pill badge-warning">Warning</span>
              </div>
            </AlertItem>
          </AlertsListGroup>
        </ContentCard>
      </ContentSplitGrid>
    </PageWrapper>
  );
}

/* ---------------- Styled Components Core Layout ---------------- */

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 6px 0;
  }
  p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 576px) { grid-template-columns: 1fr; }
`;

const KpiCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02);
  border-left: 4px solid ${props => props.border};

  .kpi-label {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 6px 0;
  }
  .kpi-value {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
  }
  .text-dark { color: #1e293b; }
  .text-success { color: #16a34a; }
  .text-info { color: #0ea5e9; }
  .text-warning { color: #d97706; }
`;

const ContentSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 24px;

  @media (max-width: 992px) { grid-template-columns: 1fr; }
`;

const ContentCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 20px 0;
  }
`;

/* ---------------- Efficiency Visual Section ---------------- */

const EfficiencyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const CircularProgress = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #f8fafc;
  border: 3px solid #2563eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .percentage {
    font-size: 22px;
    font-weight: 700;
    color: #2563eb;
    line-height: 1;
  }
  .subtext {
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
  }
`;

const ProgressBarGroup = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ProgressItem = styled.div`
  .progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    margin-bottom: 6px;
    span:last-child { color: #1e293b; font-weight: 600; }
  }
`;

const BarBase = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background-color: ${props => props.color};
  width: ${props => props.width};
  border-radius: 9999px;
`;

/* ---------------- Alerts Section ---------------- */

const AlertsListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AlertItem = styled.div`
  border: 1px solid ${props => props.border};
  background-color: ${props => props.bg};
  border-radius: 6px;
  padding: 16px;

  .alert-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .truck-tag {
    background: #1e293b;
    color: #ffffff;
    font-family: monospace;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
  }
  .alert-id {
    font-family: monospace;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }
  .alert-message {
    font-size: 13px;
    font-weight: 500;
    color: #1e293b;
    margin: 0 0 12px 0;
  }
  .alert-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 10px;
  }
  .location {
    font-size: 12px;
    color: #475569;
    font-weight: 500;
  }
  .status-pill {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 9999px;
    text-transform: uppercase;
  }
  .badge-danger { background-color: #dc2626; color: #ffffff; }
  .badge-warning { background-color: #eab308; color: #1e293b; }
`;
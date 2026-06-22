import React from 'react';
import styled from 'styled-components';

export default function FleetStatus() {
  // बेड़े की लाइव स्थिति और वितरण मैट्रिक्स डेटा
  const statusSummary = {
    totalVehicles: 42,
    available: 25,
    inTransit: 12,
    maintenance: 5,
    efficiency: "92.4%",
    activeDrivers: 37
  };

  const criticalAlerts = [
    { id: "ALT-01", truck: "TRK-5541", issue: "Engine Stopped (Overheating)", location: "Delhi Highway", severity: "Critical" },
    { id: "ALT-02", truck: "TRK-8819", issue: "Insurance Expiry Due in 2 Days", location: "Jaipur Hub", severity: "Warning" }
  ];

  return (
    <PageWrapper>
      {/* 1. Header Control System Setup */}
      <HeaderSection>
        <TitleBlock>
          <h2>Fleet Status Dashboard</h2>
          <p>Real-time asset telemetry configurations, operational health metrics, and breakdown logs.</p>
        </TitleBlock>
      </HeaderSection>

      {/* 2. Tactical Metrics Counter Grid */}
      <MetricsGrid>
        <MetricCard borderColor="#2563eb">
          <p className="card-label">Total Assets Index</p>
          <span className="card-value">{statusSummary.totalVehicles} Trucks</span>
        </MetricCard>
        
        <MetricCard borderColor="#10b981">
          <p className="card-label">Available (Ready)</p>
          <span className="card-value text-green">{statusSummary.available} Active</span>
        </MetricCard>

        <MetricCard borderColor="#38bdf8">
          <p className="card-label">In Transit (On Duty)</p>
          <span className="card-value text-blue">{statusSummary.inTransit} Fleet</span>
        </MetricCard>

        <MetricCard borderColor="#f59e0b">
          <p className="card-label">Under Maintenance</p>
          <span className="card-value text-orange">{statusSummary.maintenance} Workshop</span>
        </MetricCard>
      </MetricsGrid>

      {/* 3. Double Column Module Layout */}
      <LayoutColumns>
        {/* Left Column: Visual Status Proportions */}
        <StatusDistributionCard>
          <h3>Fleet Deployment Efficiency</h3>
          <EfficiencyBlock>
            <div className="radial-placeholder">
              <span className="percentage">{statusSummary.efficiency}</span>
              <span className="sub-text">Utilization</span>
            </div>
            <div className="status-bars-wrapper">
              <ProgressBarGroup color="#10b981">
                <div className="bar-label"><span>Available Assets</span><span>60%</span></div>
                <div className="bar-track"><div className="bar-fill" style={{ width: '60%' }}></div></div>
              </ProgressBarGroup>
              <ProgressBarGroup color="#38bdf8">
                <div className="bar-label"><span>Active Deployment</span><span>28%</span></div>
                <div className="bar-track"><div className="bar-fill" style={{ width: '28%' }}></div></div>
              </ProgressBarGroup>
              <ProgressBarGroup color="#f59e0b">
                <div className="bar-label"><span>Workshop Repair</span><span>12%</span></div>
                <div className="bar-track"><div className="bar-fill" style={{ width: '12%' }}></div></div>
              </ProgressBarGroup>
            </div>
          </EfficiencyBlock>
        </StatusDistributionCard>

        {/* Right Column: Fleet Operational Alerts */}
        <AlertsCard>
          <h3>Critical Fleet Alerts</h3>
          <AlertsList>
            {criticalAlerts.map((alert) => (
              <AlertItem key={alert.id} severity={alert.severity}>
                <div className="alert-meta">
                  <span className="truck-tag">{alert.truck}</span>
                  <span className="alert-id">{alert.id}</span>
                </div>
                <p className="alert-issue">{alert.issue}</p>
                <div className="alert-footer">
                  <span>📍 {alert.location}</span>
                  <span className={`severity-badge ${alert.severity.toLowerCase()}`}>{alert.severity}</span>
                </div>
              </AlertItem>
            ))}
          </AlertsList>
        </AlertsCard>
      </LayoutColumns>
    </PageWrapper>
  );
}

/* ---------------- Responsive Styled Components ---------------- */

const PageWrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 94px;
  font-family: sans-serif;

  @media (max-width: 1024px) {
    padding: 16px 12px;
    padding-top: 86px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 28px;
`;

const TitleBlock = styled.div`
  h2 {
    font-size: 26px;
    font-weight: bold;
    color: #f02501;
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background-color: #0b1329;
  padding: 20px;
  border-radius: 12px;
  color: #fff;
  border: 1px solid #1e293b;
  border-left: 4px solid ${props => props.borderColor || '#1e293b'};
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.2);

  .card-label {
    font-size: 11px;
    color: #94a3b8;
    margin: 0 0 8px 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  .card-value {
    font-size: 24px;
    font-weight: bold;
  }
  
  .text-green { color: #10b981; }
  .text-blue { color: #38bdf8; }
  .text-orange { color: #f59e0b; }
`;

const LayoutColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StatusDistributionCard = styled.div`
  background-color: #0b1329;
  border-radius: 16px;
  border: 1px solid #1e293b;
  padding: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    margin: 0 0 24px 0;
  }
`;

const EfficiencyBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  .radial-placeholder {
    min-width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 6px solid #1e293b;
    border-top-color: #2563eb;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0f172a;

    .percentage {
      font-size: 22px;
      font-weight: bold;
      color: #ffffff;
    }
    .sub-text {
      font-size: 10px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 2px;
    }
  }

  .status-bars-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const ProgressBarGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #cbd5e1;
    font-weight: 500;
  }

  .bar-track {
    width: 100%;
    height: 6px;
    background-color: #0f172a;
    border-radius: 9999px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background-color: ${props => props.color || '#3b82f6'};
    border-radius: 9999px;
  }
`;

const AlertsCard = styled.div`
  background-color: #0b1329;
  border-radius: 16px;
  border: 1px solid #1e293b;
  padding: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    margin: 0 0 20px 0;
  }
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* 🟢 FIXED: इस Styled Component की अधूरी स्ट्रिंग्स और सिंटैक्स को सही किया गया है */
const AlertItem = styled.div`
  background-color: #0f172a;
  border: 1px solid #1e293b;
  border-left: 4px solid ${props => props.severity === 'Critical' ? '#ef4444' : '#f59e0b'};
  border-radius: 8px;
  padding: 14px;

  .alert-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    
    .truck-tag {
      font-family: monospace;
      font-weight: bold;
      color: #ffffff;
      font-size: 13px;
    }
    .alert-id {
      font-size: 11px;
      color: #64748b;
      font-family: monospace;
    }
  }

  .alert-issue {
    font-size: 13px;
    color: #cbd5e1;
    margin: 0 0 10px 0;
    font-weight: 500;
  }

  .alert-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #94a3b8;

    .severity-badge {
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 4px;
      
      &.critical { background-color: rgba(239, 68, 68, 0.15); color: #f87171; }
      &.warning { background-color: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    }
  }
`;
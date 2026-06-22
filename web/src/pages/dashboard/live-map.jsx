import React, { useState } from 'react';
import styled from 'styled-components';

export default function LiveMap() {
  const [selectedVehicle, setSelectedVehicle] = useState('TRK-4022');
  const [searchQuery, setSearchQuery] = useState('');

  const liveVehicles = [
    { id: 'TRK-4022', driver: 'Rajesh Kumar', route: 'Mumbai → Delhi', status: 'On Time', load: 'Electronic Items (14 Tons)', speed: '68 km/h', eta: '4 hrs' },
    { id: 'TRK-8819', driver: 'Amit Sharma', route: 'Jaipur → Udaipur', status: 'Delayed', load: 'Industrial Gears (22 Tons)', speed: '45 km/h', eta: '1.5 hrs' },
    { id: 'TRK-1092', driver: 'Vikram Singh', route: 'Ahmedabad → Bhilwara', status: 'On Time', load: 'Textile Fabric (8 Tons)', speed: '72 km/h', eta: '35 mins' },
    { id: 'TRK-5541', driver: 'Sanjay Dutt', route: 'Delhi → Chandigarh', status: 'Critical', load: 'Perishable Dairy (6 Tons)', speed: '0 km/h (Stopped)', eta: 'Unknown' },
  ];

  // सर्च इनपुट के आधार पर ट्रक्स को फ़िल्टर करना
  const filteredVehicles = liveVehicles.filter(truck => 
    truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    truck.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    truck.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentVehicleData = liveVehicles.find(v => v.id === selectedVehicle) || liveVehicles[0];

  return (
    <PageWrapper>
      {/* Title Section */}
      <HeaderSection>
        <h1>Live Shipment Fleet Map</h1>
        <p>Real-time GPS telemetry tracks and route tracking management.</p>
      </HeaderSection>

      <ContentGrid>
        {/* Left Sidebar: Truck List */}
        <SidebarCard>
          <SearchBoxWrapper>
            <input 
              type="text" 
              placeholder="Search active trucks, routes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBoxWrapper>
          
          <TruckListContainer>
            {filteredVehicles.map((truck) => (
              <TruckButton
                key={truck.id}
                type="button"
                isActive={selectedVehicle === truck.id}
                onClick={() => setSelectedVehicle(truck.id)}
              >
                <div>
                  <div className="truck-id">{truck.id}</div>
                  <div className="truck-route">{truck.route}</div>
                  <div className="truck-driver">Driver: {truck.driver}</div>
                </div>
                <StatusLabel status={truck.status}>
                  {truck.status}
                </StatusLabel>
              </TruckButton>
            ))}
            {filteredVehicles.length === 0 && (
              <p style={{ padding: '20px', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>No active trucks found</p>
            )}
          </TruckListContainer>
        </SidebarCard>

        {/* Right Section: Visual Map Engine Simulator */}
        <MapAndHUDWrapper>
          <MapCanvasEngine>
            <div className="grid-overlay"></div>
            <div className="route-dashed-line"></div>
            <div className="ping-effect"></div>
            <div className="live-pointer"></div>

            <p className="engine-status-tag">
              📍 [MAP RENDERING CANVAS ENGINE Active for {currentVehicleData.id}]
            </p>
          </MapCanvasEngine>

          {/* Telemetry Status HUD */}
          <TelemetryHUD>
            <HUDGroup>
              <p className="hud-label">Active Speed</p>
              <p className="hud-value">{currentVehicleData.speed}</p>
            </HUDGroup>
            <HUDGroup>
              <p className="hud-label">Est. Arrival Time</p>
              <p className="hud-value">{currentVehicleData.eta}</p>
            </HUDGroup>
            <HUDGroup className="col-span-2">
              <p className="hud-label">Manifest Load</p>
              <p className="hud-load-value">{currentVehicleData.load}</p>
            </HUDGroup>
          </TelemetryHUD>
        </MapAndHUDWrapper>
      </ContentGrid>
    </PageWrapper>
  );
}

/* ---------------- Responsive Styled Components ---------------- */

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 94px; /* नेवबार के ओवरलैप को रोकने के लिए फिक्स पैडिंग */
  font-family: sans-serif;

  @media (max-width: 1024px) {
    padding: 16px 12px;
    padding-top: 86px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;
  h1 {
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const SidebarCard = styled.div`
  background-color: #0b1329;
  border-radius: 16px;
  border: 1px solid #1e293b;
  overflow: hidden;
  height: 520px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
`;

const SearchBoxWrapper = styled.div`
  padding: 16px;
  background-color: #0f172a;
  border-bottom: 1px solid #1e293b;

  input {
    width: 100%;
    padding: 10px 14px;
    font-size: 13px;
    background-color: #0b1329;
    border: 1px solid #334155;
    border-radius: 8px;
    color: #ffffff;
    outline: none;
    box-sizing: border-box;
    
    &:focus {
      border-color: #2563eb;
    }
  }
`;

const TruckListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
`;

const TruckButton = styled.button`
  width: 100%;
  padding: 16px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: start;
  background-color: ${props => props.isActive ? 'rgba(37, 99, 235, 0.12)' : 'transparent'};
  border: none;
  border-left: 4px solid ${props => props.isActive ? '#2563eb' : 'transparent'};
  border-bottom: 1px solid #1e293b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isActive ? 'rgba(37, 99, 235, 0.12)' : '#111c3a'};
  }

  .truck-id { font-family: monospace; font-weight: bold; color: #ffffff; font-size: 14px; }
  .truck-route { font-size: 12px; color: #38bdf8; margin-top: 4px; font-weight: 500; }
  .truck-driver { font-size: 11px; color: #94a3b8; margin-top: 4px; }
`;

const StatusLabel = styled.span`
  font-size: 11px;
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 9999px;
  background-color: ${props => 
    props.status === 'On Time' ? 'rgba(16, 185, 129, 0.15)' : 
    props.status === 'Delayed' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  color: ${props => 
    props.status === 'On Time' ? '#34d399' : 
    props.status === 'Delayed' ? '#fbbf24' : '#f87171'};
`;

const MapAndHUDWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MapCanvasEngine = styled.div`
  background-color: #0f172a;
  border-radius: 16px;
  border: 1px solid #1e293b;
  height: 340px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

  .grid-overlay {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px);
    background-size: 24px_24px;
  }

  .route-dashed-line {
    position: absolute;
    top: 50%;
    left: 25%;
    width: 40%;
    height: 2px;
    border-top: 2px dashed rgba(56, 189, 248, 0.4);
  }

  .ping-effect {
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #38bdf8;
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;

    @keyframes ping {
      75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
  }

  .live-pointer {
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #38bdf8;
    border: 2px solid #ffffff;
    box-shadow: 0 0 10px #38bdf8;
  }

  .engine-status-tag {
    z-index: 10;
    font-size: 12px;
    font-family: monospace;
    tracking-width: 0.05em;
    color: #cbd5e1;
    background-color: rgba(11, 19, 41, 0.9);
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #334155;
  }
`;

const TelemetryHUD = styled.div`
  background-color: #0b1329;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #1e293b;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

  .col-span-2 { grid-column: span 2; }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .col-span-2 { grid-column: span 1; }
  }
`;

const HUDGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .hud-label {
    font-size: 11px;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .hud-value {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
  }

  .hud-load-value {
    font-size: 14px;
    font-weight: 600;
    color: #38bdf8;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
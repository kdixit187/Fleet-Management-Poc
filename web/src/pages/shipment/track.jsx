import React, { useState } from 'react';

export default function TrackShipment() {
  const [trackId, setTrackId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Mock search query function matrix
  const handleTrackSearch = (e) => {
    e.preventDefault();
    if (!trackId.trim()) return;

    // Simulated cargo manifest fetch tracking record
    setSearchResult({
      id: trackId.toUpperCase(),
      client: "Nike Clone Depot",
      origin: "Jaipur Hub",
      destination: "Bhilwara Terminal",
      status: "In Transit",
      eta: "June 21, 2026 - 04:30 PM",
      currentLocation: "Ajmer Toll Plaza",
      steps: [
        { title: "Manifest Created", date: "June 19, 09:00 AM", done: true },
        { title: "Dispatched From Origin", date: "June 19, 02:30 PM", done: true },
        { title: "In Transit (Ajmer)", date: "June 20, 11:15 AM", done: true },
        { title: "Out for Delivery", date: "Pending", done: false },
      ]
    });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* 1. Header Viewport */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>
          Real-Time Cargo Tracking
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
          Enter transport manifest or assignment credentials to scan active fleet coordinates.
        </p>
      </div>

      {/* 2. Search Controls Console Box */}
      <div style={{ backgroundColor: '#0b1329', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', marginBottom: '32px' }}>
        <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Shipment / Assignment ID
            </label>
            <input 
              type="text" 
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              placeholder="e.g. SHP-1001 or ASN-9901" 
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none' }}
              required
            />
          </div>
          <button 
            type="submit"
            style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '14px 28px', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '23px', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            🔍 Locate Freight
          </button>
        </form>
      </div>

      {/* 3. Real-Time Tracking Status Output */}
      {searchResult && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          
          {/* Left Block: Milestones Flow Indicator */}
          <div style={{ flex: '2 1 500px', backgroundColor: '#0b1329', padding: '32px', borderRadius: '16px', border: '1px solid #1e293b', color: '#fff' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 24px 0', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
              Transit Progress Pipeline
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
              {searchResult.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {/* Visual Timeline Nodes */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step.done ? '#34d399' : '#1e293b', border: step.done ? '4px solid #0f172a' : '4px solid #334155' }} />
                    {idx !== searchResult.steps.length - 1 && (
                      <div style={{ width: '2px', height: '40px', backgroundColor: step.done ? '#34d399' : '#1e293b', marginTop: '4px' }} />
                    )}
                  </div>
                  {/* Step Metadata text */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0', color: step.done ? '#ffffff' : '#64748b' }}>{step.title}</h4>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Telemetry Core Info Metadata */}
          <div style={{ flex: '1 1 300px', backgroundColor: '#0f172a', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', color: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8', margin: '0', textTransform: 'uppercase' }}>
              Tracking: {searchResult.id}
            </h3>
            
            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Client Operator</span>
                <strong style={{ color: '#fff' }}>{searchResult.client}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Current Position</span>
                <strong style={{ color: '#f59e0b' }}>📍 {searchResult.currentLocation}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Route Matrix</span>
                <span style={{ color: '#cbd5e1' }}>{searchResult.origin} → {searchResult.destination}</span>
              </div>
              <div>
                <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Estimated ETA</span>
                <strong style={{ color: '#34d399' }}>{searchResult.eta}</strong>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';

export default function DelayedShipments() {
  const [delayedShipments] = useState([
    { id: 'TRK-9842', driver: 'Amit Singh', vehicle: 'Mahindra Blazo', route: 'Jaipur → Ahmedabad', reason: 'Traffic Congestion', severity: 'Low' },
    { id: 'TRK-9512', driver: 'Gopal Sharma', vehicle: 'Tata Signa 4825', route: 'Mumbai Hub → Udaipur', reason: 'Heavy Rainfall', severity: 'Critical' }
  ]);

  return (
    // Pure concrete colors using hard-coded style attributes to bypass global white-out classes
    <div style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '30px', minHeight: '100vh', display: 'block', width: '100%' }}>
      
      {/* HEADER ROW */}
      <header style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>⚠️</span> Exception & Delayed Shipments
        </h1>
        <p style={{ color: '#475569', fontSize: '15px', fontWeight: '600', margin: 0 }}>
          Live tracking exception matrix
        </p>
      </header>

      {/* HARDENED DATA GRID CONTAINER */}
      <div style={{ backgroundColor: '#ffffff', border: '2px solid #94a3b8', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflowX: 'auto' }}>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#e2e8f0', borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '14px', color: '#1e293b', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>Trip ID</th>
              <th style={{ padding: '14px', color: '#1e293b', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>Driver</th>
              <th style={{ padding: '14px', color: '#1e293b', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>Route Leg</th>
              <th style={{ padding: '14px', color: '#1e293b', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>Disruption Reason</th>
            </tr>
          </thead>
          
          <tbody>
            {delayedShipments.map((shipment, index) => (
              <tr key={shipment.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                {/* Trip ID */}
                <td style={{ padding: '16px', color: '#0f172a', fontWeight: '900', fontSize: '15px' }}>
                  {shipment.id}
                </td>
                
                {/* Driver */}
                <td style={{ padding: '16px', color: '#0f172a', fontWeight: '700', fontSize: '14px' }}>
                  {shipment.driver}
                </td>
                
                {/* Route */}
                <td style={{ padding: '16px', color: '#334155', fontWeight: '700', fontSize: '14px' }}>
                  {shipment.route}
                </td>
                
                {/* Reason */}
                <td style={{ padding: '16px', color: '#dc2626', fontWeight: '800', fontSize: '14px' }}>
                  ❌ {shipment.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
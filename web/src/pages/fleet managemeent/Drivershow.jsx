import React from "react";

// Full data mapping matrix
const driversData = [
  { id: 1, name: "Rajesh Kumar", license: "RJ14-2015-0001234", vehicle: "Toyota Innova", status: "Active", rating: 4.8 },
  { id: 2, name: "Amit Sharma", license: "RJ14-2018-0005678", vehicle: "Maruti Suzuki Dzire", status: "Active", rating: 4.5 },
];

export default function DriverTable() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Title Header Workspace */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 6px 0' }}>
          Driver Registry Directory
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
          Manage certified operators, operational vehicle configurations, and live ratings.
        </p>
      </div>

      {/* Main Table Structure Card Frame */}
      <div style={{ backgroundColor: '#0b1329', borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ wFull: '100%', width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#cbd5e1' }}>
            
            {/* Table Header Row System */}
            <thead>
              <tr style={{ backgroundColor: '#0f172a', borderBottom: '2px solid #1e293b', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px' }}>Driver Name</th>
                <th style={{ padding: '16px 24px' }}>Commercial License</th>
                <th style={{ padding: '16px 24px' }}>Assigned Fleet Vehicle</th>
                <th style={{ padding: '16px 24px' }}>Operator Rating</th>
                <th style={{ padding: '16px 24px' }}>Status State</th>
              </tr>
            </thead>
            
            {/* Table Body Iteration Stack */}
            <tbody style={{ backgroundColor: '#0b1329' }}>
              {driversData.map((d, index) => (
                <tr 
                  key={d.id} 
                  style={{ 
                    borderBottom: '1px solid #1e293b',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#111c3a'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0b1329'}
                >
                  {/* Name column */}
                  <td style={{ padding: '16px 24px', fontWeight: '600', color: '#ffffff' }}>
                    {d.name}
                  </td>
                  
                  {/* License column */}
                  <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: '#38bdf8', fontSize: '13px' }}>
                    {d.license}
                  </td>
                  
                  {/* Vehicle column */}
                  <td style={{ padding: '16px 24px', color: '#94a3b8' }}>
                    {d.vehicle}
                  </td>
                  
                  {/* Rating column */}
                  <td style={{ padding: '16px 24px', fontWeight: 'bold', color: '#f59e0b' }}>
                    ⭐ {d.rating}
                  </td>
                  
                  {/* Status Badges column */}
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      backgroundColor: d.status === "Active" ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                      color: d.status === "Active" ? '#34d399' : '#f87171', 
                      padding: '4px 12px', 
                      borderRadius: '9999px', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      ● {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
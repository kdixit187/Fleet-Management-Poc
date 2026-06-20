import React from 'react';

export default function AllShipments() {
    // Sample manifest shipments data matrix
    const shipmentsData = [
        { id: "SHP-1001", client: "Nike Clone Depot", destination: "Jaipur", status: "Delivered", weight: "12 Tons" },
        { id: "SHP-1002", client: "AU Bank Logistics", destination: "Udaipur", status: "In Transit", weight: "8 Tons" },
        { id: "SHP-1003", client: "Sangam Textile Corp", destination: "Bhilwara", status: "Pending", weight: "15 Tons" }
    ];

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>

            {/* Page Title Wrapper with horizontal alignment layout flex */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', wrap: 'nowrap' }}>

                {/* Left Section: Context Labels */}
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>
                        All Cargo Shipments
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                        Track, audit, and dispatch system-wide freight transactions.
                    </p>
                </div>

                {/* Right Section: Action Interface Controllers */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        type="button"
                        style={{
                            backgroundColor: '#1e293b',
                            color: '#ffffff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8baadd'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                    >
                        ➕ Add Shipment
                    </button>
                </div>

            </div>

            {/* Modern High-Fidelity Table Frame */}
            <div style={{ backgroundColor: '#0b1329', borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#cbd5e1' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#0f172a', borderBottom: '2px solid #1e293b', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <th style={{ padding: '16px 24px' }}>Shipment ID</th>
                            <th style={{ padding: '16px 24px' }}>Client Entity</th>
                            <th style={{ padding: '16px 24px' }}>Destination Hub</th>
                            <th style={{ padding: '16px 24px' }}>Net Weight</th>
                            <th style={{ padding: '16px 24px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentsData.map((s) => (
                            <tr
                                key={s.id}
                                style={{ borderBottom: '1px solid #1e293b', transition: 'background 0.2s' }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#111c3a'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0b1329'}
                            >
                                <td style={{ padding: '16px 24px', fontFamily: 'monospace', fontWeight: 'bold', color: '#38bdf8' }}>{s.id}</td>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#fff' }}>{s.client}</td>
                                <td style={{ padding: '16px 24px' }}>📍 {s.destination}</td>
                                <td style={{ padding: '16px 24px', color: '#94a3b8' }}>{s.weight}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{
                                        backgroundColor: s.status === 'Delivered' ? 'rgba(16, 185, 129, 0.15)' : s.status === 'In Transit' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                        color: s.status === 'Delivered' ? '#34d399' : s.status === 'In Transit' ? '#38bdf8' : '#fbbf24',
                                        padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600', display: 'inline-block'
                                    }}>
                                        ● {s.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
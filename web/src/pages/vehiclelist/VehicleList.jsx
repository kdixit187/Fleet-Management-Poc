import React from 'react';
import { Link } from 'react-router-dom'; // Added: React router connection link module

export default function DriverShipment() {
    // Clean data configuration mapping schema
    const activeAssignments = [
        { SRno: "1", Comapnyname: "Kartikey Lodha", truckmodelname: "TRK-4022", truckmodelyear: "2002", numberplate: "rj06pa6666", status: "In Transit" }
    ];

    return (
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>

            {/* 1. Header Control System Grid Setup */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#f02501', margin: '0 0 6px 0' }}>
                        Vehicle Fleet Directory
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                        Monitor tactical fleet asset distributions and status configurations.
                    </p>
                </div>
                
                {/* 🚀 FIXED: Wrapped with Router Link for clean interactive screen navigation */}
                <Link to="/app.jsx" style={{ textDecoration: 'none' }}>
                    <button 
                        type="button" 
                        style={{ 
                            backgroundColor: '#2563eb', 
                            color: '#ffffff', 
                            padding: '10px 20px', 
                            border: 'none', 
                            borderRadius: '10px', 
                            fontSize: '14px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                            transition: 'background-color 0.15s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    >
                        ➕ Add Vehicle
                    </button>
                </Link>
            </div>

            {/* 2. Stats Summary Ribbon (Mini Matrix Display Module) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                <div style={{ flex: '1 1 200px', backgroundColor: '#0b1329', padding: '20px', borderRadius: '12px', color: '#fff', border: '1px solid #1e293b' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total Vehicles</p>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeAssignments.length} Trucks</span>
                </div>
                <div style={{ flex: '1 1 200px', backgroundColor: '#0b1329', padding: '20px', borderRadius: '12px', color: '#fff', border: '1px solid #1e293b' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Fleet Efficiency</p>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399' }}>100% Utility</span>
                </div>
            </div>

            {/* 3. Live Assignments Active Ledger Data Table */}
            <div style={{ backgroundColor: '#0b1329', borderRadius: '16px', border: '1px solid #1e293b', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', backgroundColor: '#0f172a' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: '0' }}>Active Registry Ledger</h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#cbd5e1' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#0f172a', borderBottom: '2px solid #1e293b', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th style={{ padding: '16px 24px' }}>Sr.no</th>
                                <th style={{ padding: '16px 24px' }}>Company Owner</th>
                                <th style={{ padding: '16px 24px' }}>Truck Model Name</th>
                                <th style={{ padding: '16px 24px' }}>Model Year</th>
                                <th style={{ padding: '16px 24px' }}>Number Plate</th>
                                <th style={{ padding: '16px 24px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeAssignments.map((row) => (
                                <tr
                                    key={row.SRno}
                                    style={{ borderBottom: '1px solid #1e293b', transition: 'background-color 0.15s' }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#111c3a'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0b1329'}
                                >
                                    <td style={{ padding: '16px 24px', color: '#94a3b8', fontFamily: 'monospace' }}>{row.SRno}</td>
                                    <td style={{ padding: '16px 24px', fontWeight: '600', color: '#fff' }}>{row.Comapnyname}</td>
                                    <td style={{ padding: '16px 24px' }}>{row.truckmodelname}</td>
                                    <td style={{ padding: '16px 24px', color: '#94a3b8' }}>{row.truckmodelyear}</td>
                                    <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: '#38bdf8', textTransform: 'uppercase' }}>{row.numberplate}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span
                                            style={{
                                                backgroundColor: 'rgba(56,189,248,0.15)',
                                                color: '#38bdf8',
                                                padding: '4px 12px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block'
                                            }}
                                        >
                                            ● {row.status}
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
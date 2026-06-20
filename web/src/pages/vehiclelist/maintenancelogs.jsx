import React from 'react';

export default function DriverShipment() {
    // Main structural data for vehicle assignments matrix
    const activeAssignments = [
        { SRno: "1", Comapnyname: "Kartikey Lodha", truckmodelname: "TRK-4022",  numberplate: "rj06pa6666", status: "Ongoing" },
        // { id: "ASN-9901", driver: "Rajesh Kumar", truck: "TRK-4022", cargo: "Electronics", destination: "Delhi", status: "In Transit" },
        // { id: "ASN-9902", driver: "Amit Sharma", truck: "TRK-8819", cargo: "Industrial Gears", destination: "Udaipur", status: "Loading" },
        // { id: "ASN-9903", driver: "Vikram Singh", truck: "TRK-1092", cargo: "Textile Fabric", destination: "Bhilwara", status: "Dispatched" }
    ];

    return (
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>

            {/* 1. Header Control System */}
            <div style={{ display: 'flex', justifyContent: 'between', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#f02501', margin: '0 0 6px 0' }}>
                        Maintenance Logs
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                        Monitor tactical driver allocations and manifest progress metrics.
                    </p>
                </div>
                {/* <div className="header-buttons">
                    <button type="button" className="btn btn-primary">
                        Add Vehicle
                    </button>

                    <button type="button" className="btn btn-success">
                        New Shipment
                    </button>
                </div> */}
            </div>

            {/* 2. Stats Summary Ribbon (Mini Matrix Display) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                <div style={{ flex: '1 1 200px', backgroundColor: '#0b1329', padding: '20px', borderRadius: '12px', color: '#fff', border: '1px solid #1e293b' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Maintenance total Vechile</p>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeAssignments.length} Trucks</span>
                </div>
                {/* <div style={{ flex: '1 1 200px', backgroundColor: '#0b1329', padding: '20px', borderRadius: '12px', color: '#fff', border: '1px solid #1e293b' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Vechile perfromance</p>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399' }}>100% Utility</span>
                </div> */}
            </div>

            {/* 3. Live Assignments Active Ledger Data Table */}
            <div style={{ backgroundColor: '#0b1329', borderRadius: '16px', border: '1px solid #1e293b', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', backgroundColor: '#0f172a' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: '0' }}>List of Vechile</h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#cbd5e1' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#0f172a', borderBottom: '2px solid #1e293b', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th style={{ padding: '16px 24px' }}>Sr.no</th>
                                <th style={{ padding: '16px 24px' }}>Company name</th>
                                <th style={{ padding: '16px 24px' }}>Truck Model Name</th>
                                {/* <th style={{ padding: '16px 24px' }}>Truck MOdel Year</th> */}
                                <th style={{ padding: '16px 24px' }}>Number palte</th>
                                <th style={{ padding: '16px 24px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeAssignments.map((row) => (
                                <tr
                                    key={row.SRno}
                                    style={{ borderBottom: '1px solid #1e293b' }}
                                >
                                    <td style={{ padding: '16px 24px' }}>{row.SRno}</td>

                                    <td style={{ padding: '16px 24px', color: '#fff' }}>
                                        {row.Comapnyname}
                                    </td>

                                    <td style={{ padding: '16px 24px' }}>
                                        {row.truckmodelname}
                                    </td>

                                    {/* <td style={{ padding: '16px 24px' }}>
                                        {row.truckmodelyear}
                                    </td> */}

                                    <td style={{ padding: '16px 24px' }}>
                                        {row.numberplate}
                                    </td>

                                    <td style={{ padding: '16px 24px' }}>
                                        <span
                                            style={{
                                                backgroundColor: 'rgba(56,189,248,0.15)',
                                                color: '#38bdf8',
                                                padding: '4px 12px',
                                                borderRadius: '9999px'
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
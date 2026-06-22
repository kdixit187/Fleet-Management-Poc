import React from 'react';
import { Link } from 'react-router-dom'; // 🟢 FIXED: Link का इंपोर्ट जोड़ा गया
import styled from 'styled-components';

export default function DriverShipment() {
    // बेड़े के वाहनों की मुख्य डेटा संरचना
    const activeAssignments = [
        { SRno: "1", Comapnyname: "Kartikey Lodha", truckmodelname: "TRK-4022", numberplate: "rj06pa6666", status: "Ongoing" }
    ];

    return (
        <PageWrapper>

            {/* 1. Header Control System Setup */}
            <HeaderControl>
                <TitleBlock>
                    <h2>Maintenance Logs</h2>
                    <p>Monitor tactical driver allocations and manifest progress metrics.</p>
                </TitleBlock>
                
                {/* 🟢 FIXED: नीचे छूटे हुए Link बटन को यहाँ सही जगह पर सिंक किया गया है */}
                <Link to="/vehicle-service  " style={{ textDecoration: 'none' }}>
                    <AddButton type="button">
                        ➕ Vehicle service
                    </AddButton>
                </Link>
            </HeaderControl>

            {/* 2. Stats Summary Ribbon (Mini Matrix Display) */}
            <StatsRibbon>
                <StatCard>
                    <p>Maintenance total Vehicle</p>
                    <span>{activeAssignments.length} Trucks</span>
                </StatCard>
            </StatsRibbon>

            {/* 3. Live Assignments Active Ledger Data Table */}
            <LedgerCard>
                <LedgerHeader>
                    <h3>List of Vehicle</h3>
                </LedgerHeader>

                <TableResponsiveWrapper>
                    <LedgerTable>
                        <thead>
                            <tr>
                                <th>Ir.no</th>
                                <th>Company name</th>
                                <th>Truck Model Name</th>
                                <th>Number plate</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeAssignments.map((row) => (
                                <tr key={row.SRno}>
                                    <td className="monospace color-slate">{row.SRno}</td>
                                    <td className="font-semibold text-white">{row.Comapnyname}</td>
                                    <td>{row.truckmodelname}</td>
                                    <td className="monospace text-blue text-uppercase">{row.numberplate}</td>
                                    <td>
                                        <StatusBadge>{row.status}</StatusBadge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </LedgerTable>
                </TableResponsiveWrapper>
            </LedgerCard>

        </PageWrapper>
    );
}

/* ---------------- Responsive Styled Components ---------------- */

const PageWrapper = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding: 20px;
    padding-top: 94px; /* 🟢 FIXED: नेवबार के नीचे रखने के लिए डेस्कटॉप स्पेस */
    font-family: sans-serif;

    @media (max-width: 1024px) {
        padding: 16px 12px;
        padding-top: 86px; /* 🟢 FIXED: मोबाइल व्यू पर नेवबार क्लिपिंग रोकने के लिए स्पेस */
    }
`;

const HeaderControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    gap: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        
        a {
            width: 100%;
        }
    }
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

    @media (max-width: 768px) {
        h2 { font-size: 22px; }
        p { font-size: 13px; }
    }
`;

const AddButton = styled.button`
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    background-color: #2563eb;
    transition: background-color 0.15s;
    white-space: nowrap;

    &:hover {
        background-color: #1d4ed8;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 14px;
    }
`;

const StatsRibbon = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;
`;

const StatCard = styled.div`
    flex: 1 1 200px;
    background-color: #0b1329;
    padding: 20px;
    border-radius: 12px;
    color: #fff;
    border: 1px solid #1e293b;

    p {
        font-size: 12px;
        color: #94a3b8;
        margin: 0 0 8px 0;
        text-transform: uppercase;
    }

    span {
        font-size: 24px;
        font-weight: bold;
    }
`;

const LedgerCard = styled.div`
    background-color: #0b1329;
    border-radius: 16px;
    border: 1px solid #1e293b;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
`;

const LedgerHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid #1e293b;
    background-color: #0f172a;

    h3 {
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        margin: 0;
    }
`;

const TableResponsiveWrapper = styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`;

const LedgerTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 14px;
    color: #cbd5e1;

    thead tr {
        background-color: #0f172a;
        border-bottom: 2px solid #1e293b;
        color: #94a3b8;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    th, td {
        padding: 16px 24px;
        white-space: nowrap;
    }

    tbody tr {
        border-bottom: 1px solid #1e293b;
    }

    .monospace { font-family: monospace; }
    .color-slate { color: #94a3b8; }
    .font-semibold { font-weight: 600; }
    .text-white { color: #fff; }
    .text-blue { color: #38bdf8; }
    .text-uppercase { text-transform: uppercase; }

    @media (max-width: 768px) {
        th, td {
            padding: 12px 16px;
        }
    }
`;

const StatusBadge = styled.span`
    background-color: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    
    &::before {
        content: "●";
        margin-right: 6px;
        font-size: 10px;
    }
`;
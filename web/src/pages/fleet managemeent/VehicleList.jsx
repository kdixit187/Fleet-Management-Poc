import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function DriverShipment() {
    const activeAssignments = [
        { SRno: "1", Comapnyname: "Kartikey Lodha", truckmodelname: "TRK-4022", truckmodelyear: "2002", numberplate: "rj06pa6666", status: "In Transit" }
    ];

    // 🛠️ एक्शन्स को हैंडल करने के लिए फ़ंक्शंस
    const handleEdit = (id, owner) => {
        console.log(`Editing asset SRno: ${id} owned by ${owner}`);
        // यहाँ आप एडिट मॉडेल खोल सकते हैं या एडिट पेज पर नेविगेट कर सकते हैं
        // e.g., navigate(`/edit-vehicle/${id}`);
    };

    const handleDelete = (id, owner) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${owner}'s vehicle entry?`);
        if (confirmDelete) {
            console.log(`Deleting asset SRno: ${id}`);
            // यहाँ आप अपनी डिलीट API कॉल ट्रिगर कर सकते हैं
        }
    };

    return (
        <PageWrapper>

            {/* 1. Header Control System Setup */}
            <HeaderControl>
                <TitleBlock>
                    <h2>Vehicle Fleet Directory</h2>
                    <p>Monitor tactical fleet asset distributions and status configurations.</p>
                </TitleBlock>
                
                <Link to="/add-vehicle" style={{ textDecoration: 'none' }}>
                    <AddButton type="button">
                        ➕ Add Vehicle
                    </AddButton>
                </Link>
            </HeaderControl>

            {/* 2. Stats Summary Ribbon */}
            <StatsRibbon>
                <StatCard>
                    <p>Total Vehicles</p>
                    <span>{activeAssignments.length} Trucks</span>
                </StatCard>
                <StatCard variant="success">
                    <p>Fleet Efficiency</p>
                    <span>100% Utility</span>
                </StatCard>
            </StatsRibbon>

            {/* 3. Live Assignments Active Ledger Data Table */}
            <LedgerCard>
                <LedgerHeader>
                    <h3>Active Registry Ledger</h3>
                </LedgerHeader>

                <TableResponsiveWrapper>
                    <LedgerTable>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Company Owner</th>
                                <th>Truck Model Name</th>
                                <th>Model Year</th>
                                <th>Number Plate</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Actions</th> {/* 🟢 Actions Column Header */}
                            </tr>
                        </thead>
                        <tbody>
                            {activeAssignments.map((row) => (
                                <tr key={row.SRno}>
                                    <td className="monospace color-slate">{row.SRno}</td>
                                    <td className="font-semibold text-white">{row.Comapnyname}</td>
                                    <td>{row.truckmodelname}</td>
                                    <td className="color-slate">{row.truckmodelyear}</td>
                                    <td className="monospace text-blue text-uppercase">{row.numberplate}</td>
                                    <td>
                                        <StatusBadge>{row.status}</StatusBadge>
                                    </td>
                                    {/* 🟢 Action Buttons Container */}
                                    <td>
                                        <ActionContainer>
                                            <ActionButton 
                                                variant="edit" 
                                                onClick={() => handleEdit(row.SRno, row.Comapnyname)}
                                                title="Edit Entry"
                                            >
                                                ✏️ Edit
                                            </ActionButton>
                                            <ActionButton 
                                                variant="delete" 
                                                onClick={() => handleDelete(row.SRno, row.Comapnyname)}
                                                title="Delete Entry"
                                            >
                                                🗑️ Delete
                                            </ActionButton>
                                        </ActionContainer>
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
    padding-top: 94px;
    font-family: sans-serif;

    @media (max-width: 1024px) {
        padding: 16px 12px;
        padding-top: 86px;
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
        a { width: 100%; }
    }
`;

const TitleBlock = styled.div`
    h2 { font-size: 26px; font-weight: bold; color: #f02501; margin: 0 0 6px 0; }
    p { font-size: 14px; color: #64748b; margin: 0; }
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
    &:hover { background-color: #1d4ed8; }
    @media (max-width: 768px) { width: 100%; padding: 14px; }
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
    p { font-size: 12px; color: #94a3b8; margin: 0 0 8px 0; text-transform: uppercase; }
    span { font-size: 24px; font-weight: bold; color: ${props => props.variant === 'success' ? '#34d399' : '#ffffff'}; }
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
    h3 { font-size: 16px; font-weight: bold; color: #ffffff; margin: 0; }
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

    th, td { padding: 16px 24px; white-space: nowrap; }
    tbody tr {
        border-bottom: 1px solid #1e293b;
        transition: background-color 0.15s;
        &:hover { background-color: #111c3a; }
    }

    .monospace { font-family: monospace; }
    .color-slate { color: #94a3b8; }
    .font-semibold { font-weight: 600; }
    .text-white { color: #fff; }
    .text-blue { color: #38bdf8; }
    .text-uppercase { text-transform: uppercase; }

    @media (max-width: 768px) {
        th, td { padding: 12px 16px; }
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
    &::before { content: "●"; margin-right: 6px; font-size: 10px; }
`;

/* 🟢 ACTIONS CONTAINER STYLES */
const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const ActionButton = styled.button`
    background: transparent;
    border: 1px solid ${props => props.variant === 'edit' ? '#3b82f6' : '#ef4444'};
    color: ${props => props.variant === 'edit' ? '#60a5fa' : '#f87171'};
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${props => props.variant === 'edit' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
        color: ${props => props.variant === 'edit' ? '#3b82f6' : '#ef4444'};
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;
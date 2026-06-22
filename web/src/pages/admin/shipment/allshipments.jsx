import React from 'react';
import { Link } from 'react-router-dom'; // 🟢 FIXED: Link का इंपोर्ट जोड़ा गया
import styled from 'styled-components';

export default function AllShipments() {
    // शिपमेंट डेटा मैट्रिक्स
    const shipmentsData = [
        { id: "SHP-1001", client: "Nike Clone Depot", destination: "Jaipur", status: "Delivered", weight: "12 Tons" },
        { id: "SHP-1002", client: "AU Bank Logistics", destination: "Udaipur", status: "In Transit", weight: "8 Tons" },
        { id: "SHP-1003", client: "Sangam Textile Corp", destination: "Bhilwara", status: "Pending", weight: "15 Tons" }
    ];

    return (
        <PageWrapper>

            {/* 1. Page Title & Action Controller Wrapper */}
            <HeaderControl>
                <TitleBlock>
                    <h1>All Cargo Shipments</h1>
                    <p>Track, audit, and dispatch system-wide freight transactions.</p>
                </TitleBlock>

                {/* 🟢 FIXED: टूटे हुए <button> टैग को ठीक करके सही रूट से लिंक किया */}
                <Link to="/create-shipment" style={{ textDecoration: 'none' }}>
                    <AddButton type="button">
                        ➕ Add Shipment
                    </AddButton>
                </Link>
            </HeaderControl>

            {/* 2. Modern High-Fidelity Table Frame */}
            <LedgerCard>
                <TableResponsiveWrapper>
                    <LedgerTable>
                        <thead>
                            <tr>
                                <th>Shipment ID</th>
                                <th>Client Entity</th>
                                <th>Destination Hub</th>
                                <th>Net Weight</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipmentsData.map((s) => (
                                <tr key={s.id}>
                                    <td className="monospace text-blue">{s.id}</td>
                                    <td className="font-semibold text-white">{s.client}</td>
                                    <td>📍 {s.destination}</td>
                                    <td className="color-slate">{s.weight}</td>
                                    <td>
                                        <StatusBadge status={s.status}>{s.status}</StatusBadge>
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
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
    padding-top: 94px; /* 🟢 FIXED: नेवबार के पीछे कंटेंट छिपने से रोकने के लिए डेस्कटॉप स्पेस */
    font-family: sans-serif;

    @media (max-width: 1024px) {
        padding: 16px 12px;
        padding-top: 86px; /* 🟢 FIXED: मोबाइल व्यू के लिए परफेक्ट स्पेस */
    }
`;

const HeaderControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
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
    h1 {
        font-size: 26px;
        font-weight: bold;
        color: #0f172a;
        margin: 0;
    }
    p {
        font-size: 14px;
        color: #64748b;
        margin: 4px 0 0 0;
    }

    @media (max-width: 768px) {
        h1 { font-size: 22px; }
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
    background-color: #1e293b;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
        background-color: #334155;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 14px;
    }
`;

const LedgerCard = styled.div`
    background-color: #0b1329;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #1e293b;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        border-radius: 12px;
    }
`;

const TableResponsiveWrapper = styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* मोबाइल ब्राउज़रों पर स्मूथ स्क्रॉल */
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
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    th, td {
        padding: 16px 24px;
        white-space: nowrap; /* मोबाइल पर टेक्स्ट रैपिंग को रोककर लेआउट को साफ़ रखता है */
    }

    tbody tr {
        border-bottom: 1px solid #1e293b;
        transition: background-color 0.2s;

        &:hover {
            background-color: #111c3a;
        }
    }

    .monospace { font-family: monospace; }
    .color-slate { color: #94a3b8; }
    .font-semibold { font-weight: 600; }
    .text-white { color: #fff; }
    .text-blue { color: #38bdf8; }

    @media (max-width: 768px) {
        th, td {
            padding: 12px 16px;
        }
    }
`;

const StatusBadge = styled.span`
    background-color: ${props => 
        props.status === 'Delivered' ? 'rgba(16, 185, 129, 0.15)' : 
        props.status === 'In Transit' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)'};
    color: ${props => 
        props.status === 'Delivered' ? '#34d399' : 
        props.status === 'In Transit' ? '#38bdf8' : '#fbbf24'};
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
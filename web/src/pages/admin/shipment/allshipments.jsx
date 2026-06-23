import React, { useState } from 'react';
import styled from 'styled-components';

export default function AllShipments() {
    // 🟢 State: Modal ओपन/क्लोज कंट्रोलर
    const [isModalOpen, setIsModalOpen] = useState(false);

    // शिपमेंट डेटा मैट्रिक्स (आपकी फोटो के अनुसार परफेक्ट)
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
                
                <ActionButtons>
                    <button type="button" className="btn-secondary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                        </svg>
                        Export
                    </button>
                    <button type="button" className="btn-primary" onClick={() => setIsModalOpen(true)}>
                        ➕ Add Shipment
                    </button>
                </ActionButtons>
            </HeaderControl>

            {/* 2. Modern High-Fidelity Table Frame (फोटो जैसा डीप डार्क लुक) */}
            <TableCard>
                <div className="card-header">
                    <h2>Recent Shipments</h2>
                    <a href="#view-all" className="view-all-link">View All &gt;</a>
                </div>
                <TableResponsiveWrapper>
                    <ShipmentsTable>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client Manifest</th>
                                <th>Destination</th>
                                <th>Cargo Weight</th>
                                <th>Status</th>
                                <th>ETA / Delivery</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipmentsData.map((shipment) => (
                                <tr key={shipment.id}>
                                    <td className="font-mono">{shipment.id}</td>
                                    <td className="font-bold text-white">{shipment.client}</td>
                                    <td className="text-slate">{shipment.destination}</td>
                                    <td className="text-slate">{shipment.weight}</td>
                                    <td>
                                        <StatusBadge status={shipment.status}>
                                            {shipment.status}
                                        </StatusBadge>
                                    </td>
                                    <td className={shipment.status === 'Pending' ? 'text-danger font-bold' : 'font-bold text-white'}>
                                        {shipment.status === 'Delivered' ? '02:15 PM' : shipment.status === 'In Transit' ? '16:45 PM' : 'Tomorrow'}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <IconButton aria-label="View Details">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </ShipmentsTable>
                </TableResponsiveWrapper>
            </TableCard>

            {/* 3. New Shipment Modal Overlay Setup */}
            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <h5>Create New Shipment</h5>
                            <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <FormGroup>
                                    <label htmlFor="destination">Destination</label>
                                    <input type="text" id="destination" placeholder="Enter destination" />
                                </FormGroup>
                                
                                <FormGroup>
                                    <label htmlFor="driver">Assign Driver</label>
                                    <select id="driver" defaultValue="">
                                        <option value="" disabled>Select driver...</option>
                                        <option value="1">Rajesh Kumar</option>
                                        <option value="2">Amit Singh</option>
                                        <option value="3">Vijay Yadav</option>
                                    </select>
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="vehicle">Vehicle</label>
                                    <select id="vehicle" defaultValue="">
                                        <option value="" disabled>Select vehicle...</option>
                                        <option value="1">VH-201 - Tata Ace</option>
                                        <option value="2">VH-202 - Ashok Leyland</option>
                                        <option value="3">VH-203 - Mahindra Bolero</option>
                                    </select>
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="eta">Expected Delivery</label>
                                    <input type="date" id="eta" />
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button type="button" className="btn-submit" onClick={() => setIsModalOpen(false)}>Create Shipment</button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageWrapper>
    );
}

/* ---------------- Responsive Styled Components ---------------- */

const PageWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;
    padding-top: 110px;
    font-family: sans-serif;
    background-color: #ffffff; /* 🟢 फोटो की तरह मेन बैकग्राउंड बिल्कुल व्हाइट */
    min-height: 100vh;

    @media (max-width: 1024px) {
        padding: 20px 16px;
        padding-top: 90px;
    }
`;

const HeaderControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    gap: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const TitleBlock = styled.div`
    h1 {
        font-size: 32px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
        letter-spacing: -0.02em;
    }
    p {
        font-size: 15px;
        color: #64748b;
        margin: 6px 0 0 0;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 12px;

    @media (max-width: 768px) {
        width: 100%;
        button { flex: 1; }
    }

    button {
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ease;
        border: none;
    }

    .btn-secondary {
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        color: #475569;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        &:hover { background-color: #f1f5f9; }
    }

    .btn-primary {
        background-color: #2563eb;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        &:hover { 
            background-color: #1d4ed8;
            transform: translateY(-1px);
        }
        &:active {
            transform: translateY(0);
        }
    }
`;

const TableCard = styled.div`
    background-color: #060d1e; /* 🟢 फोटो जैसा शाइनी डीप डार्क नेवी ब्लू टेबल कंटेनर */
    border-radius: 16px;
    overflow: hidden;
    padding: 32px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);

    @media (max-width: 576px) {
        padding: 20px 16px;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;
        
        h2 { font-size: 20px; font-weight: 600; color: #ffffff; margin: 0; }
        .view-all-link {
            font-size: 13px;
            color: #38bdf8;
            text-decoration: none;
            font-weight: 500;
            &:hover { text-decoration: underline; }
        }
    }
`;

const TableResponsiveWrapper = styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`;

const ShipmentsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 14px;
    color: #cbd5e1;

    thead tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        color: #475569;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    th, td {
        padding: 18px 16px;
        white-space: nowrap;
    }

    tbody tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        transition: background-color 0.2s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.02);
        }
        &:last-child {
            border-bottom: none;
        }
    }

    .font-mono { font-family: monospace; color: #475569; font-size: 13px; }
    .font-bold { font-weight: 600; }
    .text-slate { color: #94a3b8; }
    .text-white { color: #ffffff; }
    .text-danger { color: #f87171; }
`;

const StatusBadge = styled.span`
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    background-color: ${props => 
        props.status === 'Delivered' ? 'rgba(16, 185, 129, 0.12)' : 
        props.status === 'In Transit' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(245, 158, 11, 0.12)'};
    color: ${props => 
        props.status === 'Delivered' ? '#34d399' : 
        props.status === 'In Transit' ? '#38bdf8' : '#fbbf24'};
    
    &::before {
        content: "●";
        font-size: 8px;
    }
`;

const IconButton = styled.button`
    background: none;
    border: none;
    color: #334155;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover { 
        color: #38bdf8; 
        background-color: rgba(255, 255, 255, 0.05); 
    }
`;

/* ---------------- Light Theme Modal Layout ---------------- */

const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 16px;
`;

const ModalContent = styled.div`
    background-color: #ffffff;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: modalSlideIn 0.2s ease-out;

    @keyframes modalSlideIn {
        from { opacity: 0; transform: scale(0.96) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
`;

const ModalHeader = styled.div`
    padding: 18px 24px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h5 { font-size: 18px; font-weight: 600; color: #1e293b; margin: 0; }
    .btn-close {
        background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;
        &:hover { color: #475569; }
    }
`;

const ModalBody = styled.div`
    padding: 24px;
`;

const FormGroup = styled.div`
    margin-bottom: 18px;
    &:last-child { margin-bottom: 0; }

    label { display: block; font-size: 14px; font-weight: 500; color: #334155; margin-bottom: 8px; }
    input[type="text"], input[type="date"], select {
        width: 100%; padding: 10px 14px; font-size: 14px; border-radius: 6px;
        border: 1px solid #cbd5e1; background-color: #ffffff; color: #0f172a; outline: none; box-sizing: border-box;
        &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15); }
    }
`;

const ModalFooter = styled.div`
    padding: 16px 24px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    button { padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px; cursor: pointer; border: none; }
    .btn-cancel { background-color: #64748b; color: #ffffff; &:hover { background-color: #475569; } }
    .btn-submit { background-color: #2563eb; color: #ffffff; &:hover { background-color: #1d4ed8; } }
`;
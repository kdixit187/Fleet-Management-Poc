import React, { useState } from 'react';
import styled from 'styled-components';

export default function VehicleFleetDirectory() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // image_18af00.png के अनुसार परफेक्ट लाइव डेटा मैट्रिक्स
    const vehiclesData = [
        { sr: "#001", initials: "KL", avatarBg: "#2563eb", owner: "Kartikey Lodha", model: "TRK-4022", year: "2002", plate: "RJ06PA6666", status: "In Transit", statusType: "transit" },
        { sr: "#002", initials: "RK", avatarBg: "#16a34a", owner: "Rajesh Kumar", model: "Tata Ace", year: "2021", plate: "RJ12AB1234", status: "Maintenance", statusType: "maintenance" },
        { sr: "#003", initials: "AS", avatarBg: "#6b21a8", owner: "Amit Singh", model: "Ashok Leyland", year: "2023", plate: "HR26CD5678", status: "Loading", statusType: "loading" },
        { sr: "#004", initials: "SD", avatarBg: "#dc2626", owner: "Sanjay Dutt", model: "Mahindra Bolero", year: "2022", plate: "MH04EF9012", status: "Critical", statusType: "critical" },
        { sr: "#005", initials: "VS", avatarBg: "#0ea5e9", owner: "Vikram Singh", model: "Eicher Pro", year: "2004", plate: "DL09GH3456", status: "Delivered", statusType: "delivered" }
    ];

    return (
        <PageWrapper>
            {/* 1. Page Title Header */}
            <HeaderControl>
                <TitleBlock>
                    <h1>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                        Vehicle Fleet Directory
                    </h1>
                    <p>Monitor tactical fleet asset distributions and status configurations.</p>
                </TitleBlock>
                <AddButton type="button" onClick={() => setIsModalOpen(true)}>
                    + Add Vehicle
                </AddButton>
            </HeaderControl>

            {/* 2. 4 Metrics Row Blocks */}
            <MetricsGrid>
                <MetricCard>
                    <IconCircle bg="#eff6ff" color="#2563eb">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </IconCircle>
                    <div>
                        <span className="lbl">Total Vehicles</span>
                        <span className="val">42</span>
                        <span className="trend-text">+3 this month</span>
                    </div>
                </MetricCard>

                <MetricCard>
                    <IconCircle bg="#f0fdf4" color="#16a34a">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </IconCircle>
                    <div>
                        <span className="lbl">Active Vehicles</span>
                        <span className="val">38 <span className="sub-val">/ 45</span></span>
                        <span className="trend-text text-green">↑ 90% utilization</span>
                    </div>
                </MetricCard>

                <MetricCard>
                    <IconCircle bg="#fffbeb" color="#d97706">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </IconCircle>
                    <div>
                        <span className="lbl">Under Maintenance</span>
                        <span className="val text-amber">3</span>
                        <span className="trend-text text-amber">2 in service</span>
                    </div>
                </MetricCard>

                <MetricCard>
                    <IconCircle bg="#e0f2fe" color="#0284c7">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                    </IconCircle>
                    <div>
                        <span className="lbl">Fleet Efficiency</span>
                        <span className="val">94%</span>
                        <span className="trend-text text-green">↑ +5% from last month</span>
                    </div>
                </MetricCard>
            </MetricsGrid>

            {/* 3. Ledger White Table View Architecture */}
            <TableCardSection>
                <TableTopbarControls>
                    <div className="title-area">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                        Active Registry Ledger
                    </div>
                    <RightInputGroupControl>
                        <div className="search-input-box">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="12" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <input type="text" placeholder="Search vehicles..." />
                        </div>
                        <button className="btn-action-util">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                            Filter
                        </button>
                        <button className="btn-action-util">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                            Export
                        </button>
                    </RightInputGroupControl>
                </TableTopbarControls>

                <TableResponsiveWrapper>
                    <RegistryGridTable>
                        <thead>
                            <tr>
                                <th>Sr. No</th>
                                <th>Company Owner</th>
                                <th>Truck Model</th>
                                <th>Model Year</th>
                                <th>Number Plate</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiclesData.map((row) => (
                                <tr key={row.sr}>
                                    <td className="font-mono text-muted">{row.sr}</td>
                                    <td>
                                        <OwnerProfileCell>
                                            <AvatarBadge bg={row.avatarBg}>{row.initials}</AvatarBadge>
                                            <span className="owner-name">{row.owner}</span>
                                        </OwnerProfileCell>
                                    </td>
                                    <td className="font-semibold text-dark">{row.model}</td>
                                    <td className="text-muted">{row.year}</td>
                                    <td>
                                        <PlateTagBlock>{row.plate}</PlateTagBlock>
                                    </td>
                                    <td>
                                        <StatusBadge pillType={row.statusType}>
                                            {row.status}
                                        </StatusBadge>
                                    </td>
                                    <td>
                                        <ActionButtonsWrapper>
                                            <button className="icon-btn-view" aria-label="View">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                            </button>
                                            <button className="icon-btn-edit" aria-label="Edit">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                            </button>
                                            <button className="icon-btn-delete" aria-label="Delete">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                            </button>
                                        </ActionButtonsWrapper>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </RegistryGridTable>
                </TableResponsiveWrapper>

                {/* Table Navigation Pagination Elements Footer */}
                <TablePaginationFooter>
                    <span className="records-count">Showing <b>1-5</b> of <b>42</b> vehicles</span>
                    <PaginationGroup>
                        <button className="nav-step">Previous</button>
                        <button className="page-num active">1</button>
                        <button className="page-num">2</button>
                        <button className="page-num">3</button>
                        <button className="page-num">4</button>
                        <button className="nav-step">Next</button>
                    </PaginationGroup>
                </TablePaginationFooter>
            </TableCardSection>

            {/* Modal Logic Form Configuration Popups */}
            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <h5>Create New Vehicle Asset</h5>
                            <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <FormGroup>
                                    <label htmlFor="owner">Company Owner</label>
                                    <input type="text" id="owner" placeholder="Enter owner name" />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="model">Truck Model</label>
                                    <input type="text" id="model" placeholder="Enter model layout" />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="year">Model Year</label>
                                    <input type="text" id="year" placeholder="Enter year" />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="plate">Number Plate</label>
                                    <input type="text" id="plate" placeholder="Enter plate identifier" style={{ textTransform: 'uppercase' }} />
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button type="button" className="btn-submit" onClick={() => setIsModalOpen(false)}>Create Asset</button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageWrapper>
    );
}

/* ---------------- Styled Framework Layout Configurations ---------------- */

const PageWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px;
    padding-top: 110px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #f8fafc; /* 🟢 छवि के समान पूरी स्क्रीन लाइट और स्वच्छ */
    min-height: 100vh;
`;

const HeaderControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    gap: 16px;
    @media (max-width: 768px) { flex-direction: column; align-items: flex-start; }
`;

const TitleBlock = styled.div`
    h1 {
        font-size: 28px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        svg { color: #2563eb; }
    }
    p { font-size: 14px; color: #64748b; margin: 4px 0 0 0; }
`;

const AddButton = styled.button`
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    background-color: #2563eb;
    transition: background-color 0.2s;
    white-space: nowrap;
    &:hover { background-color: #1d4ed8; }
    @media (max-width: 768px) { width: 100%; }
`;

/* ---------------- Metrics Summary Blocks ---------------- */

const MetricsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 32px;
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 576px) { grid-template-columns: 1fr; }
`;

const MetricCard = styled.div`
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    gap: 16px;

    .lbl { display: block; font-size: 13px; color: #64748b; font-weight: 500; margin-bottom: 4px; }
    .val { display: block; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1; margin-bottom: 6px; }
    .sub-val { font-size: 15px; color: #94a3b8; font-weight: 500; }
    .trend-text { display: block; font-size: 12px; color: #64748b; font-weight: 500; }
    
    .text-green { color: #16a34a; }
    .text-amber { color: #d97706; }
`;

const IconCircle = styled.div`
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background-color: ${props => props.bg};
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

/* ---------------- White Structural Core Grid Sheet ---------------- */

const TableCardSection = styled.div`
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
`;

const TableTopbarControls = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    border-bottom: 1px solid #f1f5f9;

    .title-area {
        font-size: 16px; font-weight: 600; color: #1e293b; display: flex; align-items: center; gap: 8px;
        svg { color: #475569; }
    }
`;

const RightInputGroupControl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    .search-input-box {
        display: flex;
        align-items: center;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 6px 12px;
        color: #94a3b8;

        input {
            border: none; outline: none; font-size: 13px; color: #1e293b; padding-left: 8px; width: 180px;
            &::placeholder { color: #94a3b8; }
        }
    }

    .btn-action-util {
        background: #ffffff; border: 1px solid #cbd5e1; padding: 7px 14px; font-size: 13px;
        font-weight: 500; color: #475569; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;
        &:hover { background: #f8fafc; }
    }
`;

const TableResponsiveWrapper = styled.div`
    overflow-x: auto;
`;

const RegistryGridTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 14px;

    thead tr {
        border-bottom: 1px solid #e2e8f0;
        background-color: #fafafa;
        color: #475569;
        font-size: 12px;
        font-weight: 600;
    }

    th, td { padding: 14px 20px; white-space: nowrap; vertical-align: middle; }
    tbody tr {
        border-bottom: 1px solid #f1f5f9;
        &:hover { background-color: #f8fafc; }
    }

    .font-mono { font-family: monospace; font-size: 13px; }
    .font-semibold { font-weight: 600; }
    .font-bold { font-weight: 600; }
    .text-muted { color: #64748b; }
    .text-dark { color: #0f172a; }
`;

const OwnerProfileCell = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    .owner-name { font-weight: 600; color: #1e293b; }
`;

const AvatarBadge = styled.div`
    width: 32px; height: 32px; border-radius: 50%; color: #ffffff; font-weight: 700; font-size: 11px;
    display: flex; align-items: center; justify-content: center; background-color: ${props => props.bg};
`;

const PlateTagBlock = styled.span`
    background-color: #fff1f2;
    color: #e11d48;
    font-family: monospace;
    font-weight: 600;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ffe4e6;
    letter-spacing: 0.02em;
`;

const StatusBadge = styled.span`
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    background-color: ${props => 
        props.pillType === 'transit' ? '#f0fdf4' : 
        props.pillType === 'maintenance' ? '#fffbeb' : 
        props.pillType === 'loading' ? '#e0f2fe' : 
        props.pillType === 'critical' ? '#fef2f2' : '#f0fdf4'};
    color: ${props => 
        props.pillType === 'transit' ? '#16a34a' : 
        props.pillType === 'maintenance' ? '#d97706' : 
        props.pillType === 'loading' ? '#0284c7' : 
        props.pillType === 'critical' ? '#dc2626' : '#16a34a'};

    &::before { content: "●"; font-size: 8px; }
`;

const ActionButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    button {
        background: none; border: 1px solid #e2e8f0; width: 32px; height: 32px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
    }
    .icon-btn-view { color: #2563eb; &:hover { background: #eff6ff; border-color: #bfdbfe; } }
    .icon-btn-edit { color: #d97706; &:hover { background: #fffbeb; border-color: #fde68a; } }
    .icon-btn-delete { color: #dc2626; &:hover { background: #fef2f2; border-color: #fca5a5; } }
`;

/* ---------------- Table Pagination Elements Footer ---------------- */

const TablePaginationFooter = styled.div`
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e8f0;
    background-color: #fafafa;
    
    .records-count { font-size: 13px; color: #64748b; }
`;

const PaginationGroup = styled.div`
    display: flex;
    gap: 4px;

    button {
        padding: 6px 12px; font-size: 13px; font-weight: 500; border-radius: 6px; cursor: pointer;
        background: #ffffff; border: 1px solid #cbd5e1; color: #475569;
        &:hover { background: #f1f5f9; }
        &.active { background: #2563eb; color: #ffffff; border-color: #2563eb; }
    }
`;

/* ---------------- Standard Light Theme Modals ---------------- */

const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(15, 23, 42, 0.3); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 16px;
`;

const ModalContent = styled.div`
    background-color: #ffffff; border-radius: 12px; width: 100%; max-width: 500px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;
    overflow: hidden; animation: modalSlideIn 0.2s ease-out;

    @keyframes modalSlideIn {
        from { opacity: 0; transform: scale(0.96) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
`;

const ModalHeader = styled.div`
    padding: 18px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;
    h5 { font-size: 18px; font-weight: 600; color: #1e293b; margin: 0; }
    .btn-close { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }
`;

const ModalBody = styled.div` padding: 24px; `;

const FormGroup = styled.div`
    margin-bottom: 18px;
    &:last-child { margin-bottom: 0; }
    label { display: block; font-size: 14px; font-weight: 500; color: #334155; margin-bottom: 8px; }
    input[type="text"], select {
        width: 100%; padding: 10px 14px; font-size: 14px; border-radius: 6px;
        border: 1px solid #cbd5e1; background-color: #ffffff; color: #0f172a; outline: none; box-sizing: border-box;
        &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15); }
    }
`;

const ModalFooter = styled.div`
    padding: 16px 24px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px;
    button { padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px; cursor: pointer; border: none; }
    .btn-cancel { background-color: #64748b; color: #ffffff; }
    .btn-submit { background-color: #2563eb; color: #ffffff; }
`;
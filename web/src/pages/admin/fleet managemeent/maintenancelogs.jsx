import React, { useState } from 'react';
import styled from 'styled-components';

export default function MaintenanceRegistryLog() {
  // 🟢 State: "Add Maintenance Log" Modal को ओपन/क्लोज करने के लिए
  const [isModalOpen, setIsModalOpen] = useState(false);

  // image_1913e1.png के अनुसार परफेक्ट लाइव डेटा मैट्रिक्स
  const maintenanceLogs = [
    { id: "MNT-084", vehicleId: "TRK-4022", plate: "RJ06PA6666", category: "Routine", summary: "Engine Oil Flush & Air Filter Replacement.", date: "Jun 22, 2026", cost: "₹6,400", status: "Completed" }
  ];

  return (
    <PageWrapper>
      {/* 1. Page Title Header Controls */}
      <HeaderControl>
        <TitleBlock>
          <h1>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="title-icon"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            Maintenance Registry Log
          </h1>
          <p>Track asset interventions, routine service cycles, and repair logs.</p>
        </TitleBlock>
        <AddButton type="button" onClick={() => setIsModalOpen(true)}>
          ➕ Add Maintenance Log
        </AddButton>
      </HeaderControl>

      {/* 2. Stats Summary Ribbon (इमेज के अनुसार) */}
      <StatsGrid>
        <StatCard>
          <IconBox bg="#eff6ff" color="#2563eb">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </IconBox>
          <div className="stat-info">
            <span className="lbl">Total Orders</span>
            <span className="val">148</span>
            <span className="sub">This calendar year</span>
          </div>
        </StatCard>

        <StatCard>
          <IconBox bg="#fffbeb" color="#d97706">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </IconBox>
          <div className="stat-info">
            <span className="lbl">In Progress</span>
            <span className="val">5</span>
            <span className="sub text-warning">3 critical items</span>
          </div>
        </StatCard>

        <StatCard>
          <IconBox bg="#f0fdf4" color="#16a34a">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 4 12 14.01 9 11.01"/><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/></svg>
          </IconBox>
          <div className="stat-info">
            <span className="lbl">Completed</span>
            <span className="val">139</span>
            <span className="sub text-success">↑ 93.9% resolve rate</span>
          </div>
        </StatCard>

        <StatCard>
          <IconBox bg="#fef2f2" color="#dc2626">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="12" x2="12" y2="21"/><path d="M17 12a5 5 0 1 0-10 0"/></svg>
          </IconBox>
          <div className="stat-info">
            <span className="lbl">Total Expenses</span>
            <span className="val">₹48,250</span>
            <span className="sub">Current month metrics</span>
          </div>
        </StatCard>
      </StatsGrid>

      {/* 3. Main Data Ledger Table Container (क्लीन लाइट थीम) */}
      <TableCardSection>
        <TableTopbarControls>
          <div className="title-area">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Intervention Records Ledger
          </div>
          <RightInputGroupControl>
            <div className="search-input-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="12" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search log or Plate..." />
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
                <th style={{ width: '100px' }}>Log ID</th>
                <th>Vehicle Details</th>
                <th>Service Category</th>
                <th>Intervention Summary</th>
                <th>Service Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th style={{ textAlign: 'center', width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.map((log) => (
                <tr key={log.id}>
                  <td className="font-mono text-muted">{log.id}</td>
                  <td>
                    <div className="font-bold text-dark">{log.vehicleId}</div>
                    <PlateCodeBlock>{log.plate}</PlateCodeBlock>
                  </td>
                  <td>
                    <CategoryBadge>{log.category}</CategoryBadge>
                  </td>
                  <td className="summary-text">{log.summary}</td>
                  <td className="text-muted">{log.date}</td>
                  <td className="font-semibold text-dark">{log.cost}</td>
                  <td>
                    <StatusBadge status={log.status}>
                      {log.status}
                    </StatusBadge>
                  </td>
                  <td>
                    <ActionButtonsWrapper>
                      <button className="icon-btn-view" title="View Bill">
                        <svg width="15" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                      </button>
                      <button className="icon-btn-edit" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                      </button>
                      <button className="icon-btn-delete" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </ActionButtonsWrapper>
                  </td>
                </tr>
              ))}
            </tbody>
          </RegistryGridTable>
        </TableResponsiveWrapper>
      </TableCardSection>

      {/* 4. Copyright Footer Block */}
      {/* <FooterContainer>
        © 2024 Kartikey Transport. All rights reserved. | v2.0.1
      </FooterContainer> */}

      {/* 5. Add Maintenance Form Overlay Popup */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <h5>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '8px', verticalAlign: 'middle', color: '#2563eb'}}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  Log Maintenance Event
                </h5>
                <p className="modal-subtitle">Record repair details, structural component replacements, and expenses.</p>
              </div>
              <button type="button" className="close-x-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={(e) => e.preventDefault()}>
                <FormRow>
                  <FormGroup>
                    <label htmlFor="linkVehicle">Target Fleet Vehicle</label>
                    <select id="linkVehicle" defaultValue="">
                      <option value="" disabled>Select target asset...</option>
                      <option value="1">TRK-4022 [RJ06PA6666]</option>
                      <option value="2">Tata Ace [RJ12AB1234]</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="mCategory">Service Category</label>
                    <select id="mCategory" defaultValue="">
                      <option value="" disabled>Select category</option>
                      <option value="Routine">🛠️ Scheduled / Routine Maintenance</option>
                      <option value="Breakdown">⚠️ Unscheduled Breakdown Repair</option>
                    </select>
                  </FormGroup>
                </FormRow>

                <FormRow columns="3">
                  <FormGroup>
                    <label htmlFor="serviceDate">Date of Service</label>
                    <input type="date" id="serviceDate" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="serviceCost">Total Cost (₹)</label>
                    <input type="number" id="serviceCost" placeholder="e.g., 4500" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="mStatus">State Configuration</label>
                    <select id="mStatus" defaultValue="In Progress">
                      <option value="In Progress">⏳ In Progress</option>
                      <option value="Completed">✅ Completed</option>
                    </select>
                  </FormGroup>
                </FormRow>

                <FormGroup style={{ marginTop: '8px' }}>
                  <label htmlFor="serviceDescription">Detailed Logs &amp; Diagnostics</label>
                  <textarea id="serviceDescription" rows="3" placeholder="Specify parts replaced..."></textarea>
                </FormGroup>
              </form>
            </ModalBody>

            <ModalFooter>
              <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Close</button>
              <button type="button" className="btn-submit" onClick={() => setIsModalOpen(false)}>Save Log Entry</button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
}

/* ---------------- Responsive Styled Framework Design ---------------- */

const PageWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px;
    padding-top: 110px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #f8fafc; /* 🟢 क्लीन लाइट बैकग्राउंड */
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
        gap: 8px;
        
        .title-icon { color: #2563eb; }
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
    transition: background-color 0.15s ease;
    white-space: nowrap;

    &:hover { background-color: #1d4ed8; }
    @media (max-width: 768px) { width: 100%; }
`;

/* ---------------- KPI Counter Matrix Ribbon ---------------- */

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 32px;
    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 576px) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);

    .stat-info { display: flex; flex-direction: column; }
    .lbl { font-size: 13px; color: #64748b; font-weight: 500; }
    .val { font-size: 24px; font-weight: 700; color: #0f172a; margin: 4px 0; line-height: 1; }
    .sub { font-size: 12px; color: #94a3b8; }
    
    .text-success { color: #16a34a; font-weight: 500; }
    .text-warning { color: #d97706; font-weight: 500; }
`;

const IconBox = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: ${props => props.bg};
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

/* ---------------- White Sheet Grid Table Container ---------------- */

const TableCardSection = styled.div`
    background-color: #ffffff; 
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`;

const TableTopbarControls = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    border-bottom: 1px solid #f1f5f9;

    .title-area { font-size: 16px; font-weight: 600; color: #1e293b; }
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
            border: none; outline: none; font-size: 13px; color: #1e293b; padding-left: 8px;
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
    width: 100%;
    overflow-x: auto;
`;

const RegistryGridTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 14px;

    thead tr {
        background-color: #fafafa;
        border-bottom: 1px solid #e2e8f0;
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
    .font-bold { font-weight: 600; }
    .font-semibold { font-weight: 600; }
    .text-muted { color: #64748b; }
    .text-dark { color: #0f172a; }
    .summary-text { max-width: 320px; overflow: hidden; text-overflow: ellipsis; color: #334155; }
`;

const PlateCodeBlock = styled.code`
    font-family: monospace;
    font-size: 11px;
    color: #64748b;
    background-color: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
    text-transform: uppercase;
`;

const CategoryBadge = styled.span`
    background-color: #f1f5f9;
    color: #475569;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
`;

const StatusBadge = styled.span`
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: #f0fdf4;
    color: #16a34a;
    &::before { content: "●"; font-size: 8px; }
`;

const ActionButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
        background: #ffffff; border: 1px solid #e2e8f0; width: 30px; height: 32px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s;
    }
    .icon-btn-view { color: #2563eb; &:hover { background: #eff6ff; border-color: #bfdbfe; } }
    .icon-btn-edit { color: #d97706; &:hover { background: #fffbeb; border-color: #fde68a; } }
    .icon-btn-delete { color: #dc2626; &:hover { background: #fef2f2; border-color: #fca5a5; } }
`;

const FooterContainer = styled.footer`
    text-align: center;
    padding: 24px 0;
    font-size: 13px;
    color: #94a3b8;
    margin-top: 40px;
`;

/* ---------------- Light Theme Modal Architecture ---------------- */

const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(15, 23, 42, 0.3); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 16px;
`;

const ModalContent = styled.div`
    background-color: #ffffff; border-radius: 12px; width: 100%; max-width: 680px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); display: flex; flex-direction: column;
    overflow: hidden; animation: modalSlideIn 0.2s ease-out;

    @keyframes modalSlideIn {
        from { opacity: 0; transform: scale(0.97); }
        to { opacity: 1; transform: scale(1); }
    }
`;

const ModalHeader = styled.div`
    padding: 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start;
    h5 { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0; }
    .modal-subtitle { font-size: 13px; color: #64748b; margin: 6px 0 0 0; }
    .close-x-btn { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }
`;

const ModalBody = styled.div` padding: 24px; max-height: 70vh; overflow-y: auto; `;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: ${props => props.columns === '3' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
    gap: 16px; margin-bottom: 16px;
    @media (max-width: 576px) { grid-template-columns: 1fr; }
`;

const FormGroup = styled.div`
    display: flex; flex-direction: column; width: 100%;
    label { display: block; font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
    input[type="text"], input[type="number"], input[type="date"], select, textarea {
        width: 100%; padding: 10px 14px; font-size: 14px; border-radius: 6px;
        border: 1px solid #cbd5e1; background-color: #ffffff; color: #0f172a; outline: none; box-sizing: border-box;
        &:focus { border-color: #2563eb; box-shadow: 0 0 0 1px #2563eb; }
    }
    textarea { resize: none; }
`;

const ModalFooter = styled.div`
    padding: 16px 24px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; background-color: #fafafa;
    button { padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px; cursor: pointer; border: none; }
    .btn-cancel { background-color: #f1f5f9; color: #475569; }
    .btn-submit { background-color: #2563eb; color: #ffffff; }
`;
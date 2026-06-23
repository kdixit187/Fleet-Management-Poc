import React, { useState } from 'react';
import styled from 'styled-components';

export default function VehicleFleetDirectory() {
    // 🟢 State: "Add New Vehicle" Modal को ओपन/क्लोज करने के लिए
    const [isModalOpen, setIsModalOpen] = useState(false);

    // डमी फ्लीट डेटा मैट्रिक्स
    const vehiclesData = [
        { sr: "#001", initials: "KL", avatarBg: "#2563eb", owner: "Kartikey Lodha", model: "TRK-4022", year: "2002", plate: "RJ06PA6666", status: "In Transit", statusType: "transit" },
        { sr: "#002", initials: "RK", avatarBg: "#16a34a", owner: "Rajesh Kumar", model: "Tata Ace", year: "2021", plate: "RJ12AB1234", status: "Maintenance", statusType: "maintenance" }
    ];

    return (
        <PageWrapper>
            {/* 1. Page Title Header Area */}
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

            {/* 2. Active Registry Ledger Wrapper */}
            <TableCardSection>
                <TableTopbarControls>
                    <div className="title-area">Active Registry Ledger</div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {vehiclesData.map((row) => (
                                <tr key={row.sr}>
                                    <td>{row.sr}</td>
                                    <td>
                                        <OwnerCell>
                                            <Avatar bg={row.avatarBg}>{row.initials}</Avatar>
                                            <span>{row.owner}</span>
                                        </OwnerCell>
                                    </td>
                                    <td className="font-bold">{row.model}</td>
                                    <td>{row.year}</td>
                                    <td><PlateTag>{row.plate}</PlateTag></td>
                                    <td><StatusBadge pillType={row.statusType}>{row.status}</StatusBadge></td>
                                </tr>
                            ))}
                        </tbody>
                    </RegistryGridTable>
                </TableResponsiveWrapper>
            </TableCardSection>

            {/* ---------------- 🟢 NEW: ADD NEW VEHICLE MODAL FORM (image_18b622.png के आधार पर) ---------------- */}
            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <div>
                                <h5>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '8px', verticalAlign: 'middle', color: '#2563eb'}}><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                                    Add New Vehicle
                                </h5>
                                <p className="modal-subtitle">Enter the details for the new vehicle to add it to your fleet.</p>
                            </div>
                            <button type="button" className="close-x-btn" onClick={() => setIsModalOpen(false)}>✕</button>
                        </ModalHeader>

                        <ModalBody>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <FormRow>
                                    <FormGroup>
                                        <label htmlFor="vehicleId"># Vehicle ID</label>
                                        <input type="text" id="vehicleId" placeholder="e.g., TRK-004" />
                                        <span className="help-text">Unique identifier for this vehicle.</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="vehicleType">🚌 Type</label>
                                        <select id="vehicleType" defaultValue="">
                                            <option value="" disabled>Select type</option>
                                            <option value="mini">Mini Truck</option>
                                            <option value="heavy">Heavy Truck</option>
                                            <option value="pickup">Pickup</option>
                                        </select>
                                    </FormGroup>
                                </FormRow>

                                <FormRow columns="3">
                                    <FormGroup>
                                        <label htmlFor="make">🏢 Make</label>
                                        <input type="text" id="make" placeholder="e.g., Freightliner" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="model">🏷️ Model</label>
                                        <input type="text" id="model" placeholder="e.g., Cascadia" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="year">📅 Year</label>
                                        <input type="text" id="year" placeholder="e.g., 2023" />
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <label htmlFor="licensePlate">💳 License Plate</label>
                                        <input type="text" id="licensePlate" placeholder="E.G., TRK-004-NY" />
                                        <span className="help-text">Vehicle registration number.</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="pucNumber">📋 PUC Certificate Number</label>
                                        <input type="text" id="pucNumber" placeholder="E.G., RJ06-PUC-12345" />
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <label htmlFor="pucExpiry">📅 PUC Expiry Date</label>
                                        <input type="date" id="pucExpiry" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="pucFile">☁️ Upload PUC Document Copy</label>
                                        <div className="file-upload-wrapper">
                                            <label className="file-upload-btn" htmlFor="pucFileInput">Choose File</label>
                                            <input type="file" id="pucFileInput" style={{display: 'none'}} />
                                            <span className="file-name-placeholder">No file chosen</span>
                                        </div>
                                        <span className="help-text">Accepted formats: JPG, PNG, PDF (Max 5MB)</span>
                                    </FormGroup>
                                </FormRow>

                                <FormGroup style={{marginTop: '6px'}}>
                                    <label htmlFor="notes">📝 Notes</label>
                                    <textarea id="notes" rows="3" placeholder="Additional notes about the vehicle..."></textarea>
                                    <span className="help-text">Optional: Add any special notes or remarks.</span>
                                </FormGroup>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>✕ Cancel</button>
                            <button type="button" className="btn-submit" onClick={() => setIsModalOpen(false)}>✓ Add Vehicle</button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageWrapper>
    );
}

/* ---------------- Styled Framework Core Layout ---------------- */

const PageWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px;
    padding-top: 110px;
    font-family: sans-serif;
    background-color: #f8fafc;
    min-height: 100vh;
`;

const HeaderControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 16px; }
`;

const TitleBlock = styled.div`
    h1 { font-size: 28px; font-weight: 700; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 10px; }
    p { font-size: 14px; color: #64748b; margin: 4px 0 0 0; }
`;

const AddButton = styled.button`
    color: #ffffff; padding: 10px 20px; border: none; border-radius: 6px; font-size: 14px;
    font-weight: 600; cursor: pointer; background-color: #2563eb;
    &:hover { background-color: #1d4ed8; }
`;

const TableCardSection = styled.div`
    background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;
`;

const TableTopbarControls = styled.div`
    padding: 20px; font-size: 16px; font-weight: 600; color: #1e293b; border-bottom: 1px solid #f1f5f9;
`;

const TableResponsiveWrapper = styled.div` overflow-x: auto; `;

const RegistryGridTable = styled.table`
    width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;
    thead tr { background-color: #fafafa; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 12px; }
    th, td { padding: 14px 20px; white-space: nowrap; }
    tbody tr { border-bottom: 1px solid #f1f5f9; }
    .font-bold { font-weight: 600; color: #0f172a; }
`;

const OwnerCell = styled.div` display: flex; align-items: center; gap: 12px; font-weight: 600; color: #1e293b; `;
const Avatar = styled.div` width: 32px; height: 32px; border-radius: 50%; color: #fff; font-weight: 700; font-size: 11px; display: flex; align-items: center; justify-content: center; background-color: ${props => props.bg}; `;
const PlateTag = styled.span` background-color: #fff1f2; color: #e11d48; font-family: monospace; font-weight: 600; padding: 4px 8px; border-radius: 4px; border: 1px solid #ffe4e6; `;
const StatusBadge = styled.span` padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: #16a34a; background-color: #f0fdf4; &::before { content: "●"; margin-right: 6px; font-size: 8px; } `;

/* ---------------- 🟢 HIGH-FIDELITY MODAL STYLING (image_18b622.png) ---------------- */

const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 16px;
`;

const ModalContent = styled.div`
    background-color: #ffffff; border-radius: 12px; width: 100%; max-width: 680px; /* फोटो के अनुसार चौड़ा विड्थ */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column;
    overflow: hidden; animation: modalSlideIn 0.2s ease-out;

    @keyframes modalSlideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const ModalHeader = styled.div`
    padding: 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start;
    h5 { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0; }
    .modal-subtitle { font-size: 13px; color: #64748b; margin: 6px 0 0 0; }
    .close-x-btn { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; &:hover { color: #475569; } }
`;

const ModalBody = styled.div` padding: 24px; max-height: 75vh; overflow-y: auto; `;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: ${props => props.columns === '3' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
    gap: 16px; margin-bottom: 16px;
    @media (max-width: 576px) { grid-template-columns: 1fr; }
`;

const FormGroup = styled.div`
    display: flex; flex-direction: column; width: 100%; box-sizing: border-box;

    label { display: block; font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
    
    input[type="text"], input[type="date"], select, textarea {
        width: 100%; padding: 10px 14px; font-size: 14px; border-radius: 6px;
        border: 1px solid #cbd5e1; background-color: #ffffff; color: #0f172a; outline: none; box-sizing: border-box;
        transition: border-color 0.15s;
        &::placeholder { color: #94a3b8; }
        &:focus { border-color: #2563eb; box-shadow: 0 0 0 1px #2563eb; }
    }

    textarea { resize: none; }
    .help-text { font-size: 11px; color: #64748b; margin-top: 5px; }

    /* Custom File Upload Styling to perfectly mimic image_18b622.png */
    .file-upload-wrapper {
        display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden;
        .file-upload-btn {
            background-color: #f1f5f9; color: #475569; font-size: 13px; font-weight: 600;
            padding: 11px 16px; border-right: 1px solid #cbd5e1; cursor: pointer; margin-bottom: 0;
            &:hover { background-color: #e2e8f0; }
        }
        .file-name-placeholder { font-size: 13px; color: #94a3b8; padding-left: 12px; }
    }
`;

const ModalFooter = styled.div`
    padding: 16px 24px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; background-color: #fafafa;

    button {
        padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px;
        cursor: pointer; display: inline-flex; align-items: center; gap: 6px; border: none; transition: all 0.15s;
    }
    .btn-cancel { background-color: #f1f5f9; color: #475569; &:hover { background-color: #e2e8f0; } }
    .btn-submit { background-color: #2563eb; color: #ffffff; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2); &:hover { background-color: #1d4ed8; } }
`;
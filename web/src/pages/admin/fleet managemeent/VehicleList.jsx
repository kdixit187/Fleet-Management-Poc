import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function DriverFleetDirectory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vehiclesData, setVehiclesData] = useState([]);
const [vehicleFormData, setVehicleFormData] = useState({
    vehicleId: '',
    vehicleType: '',
    companyName: '',
    modelYear: '',
    licensePlate: '',
    pucNumber: '',
    pucExpiry: '',
    notes: ''
});
const fetchVehicles = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/vehicles');
        const data = await response.json();
        // Backend se aaye hue data ko set karein
        setVehiclesData(data.data || data); 
    } catch (err) {
        console.error("Error fetching vehicles:", err);
    }
};

// IMPORTANT: Component ke shuru mein useEffect mein ise load karein
useEffect(() => {
    fetchVehicles();
}, []);

const handleVehicleChange = (e) => {
    const { id, value } = e.target;
    setVehicleFormData(prev => ({ ...prev, [id]: value }));
};
const handleAddVehicle = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/vehicles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicleFormData)
        });
        
        if (response.ok) {
            // Success: Reset form and refresh table
            setVehicleFormData({
                vehicleId: '', vehicleType: '', companyName: '',
                modelYear: '', licensePlate: '', pucNumber: '',
                pucExpiry: '', notes: ''
            });
            setIsModalOpen(false);
            await fetchVehicles(); // Refresh data from backend
        } else {
            alert("Failed to save vehicle.");
        }
    } catch (err) {
        console.error("Error adding vehicle:", err);
    }
};
    return (
        <PageWrapper>
            {/* Header */}
            <HeaderControl>
                <TitleBlock>
                    <h1>Vehicle Fleet Directory</h1>
                    <p>Monitor tactical fleet asset distributions and status configurations.</p>
                </TitleBlock>
                <AddButton type="button" onClick={() => setIsModalOpen(true)}>+ Add Vehicle</AddButton>
            </HeaderControl>

            {/* Table */}
            <TableCardSection>
                <TableTopbarControls>Active Registry Ledger</TableTopbarControls>
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
        <th>Actions</th> {/* Naya column */}
    </tr>
</thead>
<tbody>
    {vehiclesData.map((row, index) => (
        <tr key={row.id}>
            <td>{index + 1}</td>
            <td>{row.company_name}</td>
            <td>{row.type}</td>
            <td>{row.year}</td>
            <td><PlateTag>{row.license_plate}</PlateTag></td>
            <td><StatusBadge>Active</StatusBadge></td>
            <td>
                <ActionButtons>
                     <button className="view" onClick={() => handleView(row)}>View</button>
                    <button className="edit" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(row.id)}>Delete</button>
                </ActionButtons>
            </td>
        </tr>
    ))}
</tbody>
                    </RegistryGridTable>
                </TableResponsiveWrapper>
            </TableCardSection>

            {/* Add Vehicle Modal */}
            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <div>
                                <h5>Add New Vehicle</h5>
                                <p className="modal-subtitle">Enter vehicle details to update the fleet registry.</p>
                            </div>
                            <button type="button" className="close-x-btn" onClick={() => setIsModalOpen(false)}>✕</button>
                        </ModalHeader>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await handleAddVehicle();
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalBody>
                                <FormRow>
                                    <FormGroup>
                                        <label># Vehicle ID</label>
                                        <input type="text" id="vehicleId" placeholder="e.g., TRK-004" value={vehicleFormData.vehicleId} onChange={handleVehicleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>🚌 Type</label>
                                        <select id="vehicleType" value={vehicleFormData.vehicleType} onChange={handleVehicleChange}>
                                            <option value="">Select Type</option>
                                            <option value="mini">Mini Truck</option>
                                            <option value="heavy">Heavy Truck</option>
                                        </select>
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <label>🏷️ Company Name</label>
                                        <input type="text" id="companyName" placeholder="e.g., Cascadia" value={vehicleFormData.companyName} onChange={handleVehicleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>📅 Model Year</label>
                                        <input type="text" id="modelYear" placeholder="e.g., 2023" value={vehicleFormData.modelYear} onChange={handleVehicleChange} />
                                    </FormGroup>
                                </FormRow>

                                <FormRow>
                                    <FormGroup>
                                        <label>💳 License Plate</label>
                                        <input type="text" id="licensePlate" placeholder="E.G., TRK-004-NY" value={vehicleFormData.licensePlate} onChange={handleVehicleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>📋 PUC Certificate Number</label>
                                        <input type="text" id="pucNumber" placeholder="E.G., RJ06-PUC-12345" value={vehicleFormData.pucNumber} onChange={handleVehicleChange} />
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <label>📝 Notes</label>
                                    <textarea rows="3" id="notes" placeholder="Additional notes..." value={vehicleFormData.notes} onChange={handleVehicleChange}></textarea>
                                </FormGroup>
                            </ModalBody>

                            <ModalFooter>
                                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>✕ Cancel</button>
                                <button type="submit" className="btn-submit">✓ Add Vehicle</button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageWrapper>
    );
}

// Styles (same as previously established framework)
const PageWrapper = styled.div` max-width: 1400px; margin: 0 auto; padding: 32px 24px; background-color: #f8fafc; min-height: 100vh; `;
const HeaderControl = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; `;
const TitleBlock = styled.div` h1 { font-size: 28px; font-weight: 700; color: #0f172a; margin: 0; } p { color: #64748b; } `;
const AddButton = styled.button` color: white; padding: 10px 20px; border: none; border-radius: 6px; background-color: #2563eb; cursor: pointer; `;
const TableCardSection = styled.div` background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; `;
const TableTopbarControls = styled.div`
    padding: 20px; 
    font-size: 16px; 
    font-weight: 600; 
    /* Yahan apna wo color code daalein jo aapne inspect mein select kiya tha */
    color: #000000; /* Example: Orange-ish color jo image mein dikh raha hai */
    border-bottom: 1px solid #e2e8f0; 
`;
const TableResponsiveWrapper = styled.div` overflow-x: auto; `;
const RegistryGridTable = styled.table`
    width: 100%; 
    border-collapse: collapse; 
    font-size: 14px;
    color: #334155; // Body text color

    thead { 
        background-color: #f8fafc; // Header light gray
        border-bottom: 2px solid #e2e8f0; 
        color: #1e293b; // Header text dark
        font-weight: 700;
    }
    
    tbody tr:hover {
        background-color: #f1f5f9; // Hover effect for clarity
    }

    th, td { 
        padding: 16px 20px; 
        border-bottom: 1px solid #e2e8f0;
    }
`;
const OwnerCell = styled.div` display: flex; align-items: center; gap: 12px; `;
const Avatar = styled.div` width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background-color: ${props => props.bg}; color: white; font-weight: 700; font-size: 11px; `;
const PlateTag = styled.span` background-color: #fff1f2; color: #e11d48; padding: 4px 8px; border-radius: 4px; font-family: monospace; `;
const StatusBadge = styled.span` padding: 4px 12px; border-radius: 20px; font-size: 12px; background: #f0fdf4; color: #16a34a; `;

// Modal Styles
const ModalOverlay = styled.div` position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 16px; `;
const ModalContent = styled.div`
    position: relative;
    z-index: 1;
    background-color: #ffffff; 
    border-radius: 12px; 
    width: 100%; 
    max-width: 680px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid #e2e8f0; /* Modal ke charon taraf border */
`;
const ModalHeader = styled.div`
    padding: 24px; 
    border-bottom: 1px solid #e2e8f0; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; /* Items ko center align karne ke liye */
    background-color: #ffffff;

    h5 { 
        font-size: 20px; 
        font-weight: 700; 
        color: #0f172a; 
        margin: 0; 
    }
    
    .modal-subtitle { 
        font-size: 13px; 
        color: #64748b; 
        margin: 4px 0 0 0; 
    }
        .close-x-btn { 
        background: #f1f5f9; /* Light background */
        border: none; 
        width: 32px; 
        height: 32px; 
        border-radius: 50%; /* Gol button ke liye */
        cursor: pointer; 
        color: #475569; 
        font-size: 16px; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        transition: all 0.2s;
        
        &:hover { 
            background: #e2e8f0; 
            color: #0f172a;
        }
    }
`;
const ModalBody = styled.div` padding: 24px; max-height: 70vh; overflow-y: auto; `;
const FormRow = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; `;
const FormGroup = styled.div`
    display: flex; flex-direction: column; width: 100%; box-sizing: border-box;

    label { display: block; font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
    
    input, select, textarea {
        width: 100%; 
        padding: 10px 14px; 
        font-size: 14px; 
        border-radius: 6px;
        /* Yahan border ko thoda dark karein taaki field dikhe */
        border: 1px solid #cbd5e1; 
        background-color: #ffffff; 
        color: #0f0f0f; 
        outline: none;
        
        /* Focus state par blue border */
        &:focus { 
            border-color: #2563eb; 
            box-shadow: 0 0 0 1px #2563eb; 
        }
    }
        
`;
const ModalFooter = styled.div` padding: 16px 24px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; background: #fafafa; .btn-submit { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; } .btn-cancel { background: #f1f5f9; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; } `;
const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    button {
        padding: 6px 12px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
    } .edit { background: #e0f2fe; color: #0284c7; }
    .view { background: #f3fff0; color: #0ee971; }
    .delete { background: #fee2e2; color: #dc2626; }
    .edit:hover { background: #bae6fd; }
    .view:hover { background: #dbeafe; }
    .delete:hover { background: #fecaca; }
`;
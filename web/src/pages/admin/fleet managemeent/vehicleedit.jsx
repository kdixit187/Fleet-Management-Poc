// VehicleEdit.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

export default function VehicleEdit({ vehicle, onClose, onRefresh }) {
  // Initialize form with the vehicle data passed from parent
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicle_id: vehicle?.vehicle_id || vehicle?.id || '',
    type: vehicle?.type || '',
    company_name: vehicle?.company_name || '',
    year: vehicle?.year || '',
    license_plate: vehicle?.license_plate || '',
    puc_number: vehicle?.puc_number || '',
    notes: vehicle?.notes || ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVehicleFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the vehicle ID from the vehicle prop
      const vehicleId = vehicle.id || vehicle.vehicle_id;
      
      console.log("Updating vehicle with ID:", vehicleId);
      console.log("Data being sent:", vehicleFormData);
const response = await fetch(`http://localhost:5000/api/vehicles/${vehicleId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        vehicle_id: vehicleFormData.vehicle_id, // backend key
        type: vehicleFormData.type,             // backend key
        company_name: vehicleFormData.company_name, // Match this!
        year: vehicleFormData.year,
        license_plate: vehicleFormData.license_plate,
        puc_number: vehicleFormData.puc_number,
        notes: vehicleFormData.notes
    })
});
      // Log the response for debugging
      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (response.ok) {
        alert("✅ Vehicle updated successfully!");
        if (onRefresh) await onRefresh();
        onClose();
      } else {
        // Show detailed error message
        const errorMsg = responseData.message || "Failed to update vehicle. Please try again.";
        alert(`❌ Error: ${errorMsg}`);
      }
    } catch (err) {
      console.error("Error updating vehicle:", err);
      alert("❌ Network error occurred while updating vehicle. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalHeader>
        <div>
          <h5>✏️ Edit Vehicle Details</h5>
          <p className="modal-subtitle">Update vehicle information in the fleet registry.</p>
        </div>
        <button type="button" className="close-x-btn" onClick={onClose}>✕</button>
      </ModalHeader>

      <form onSubmit={handleSubmit}>
        <ModalBody>
          <FormRow>
            <FormGroup>
              <label># Vehicle ID</label>
              <input 
                type="text" 
                id="vehicle_id" 
                placeholder="e.g., TRK-004" 
                value={vehicleFormData.vehicle_id} 
                onChange={handleChange} 
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <label>🚌 Type</label>
              <select 
                id="type" 
                value={vehicleFormData.type} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Type</option>
                <option value="mini">Mini Truck</option>
                <option value="heavy">Heavy Truck</option>
              </select>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <label>🏷️ Company Name</label>
              <input 
                type="text" 
                id="company_name" 
                placeholder="e.g., Cascadia" 
                value={vehicleFormData.company_name} 
                onChange={handleChange}
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <label>📅 Model Year</label>
              <input 
                type="text" 
                id="year" 
                placeholder="e.g., 2023" 
                value={vehicleFormData.year} 
                onChange={handleChange}
                disabled={loading}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <label>💳 License Plate</label>
              <input 
                type="text" 
                id="license_plate" 
                placeholder="E.G., TRK-004-NY" 
                value={vehicleFormData.license_plate} 
                onChange={handleChange}
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <label>📋 PUC Certificate Number</label>
              <input 
                type="text" 
                id="puc_number" 
                placeholder="E.G., RJ06-PUC-12345" 
                value={vehicleFormData.puc_number} 
                onChange={handleChange}
                disabled={loading}
              />
            </FormGroup>
          </FormRow>

          <UploadGridContainer>
            <UploadGroupCard>
              <label>📄 PUC Certificate</label>
              <div className="inner-uploader-box">
                <input 
                  type="file" 
                  id="pucFile" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log('File selected:', file.name);
                      // You can implement file upload logic here
                    }
                  }}
                  disabled={loading}
                />
                <label htmlFor="pucFile" className="upload-trigger">
                  📎 Choose PUC File / Drop here
                </label>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                  Supported formats: PDF, JPG, PNG (Max 5MB)
                </p>
              </div>
            </UploadGroupCard>
          </UploadGridContainer>

          <FormGroup>
            <label>📝 Notes</label>
            <textarea 
              rows="3" 
              id="notes" 
              placeholder="Additional notes about the vehicle..." 
              value={vehicleFormData.notes} 
              onChange={handleChange}
              disabled={loading}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={onClose}
            disabled={loading}
          >
            ✕ Cancel
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? '⏳ Updating...' : '✓ Update Vehicle'}
          </button>
        </ModalFooter>
      </form>
    </>
  );
}

// Styles remain the same
const ModalHeader = styled.div`
  padding: 24px; 
  border-bottom: 1px solid #e2e8f0; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
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
    background: #f1f5f9;
    border: none; 
    width: 32px; 
    height: 32px; 
    border-radius: 50%;
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
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const ModalBody = styled.div` 
  padding: 24px; 
  max-height: 70vh; 
  overflow-y: auto; 
`;

const FormRow = styled.div` 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 16px; 
  margin-bottom: 16px; 
`;

const FormGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  width: 100%; 
  box-sizing: border-box;

  label { 
    display: block; 
    font-size: 13px; 
    font-weight: 600; 
    color: #1e293b; 
    margin-bottom: 6px; 
  }
  
  input, select, textarea {
    width: 100%; 
    padding: 10px 14px; 
    font-size: 14px; 
    border-radius: 6px;
    border: 1px solid #cbd5e1; 
    background-color: #ffffff; 
    color: #0f0f0f; 
    outline: none;
    transition: all 0.2s;
    
    &:focus { 
      border-color: #2563eb; 
      box-shadow: 0 0 0 1px #2563eb; 
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f1f5f9;
    }
  }
`;

const ModalFooter = styled.div` 
  padding: 16px 24px; 
  border-top: 1px solid #e2e8f0; 
  display: flex; 
  justify-content: flex-end; 
  gap: 12px; 
  background: #fafafa; 
  
  .btn-submit { 
    background: #2563eb; 
    color: white; 
    border: none; 
    padding: 10px 24px; 
    border-radius: 6px; 
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
      background: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  } 
  
  .btn-cancel { 
    background: #f1f5f9; 
    border: none; 
    padding: 10px 24px; 
    border-radius: 6px; 
    cursor: pointer;
    font-weight: 600;
    color: #475569;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
      background: #e2e8f0;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  } 
`;

const UploadGridContainer = styled.div` 
  margin: 16px 0; 
`;

const UploadGroupCard = styled.div`
  border: 2px dashed #e2e8f0;
  padding: 20px; 
  border-radius: 10px; 
  background: #ffffff; 
  margin: 16px 0;
  
  label { 
    font-size: 13px; 
    font-weight: 600; 
    color: #475569; 
    margin-bottom: 12px; 
    display: block; 
  }
  
  .inner-uploader-box { position: relative; }
  
  input[type="file"] { display: none; }
  
  .upload-trigger { 
    display: block; 
    padding: 14px; 
    background: #f8fafc;
    border: 1px solid #cbd5e1; 
    border-radius: 8px; 
    cursor: pointer; 
    text-align: center; 
    color: #3b82f6;
    font-weight: 500;
    transition: all 0.2s;
    
    &:hover {
      background: #eff6ff;
      border-color: #3b82f6;
    }
  }
`;
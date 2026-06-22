import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function AddVehicle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    truckModelName: '',
    modelYear: '',
    numberPlate: '',
    companyOwner: '',
    rcNumber: '', // 🟢 Added
    registrationDate: '', // 🟢 Added
    chassisNumber: '', // 🟢 Added
    engineNumber: '', // 🟢 Added
    insuranceNumber: '',
    insuranceExpiry: '',
    pucNumber: '',
    pucExpiry: '',
    fitnessNumber: '', // 🟢 Added
    fitnessExpiry: '',
    permitNumber: '', // 🟢 Added
    permitExpiry: '', // 🟢 Added
    status: 'Available',
    rcFile: null // 🟢 Added for RC Upload
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileKey) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fileKey]: file }));
    }
  };

  const handleRemoveFile = (e, fileKey) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [fileKey]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    console.log("Adding New Fleet Vehicle with Docs:", formData);
    
    setTimeout(() => {
      setFormSubmitted(false);
      navigate('/fleet'); 
    }, 2000);
  };

  return (
    <PageWrapper>
      {/* Title Header Section */}
      <HeaderSection>
        <TitleBlock>
          <h1>Register New Vehicle</h1>
          <p>Onboard operational trucks and commercial logistics assets into CargoMax index.</p>
        </TitleBlock>
        
        <Link to="/fleet" style={{ textDecoration: 'none' }}>
          <NavButton type="button">
            ⬅ Fleet List
          </NavButton>
        </Link>
      </HeaderSection>

      {/* Main Container Card */}
      <FormCard>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* SECTION 1: Vehicle Specifications */}
          <div>
            <SectionTitle>Vehicle Specifications</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>Truck Model Name</label>
                <input
                  type="text"
                  name="truckModelName"
                  required
                  value={formData.truckModelName}
                  onChange={handleChange}
                  placeholder="e.g. TRK-4022"
                />
              </InputGroup>

              <InputGroup>
                <label>Model Year</label>
                <input
                  type="number"
                  name="modelYear"
                  required
                  value={formData.modelYear}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  min="2000"
                  max="2030"
                />
              </InputGroup>

              <InputGroup>
                <label>Vehicle Number Plate</label>
                <input
                  type="text"
                  name="numberPlate"
                  required
                  value={formData.numberPlate}
                  onChange={handleChange}
                  placeholder="e.g. RJ-06-PA-6666"
                  style={{ textTransform: 'uppercase' }}
                />
              </InputGroup>

              <InputGroup>
                <label>Owner / Registered Holder</label>
                <input
                  type="text"
                  name="companyOwner"
                  required
                  value={formData.companyOwner}
                  onChange={handleChange}
                  placeholder="e.g. Kartikey Lodha"
                />
              </InputGroup>

              <InputGroup>
                <label>Chassis Number</label>
                <input
                  type="text"
                  name="chassisNumber"
                  required
                  value={formData.chassisNumber}
                  onChange={handleChange}
                  placeholder="17-Digit Chassis No."
                  style={{ textTransform: 'uppercase' }}
                />
              </InputGroup>

              <InputGroup>
                <label>Engine Number</label>
                <input
                  type="text"
                  name="engineNumber"
                  required
                  value={formData.engineNumber}
                  onChange={handleChange}
                  placeholder="Engine Serial No."
                  style={{ textTransform: 'uppercase' }}
                />
              </InputGroup>

              <InputGroup>
                <label>Initial Fleet Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Available">Available (Ready for Dispatch)</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Maintenance">Under Maintenance</option>
                </select>
              </InputGroup>
            </GridContainer>
          </div>

          {/* SECTION 2: Legal Registration & Compliance */}
          <div>
            <SectionTitle>Legal Registration & Certificates</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>RC Number</label>
                <input
                  type="text"
                  name="rcNumber"
                  required
                  value={formData.rcNumber}
                  onChange={handleChange}
                  placeholder="Registration Certificate No."
                  style={{ textTransform: 'uppercase' }}
                />
              </InputGroup>

              <InputGroup>
                <label>Registration Date</label>
                <input
                  type="date"
                  name="registrationDate"
                  required
                  value={formData.registrationDate}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <label>Insurance Policy Number</label>
                <input
                  type="text"
                  name="insuranceNumber"
                  required
                  value={formData.insuranceNumber}
                  onChange={handleChange}
                  placeholder="INS-99882211"
                />
              </InputGroup>

              <InputGroup>
                <label>Insurance Expiry Date</label>
                <input
                  type="date"
                  name="insuranceExpiry"
                  required
                  value={formData.insuranceExpiry}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <label>PUC Certificate Number</label>
                <input
                  type="text"
                  name="pucNumber"
                  required
                  value={formData.pucNumber}
                  onChange={handleChange}
                  placeholder="PUCN12345678"
                />
              </InputGroup>

              <InputGroup>
                <label>PUC Expiry Date</label>
                <input
                  type="date"
                  name="pucExpiry"
                  required
                  value={formData.pucExpiry}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <label>Fitness Certificate Number</label>
                <input
                  type="text"
                  name="fitnessNumber"
                  required
                  value={formData.fitnessNumber}
                  onChange={handleChange}
                  placeholder="FIT-XXXXX"
                />
              </InputGroup>

              <InputGroup>
                <label>Vehicle Fitness Expiry</label>
                <input
                  type="date"
                  name="fitnessExpiry"
                  required
                  value={formData.fitnessExpiry}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <label>Permit Number</label>
                <input
                  type="text"
                  name="permitNumber"
                  required
                  value={formData.permitNumber}
                  onChange={handleChange}
                  placeholder="National/State Permit No."
                />
              </InputGroup>

              <InputGroup>
                <label>Permit Expiry Date</label>
                <input
                  type="date"
                  name="permitExpiry"
                  required
                  value={formData.permitExpiry}
                  onChange={handleChange}
                />
              </InputGroup>
            </GridContainer>
          </div>

          {/* SECTION 3: Document Uploads */}
          <div>
            <SectionTitle>Required Document Uploads</SectionTitle>
            <UploadGridContainer>
              <InputGroup>
                <label>Uploaded RC Document</label>
                <StyledUploadWrapper>
                  <div className="container"> 
                    <label htmlFor="rc_file_input" className="header"> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 
                      <p>Click to Upload RC Booklet/Card</p>
                    </label> 
                    <div className="footer"> 
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg> 
                      <p>{formData.rcFile ? formData.rcFile.name : "No file selected"}</p> 
                      {formData.rcFile && (
                        <svg onClick={(e) => handleRemoveFile(e, 'rcFile')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#ef4444" strokeWidth={2} /><path d="M19.5 5H4.5" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" /></svg>
                      )}
                    </div> 
                    <input id="rc_file_input" type="file" onChange={(e) => handleFileChange(e, 'rcFile')} /> 
                  </div>
                </StyledUploadWrapper>
              </InputGroup>
              <InputGroup>
                <label>PUC</label>
                <StyledUploadWrapper>
                  <div className="container"> 
                    <label htmlFor="rc_file_input" className="header"> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 
                      <p>Click to Upload RC Booklet/Card</p>
                    </label> 
                    <div className="footer"> 
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg> 
                      <p>{formData.rcFile ? formData.rcFile.name : "No file selected"}</p> 
                      {formData.rcFile && (
                        <svg onClick={(e) => handleRemoveFile(e, 'rcFile')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#ef4444" strokeWidth={2} /><path d="M19.5 5H4.5" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" /></svg>
                      )}
                    </div> 
                    <input id="rc_file_input" type="file" onChange={(e) => handleFileChange(e, 'rcFile')} /> 
                  </div>
                </StyledUploadWrapper>
              </InputGroup>
            </UploadGridContainer>
          </div>

          {/* Action Footer Button Group */}
          <FormFooter>
            <button type="submit">
              {formSubmitted ? 'Processing Asset...' : 'Finalize Registration'}
            </button>
          </FormFooter>

        </form>
      </FormCard>
    </PageWrapper>
  );
}

/* ---------------- Responsive Styled Components ---------------- */

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 94px;
  font-family: sans-serif;
  
  @media (max-width: 1024px) {
    padding: 16px 12px;
    padding-top: 86px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 16px;
    
    a {
      width: 100%;
    }
  }
`;

const TitleBlock = styled.div`
  h1 {
    font-size: 28px; 
    font-weight: bold; 
    color: #0f172a; 
    margin: 0 0 8px 0; 
    letter-spacing: -0.025em;
  }
  
  p {
    font-size: 14px; 
    color: #64748b; 
    margin: 0;
  }

  @media (max-width: 768px) {
    h1 { font-size: 22px; }
    p { font-size: 13px; }
  }
`;

const NavButton = styled.button`
  background-color: #0f172a;
  color: #cbd5e1;
  padding: 10px 20px;
  border: 1px solid #334155;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #1e293b;
    color: #ffffff;
    border-color: #475569;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px;
    text-align: center;
  }
`;

const FormCard = styled.div`
  background-color: #0b1329; 
  border-radius: 16px; 
  padding: 32px; 
  color: #ffffff; 
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 12px; 
  font-weight: bold; 
  color: #94a3b8; 
  text-transform: uppercase; 
  letter-spacing: 0.1em; 
  margin: 0 0 20px 0; 
  border-bottom: 1px solid #1e293b; 
  padding-bottom: 8px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const UploadGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 8px;

  label {
    font-size: 11px; 
    font-weight: 600; 
    color: #cbd5e1; 
    text-transform: uppercase;
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  select {
    background-color: #0f172a; 
    border: 1px solid #334155; 
    padding: 12px 16px; 
    border-radius: 8px; 
    color: #ffffff; 
    font-size: 14px; 
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  select {
    cursor: pointer;
  }
`;

const FormFooter = styled.div`
  display: flex; 
  justify-content: flex-end; 
  border-top: 1px solid #1e293b; 
  padding-top: 24px; 
  margin-top: 8px;

  button {
    background-color: #2563eb; 
    color: #ffffff; 
    padding: 12px 28px; 
    border: none; 
    border-radius: 10px; 
    font-weight: bold; 
    font-size: 14px; 
    cursor: pointer; 
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #1d4ed8;
    }
  }

  @media (max-width: 768px) {
    button {
      width: 100%; 
      padding: 14px;
    }
  }
`;

const StyledUploadWrapper = styled.div`
  .container {
    height: 200px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    gap: 10px;
    background-color: #0f172a;
    border: 1px solid #334155;
    box-sizing: border-box;
  }

  .header {
    flex: 1;
    width: 100%;
    border: 2px dashed #3b82f6;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.2s;
    box-sizing: border-box;
    
    &:hover {
      background-color: rgba(59, 130, 246, 0.05);
    }
  }

  .header svg {
    height: 45px;
  }

  .header p {
    text-align: center;
    color: #94a3b8;
    font-size: 12px;
    margin-top: 6px;
  }

  .footer {
    background-color: #1e293b;
    width: 100%;
    height: 40px;
    padding: 6px 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #cbd5e1;
    font-size: 12px;
    box-sizing: border-box;
  }

  .footer svg {
    height: 20px;
    width: 20px;
    fill: #3b82f6;
    cursor: pointer;
  }

  .footer p {
    flex: 1;
    text-align: left;
    margin: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input[type="file"] {
    display: none;
  }
`;
import React, { useState } from 'react';
import styled from 'styled-components';

export default function DriverRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    emergencyContact: '', // 🟢 Added
    addressProof: '', // 🟢 Added
    aadharCard: '',
    joiningdate: '',
    panCard: '',
    bankName: '',
    bankLocation: '',
    accountNumber: '',
    ifscCode: '',
    password: '',
    confirmPassword: '', 
    licenseNumber: '',
    licenseexpiry: '',
    licenseType: 'Heavy Commercial (HZ)',
    experience: '',
    pucNumber: '',
    pucExpiry: '',
    policeVerification: 'Pending', // 🟢 Added
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'Available',
    assignedVehicle: 'None',
    
    // File Upload Keys
    licenseFile: null,
    aadharFile: null,
    panFile: null,
    bankFile: null,
    pucFile: null,
    photoFile: null, // 🟢 Added
    medicalFile: null // 🟢 Added
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
    console.log("Submitting Comprehensive Data:", formData);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <PageWrapper>
      {/* Title Header Section */}
      <HeaderSection>
        <h1>Register New Fleet Driver</h1>
        <p>Onboard operational operators and log transport authorizations into CargoMax index.</p>
      </HeaderSection>

      {/* Main Container Card */}
      <FormCard>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* SECTION 1: Personal & Identification Records */}
          <div>
            <SectionTitle>Personal & Identification Records</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Chandra"
                />
              </InputGroup>

              <InputGroup>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ramesh@cargomax.com"
                />
              </InputGroup>

              <InputGroup>
                <label>Contact Phone</label>
                <input
                  type="number"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </InputGroup>

              <InputGroup>
                <label>Emergency Contact</label>
                <input
                  type="number"
                  name="emergencyContact"
                  required
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency Number"
                />
              </InputGroup>
{/* 
              <InputGroup>
                <label>Joining date</label>
                <input
                  type="date"
                  name="joiningdate"
                  required
                  value={formData.joiningdate}
                  onChange={handleChange}
                />
              </InputGroup> */}

              <InputGroup>
                <label>Aadhar / ID Proof String</label>
                <input
                  type="number"
                  name="aadharCard"
                  required
                  value={formData.aadharCard}
                  onChange={handleChange}
                  placeholder="ID Proof Reference Details"
                />
              </InputGroup>

              <InputGroup>
                <label>Address Details </label>
                <input
                  type="text"
                  name="addressProof"
                  required
                  value={formData.addressProof}
                  onChange={handleChange}
                  placeholder="Current Address Details"
                />
              </InputGroup>

              <InputGroup>
                <label>License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  required
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="e.g. RJ-06-2026-0012"
                />
              </InputGroup>
<InputGroup>
                <label>License Expiry</label>
                <input
                  type="date"
                  name="licenseexpiry"
                  required
                  value={formData.licenseexpiry}
                  onChange={handleChange}
                />
              </InputGroup>
                      <InputGroup>
                <label>Permit Class Type</label>
                <select
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                >
                  <option value="Heavy Commercial (HZ)">Heavy Commercial (HZ)</option>
                  <option value="Medium Commercial (MMV)">Medium Commercial (MMV)</option>
                  <option value="Light Goods Transport (LGV)">Light Goods Transport (LGV)</option>
                </select>
              </InputGroup>
              <InputGroup>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </InputGroup>

              <InputGroup>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </InputGroup>
       

              <InputGroup>
                <label>Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                  min="0"
                />
              </InputGroup>

              <InputGroup>
                <label>Police Verification Status</label>
                <select
                  name="policeVerification"
                  value={formData.policeVerification}
                  onChange={handleChange}
                >
                  <option value="Verified">Verified (Cleared)</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Failed">Rejected / Failed</option>
                </select>
              </InputGroup>
           
<InputGroup>
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  required
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="State Bank of India"
                />
              </InputGroup>

              <InputGroup>
                <label>Bank Location</label>
                <input
                  type="text"
                  name="bankLocation"
                  required
                  value={formData.bankLocation}
                  onChange={handleChange}
                  placeholder="Main Branch"
                />
              </InputGroup>

              <InputGroup>
                <label>Account Number</label>
                <input
                  type="number"
                  name="accountNumber"
                  required
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="123456789000"
                />
              </InputGroup>

              <InputGroup>
                <label>IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  required
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="SBIN0001234"
                />
              </InputGroup>
            </GridContainer>
          </div>
          {/* SECTION 4: Documentation Upload Grid */}
          <div>
            <SectionTitle>Required Documentation Uploads</SectionTitle>
            <UploadGridContainer>
              
              {/* Photo Upload */}
              <InputGroup>
                <label>Driver Photo</label>
                <StyledUploadWrapper>
                  <div className="container"> 
                    <label htmlFor="photo_file_input" className="header"> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 
                      <p>Click to Upload Photo</p>
                    </label> 
                    <div className="footer"> 
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg> 
                      <p>{formData.photoFile ? formData.photoFile.name : "Not selected file"}</p> 
                      {formData.photoFile && (
                        <svg onClick={(e) => handleRemoveFile(e, 'photoFile')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#ef4444" strokeWidth={2} /><path d="M19.5 5H4.5" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" /></svg>
                      )}
                    </div> 
                    <input id="photo_file_input" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'photoFile')} /> 
                  </div>
                </StyledUploadWrapper>
              </InputGroup>

              {/* License Document */}
              <InputGroup>
                <label>License Document</label>
                <StyledUploadWrapper>
                  <div className="container"> 
                    <label htmlFor="license_file_input" className="header"> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 
                      <p>Click to Upload License</p>
                    </label> 
                    <div className="footer"> 
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg> 
                      <p>{formData.licenseFile ? formData.licenseFile.name : "Not selected file"}</p> 
                      {formData.licenseFile && (
                        <svg onClick={(e) => handleRemoveFile(e, 'licenseFile')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#ef4444" strokeWidth={2} /><path d="M19.5 5H4.5" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" /></svg>
                      )}
                    </div> 
                    <input id="license_file_input" type="file" onChange={(e) => handleFileChange(e, 'licenseFile')} /> 
                  </div>
                </StyledUploadWrapper>
              </InputGroup>

<InputGroup>
                <label>Police verfication document</label>
                <StyledUploadWrapper>
                  <div className="container"> 
                    <label htmlFor="license_file_input" className="header"> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 
                      <p>Click to Upload License</p>
                    </label> 
                    <div className="footer"> 
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg> 
                      <p>{formData.licenseFile ? formData.licenseFile.name : "Not selected file"}</p> 
                      {formData.licenseFile && (
                        <svg onClick={(e) => handleRemoveFile(e, 'licenseFile')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#ef4444" strokeWidth={2} /><path d="M19.5 5H4.5" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" /></svg>
                      )}
                    </div> 
                    <input id="license_file_input" type="file" onChange={(e) => handleFileChange(e, 'licenseFile')} /> 
                  </div>
                </StyledUploadWrapper>
              </InputGroup>
              {/* Medical Certificate */}
              <InputGroup>
                <label>Medical Fitness Cert.</label>
                <StyledUploadWrapper>
                  <div className="container"> 
                    <label htmlFor="medical_file_input" className="header"> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 
                      <p>Upload Fitness Certificate</p>
                    </label> 
                    <div className="footer"> 
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg> 
                      <p>{formData.medicalFile ? formData.medicalFile.name : "Not selected file"}</p> 
                      {formData.medicalFile && (
                        <svg onClick={(e) => handleRemoveFile(e, 'medicalFile')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#ef4444" strokeWidth={2} /><path d="M19.5 5H4.5" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" /></svg>
                      )}
                    </div> 
                    <input id="medical_file_input" type="file" onChange={(e) => handleFileChange(e, 'medicalFile')} /> 
                  </div>
                </StyledUploadWrapper>
              </InputGroup>

              {/* ID Card Copy */}
              <InputGroup>
                <label>ID Proof File</label>
                <StyledUploadWrapper>
                  <div className="container"> 
                    <label htmlFor="aadhar_file_input" className="header"> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 
                      <p>Click to Upload ID Proof</p>
                    </label> 
                    <div className="footer"> 
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg> 
                      <p>{formData.aadharFile ? formData.aadharFile.name : "Not selected file"}</p> 
                      {formData.aadharFile && (
                        <svg onClick={(e) => handleRemoveFile(e, 'aadharFile')} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#ef4444" strokeWidth={2} /><path d="M19.5 5H4.5" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" /></svg>
                      )}
                    </div> 
                    <input id="aadhar_file_input" type="file" onChange={(e) => handleFileChange(e, 'aadharFile')} /> 
                  </div>
                </StyledUploadWrapper>
              </InputGroup>

            </UploadGridContainer>
          </div>

          {/* Action Footer Button Group */}
          <FormFooter>
            <button type="submit">
              {formSubmitted ? 'Processing...' : 'Finalize Onboarding'}
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
  padding-top: 90px;
  font-family: sans-serif;
  
  @media (max-width: 768px) {
    padding: 12px;
    padding-top: 85px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 30px;
  
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
    margin-bottom: 20px;
    h1 { font-size: 22px; }
    p { font-size: 13px; }
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
  display: flex; 
  flex-wrap: wrap; 
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const UploadGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const InputGroup = styled.div`
  flex: 1 1 280px; 
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
  input[type="email"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  input[type="password"],
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

  @media (max-width: 768px) {
    flex: 1 1 100%; 
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
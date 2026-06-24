  import React, { useState } from 'react';
  import styled from 'styled-components';

  export default function DriverFleetDirectory() {
    // 🟢 State: Modal ओपन/क्लोज कंट्रोलर
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      conformpassword: '',
      emergencyContact: '',
      addressProof: '',
      aadharCard: '',
      panCard: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      bankBranch: '',
      medicalReport: '',
      policeVerification: '',
      licenseNumber: '',
      experience: '',
      
      // File upload states
      licenseFile: null,
      policeFile: null,
      bankFile: null,
      medicalFile: null,
      aadharFile: null
    });

    // परफेक्ट लाइव डेटा मैट्रिक्स
    const driversData = [
      { sr: "#001", initials: "KL", avatarBg: "#0ea5e9", name: "Kartikey Lodha", phone: "+91 98765 43210", dob: "18-05-2002", address: "Bhilwara, Rajasthan", status: "On Duty" }
    ];

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

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setIsModalOpen(false);
        // सबमिट होने के बाद फॉर्म खाली करने के लिए:
        setFormData({
          fullName: '', email: '', phone: '', password: '', conformpassword: '',
          emergencyContact: '', addressProof: '', aadharCard: '', panCard: '',
          bankName: '', accountNumber: '', ifscCode: '', bankBranch: '',
          medicalReport: '', policeVerification: '', licenseNumber: '', experience: '',
          licenseFile: null, policeFile: null, bankFile: null, medicalFile: null, aadharFile: null
        });
      }, 2000);
    };

    return (
      <PageWrapper>
        {/* 1. Page Title Header Control Panel */}
        <HeaderControl>
          <TitleBlock>
            <h1>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="title-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
              Driver Fleet Directory
            </h1>
            <p>Onboard operational operators and log transport authorizations into CargoMax index.</p>
          </TitleBlock>
          <AddButton type="button" onClick={() => setIsModalOpen(true)}>
            + Add Driver
          </AddButton>
        </HeaderControl>

        {/* 2. Ribbon Metrics Dashboard Cards */}
        <StatsGrid>
          <StatCard>
            <IconBox bg="#eff6ff" color="#2563eb">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </IconBox>
            <div className="stat-info">
              <span className="lbl">Total Drivers</span>
              <span className="val">50</span>
              <span className="sub">+3 this month</span>
            </div>
          </StatCard>

          <StatCard>
            <IconBox bg="#f0fdf4" color="#16a34a">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 4 12 14.01 9 11.01"/><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/></svg>
            </IconBox>
            <div className="stat-info">
              <span className="lbl">Active Drivers</span>
              <span className="val">38</span>
              <span className="sub text-success">↑ 90% utilization</span>
            </div>
          </StatCard>

          <StatCard>
            <IconBox bg="#e0f2fe" color="#0284c7">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
            </IconBox>
            <div className="stat-info">
              <span className="lbl">Fleet Efficiency</span>
              <span className="val">94%</span>
              <span className="sub text-success">↑ +5% from last month</span>
            </div>
          </StatCard>
        </StatsGrid>

        {/* 3. Driver Ledger Table Sheet Framework */}
        <TableCardSection>
          <TableTopbarControls>
            <div className="title-area">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Active Registry Ledger
            </div>
            <RightInputGroupControl>
              <div className="search-input-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="12" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search drivers..." />
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
                  <th style={{ width: '80px' }}>Sr. No</th>
                  <th>Driver Name</th>
                  <th>Phone Number</th>
                  <th>Date of Birth</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center', width: '160px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {driversData.map((driver) => (
                  <tr key={driver.sr}>
                    <td className="font-mono text-muted">{driver.sr}</td>
                    <td>
                      <DriverProfileBox>
                        <AvatarBadge bg={driver.avatarBg}>{driver.initials}</AvatarBadge>
                        <span className="font-bold text-dark">{driver.name}</span>
                      </DriverProfileBox>
                    </td>
                    <td className="font-semibold text-dark">{driver.phone}</td>
                    <td className="text-muted">{driver.dob}</td>
                    <td className="text-dark">{driver.address}</td>
                    <td>
                      <StatusBadge>{driver.status}</StatusBadge>
                    </td>
                    <td>
                      <ActionButtonsWrapper>
                        <button className="icon-btn-view" title="View Details">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="icon-btn-edit" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        </button>
                        <button className="icon-btn-delete" title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </ActionButtonsWrapper>
                    </td>
                  </tr>
                ))}
              </tbody>
            </RegistryGridTable>
          </TableResponsiveWrapper>
        </TableCardSection>

        {/* 4. Complete Driver Onboarding Popup Modal Layout */}
        {isModalOpen && (
          <ModalOverlay onClick={() => setIsModalOpen(false)}>
            {/* <form> टैग को यहाँ पूरे कंटेंट स्ट्रक्चर के ऊपर रखा गया है */}
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '720px' }}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <div>
                    <h5><i className="bi bi-person-badge text-primary me-2"></i>Onboard New Operational Driver</h5>
                    <p className="modal-subtitle">Fill out personal info, credentials, and scan-copy document infrastructure mappings.</p>
                  </div>
                  <button type="button" className="close-x-btn" onClick={() => setIsModalOpen(false)}>✕</button>
                </ModalHeader>

                <ModalBody>
                  <FormSectionTitle><i className="bi bi-person-lines-fill me-2"></i>Personal Details</FormSectionTitle>
                  <FormRow>
                    <FormGroup>
                      <label htmlFor="fullName">Full Name</label>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Kartikey Lodha" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="phone">Phone No.</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9664153249" required />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. driver@gmail.com" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="......" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="conformpassword">Confirm Password</label>
                      <input type="password" id="conformpassword" name="conformpassword" value={formData.conformpassword} onChange={handleChange} placeholder="..........." required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="experience">Years of Experience</label>
                      <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 5" required />
                    </FormGroup>
                  </FormRow>

                  <FormSectionTitle><i className="bi bi-file-earmark-medical me-2"></i>Identity Verification &amp; Licensing</FormSectionTitle>
                  <FormRow columns="3">
                    <FormGroup>
                      <label htmlFor="licenseNumber">Licence Number</label>
                      <input type="text" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="e.g. RJ06-2022001" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="bankName">Bank Name</label>
                      <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. State Bank of India" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="accountNumber">Bank Account Number</label>
                      <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Enter account number" required />
                    </FormGroup>
                  </FormRow>

                  <FormRow columns="3">
                    <FormGroup>
                      <label htmlFor="ifscCode">IFSC Code</label>
                      <input type="text" id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="e.g. SBIN0001234" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="bankBranch">Bank Branch</label>
                      <input type="text" id="bankBranch" name="bankBranch" value={formData.bankBranch} onChange={handleChange} placeholder="e.g. Bhilwara Main" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="aadharCard">Aadhaar Card Number</label>
                      <input type="text" id="aadharCard" name="aadharCard" value={formData.aadharCard} onChange={handleChange} placeholder="[Aadhaar Redacted]" required />
                    </FormGroup>
                  </FormRow>

                  <FormRow columns="3">
                    <FormGroup>
                      <label htmlFor="panCard">PAN Card Number (Optional)</label>
                      <input type="text" id="panCard" name="panCard" value={formData.panCard} onChange={handleChange} placeholder="e.g. ABCDE1234F" />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="medicalReport">Medical Report</label>
                      <input type="text" id="medicalReport" name="medicalReport" value={formData.medicalReport} onChange={handleChange} placeholder="Status / Fitness Reference" required />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="policeVerification">Police Verification</label>
                      <input type="text" id="policeVerification" name="policeVerification" value={formData.policeVerification} onChange={handleChange} placeholder="Pending / Approved" required />
                    </FormGroup>
                  </FormRow>

                  <FormSectionTitle><i className="bi bi-cloud-upload me-2"></i>Required Document Uploads</FormSectionTitle>
                  <UploadGridContainer>
                    <UploadGroupCard>
                      <label>Driving Licence</label>
                      <div className="inner-uploader-box">
                        <i className="bi bi-card-text fs-3 text-primary"></i>
                        <input type="file" id="licenseFile" onChange={(e) => handleFileChange(e, 'licenseFile')} />
                        <label htmlFor="licenseFile" className="upload-trigger">
                          {formData.licenseFile ? formData.licenseFile.name : 'Choose File / Drop here'}
                        </label>
                      </div>
                    </UploadGroupCard>

                    <UploadGroupCard>
                      <label>Police Certification</label>
                      <div className="inner-uploader-box">
                        <i className="bi bi-shield-check fs-3 text-primary"></i>
                        <input type="file" id="policeFile" onChange={(e) => handleFileChange(e, 'policeFile')} />
                        <label htmlFor="policeFile" className="upload-trigger">
                          {formData.policeFile ? formData.policeFile.name : 'Choose File / Drop here'}
                        </label>
                      </div>
                    </UploadGroupCard>

                    <UploadGroupCard>
                      <label>Bank Passbook</label>
                      <div className="inner-uploader-box">
                        <i className="bi bi-journal-bookmark fs-3 text-primary"></i>
                        <input type="file" id="bankFile" onChange={(e) => handleFileChange(e, 'bankFile')} />
                        <label htmlFor="bankFile" className="upload-trigger">
                          {formData.bankFile ? formData.bankFile.name : 'Choose File / Drop here'}
                        </label>
                      </div>
                    </UploadGroupCard>

                    <UploadGroupCard>
                      <label>Medical Certificate</label>
                      <div className="inner-uploader-box">
                        <i className="bi bi-file-earmark-medical fs-3 text-primary"></i>
                        <input type="file" id="medicalFile" onChange={(e) => handleFileChange(e, 'medicalFile')} />
                        <label htmlFor="medicalFile" className="upload-trigger">
                          {formData.medicalFile ? formData.medicalFile.name : 'Choose File / Drop here'}
                        </label>
                      </div>
                    </UploadGroupCard>

                    <UploadGroupCard>
                      <label>Aadhaar Card Copy</label>
                      <div className="inner-uploader-box">
                        <i className="bi bi-card-heading fs-3 text-primary"></i>
                        <input type="file" id="aadharFile" onChange={(e) => handleFileChange(e, 'aadharFile')} />
                        <label htmlFor="aadharFile" className="upload-trigger">
                          {formData.aadharFile ? formData.aadharFile.name : 'Choose File / Drop here'}
                        </label>
                      </div>
                    </UploadGroupCard>
                  </UploadGridContainer>
                </ModalBody>

                <ModalFooter>
                  <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  {/* बटन का type "submit" किया गया है ताकि यह फॉर्म ट्रिगर कर सके */}
                  <button type="submit" className="btn-submit">{formSubmitted ? 'Saving...' : 'Add Driver'}</button>
                </ModalFooter>
              </ModalContent>
            </form>
          </ModalOverlay>
        )}
      </PageWrapper>
    );
  }

  /* ---------------- Responsive Styled Framework Core Layout ---------------- */
  const PageWrapper = styled.div`
      max-width: 1400px;
      margin: 0 auto;
      padding: 32px 24px;
      padding-top: 110px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f8fafc;
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
          gap: 8px;
          .title-icon { color: #2563eb; }
      }
      p { font-size: 14px; color: #64748b; margin: 4px 0 0 0; }
  `;

  const AddButton = styled.button`
      color: #ffffff; padding: 10px 20px; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;
      background-color: #2563eb; transition: background-color 0.15s ease; white-space: nowrap;
      &:hover { background-color: #1d4ed8; }
  `;

  const StatsGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 32px;
      @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 576px) { grid-template-columns: 1fr; }
  `;

  const StatCard = styled.div`
      background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      .stat-info { display: flex; flex-direction: column; }
      .lbl { font-size: 13px; color: #64748b; font-weight: 500; }
      .val { font-size: 24px; font-weight: 700; color: #0f172a; margin: 4px 0; line-height: 1; }
      .sub { font-size: 12px; color: #94a3b8; }
      .text-success { color: #16a34a; font-weight: 500; }
  `;

  const IconBox = styled.div`
      width: 48px; height: 48px; border-radius: 8px; background-color: ${props => props.bg}; color: ${props => props.color};
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  `;

  const TableCardSection = styled.div`
      background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  `;

  const TableTopbarControls = styled.div`
      padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid #f1f5f9;
      .title-area { font-size: 16px; font-weight: 600; color: #1e293b; }
  `;

  const RightInputGroupControl = styled.div`
      display: flex; align-items: center; gap: 10px;
      .search-input-box {
          display: flex; align-items: center; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 12px; color: #94a3b8;
          input { border: none; outline: none; font-size: 13px; color: #1e293b; padding-left: 8px; background: transparent; }
      }
      .btn-action-util {
          background: #ffffff; border: 1px solid #cbd5e1; padding: 7px 14px; font-size: 13px; font-weight: 500; color: #475569; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;
          &:hover { background: #f8fafc; }
      }
  `;

  const TableResponsiveWrapper = styled.div` width: 100%; overflow-x: auto; `;

  const RegistryGridTable = styled.table`
      width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;
      thead tr { border-bottom: 1px solid #e2e8f0; background-color: #fafafa; color: #475569; font-size: 12px; font-weight: 600; }
      th, td { padding: 14px 20px; white-space: nowrap; vertical-align: middle; }
      tbody tr { border-bottom: 1px solid #f1f5f9; &:hover { background-color: #f8fafc; } }
      .font-mono { font-family: monospace; color: #64748b; }
      .font-bold { font-weight: 600; }
  `;

  const DriverProfileBox = styled.div` display: flex; align-items: center; gap: 12px; `;

  const AvatarBadge = styled.div`
      width: 32px; height: 32px; border-radius: 50%; color: #ffffff; font-weight: 700; font-size: 11px;
      display: flex; align-items: center; justify-content: center; background-color: ${props => props.bg};
  `;

  const StatusBadge = styled.span`
      padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; background-color: #f0fdf4; color: #16a34a;
      &::before { content: "●"; font-size: 8px; }
  `;

  const ActionButtonsWrapper = styled.div`
      display: flex; align-items: center; gap: 8px;
      button { background: #ffffff; border: 1px solid #e2e8f0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
      .icon-btn-view { color: #2563eb; &:hover { background: #eff6ff; border-color: #bfdbfe; } }
      .icon-btn-edit { color: #d97706; &:hover { background: #fffbeb; border-color: #fde68a; } }
      .icon-btn-delete { color: #dc2626; &:hover { background: #fef2f2; border-color: #fca5a5; } }
  `;

  /* ---------------- SCROLLABLE POPUP MODAL ---------------- */
  const ModalOverlay = styled.div`
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(15, 23, 42, 0.3); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 16px;
  `;

  const ModalContent = styled.div`
      background-color: #ffffff; border-radius: 12px; width: 100%; display: flex; flex-direction: column; overflow: hidden; animation: modalSlideIn 0.2s ease-out;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
      @keyframes modalSlideIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
  `;

  const ModalHeader = styled.div`
      padding: 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start;
      h5 { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0; }
      .modal-subtitle { font-size: 13px; color: #64748b; margin: 6px 0 0 0; }
      .close-x-btn { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }
  `;

  const ModalBody = styled.div` padding: 24px; max-height: 65vh; overflow-y: auto; `;

  const FormSectionTitle = styled.h6` font-size: 13px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; margin: 24px 0 16px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; &:first-of-type { margin-top: 0; } `;

  const FormRow = styled.div`
      display: grid; grid-template-columns: ${props => props.columns === '3' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'}; gap: 16px; margin-bottom: 16px;
      @media (max-width: 576px) { grid-template-columns: 1fr; }
  `;

  const FormGroup = styled.div`
      display: flex; flex-direction: column; width: 100%;
      label { display: block; font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
      input[type="text"], input[type="tel"], input[type="email"], input[type="number"], input[type="password"], input[type="date"], select {
          width: 100%; padding: 10px 14px; font-size: 14px; border-radius: 6px; border: 1px solid #cbd5e1; background-color: #ffffff; color: #0f172a; outline: none; box-sizing: border-box;
          &:focus { border-color: #2563eb; box-shadow: 0 0 0 1px #2563eb; }
      }
  `;

  const UploadGridContainer = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; @media (max-width: 576px) { grid-template-columns: 1fr; } `;

  const UploadGroupCard = styled.div`
      display: flex; flex-direction: column;
      label { font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
      .inner-uploader-box {
          border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 8px; background: #f8fafc;
          input[type="file"] { display: none; }
          .upload-trigger { font-size: 12px; color: #475569; font-weight: 500; cursor: pointer; text-align: center; }
      }
  `;

  const ModalFooter = styled.div`
      padding: 16px 24px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; background-color: #fafafa;
      button { padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px; cursor: pointer; border: none; }
      .btn-cancel { background-color: #f1f5f9; color: #475569; }
      .btn-submit { background-color: #2563eb; color: #ffffff; }
  `;
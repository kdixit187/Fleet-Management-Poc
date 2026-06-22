import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function MaintenanceLogs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    maintenanceType: 'Scheduled Service',
    serviceDate: new Date().toISOString().split('T')[0],
    workshopLocation: '',
    cost: '',
    odometerReading: '',
    description: '',
    nextServiceDate: '',
    mechanicName: '',
    status: 'Pending'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    console.log("Logging Maintenance Activity:", formData);
    
    setTimeout(() => {
      setFormSubmitted(false);
      navigate('/maintenance'); // लॉग सबमिट होने के बाद वापस फ्लीट या मेंटेनेंस लिस्ट पर भेज देगा
    }, 2000);
  };

  return (
    <PageWrapper>
      {/* Title Header Section */}
      <HeaderSection>
        <TitleBlock>
          <h1>Log Maintenance Activity</h1>
          <p>Record vehicle repairs, scheduled tune-ups, and structural fitness updates into CargoMax index.</p>
        </TitleBlock>
        
        <Link to="/maintenance" style={{ textDecoration: 'none' }}>
          <NavButton type="button">
            ⬅ maintenance List
          </NavButton>
        </Link>
      </HeaderSection>

      {/* Main Container Card */}
      <FormCard>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* SECTION 1: Service Record & Vehicle Metadata */}
          <div>
            <SectionTitle>Service Record & Vehicle Details</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>Vehicle Number Plate</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  required
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g. RJ-06-PA-6666"
                  style={{ textTransform: 'uppercase' }}
                />
              </InputGroup>

              <InputGroup>
                <label>Maintenance Classification</label>
                <select
                  name="maintenanceType"
                  value={formData.maintenanceType}
                  onChange={handleChange}
                >
                  <option value="Scheduled Service">Scheduled Routine Service</option>
                  <option value="Breakdown Repair">Emergency Breakdown Repair</option>
                  <option value="Tire Replacement">Tire Maintenance / Replacement</option>
                  <option value="Engine/Transmission">Engine & Transmission Work</option>
                  <option value="Body/Paint">Bodywork & Fitness Upgrades</option>
                </select>
              </InputGroup>

              <InputGroup>
                <label>Service Entry Date</label>
                <input
                  type="date"
                  name="serviceDate"
                  required
                  value={formData.serviceDate}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <label>Odometer Reading (KM)</label>
                <input
                  type="number"
                  name="odometerReading"
                  required
                  value={formData.odometerReading}
                  onChange={handleChange}
                  placeholder="e.g. 45200"
                  min="0"
                />
              </InputGroup>

              <InputGroup>
                <label>Maintenance Center / Workshop</label>
                <input
                  type="text"
                  name="workshopLocation"
                  required
                  value={formData.workshopLocation}
                  onChange={handleChange}
                  placeholder="e.g. Balaji Truck Service, Bhilwara"
                />
              </InputGroup>
            </GridContainer>
          </div>

          {/* SECTION 2: Financial Details & Technical Notes */}
          <div>
            <SectionTitle>Financials & Technical Sign-off</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>Total Expense Cost (INR)</label>
                <input
                  type="number"
                  name="cost"
                  required
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="e.g. 15450"
                  min="0"
                />
              </InputGroup>

              <InputGroup>
                <label>Next Service Reminder Date</label>
                <input
                  type="date"
                  name="nextServiceDate"
                  required
                  value={formData.nextServiceDate}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <label>Assigned Supervisor / Mechanic</label>
                <input
                  type="text"
                  name="mechanicName"
                  value={formData.mechanicName}
                  onChange={handleChange}
                  placeholder="e.g. Suresh Kumar"
                />
              </InputGroup>

              <InputGroup>
                <label>Current Asset Operational Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Under Maintenance (In Workshop)</option>
                  <option value="Completed">Resolved & Available (Ready for maintenance)</option>
                </select>
              </InputGroup>

              <InputGroup style={{ flex: '1 1 100%' }}>
                <label>Repair Breakdown & Description Notes</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the structural engine tuning, parts replaced or issues resolved..."
                  style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'sans-serif',
                    resize: 'vertical'
                  }}
                />
              </InputGroup>
            </GridContainer>
          </div>

          {/* Action Footer Button Group */}
          <FormFooter>
            <button type="submit">
              {formSubmitted ? 'Logging Activity...' : 'Finalize Maintenance Log'}
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
  padding-top: 94px; /* नियत नेवबार के नीचे रखने के लिए स्पेस */
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
  display: flex; 
  flex-wrap: wrap; 
  gap: 24px;

  @media (max-width: 768px) {
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
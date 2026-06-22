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
      insuranceNumber: '',
      insuranceExpiry: '',
      pucNumber: '',
      pucExpiry: '',
      fitnessExpiry: '',
      status: 'Available'
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormSubmitted(true);
      
      // यहाँ आप अपनी API कॉल जोड़ सकते हैं
      console.log("Adding New Fleet Vehicle:", formData);
      
      setTimeout(() => {
        setFormSubmitted(false);
        navigate('/fleet'); // गाड़ी ऐड होने के बाद वापस लिस्ट पर भेज देगा
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
                  <label>Number Plate</label>
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
                  <label>Company Owner / Registered Holder</label>
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

            {/* SECTION 2: Compliance & Legal Certificates */}
            <div>
              <SectionTitle>Compliance & Legal Certificates</SectionTitle>
              <GridContainer>
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
                  <label>Vehicle Fitness Expiry</label>
                  <input
                    type="date"
                    name="fitnessExpiry"
                    required
                    value={formData.fitnessExpiry}
                    onChange={handleChange}
                  />
                </InputGroup>
              </GridContainer>
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
    padding-top: 94px; /* नेवबार के नीचे रखने के लिए स्पेस */
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
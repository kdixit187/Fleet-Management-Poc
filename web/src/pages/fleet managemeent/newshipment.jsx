import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateShipment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipmentId: 'CMS-' + Math.floor(100000 + Math.random() * 900000), // ऑटो-जेनरेटेड आईडी
    clientName: '',
    contactEmail: '',
    originCity: '',
    destinationCity: '',
    cargoType: 'General Cargo',
    weight: '',
    assignedVehicle: '',
    assignedDriver: '',
    estimatedDelivery: '',
    status: 'Dispatched'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    console.log("Creating New Logistics Shipment:", formData);
    
    setTimeout(() => {
      setFormSubmitted(false);
      navigate('/shipments'); // शिपमेंट क्रिएट होने के बाद ऑल शिपमेंट्स लिस्ट पर भेज देगा
    }, 2000);
  };

  return (
    <PageWrapper>
      {/* Title Header Section */}
      <HeaderSection>
        <TitleBlock>
          <h1>Create New Shipment</h1>
          <p>Initialize cargo manifests, assign transit routes, and log tactical client delivery orders.</p>
        </TitleBlock>
{/*         
        <Link to="/shipments" style={{ textDecoration: 'none' }}>
          <NavButton type="button">
            ⬅ All Shipments
          </NavButton>
        </Link> */}
      </HeaderSection>

      {/* Main Container Card */}
      <FormCard>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* SECTION 1: Client & Booking Information */}
          <div>
            <SectionTitle>Client & Booking Details</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>Shipment Reference ID</label>
                <input
                  type="text"
                  name="shipmentId"
                  disabled
                  value={formData.shipmentId}
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
              </InputGroup>

              <InputGroup>
                <label>Client / Company Name</label>
                <input
                  type="text"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="e.g. Reliance Industries"
                />
              </InputGroup>

              <InputGroup>
                <label>Contact Email Address</label>
                <input
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="logistics@client.com"
                />
              </InputGroup>
            </GridContainer>
          </div>

          {/* SECTION 2: Route & Cargo Specifications */}
          <div>
            <SectionTitle>Route & Cargo Specifications</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>Origin (Source City)</label>
                <input
                  type="text"
                  name="originCity"
                  required
                  value={formData.originCity}
                  onChange={handleChange}
                  placeholder="e.g. Jaipur"
                />
              </InputGroup>

              <InputGroup>
                <label>Destination (Target City)</label>
                <input
                  type="text"
                  name="destinationCity"
                  required
                  value={formData.destinationCity}
                  onChange={handleChange}
                  placeholder="e.g. Bhilwara"
                />
              </InputGroup>

              <InputGroup>
                <label>Cargo Classification</label>
                <select
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleChange}
                >
                  <option value="General Cargo">General Goods</option>
                  <option value="Electronics">Sensitive Electronics</option>
                  <option value="Industrial Gears">Heavy Industrial Machinery</option>
                  <option value="Textile Fabric">Textile & Garments</option>
                  <option value="Chemicals">Hazardous/Chemical Materials</option>
                </select>
              </InputGroup>

              <InputGroup>
                <label>Gross Weight (Tons / KG)</label>
                <input
                  type="text"
                  name="weight"
                  required
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 14 Tons"
                />
              </InputGroup>

              <InputGroup>
                <label>Estimated Delivery Date</label>
                <input
                  type="date"
                  name="estimatedDelivery"
                  required
                  value={formData.estimatedDelivery}
                  onChange={handleChange}
                />
              </InputGroup>
            </GridContainer>
          </div>

          {/* SECTION 3: Resource Allocation */}
          <div>
            <SectionTitle>Resource Allocation</SectionTitle>
            <GridContainer>
              <InputGroup>
                <label>Assign Fleet Vehicle</label>
                <input
                  type="text"
                  name="assignedVehicle"
                  required
                  value={formData.assignedVehicle}
                  onChange={handleChange}
                  placeholder="e.g. TRK-4022 (RJ-06-PA-6666)"
                />
              </InputGroup>

              <InputGroup>
                <label>Assign Lead Driver</label>
                <input
                  type="text"
                  name="assignedDriver"
                  required
                  value={formData.assignedDriver}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Chandra"
                />
              </InputGroup>

              <InputGroup>
                <label>Initial Dispatch Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Dispatched">Dispatched (In Transit)</option>
                  <option value="Loading">Loading Cargo</option>
                  <option value="Pending">Manifest Pending</option>
                </select>
              </InputGroup>
            </GridContainer>
          </div>

          {/* Action Footer Button Group */}
          <FormFooter>
            <button type="submit">
              {formSubmitted ? 'Dispatched Orders...' : 'Create & Manifest Shipment'}
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
  input[type="email"],
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
    font-family: sans-serif;
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
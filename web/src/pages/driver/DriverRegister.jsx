import React, { useState } from 'react';

export default function DriverRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseType: 'Heavy Commercial (HZ)',
    experience: '',
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'Available',
    assignedVehicle: 'None'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Title Header Section (Fixed White Text Layer) */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0', tracking: '-0.025em' }}>
          Register New Fleet Driver
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
          Onboard operational operators and log transport authorizations into CargoMax index.
        </p>
      </div>

      {/* Main Container Card */}
      <div style={{ backgroundColor: '#0b1329', borderRadius: '16px', padding: '32px', color: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* SECTION 1: Personal Information */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px 0', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              Personal Information
            </h3>
            
            {/* Flex Matrix row layout configuration */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Chandra"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ramesh@cargomax.com"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Contact Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Licensing Information */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px 0', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              Commercial License Credentials
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  required
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="e.g. RJ-06-2026-0012"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Permit Class Type</label>
                <select
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="Heavy Commercial (HZ)">Heavy Commercial (HZ)</option>
                  <option value="Medium Commercial (MMV)">Medium Commercial (MMV)</option>
                  <option value="Light Goods Transport (LGV)">Light Goods Transport (LGV)</option>
                </select>
              </div>

              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Action Footer Button Group */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1e293b', paddingTop: '24px', marginTop: '8px' }}>
            <button
              type="submit"
              style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 28px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Finalize Onboarding
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
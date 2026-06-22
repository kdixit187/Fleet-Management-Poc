  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  export default function Login() {
  if (
  credentials.username === 'myadmin' &&
  credentials.password === 'mypassword'
) {
  navigate('/dashboard');
}

    const handleSubmit = (e) => {
    e.preventDefault();
    
    // Strict admin credential validation check
    if (credentials.username === 'admin' && credentials.password === '12345') {
      navigate('/dashboard'); // Sahi hone par entry milegi
    } else {
      alert('Invalid Credentials! Username: admin, Password: 12345 use karein.');
    }
  };

    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ backgroundColor: '#0b1329', width: '100%', maxWidth: '420px', borderRadius: '16px', border: '1px solid #1e293b', padding: '40px 32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          
          {/* Branding Branding */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>CargoMax</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>Logistics & Fleet Management Console</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* User Console */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Operator Username</label>
              <input 
                type="text" 
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none' }} 
                required 
              />
            </div>

            {/* Password Console */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Security Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px 16px', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none' }} 
                required 
              />
            </div>

            {/* Submit Trigger */}
            <button 
              type="submit" 
              style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Secure Authorization
            </button>
          </form>

        </div>
      </div>
    );
  }
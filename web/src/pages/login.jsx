import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TEMPORARY - Admin login (Remove when backend is ready)
    if (credentials.email === 'admin' && credentials.password === '12345') {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Admin User');
      navigate('/dashboard');  // 🔴 Admin Dashboard
      setLoading(false);
      return;
    }

    // TEMPORARY - Driver login (Remove when backend is ready)
    if (credentials.email === 'driver' && credentials.password === '12345') {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', 'driver');
      localStorage.setItem('userName', 'Driver User');
      navigate('/driver-dashboard');  // 🔴 Driver Dashboard
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role || 'driver');
        localStorage.setItem('userName', data.driver?.name || 'User');
        localStorage.setItem('userEmail', data.driver?.email || '');

        // 🔴 Role based redirect
        if (data.role === 'admin') {
          navigate('/dashboard');  // 🔴 Admin Dashboard
        } else {
          navigate('/driver-dashboard');  // 🔴 Driver Dashboard
        }
      } else {
        alert(data.message || 'Login failed!');
      }
    } catch (error) {
      alert('सर्वर से कनेक्ट नहीं हो पा रहा है। कृपया बाद में प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <div className="branding-container">
          <p className="title">CargoMax</p>
          <p className="subtitle">Logistics & Fleet Management Console</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-block">
            <label className="input-label">Operator Identification (Driver / Admin)</label>
            <input 
              type="text" 
              name="email"
              className="input" 
              placeholder="Enter user name" 
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-block">
            <label className="input-label">Security Authorization Password</label>
            <input 
              type="password" 
              name="password"
              className="input" 
              placeholder="••••••••" 
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="form-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
}



// ... rest of your styled components remain the same

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* --- बैकग्राउंड इमेज सेटिंग्स --- */
  background-image: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), 
                    url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 20px;

  .form-container {
    width: 100%;
    max-width: 420px;
    background-color: #ffffff;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    box-sizing: border-box;
    padding: 48px 36px;
    backdrop-filter: blur(8px);
  }

  .branding-container {
    text-align: center;
    margin-bottom: 36px;
  }

  .title {
    font-size: 30px;
    font-weight: 800;
    color: #4f46e5;
    margin: 0 0 6px 0;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
    font-weight: 500;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-label {
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .input {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    outline: none;
    box-sizing: border-box;
    padding: 14px 16px;
    color: #1e293b;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .input:focus {
    border-color: #4f46e5;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.05);
  }

  .input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .page-link {
    margin: -10px 0 0 0;
    text-align: end;
  }

  .page-link-label {
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }

  .page-link-label:hover {
    color: #4f46e5;
  }

  .form-btn {
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: #4f46e5;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  }

  .form-btn:hover:not(:disabled) {
    background: #4338ca;
  }

  .form-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .form-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .sign-up-label {
    text-align: center;
    margin: 0 0 24px 0;
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
  }

  .sign-up-link {
    margin-left: 3px;
    color: #4f46e5;
    cursor: pointer;
    font-weight: 700;
    text-decoration: none;
  }
  
  .sign-up-link:hover {
    text-decoration: underline;
  }

  .separator {
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
    line-height: 0.1em;
    margin: 10px 0 24px 0;
  }

  .separator span {
    background: #fff;
    padding: 0 10px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 500;
  }

  .buttons-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  .apple-login-button,
  .google-login-button {
    flex: 1;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    gap: 8px;
    transition: all 0.2s ease;
  }

  .apple-login-button {
    background-color: #0f172a;
    color: #fff;
    border: 1px solid #0f172a;
  }

  .apple-login-button:hover {
    background-color: #020617;
  }

  .google-login-button {
    background-color: #ffffff;
    color: #334155;
    border: 1px solid #e2e8f0;
  }

  .google-login-button:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }

  .apple-icon,
  .google-icon {
    font-size: 18px;
  }
`;

export default Form;
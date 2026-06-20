import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // पहले से इम्पोर्टेड है
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();

  // Controlled component state initialization
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // CargoMax Strict Verification Logic
    if (credentials.email === 'admin' && credentials.password === '12345') {
      navigate('/dashboard');
    } else {
      alert('Invalid Credentials! Identity Verified Username: admin, Password: 12345 use karein.');
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
              placeholder="Enter admin name" 
              value={credentials.email}
              onChange={handleChange}
              required
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
            />
          </div>

          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>

          <button type="submit" className="form-btn">Secure Authorization</button>
        </form>

        {/* --- यहाँ Sign up को Link से बदल दिया गया है --- */}
        <p className="sign-up-label">
          Don't have an account? <Link to="/signup" className="sign-up-link">Sign up</Link>
        </p>

        <div className="separator">
          <span>or continue with</span>
        </div>

        <div className="buttons-container">
          <div className="apple-login-button">
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} className="apple-icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z" />
            </svg>
            <span>Apple</span>
          </div>
          
          <div className="google-login-button">
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <span>Google</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

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
    background-color: #ffffff; /* डार्क बैकग्राउंड पर व्हाइट कार्ड सबसे अच्छा लगेगा */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    box-sizing: border-box;
    padding: 48px 36px;
    backdrop-filter: blur(8px); /* कार्ड के पीछे हल्का ब्लर इफेक्ट */
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

  .form-btn:hover {
    background: #4338ca;
  }

  .form-btn:active {
    transform: scale(0.98);
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
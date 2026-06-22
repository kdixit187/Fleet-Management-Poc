import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Screen layout dynamically track karne ke liye event monitor setup
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left Section */}
        <div className="navbar-left">
          <button
            className={`mobile-menu-btn ${isSidebarOpen ? 'open' : ''}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <div className="search-bar-container" style={{ maxWidth: isMobile ? '140px' : 'auto' }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={isMobile ? "Search..." : "Search shipments, clients, orders..."}
              className="search-input"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Avatar Base Anchor Area */}
          <div className="nav-profile" style={{ position: 'relative' }}>
            <div
              className="profile-avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              A
            </div>

            {/* 🎯 FIXED DROPDOWN POSITIONING MATRIX */}
            {isDropdownOpen && (
              <div 
                className="profile-dropdown" 
                style={{ 
                  position: 'absolute', 
                  // 📱 Mobile screen optimization rule: Right coordinate forced bounds safe layout
                  right: isMobile ? '4px' : '0', 
                  left: isMobile ? 'auto' : 'auto',
                  top: '135%', 
                  backgroundColor: '#0c1524', /* Sync values inside your layout container dark palette */
                  border: '2px solid #334155', 
                  borderRadius: '12px', 
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.7), 0 10px 10px -5px rgba(0,0,0,0.5)', 
                  zIndex: 999999,
                  minWidth: isMobile ? '160px' : '190px',
                  padding: '6px 0',
                }}
              >
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  
                  {/* 👤 MY PROFILE LINK */}
                  <li>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      style={{ 
                        display: 'block', 
                        padding: '12px 18px', 
                        color: '#fefeff', 
                        fontWeight: '700', 
                        fontSize: '14px',
                        textDecoration: 'none' 
                      }}
                    >
                      My Profile
                    </Link>
                  </li>

                  {/* ⚙️ SETTINGS LINK */}
                  <li>
                    <Link 
                      to="/settings" 
                      onClick={() => setIsDropdownOpen(false)}
                      style={{ 
                        display: 'block', 
                        padding: '12px 18px', 
                        color: '#f0f0f0', 
                        fontWeight: '700', 
                        fontSize: '14px',
                        textDecoration: 'none' 
                      }}
                    >
                      Settings
                    </Link>
                  </li>
                  
                  {/* 🚪 LOGOUT SYSTEM LINK */}
                  <li style={{ borderTop: '2px solid #1e293b', marginTop: '6px', paddingTop: '4px' }}>
                    <Link 
                      to="/logout" 
                      onClick={() => setIsDropdownOpen(false)}
                      style={{ 
                        display: 'block', 
                        padding: '12px 18px', 
                        color: '#ffeaea', /* Crisp red visibility fallback for action options */
                        fontWeight: '800', 
                        fontSize: '14px',
                        textDecoration: 'none' 
                      }}
                    >
                      Logout
                    </Link>
                  </li>

                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
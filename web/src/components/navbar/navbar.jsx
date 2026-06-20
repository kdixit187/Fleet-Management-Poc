import React, { useState } from 'react';
import './navbar.css';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

          <div className="search-bar-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search shipments, clients, orders..."
              className="search-input"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          <div className="nav-profile">
            <div
              className="profile-avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              A
            </div>

            {isDropdownOpen && (
              <div className="profile-dropdown">
                <ul>
                  <li>My Profile</li>
                  <li>Settings</li>
                  <li>Logout</li>
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
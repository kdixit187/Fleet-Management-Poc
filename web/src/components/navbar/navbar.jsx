import React from 'react';
import './navbar.css';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* लेफ्ट सेक्शन: मोबाइल मेन्यू और सर्च बार */}
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
            <input type="text" placeholder="Search shipments, clients, orders..." className="search-input" />
          </div>
        </div>

        {/* राइट सेक्शन: थीम, अलर्ट्स, यूटिलिटीज */}
        <div className="navbar-right">
          <button className="nav-action-btn" title="Toggle Dark Mode">🌙</button>
          <div className="nav-alert-icon">
            <button className="nav-action-btn">🔔</button>
            <span className="badge">3</span>
          </div>
          <button className="nav-action-btn">🌐</button>
          <div className="nav-profile">
            <div className="profile-avatar"></div>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
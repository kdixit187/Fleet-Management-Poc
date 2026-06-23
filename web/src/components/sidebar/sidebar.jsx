import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  
  // पाथ मैचिंग को क्लीन रखने के लिए हेल्पर फ़ंक्शन
  const isActive = (path) => location.pathname === path ? 'active' : '';

  // मोबाइल पर साइडबार खुलने पर बैकग्राउंड स्क्रॉल को रोकने के लिए प्रभाव (UX Fix)
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth <= 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSidebarOpen]);

  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* लोगो सेक्शन */}
        <div className="sidebar-logo-section">
          <Link to="/" className="sidebar-logo" onClick={handleLinkClick}>KArtikey</Link>
        </div>

        <div className="sidebar-menu-wrapper">
          {/* DASHBOARD GROUP */}
          <div className="menu-group">
            <p className="group-title">DASHBOARD</p>
            <ul className="group-items">
              <li className={`sidebar-item ${isActive('/dashboard') || location.pathname === '/' ? 'active' : ''}`}>
                <Link to="/dashboard" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">📊</span> <span className="text">Overview</span>
                </Link>
              </li> {/* 🟢 FIXED: Changing </td> to </li> */}
              <li className={`sidebar-item ${isActive('/live-map')}`}>
                <Link to="/live-map" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">🗺️</span> <span className="text">Live Shipment Map</span>
                </Link>
              </li> 
              <li className={`sidebar-item ${isActive('/fleet-status')}`}>
                <Link to="/fleet-status" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">📈</span> <span className="text">Fleet Status</span>
                </Link>
              </li> 
            </ul>
          </div>

          {/* SHIPMENTS GROUP */}
          <div className="menu-group">
            <p className="group-title">SHIPMENTS</p>
            <ul className="group-items">
              <li className={`sidebar-item ${isActive('/shipments')}`}>
                <Link to="/shipments" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">📦</span> <span className="text">All Shipments</span>
                </Link>
              </li> 
              <li className={`sidebar-item ${isActive('/track')}`}>
                <Link to="/track" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">📍</span> <span className="text">Track Shipment</span>
                </Link>
              </li> 
              {/* <li className={`sidebar-item ${isActive('/create-shipment')}`}>
                <Link to="/create-shipment" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">➕</span> <span className="text">Create Shipment</span>
                </Link>
              </li>  */}
              <li className={`sidebar-item ${isActive('/delayed')}`}>
                <Link to="/delayed" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">🕒</span> <span className="text">Delayed Shipments</span>
                </Link>
              </li> 
            </ul>
          </div>

          {/* FLEET MANAGEMENT */}
          <div className="menu-group">
            <p className="group-title">FLEET MANAGEMENT</p>
            <ul className="group-items">
              <li className={`sidebar-item ${isActive('/fleet')}`}>
                <Link to="/fleet" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">🚛</span> <span className="text">Vehicle List</span>
                </Link>
              </li>
              <li className={`sidebar-item ${isActive('/maintenance')}`}>
                <Link to="/maintenance" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">🔧</span> <span className="text">Maintenance Logs</span>
                </Link>
              </li>
              <li className={`sidebar-item ${isActive('/drivers')}`}>
                <Link to="/drivers" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">🆔</span> <span className="text">Driver Assignments</span>
                </Link>
              </li> 
              <li className={`sidebar-item ${isActive('/drivershow')}`}>
                <Link to="/drivershow" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">📋</span> <span className="text">Driver List</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
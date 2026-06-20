import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* लोगो सेक्शन */}
        <div className="sidebar-logo-section">
          <Link to="/" className="sidebar-logo">CargoMax</Link>
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
              </li>
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
              <li className={`sidebar-item ${isActive('/create-shipment')}`}>
                <Link to="/create-shipment" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">➕</span> <span className="text">Create Shipment</span>
                </Link>
              </li>
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
              {/* Driver Assignments List View */}
              <li className={`sidebar-item ${isActive('/drivers') ? 'active' : ''}`}>
                <Link to="/drivers" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">🆔</span>
                  <span className="text">Driver Assignments</span>
                </Link>
              </li>

              {/* New Driver Registration Form View */}
              <li className={`sidebar-item ${isActive('/DriverRegister') ? 'active' : ''}`}>
                {/* Link to path badal kar exact App.jsx wala path kar diya hai */}
                <Link to="/DriverRegister" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">➕</span> {/* Icon unique kar diya taaki confusion na ho */}
                  <span className="text">Driver Register</span>
                </Link>
              </li>
              <li className={`sidebar-item ${isActive('/drivershow') ? 'active' : ''}`}>
                {/* Link to path ko capital se lowercase '/drivershow' kiya hai */}
                <Link to="/drivershow" className="sidebar-link" onClick={handleLinkClick}>
                  <span className="icon">📋</span> {/* Display list ke liye clear icon */}
                  <span className="text">Driver List</span> {/* Menu text simple aur professional kiya */}
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
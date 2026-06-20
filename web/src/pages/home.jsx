import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>
            Welcome back! Here's what's happening with your logistics operations.
          </p>
        </div>

        <div className="header-buttons">
          <button type="button" className="btn btn-primary">
            Add Vehicle
          </button>

          <button type="button" className="btn btn-success">
            New Shipment
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {/* कार्ड 1 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Active Shipments</span>
            <div className="card-icon-wrapper icon-blue">🚛</div>
          </div>
          <div className="stat-number">42</div>
          <div className="card-bottom">
            <span className="trend-badge trend-up">↑ 12%</span>
            <span className="trend-text">Currently in transit</span>
          </div>
        </div>

        {/* कार्ड 2 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Delivered Today</span>
            <div className="card-icon-wrapper icon-green">📦</div>
          </div>
          <div className="stat-number">28</div>
          <div className="card-bottom">
            <span className="trend-badge trend-up">↑ 8%</span>
            <span className="trend-text">Successful deliveries</span>
          </div>
        </div>

        {/* कार्ड 3 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Pending Orders</span>
            <div className="card-icon-wrapper icon-orange">⏳</div>
          </div>
          <div className="stat-number">156</div>
          <div className="card-bottom">
            <span className="trend-badge trend-down">↓ 5%</span>
            <span className="trend-text">Awaiting processing</span>
          </div>
        </div>

        {/* कार्ड 4 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Revenue (MTD)</span>
            <div className="card-icon-wrapper icon-green">₹</div>
          </div>
          <div className="stat-number">₹284,590</div>
          <div className="card-bottom">
            <span className="trend-badge trend-up">↑ +15%</span>
            <span className="trend-text">Month to date</span>
          </div>
        </div>
        {/* कार्ड 5 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Fleet Utilization</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up h-4 w-4" aria-hidden="true" stroke="green">
              <path d="M16 7h6v6"></path>
              <path d="m22 7-8.5 8.5-5-5L2 17"></path>
            </svg>
          </div>
          <div className="stat-number">87%</div>
          <div className="card-bottom">
            <span className="trend-badge trend-up">↑ +3%</span>
            <span className="trend-text">Vehicle efficiency</span>
          </div>
        </div>
        {/* कार्ड 6 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Active Clients</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users h-4 w-4" aria-hidden="true" stroke="green">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <circle cx="9" cy="7" r="4"></circle></svg>
          </div>
          <div className="stat-number">1247</div>
          <div className="card-bottom">
            <span className="trend-badge trend-up">↑ +23%</span>
            <span className="trend-text">Total active clients</span>
          </div>
        </div>
        {/* कार्ड 7 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">WareHouse Capacity</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-warehouse h-4 w-4" aria-hidden="true" stroke="red">
              <path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"></path>
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"></path>
              <path d="M6 13h12"></path><path d="M6 17h12"></path></svg>
          </div>
          <div className="stat-number">72%</div>
          <div className="card-bottom">
            <span className="trend-badge trend-down">↓ -2%</span>
            <span className="trend-text">Average utilization</span>
          </div>
        </div>
        {/* कार्ड 8 */}
        <div className="stat-card">
          <div className="card-top">
            <span className="card-title">Delayed Shipments</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert h-4 w-4" aria-hidden="true" stroke="red">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path></svg>
          </div>
          <div className="stat-number">7</div>
          <div className="card-bottom">
            <span className="trend-badge trend-down">↓ -12%</span>
            <span className="trend-text">Requiring attention</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import './home.css'; 

const Home = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening with your logistics operations.</p>
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
            <span className="card-title">Delayed Shipments</span>
            <div className="card-icon-wrapper icon-red">⚠️</div>
          </div>
          <div className="stat-number">7</div>
          <div className="card-bottom">
            <span className="trend-badge trend-down">↓ 12%</span>
            <span className="trend-text">Requiring attention</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
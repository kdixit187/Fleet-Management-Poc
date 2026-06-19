import React, { useState } from 'react'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../web/src/components/navbar/navbar.jsx";
import Sidebar from "../web/src/components/sidebar/sidebar.jsx";
import Home from "../web/src/pages/home.jsx";  
import './App.css'; // Add the layout styling below

function App() {
  // अब यह लाइन बिना किसी एरर के काम करेगी
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="app-body">
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/dashboard" element={<Home />} />
              {/* <Route path="/dashboard" element={<div>Dashboard Content</div>} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
// import Dashboard from './pages/Dashboard';
// import Fleet from './pages/Fleet';
// import Drivers from './pages/Drivers';
// import Shipments from './pages/Shipments';
// import Tracking from './pages/Tracking';
// import Maintenance from './pages/Maintenance';

// <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/dashboard" element={<Dashboard />} />
//   <Route path="/fleet" element={<Fleet />} />
//   <Route path="/drivers" element={<Drivers />} />
//   <Route path="/shipments" element={<Shipments />} />
//   <Route path="/tracking" element={<Tracking />} />
//   <Route path="/maintenance" element={<Maintenance />} />
// </Routes>
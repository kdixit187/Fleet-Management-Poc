import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../web/src/components/navbar/navbar.jsx";
import Sidebar from "../web/src/components/sidebar/sidebar.jsx";
import Home from "../web/src/pages/Home.jsx";  
import LiveMap from "../web/src/pages/live-map.jsx";
import DriverRegister from "../web/src/pages/driver/DriverRegister.jsx"; 
import DriverShow from "../web/src/pages/driver/Drivershow.jsx";
import DriverShipment from "../web/src/pages/driver/Drivershipment.jsx";
import VehicleList from "../web/src/pages/vehiclelist/VehicleList.jsx";
import MaintenanceLogs from "../web/src/pages/vehiclelist/maintenancelogs.jsx";
import AllShipments from "../web/src/pages/shipment/allshipments.jsx"; 
import Track from "../web/src/pages/shipment/track.jsx"; 
import AddVehicle from '../web/src/pages/vehiclelist/add.jsx';
import Login from '../web/src/pages/Login.jsx';
import Sign from '../web/src/pages/Sign.jsx';

import './App.css'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🚀 Dynamic Master Shell Container (Sirf Dashboard pages par layout toggle karega)
  const DashboardLayout = ({ children }) => (
    <div className="app-container">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="app-body">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* 🎯 FIRST ENTRY VIEWPOINT: Website kholte hi sabse pehle ye render hoga bina Navbar/Sidebar ke */}
        <Route path="/" element={<Login />} />
<Route path="/signup" element={<Sign />} />
        {/* Core Secured Administrative Console Hub Layers (Wrapped strictly in Shell Layout) */}
        <Route path="/dashboard" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/live-map" element={<DashboardLayout><LiveMap /></DashboardLayout>} />
        <Route path="/DriverRegister" element={<DashboardLayout><DriverRegister /></DashboardLayout>} />
        <Route path="/drivershow" element={<DashboardLayout><DriverShow /></DashboardLayout>} />
        <Route path="/drivers" element={<DashboardLayout><DriverShipment /></DashboardLayout>} />
        <Route path="/fleet" element={<DashboardLayout><VehicleList /></DashboardLayout>} />
        <Route path="/maintenance" element={<DashboardLayout><MaintenanceLogs /></DashboardLayout>} />
        <Route path="/shipments" element={<DashboardLayout><AllShipments /></DashboardLayout>} />
        <Route path="/delayed" element={<DashboardLayout><AllShipments /></DashboardLayout>} />
        <Route path="/track" element={<DashboardLayout><Track /></DashboardLayout>} />
        <Route path="/create-shipment" element={<DashboardLayout><AddVehicle /></DashboardLayout>} />
        <Route path="/fleet-status" element={<DashboardLayout><Home /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
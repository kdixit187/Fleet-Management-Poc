import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../web/src/components/navbar/navbar.jsx";
import Sidebar from "../web/src/components/sidebar/sidebar.jsx";
import Home from "../web/src/pages/admin/dashboard/Home.jsx";  
import LiveMap from "../web/src/pages/admin/dashboard/live-map.jsx";
import FleetStatus from "../web/src/pages/admin/dashboard/fleetstatus.jsx"; 

// 🚛 FLEET MANAGEMENT MODULE IMPORTS (Extensions fixed to .jsx)
import DriverRegister from "../web/src/pages/admin/fleet managemeent/driverregister.jsx"; 
import DriverShow from "../web/src/pages/admin/fleet managemeent/driverlist.jsx";
import DriverShipment from "../web/src/pages/admin/fleet managemeent/driverassigment.jsx";
import VehicleList from "../web/src/pages/admin/fleet managemeent/VehicleList.jsx";
import MaintenanceLogs from "../web/src/pages/admin/fleet managemeent/maintenancelogs.jsx";
import AddVehicle from '../web/src/pages/admin/fleet managemeent/add-vehicle.jsx';
import VeichleService from '../web/src/pages/admin/fleet managemeent/veichleservice.jsx';

// 📦 SHIPMENT MODULE IMPORTS (Extensions fixed to .jsx)
import NewShipment from '../web/src/pages/admin/shipment/newshipment.jsx';
import DelayedShipments from '../web/src/pages/admin/shipment/delayedshipments.jsx';
import AllShipments from "../web/src/pages/admin/shipment/allshipments.jsx"; 
import Track from "../web/src/pages/admin/shipment/track.jsx"; 

// 🔐 AUTHENTICATION & SETTINGS IMPORTS
import Logout from '../web/src/pages/logout.jsx';
import Settings from '../web/src/pages/admin/Settings.jsx'; 
import Login from '../web/src/pages/Login.jsx';
import Sign from '../web/src/pages/Sign.jsx';

import './App.css'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🚀 Dynamic Master Shell Container
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
        {/* 🎯 AUTHENTICATION MODULE */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/logout" element={<Logout />} />

        {/* 📊 CORE OPERATIONAL DASHBOARD */}
        <Route path="/dashboard" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/live-map" element={<DashboardLayout><LiveMap /></DashboardLayout>} />

        {/* 🚛 FLEET MANAGEMENT MODULE */}
        {/* Driver Section */}
        <Route path="/drivers" element={<DashboardLayout><DriverShipment /></DashboardLayout>} />
        <Route path="/DriverRegister" element={<DashboardLayout><DriverRegister /></DashboardLayout>} />
        <Route path="/drivershow" element={<DashboardLayout><DriverShow /></DashboardLayout>} />
        
        {/* Vehicle / Fleet Assets Section */}
        <Route path="/fleet" element={<DashboardLayout><VehicleList /></DashboardLayout>} />
        <Route path="/add-vehicle" element={<DashboardLayout><AddVehicle /></DashboardLayout>} /> 
        <Route path="/maintenance" element={<DashboardLayout><MaintenanceLogs /></DashboardLayout>} />
        <Route path="/vehicle-service" element={<DashboardLayout><VeichleService /></DashboardLayout>} /> 
        <Route path="/fleet-status" element={<DashboardLayout><FleetStatus /></DashboardLayout>} /> 
        
        {/* 📦 SHIPMENTS MANAGEMENT MODULE */}
        <Route path="/shipments" element={<DashboardLayout><AllShipments /></DashboardLayout>} />
        <Route path="/delayed" element={<DashboardLayout><DelayedShipments /></DashboardLayout>} />
        <Route path="/track" element={<DashboardLayout><Track /></DashboardLayout>} />
        
        {/* Shipment Assignment Routes */}
        <Route path="/new-shipment" element={<DashboardLayout><NewShipment /></DashboardLayout>} />
        <Route path="/create-shipment" element={<DashboardLayout><NewShipment /></DashboardLayout>} /> 

        {/* 🟢 SETTINGS MODULE */}
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
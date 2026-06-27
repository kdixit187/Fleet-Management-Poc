import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../web/src/components/navbar/navbar.jsx";
import Sidebar from "../web/src/components/sidebar/sidebar.jsx";
import Home from "../web/src/pages/admin/dashboard/Home.jsx";
import LiveMap from "../web/src/pages/admin/dashboard/live-map.jsx";
import FleetStatus from "../web/src/pages/admin/dashboard/fleetstatus.jsx";

// 🚛 FLEET MANAGEMENT MODULE IMPORTS (Fixed folder typo 'fleet managemeent')

import DriverShow from "../web/src/pages/admin/fleet managemeent/driverlist.jsx";
import DriverShipment from "../web/src/pages/admin/fleet managemeent/driverassigment.jsx"; // Check if your file is 'driverassigment' (missing the second 'n')

import MaintenanceLogs from "../web/src/pages/admin/fleet managemeent/maintenancelogs.jsx";
import DriverViewModal from "../web/src/pages/admin/fleet managemeent/driverviewmodal.jsx"; 
import DriverEditView  from "../web/src/pages/admin/fleet managemeent/drivereditview.jsx"; // Import the Edit component
import VehicleList from "../web/src/pages/admin/fleet managemeent/VehicleList.jsx";
import VehicleView from "../web/src/pages/admin/fleet managemeent/vehicleview.jsx";
import VehicleEdit from "../web/src/pages/admin/fleet managemeent/vehicleedit.jsx";
// 📦 SHIPMENT MODULE IMPORTS
// import NewShipment from '../web/src/pages/admin/shipment/newshipment.jsx'; // ❌ FILE DOESN'T EXIST
import DelayedShipments from '../web/src/pages/admin/shipment/delayedshipments.jsx';
import AllShipments from "../web/src/pages/admin/shipment/allshipments.jsx"; 
import Track from "../web/src/pages/admin/shipment/track.jsx"; 

// 🔐 AUTHENTICATION & SETTINGS IMPORTS (Fixed lower-case filenames)
import Logout from '../web/src/pages/logout.jsx';
import Settings from '../web/src/pages/admin/settings.jsx'; 
import Login from '../web/src/pages/login.jsx';
import Sign from '../web/src/pages/sign.jsx';

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
        <Route path="/drivers" element={<DashboardLayout><DriverShipment /></DashboardLayout>} />
        <Route path="/drivershow" element={<DashboardLayout><DriverShow /></DashboardLayout>} />
        <Route path="/fleet" element={<DashboardLayout><VehicleList /></DashboardLayout>} />
        <Route path="/maintenance" element={<DashboardLayout><MaintenanceLogs /></DashboardLayout>} />
        <Route path="/fleet-status" element={<DashboardLayout><FleetStatus /></DashboardLayout>} /> 
        <Route path="/vehicles" element={<DashboardLayout><VehicleList /></DashboardLayout>} />
        <Route path="/vehicle-view/:id?" element={<DashboardLayout><VehicleView /></DashboardLayout>} /> 
        <Route path="/vehicle-edit/:id?" element={<DashboardLayout><VehicleEdit /></DashboardLayout>} />
        {/* 📦 SHIPMENTS MANAGEMENT MODULE */}
        <Route path="/shipments" element={<DashboardLayout><AllShipments /></DashboardLayout>} />
        <Route path="/delayed" element={<DashboardLayout><DelayedShipments /></DashboardLayout>} />
        <Route path="/track" element={<DashboardLayout><Track /></DashboardLayout>} />
        <Route path="/new-shipment" element={<DashboardLayout><AllShipments /></DashboardLayout>} />
        <Route path="/create-shipment" element={<DashboardLayout><AllShipments /></DashboardLayout>} /> 

        {/* 🟢 SETTINGS MODULE */}
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
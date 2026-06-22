import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../web/src/components/navbar/navbar.jsx";
import Sidebar from "../web/src/components/sidebar/sidebar.jsx";
import Home from "../web/src/pages/Home.jsx";  
import LiveMap from "../web/src/pages/live-map.jsx";

// 🚛 FLEET MANAGEMENT MODULE IMPORTS
import DriverRegister from "../web/src/pages/fleet managemeent/DriverRegister.jsx"; 
import DriverShow from "../web/src/pages/fleet managemeent/Drivershow.jsx";
import DriverShipment from "../web/src/pages/fleet managemeent/Drivershipment.jsx";
import VehicleList from "../web/src/pages/fleet managemeent/VehicleList.jsx";
import MaintenanceLogs from "../web/src/pages/fleet managemeent/maintenancelogs.jsx";
import AddVehicle from '../web/src/pages/fleet managemeent/add.jsx';
import VeichleService from '../web/src/pages/fleet managemeent/veichleservice.jsx';

// 📦 SHIPMENT MODULE IMPORTS
import AllShipments from "../web/src/pages/shipment/allshipments.jsx"; 
import Track from "../web/src/pages/shipment/track.jsx"; 

// 🔐 AUTHENTICATION IMPORTS
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
        {/* 🎯 AUTHENTICATION MODULE */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Sign />} />

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
        <Route path="/fleet-status" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/vehicle-service" element={<DashboardLayout><VeichleService /></DashboardLayout>} /> {/* 🟢 ADDED: व्हीकल सर्विस का नया रूट */}
        
        {/* 📦 SHIPMENTS MANAGEMENT MODULE */}
        <Route path="/shipments" element={<DashboardLayout><AllShipments /></DashboardLayout>} />
        <Route path="/delayed" element={<DashboardLayout><AllShipments /></DashboardLayout>} />
        <Route path="/track" element={<DashboardLayout><Track /></DashboardLayout>} />
        <Route path="/create-shipment" element={<DashboardLayout><AddVehicle /></DashboardLayout>} /> 
      </Routes>
    </Router>
  );
}

export default App;
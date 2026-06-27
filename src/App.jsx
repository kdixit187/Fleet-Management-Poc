import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../web/src/components/navbar/navbar.jsx";
import Sidebar from "../web/src/components/sidebar/sidebar.jsx";
import Home from "../web/src/pages/admin/dashboard/Home.jsx";
import LiveMap from "../web/src/pages/admin/dashboard/live-map.jsx";
import FleetStatus from "../web/src/pages/admin/dashboard/fleetstatus.jsx";

// 🚛 FLEET MANAGEMENT MODULE IMPORTS
import DriverShow from "../web/src/pages/admin/fleet managemeent/driverlist.jsx";
import DriverShipment from "../web/src/pages/admin/fleet managemeent/driverassigment.jsx";
import MaintenanceLogs from "../web/src/pages/admin/fleet managemeent/maintenancelogs.jsx";
import DriverViewModal from "../web/src/pages/admin/fleet managemeent/driverviewmodal.jsx"; 
import DriverEditView from "../web/src/pages/admin/fleet managemeent/drivereditview.jsx";
import VehicleList from "../web/src/pages/admin/fleet managemeent/VehicleList.jsx";
import VehicleView from "../web/src/pages/admin/fleet managemeent/vehicleview.jsx";
import VehicleEdit from "../web/src/pages/admin/fleet managemeent/vehicleedit.jsx";

// 📦 SHIPMENT MODULE IMPORTS
import DelayedShipments from '../web/src/pages/admin/shipment/delayedshipments.jsx';
import AllShipments from "../web/src/pages/admin/shipment/allshipments.jsx"; 
import Track from "../web/src/pages/admin/shipment/track.jsx"; 

// 🔐 AUTHENTICATION & SETTINGS IMPORTS
import Logout from "../web/src/pages/logout.jsx";
import Settings from "../web/src/pages/admin/settings.jsx"; 
import Login from "../web/src/pages/login.jsx";
import Sign from "../web/src/pages/sign.jsx";
import DriverDashboard from "../web/src/pages/driver/DriverDashboard.jsx";

// 🔴 IMPORT ProtectedRoute
import ProtectedRoute from "../web/src/components/ProtectedRoute.jsx";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/logout" element={<Logout />} />

        {/* 📊 CORE OPERATIONAL DASHBOARD - Admin Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><Home /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/live-map" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><LiveMap /></DashboardLayout>
          </ProtectedRoute>
        } />

        {/* 🚛 FLEET MANAGEMENT MODULE - Admin Routes */}
        <Route path="/drivers" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><DriverShipment /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/drivershow" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><DriverShow /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/fleet" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><VehicleList /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/maintenance" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><MaintenanceLogs /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/fleet-status" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><FleetStatus /></DashboardLayout>
          </ProtectedRoute>
        } /> 
        
        <Route path="/vehicles" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><VehicleList /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/vehicle-view/:id?" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><VehicleView /></DashboardLayout>
          </ProtectedRoute>
        } /> 
        
        <Route path="/vehicle-edit/:id?" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><VehicleEdit /></DashboardLayout>
          </ProtectedRoute>
        } />

        {/* 📦 SHIPMENTS MANAGEMENT MODULE - Admin Routes */}
        <Route path="/shipments" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><AllShipments /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/delayed" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><DelayedShipments /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/track" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><Track /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/new-shipment" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><AllShipments /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/create-shipment" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><AllShipments /></DashboardLayout>
          </ProtectedRoute>
        } />

        {/* 🚛 DRIVER DASHBOARD - Driver Routes */}
        {/* ✅ DriverDashboard is standalone - it has its own sidebar */}
        <Route path="/driver-dashboard" element={
          <ProtectedRoute requiredRole="driver">
            <DriverDashboard />
          </ProtectedRoute>
        } />

        {/* 🟢 SETTINGS MODULE - Admin Routes */}
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout><Settings /></DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
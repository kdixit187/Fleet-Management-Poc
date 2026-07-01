import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../web/src/components/navbar/navbar.jsx";
import Sidebar from "../web/src/components/sidebar/sidebar.jsx";
import SidebarPage from "../web/src/pages/driver/drivercomponents/Sidebar.jsx";
import ProtectedRoute from "../web/src/components/ProtectedRoute.jsx";

// Dashboard
import Home from "../web/src/pages/admin/dashboard/Home.jsx";
import LiveMap from "../web/src/pages/admin/dashboard/live-map.jsx";
import FleetStatus from "../web/src/pages/admin/dashboard/fleetstatus.jsx";

// Fleet Management
import DriverShow from "../web/src/pages/admin/fleet managemeent/driverlist.jsx";
import DriverShipment from "../web/src/pages/admin/fleet managemeent/driverassigment.jsx";
import MaintenanceLogs from "../web/src/pages/admin/fleet managemeent/maintenancelogs.jsx";
import VehicleList from "../web/src/pages/admin/fleet managemeent/VehicleList.jsx";
import VehicleView from "../web/src/pages/admin/fleet managemeent/vehicleview.jsx";
import VehicleEdit from "../web/src/pages/admin/fleet managemeent/vehicleedit.jsx";

// Shipment
import AllShipments from "../web/src/pages/admin/shipment/allshipments.jsx";
import DelayedShipments from "../web/src/pages/admin/shipment/delayedshipments.jsx";
import Track from "../web/src/pages/admin/shipment/track.jsx";

// Auth
import Login from "../web/src/pages/login.jsx";
import Sign from "../web/src/pages/sign.jsx";
import Logout from "../web/src/pages/logout.jsx";

// Settings
import Settings from "../web/src/pages/admin/settings.jsx";

// Driver
import DriverDashboard from "../web/src/pages/driver/DriverDashboard.jsx";
import DriverShipmentPage from "../web/src/pages/driver/Shipment.jsx";

import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const DashboardLayout = ({ children }) => (
    <div className="app-container">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="app-body">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="content-area">{children}</main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-map"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <LiveMap />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/fleet-status"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <FleetStatus />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fleet - Admin */}
        <Route
          path="/admin/drivers"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <DriverShipment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/drivershow"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <DriverShow />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <VehicleList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle-view/:id?"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <VehicleView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle-edit/:id?"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <VehicleEdit />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <MaintenanceLogs />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Shipments - Admin */}
        <Route
          path="/admin/shipments"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <AllShipments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/delayed"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <DelayedShipments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/track"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <Track />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Driver Routes */}
        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute requiredRole="driver">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver-shipments"
          element={
            <ProtectedRoute requiredRole="driver">
              <DriverShipmentPage />
            </ProtectedRoute>
          }
        />

        {/* Settings - Admin */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
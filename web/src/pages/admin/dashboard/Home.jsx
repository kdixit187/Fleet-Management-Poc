import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function HomeDashboard() {
  const navigate = useNavigate();
  
  // ==================== STATE MANAGEMENT ====================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showAllShipments, setShowAllShipments] = useState(false); // ✅ ADD THIS
  
  // Data states
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    activeShipments: 0,
    vehiclesEnRoute: 0,
    alerts: 0,
    deliveredToday: 0
  });

  // Form state - Added client field
  const [formData, setFormData] = useState({
    destination: '',
    driver_id: '',
    vehicle_id: '',
    eta: '',
    status: 'Loading',
    notes: '',
    client: ''
  });

  // Edit form state - Added client field
  const [editFormData, setEditFormData] = useState({
    id: '',
    destination: '',
    driver_id: '',
    vehicle_id: '',
    eta: '',
    status: '',
    notes: '',
    client: ''
  });

  // ==================== API CALLS ====================
  useEffect(() => {
    fetchDashboardData();
    fetchDrivers();
    fetchVehicles();
    fetchLogs();
  }, []);

  const API_BASE = 'http://localhost:5000/api';

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/shipments`);
      const data = await response.json();
      
      if (response.ok) {
        const sortedData = data.sort((a, b) => a.id - b.id);
        setShipments(sortedData);
        updateStats(sortedData);
      } else {
        console.error('Failed to fetch shipments:', data.message);
      }
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (shipmentsData) => {
    const active = shipmentsData.filter(s => s.status !== 'Delivered' && s.status !== 'Cancelled');
    const enRoute = shipmentsData.filter(s => s.status === 'In Transit' || s.status === 'Loading');
    const alerts = shipmentsData.filter(s => s.status === 'Delayed' || s.status === 'Alert');
    const delivered = shipmentsData.filter(s => s.status === 'Delivered');
    
    setStats({
      activeShipments: active.length,
      vehiclesEnRoute: enRoute.length,
      alerts: alerts.length,
      deliveredToday: delivered.length
    });
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${API_BASE}/drivers`);
      const data = await response.json();
      if (response.ok) {
        setDrivers(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${API_BASE}/vehicles`);
      const data = await response.json();
      if (response.ok) {
        setVehicles(data);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch(`${API_BASE}/logs`);
      const data = await response.json();
      if (response.ok) {
        setLogs(data);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    }
  };

  // ==================== ADD SYSTEM LOG ====================
  const addSystemLog = async (type, title, description) => {
    try {
      const time = new Date().toLocaleString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      const response = await fetch(`${API_BASE}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, description, time })
      });
      
      if (response.ok) {
        console.log('✅ Log added:', title);
        await fetchLogs();
      }
    } catch (error) {
      console.error('❌ Error adding log:', error);
    }
  };

  // ==================== CRUD OPERATIONS ====================

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/shipments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        await addSystemLog(
          'dispatch',
          `🚚 New Shipment Created`,
          `Shipment #${data.id} dispatched to ${formData.destination}`
        );
        
        alert('✅ Shipment created successfully!');
        await fetchDashboardData();
        await fetchLogs();
        setIsModalOpen(false);
        resetForm();
      } else {
        alert(`❌ Error: ${data.message || 'Failed to create shipment'}`);
      }
    } catch (error) {
      console.error('Error creating shipment:', error);
      alert('❌ Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewShipment = (shipment) => {
    setSelectedShipment(shipment);
    setIsViewModalOpen(true);
  };

  const handleEditShipment = (shipment) => {
    setSelectedShipment(shipment);
    setEditFormData({
      id: shipment.id,
      destination: shipment.destination || '',
      driver_id: shipment.driver_id || '',
      vehicle_id: shipment.vehicle_id || '',
      eta: shipment.eta || '',
      status: shipment.status || 'Loading',
      notes: shipment.notes || '',
      client: shipment.client || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateShipment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/shipments/${editFormData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });

      const data = await response.json();

      if (response.ok) {
        await addSystemLog(
          'dispatch',
          `✏️ Shipment Updated`,
          `Shipment #${editFormData.id} status changed to ${editFormData.status}`
        );
        
        alert('✅ Shipment updated successfully!');
        await fetchDashboardData();
        await fetchLogs();
        setIsEditModalOpen(false);
        setSelectedShipment(null);
      } else {
        alert(`❌ Error: ${data.message || 'Failed to update shipment'}`);
      }
    } catch (error) {
      console.error('Error updating shipment:', error);
      alert('❌ Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShipment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shipment?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/shipments/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await addSystemLog(
          'alert',
          `🗑️ Shipment Deleted`,
          `Shipment #${id} has been removed from system`
        );
        
        alert('✅ Shipment deleted successfully!');
        await fetchDashboardData();
        await fetchLogs();
      } else {
        const data = await response.json();
        alert(`❌ Error: ${data.message || 'Failed to delete shipment'}`);
      }
    } catch (error) {
      console.error('Error deleting shipment:', error);
      alert('❌ Network error occurred. Please try again.');
    }
  };

  // ==================== FORM HANDLERS ====================

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleEditFormChange = (e) => {
    const { id, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      destination: '',
      driver_id: '',
      vehicle_id: '',
      eta: '',
      status: 'Loading',
      notes: '',
      client: ''
    });
  };

  // ==================== HELPERS ====================

  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.full_name : 'Unknown';
  };

  const getDriverInitials = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    if (driver) {
      const name = driver.full_name || '';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return '??';
  };

  const getVehicleInfo = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.vehicle_id} [${vehicle.license_plate}]` : 'N/A';
  };

  const getStatusType = (status) => {
    const statusMap = {
      'In Transit': 'transit',
      'Delayed': 'delayed',
      'Loading': 'loading',
      'Delivered': 'delivered',
      'Alert': 'alert',
      'Pending': 'pending'
    };
    return statusMap[status] || 'transit';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': { bg: '#dcfce7', color: '#166534' },
      'In Transit': { bg: '#dbeafe', color: '#1e40af' },
      'Loading': { bg: '#f1f5f9', color: '#475569' },
      'Delayed': { bg: '#fef3c7', color: '#92400e' },
      'Alert': { bg: '#fee2e2', color: '#991b1b' },
      'Pending': { bg: '#fef3c7', color: '#92400e' }
    };
    return colors[status] || colors['Pending'];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // ==================== EXPORT FUNCTIONS ====================

  const exportToCSV = () => {
    if (shipments.length === 0) {
      alert('No shipments to export!');
      return;
    }

    try {
      const headers = ['ID', 'Client', 'Destination', 'Driver', 'Vehicle', 'Status', 'Expected Delivery', 'Notes'];
      
      const rows = shipments.map(shipment => {
        const driverName = getDriverName(shipment.driver_id);
        const vehicleInfo = getVehicleInfo(shipment.vehicle_id);
        const formattedDate = formatDate(shipment.eta);
        
        return [
          shipment.id,
          shipment.client || 'N/A',
          shipment.destination || 'N/A',
          driverName,
          vehicleInfo,
          shipment.status || 'N/A',
          formattedDate,
          shipment.notes || 'N/A'
        ];
      });

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `shipments_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('✅ CSV downloaded');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('❌ Failed to export CSV: ' + error.message);
    }
  };

  const exportToExcel = () => {
    if (shipments.length === 0) {
      alert('No shipments to export!');
      return;
    }

    try {
      const excelData = shipments.map(shipment => ({
        'ID': shipment.id,
        'Client': shipment.client || 'N/A',
        'Destination': shipment.destination || 'N/A',
        'Driver': getDriverName(shipment.driver_id),
        'Vehicle': getVehicleInfo(shipment.vehicle_id),
        'Status': shipment.status || 'N/A',
        'Expected Delivery': formatDate(shipment.eta),
        'Notes': shipment.notes || 'N/A'
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);
      ws['!cols'] = [
        { wch: 12 }, { wch: 25 }, { wch: 25 }, 
        { wch: 25 }, { wch: 25 }, { wch: 15 }, 
        { wch: 25 }, { wch: 30 }
      ];
      XLSX.utils.book_append_sheet(wb, ws, 'Shipments');

      const summaryData = [
        ['📊 SHIPMENT SUMMARY'],
        [''],
        ['Generated On:', new Date().toLocaleString()],
        [''],
        ['Metric', 'Value'],
        ['Total Shipments', shipments.length],
        ['Active Shipments', stats.activeShipments],
        ['In Transit', stats.vehiclesEnRoute],
        ['Delivered', stats.deliveredToday],
        ['Alerts / Delays', stats.alerts]
      ];
      const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
      wsSummary['!cols'] = [{ wch: 30 }, { wch: 25 }];
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `shipments_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(`✅ ${shipments.length} shipments exported to Excel!`);
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('❌ Failed to export Excel: ' + error.message);
    }
  };

  const exportToPDF = () => {
    if (shipments.length === 0) {
      alert('No shipments to export!');
      return;
    }

    try {
      const doc = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      
      doc.setFontSize(20);
      doc.setTextColor(37, 99, 235);
      doc.text('📊 Shipment Report', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 28, { align: 'center' });
      
      doc.setFillColor(248, 250, 252);
      doc.rect(14, 35, pageWidth - 28, 30, 'F');
      
      const summaryItems = [
        { label: 'Total Shipments', value: shipments.length },
        { label: 'Active', value: stats.activeShipments },
        { label: 'In Transit', value: stats.vehiclesEnRoute },
        { label: 'Delivered', value: stats.deliveredToday },
        { label: 'Alerts', value: stats.alerts }
      ];
      
      const itemWidth = (pageWidth - 28) / summaryItems.length;
      summaryItems.forEach((item, index) => {
        const x = 14 + (index * itemWidth);
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(item.label, x + itemWidth / 2, 42, { align: 'center' });
        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59);
        doc.text(String(item.value), x + itemWidth / 2, 52, { align: 'center' });
      });
      
      const tableHeaders = ['ID', 'Client', 'Destination', 'Driver', 'Vehicle', 'Status', 'ETA', 'Notes'];
      const tableRows = shipments.map(shipment => [
        shipment.id,
        shipment.client || 'N/A',
        shipment.destination || 'N/A',
        getDriverName(shipment.driver_id),
        getVehicleInfo(shipment.vehicle_id),
        shipment.status || 'N/A',
        formatDate(shipment.eta),
        shipment.notes || 'N/A'
      ]);

      doc.autoTable({
        startY: 75,
        head: [tableHeaders],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 14, right: 14 },
        columnStyles: {
          0: { cellWidth: 18 },
          1: { cellWidth: 25 },
          2: { cellWidth: 30 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 },
          5: { cellWidth: 20 },
          6: { cellWidth: 30 },
          7: { cellWidth: 30 }
        }
      });

      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `© ${new Date().getFullYear()} Fleet Management • ${shipments.length} shipments`,
        pageWidth / 2,
        finalY,
        { align: 'center' }
      );

      doc.save(`shipments_${new Date().toISOString().split('T')[0]}.pdf`);
      alert(`✅ ${shipments.length} shipments exported to PDF!`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('❌ Failed to export PDF: ' + error.message);
    }
  };

  // ✅ Get shipments to display (5 or all)
  const displayedShipments = showAllShipments ? shipments : shipments.slice(0, 5);

  // ==================== RENDER ====================

  return (
    <DashboardWrapper>
      {/* Header */}
      <HeaderSection>
        <div>
          <h1>📊 Overview Dashboard</h1>
          <p>Real-time fleet operations summary</p>
        </div>
        <ActionButtons>
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
            <span className="btn-text">Refresh</span>
          </button>
          
          <div className="export-wrapper">
            <button 
              type="button" 
              className="btn-secondary export-btn"
              onClick={() => setIsExportOpen(!isExportOpen)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              <span className="btn-text">Export</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            
            {isExportOpen && (
              <ExportDropdown>
                <ExportDropdownItem onClick={() => { exportToCSV(); setIsExportOpen(false); }}>
                  <span>📄</span>
                  <div>
                    <strong>CSV</strong>
                    <small>Comma separated values</small>
                  </div>
                </ExportDropdownItem>
                
                <ExportDropdownItem onClick={() => { exportToExcel(); setIsExportOpen(false); }}>
                  <span>📊</span>
                  <div>
                    <strong>Excel (.xlsx)</strong>
                    <small>With summary sheets</small>
                  </div>
                </ExportDropdownItem>
                
                <ExportDropdownItem onClick={() => { exportToPDF(); setIsExportOpen(false); }}>
                  <span>📑</span>
                  <div>
                    <strong>PDF</strong>
                    <small>Printable report</small>
                  </div>
                </ExportDropdownItem>
                
                <ExportDropdownDivider />
                
                <ExportDropdownItem onClick={() => { alert('Coming soon!'); setIsExportOpen(false); }}>
                  <span>🔍</span>
                  <div>
                    <strong>Current View</strong>
                    <small>Export filtered data</small>
                  </div>
                </ExportDropdownItem>
              </ExportDropdown>
            )}
          </div>
          
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            + <span className="btn-text">New</span>
          </button>
        </ActionButtons>
      </HeaderSection>

      {/* Stats Grid */}
      <StatsGrid>
        <StatCard>
          <IconCircle color="#eff6ff" stroke="#2563eb">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" rx="2"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </IconCircle>
          <div>
            <span className="card-label">Active</span>
            <span className="card-value">{stats.activeShipments}</span>
            <span className="card-trend trend-up">↑ Live</span>
          </div>
        </StatCard>

        <StatCard>
          <IconCircle color="#f0fdf4" stroke="#16a34a">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </IconCircle>
          <div>
            <span className="card-label">En Route</span>
            <span className="card-value">{stats.vehiclesEnRoute}</span>
            <span className="card-trend text-muted">{vehicles.length > 0 ? Math.round((stats.vehiclesEnRoute / vehicles.length) * 100) : 0}%</span>
          </div>
        </StatCard>

        <StatCard>
          <IconCircle color="#fef2f2" stroke="#dc2626">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>
            </svg>
          </IconCircle>
          <div>
            <span className="card-label">Alerts</span>
            <span className="card-value value-danger">{stats.alerts}</span>
            <span className="card-trend trend-down">⚠️</span>
          </div>
        </StatCard>

        <StatCard>
          <IconCircle color="#fffbeb" stroke="#d97706">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </IconCircle>
          <div>
            <span className="card-label">Delivered</span>
            <span className="card-value">{stats.deliveredToday}</span>
            <span className="card-trend trend-up">✅</span>
          </div>
        </StatCard>
      </StatsGrid>

      {/* Shipments + Logs Section */}
      <ContentGrid>
        <TableCard>
          <div className="card-header">
            <h2>📦 Recent Shipments</h2>
            {/* ✅ Toggle between show all and show 5 */}
            <button 
              className="view-all-link" 
              onClick={() => setShowAllShipments(!showAllShipments)}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '13px',
                color: '#2563eb',
                fontWeight: '500',
                fontFamily: 'inherit',
                padding: '0'
              }}
            >
              {showAllShipments ? 'Show Less ↑' : 'View All →'}
            </button>
          </div>
          
          {loading ? (
            <div className="loading-state">Loading shipments...</div>
          ) : shipments.length === 0 ? (
            <div className="empty-state">No shipments found</div>
          ) : (
            <MobileShipmentList>
              {displayedShipments.map((shipment) => {
                const statusColors = getStatusColor(shipment.status);
                return (
                  <MobileShipmentCard key={shipment.id}>
                    <div className="shipment-header">
                      <span className="shipment-id">#{shipment.id}</span>
                      <StatusBadgeMobile 
                        type={getStatusType(shipment.status)}
                        style={{ backgroundColor: statusColors.bg, color: statusColors.color }}
                      >
                        {shipment.status}
                      </StatusBadgeMobile>
                    </div>
                    <div className="shipment-details">
                      <div className="detail-row">
                        <span className="label">🏢 Client</span>
                        <span className="value">{shipment.client || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">📍 Destination</span>
                        <span className="value">{shipment.destination}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">👤 Driver</span>
                        <span className="value">
                          <AvatarSmall>{getDriverInitials(shipment.driver_id)}</AvatarSmall>
                          {getDriverName(shipment.driver_id)}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">⏰ Expected Delivery</span>
                        <span className="value">{formatDate(shipment.eta)}</span>
                      </div>
                    </div>
                    <div className="shipment-actions">
                      <button onClick={() => handleViewShipment(shipment)}>👁️ View</button>
                      <button onClick={() => handleEditShipment(shipment)}>✏️ Edit</button>
                      <button onClick={() => handleDeleteShipment(shipment.id)}>🗑️</button>
                    </div>
                  </MobileShipmentCard>
                );
              })}
              
              {/* ✅ Show total count if showing all */}
              {showAllShipments && shipments.length > 5 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '10px', 
                  color: '#94a3b8',
                  fontSize: '13px',
                  borderTop: '1px solid #e2e8f0',
                  marginTop: '8px'
                }}>
                  Showing all {shipments.length} shipments
                </div>
              )}
            </MobileShipmentList>
          )}
        </TableCard>

        <LogsCard>
          <div className="card-header">
            <h2>📋 System Logs</h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                {logs.length} entries
              </span>
              <LiveIndicator>● Live</LiveIndicator>
            </div>
          </div>
          <LogsList>
            {logs.length === 0 ? (
              <div className="empty-logs">
                <span>📭</span>
                <p>No logs available</p>
                <small>Logs will appear when shipments are created</small>
              </div>
            ) : (
              logs.slice(0, 5).map((log) => (
                <MobileLogItem key={log.id}>
                  <LogDot type={log.type} />
                  <div className="log-content">
                    <p className="log-title">{log.title}</p>
                    <p className="log-subtitle">{log.description}</p>
                    <span className="log-time">{log.time}</span>
                  </div>
                </MobileLogItem>
              ))
            )}
          </LogsList>
        </LogsCard>
      </ContentGrid>


      {/* ============ VIEW MODAL ============ */}
      {isViewModalOpen && selectedShipment && (
        <ModalOverlay onClick={() => setIsViewModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h5>📋 Shipment Details</h5>
              <button className="btn-close" onClick={() => setIsViewModalOpen(false)}>✕</button>
            </ModalHeader>
            <ViewModalBody>
              <ViewInfoGrid>
                <ViewInfoItem>
                  <label>Shipment ID</label>
                  <span className="font-mono">#{selectedShipment.id}</span>
                </ViewInfoItem>
                <ViewInfoItem>
                  <label>Status</label>
                  <StatusBadge type={getStatusType(selectedShipment.status)}>
                    {selectedShipment.status}
                  </StatusBadge>
                </ViewInfoItem>
                <ViewInfoItem>
                  <label>🏢 Client</label>
                  <span>{selectedShipment.client || 'N/A'}</span>
                </ViewInfoItem>
                <ViewInfoItem>
                  <label>📍 Destination</label>
                  <span>{selectedShipment.destination}</span>
                </ViewInfoItem>
                <ViewInfoItem>
                  <label>👤 Driver</label>
                  <span>{getDriverName(selectedShipment.driver_id)}</span>
                </ViewInfoItem>
                <ViewInfoItem>
                  <label>🚛 Vehicle</label>
                  <span>{getVehicleInfo(selectedShipment.vehicle_id)}</span>
                </ViewInfoItem>
                <ViewInfoItem>
                  <label>⏰ Expected Delivery</label>
                  <span>{formatDate(selectedShipment.eta)}</span>
                </ViewInfoItem>
                <ViewInfoItem fullWidth>
                  <label>📝 Notes</label>
                  <p className="description-text">{selectedShipment.notes || 'No notes'}</p>
                </ViewInfoItem>
                <ViewInfoItem fullWidth>
                  <label>🕐 Created At</label>
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                    {selectedShipment.created_at ? new Date(selectedShipment.created_at).toLocaleString() : 'N/A'}
                  </span>
                </ViewInfoItem>
              </ViewInfoGrid>

              <ViewModalFooter>
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn-edit" 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditShipment(selectedShipment);
                  }}
                >
                  ✏️ Edit Shipment
                </button>
              </ViewModalFooter>
            </ViewModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* ============ EDIT MODAL ============ */}
      {isEditModalOpen && (
        <ModalOverlay onClick={() => setIsEditModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h5>✏️ Edit Shipment</h5>
              <button className="btn-close" onClick={() => setIsEditModalOpen(false)}>✕</button>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleUpdateShipment}>
                <FormRow>
                  <FormGroup>
                    <label htmlFor="client">🏢 Client Name</label>
                    <input 
                      type="text" 
                      id="client" 
                      placeholder="Enter client name" 
                      value={editFormData.client}
                      onChange={handleEditFormChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="destination">📍 Destination</label>
                    <input 
                      type="text" 
                      id="destination" 
                      placeholder="Enter destination" 
                      value={editFormData.destination}
                      onChange={handleEditFormChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="driver_id">👤 Driver</label>
                    <select 
                      id="driver_id" 
                      value={editFormData.driver_id}
                      onChange={handleEditFormChange}
                      required
                    >
                      <option value="">Select driver...</option>
                      {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.full_name}
                        </option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="vehicle_id">🚛 Vehicle</label>
                    <select 
                      id="vehicle_id" 
                      value={editFormData.vehicle_id}
                      onChange={handleEditFormChange}
                      required
                    >
                      <option value="">Select vehicle...</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.vehicle_id}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="status">📊 Status</label>
                    <select 
                      id="status" 
                      value={editFormData.status}
                      onChange={handleEditFormChange}
                    >
                      <option value="Loading">Loading</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Alert">Alert</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="eta">⏰ Expected Delivery</label>
                    <input 
                      type="datetime-local" 
                      id="eta" 
                      value={editFormData.eta}
                      onChange={handleEditFormChange}
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="notes">📝 Notes</label>
                    <textarea 
                      id="notes" 
                      rows="2" 
                      placeholder="Additional notes..."
                      value={editFormData.notes}
                      onChange={handleEditFormChange}
                    />
                  </FormGroup>
                </FormRow>

                <ModalFooter>
                  <button type="button" className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleUpdateShipment}
                    disabled={loading}
                  >
                    {loading ? '⏳ Updating...' : 'Update Shipment'}
                  </button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* ============ CREATE MODAL ============ */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h5>➕ New Shipment</h5>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleCreateShipment}>
                <FormRow>
                  <FormGroup>
                    <label htmlFor="client">🏢 Client Name</label>
                    <input 
                      type="text" 
                      id="client" 
                      placeholder="Enter client name" 
                      value={formData.client}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="destination">📍 Destination</label>
                    <input 
                      type="text" 
                      id="destination" 
                      placeholder="Enter destination" 
                      value={formData.destination}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="driver_id">👤 Driver</label>
                    <select 
                      id="driver_id" 
                      value={formData.driver_id}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select driver...</option>
                      {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.full_name}
                        </option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="vehicle_id">🚛 Vehicle</label>
                    <select 
                      id="vehicle_id" 
                      value={formData.vehicle_id}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select vehicle...</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.vehicle_id}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="status">📊 Status</label>
                    <select 
                      id="status" 
                      value={formData.status}
                      onChange={handleFormChange}
                    >
                      <option value="Loading">Loading</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Alert">Alert</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="eta">⏰ Expected Delivery</label>
                    <input 
                      type="datetime-local" 
                      id="eta" 
                      value={formData.eta}
                      onChange={handleFormChange}
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="notes">📝 Notes</label>
                    <textarea 
                      id="notes" 
                      rows="2" 
                      placeholder="Additional notes..."
                      value={formData.notes}
                      onChange={handleFormChange}
                    />
                  </FormGroup>
                </FormRow>

                <ModalFooter>
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleCreateShipment}
                    disabled={loading}
                  >
                    {loading ? '⏳ Creating...' : 'Create Shipment'}
                  </button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardWrapper>
  );
}

// ==================== STYLED COMPONENTS ====================

const DashboardWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    color: #64748b;
    margin: 4px 0 0 0;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-secondary {
    background: white;
    color: #475569;
    border: 1px solid #e2e8f0;
    &:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
  }

  .btn-primary {
    background: #2563eb;
    color: white;
    &:hover {
      background: #1d4ed8;
    }
  }

  .btn-text {
    @media (max-width: 640px) {
      display: none;
    }
  }

  .export-wrapper {
    position: relative;
  }

  .export-btn {
    min-width: 100px;
    justify-content: center;
    &:hover {
      border-color: #2563eb;
      color: #2563eb;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;

  .card-label {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
  }
  .card-value {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    display: block;
    margin: 4px 0;
  }
  .card-trend {
    font-size: 12px;
    font-weight: 500;
  }
  .trend-up { color: #16a34a; }
  .trend-down { color: #dc2626; }
  .text-muted { color: #64748b; }
`;

const IconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: ${props => props.color};
  color: ${props => props.stroke};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TableCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }
    
    .view-all-link {
      font-size: 13px;
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
      &:hover { text-decoration: underline; }
    }
  }

  .loading-state, .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #94a3b8;
  }
`;

const MobileShipmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MobileShipmentCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;

  .shipment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;

    .shipment-id {
      font-family: monospace;
      font-weight: 600;
      font-size: 14px;
      color: #1e293b;
    }
  }

  .shipment-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 12px;
    margin-bottom: 10px;

    .detail-row {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .label {
        font-size: 10px;
        color: #94a3b8;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .value {
        font-size: 13px;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  .shipment-actions {
    display: flex;
    gap: 6px;
    justify-content: flex-end;
    padding-top: 8px;
    border-top: 1px solid #e2e8f0;

    button {
      padding: 4px 12px;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      background: white;
      border: 1px solid #e2e8f0;
      color: #475569;
      transition: all 0.2s;

      &:hover {
        background: #f1f5f9;
      }
      &:first-child {
        background: #eff6ff;
        border-color: #bfdbfe;
        color: #2563eb;
        &:hover { background: #dbeafe; }
      }
      &:last-child {
        color: #dc2626;
        &:hover { background: #fef2f2; border-color: #fca5a5; }
      }
    }
  }
`;

const StatusBadgeMobile = styled.span`
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  
  background-color: ${props => 
    props.type === 'transit' ? '#ecfdf5' : 
    props.type === 'delayed' ? '#fffbeb' : 
    props.type === 'loading' ? '#e0f2fe' : 
    props.type === 'alert' ? '#fef2f2' :
    '#f0fdf4'};
    
  color: ${props => 
    props.type === 'transit' ? '#059669' : 
    props.type === 'delayed' ? '#d97706' : 
    props.type === 'loading' ? '#0284c7' : 
    props.type === 'alert' ? '#dc2626' :
    '#16a34a'};
`;

const AvatarSmall = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #64748b;
  color: white;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const LogsCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }
  }

  .empty-logs {
    text-align: center;
    padding: 30px 20px;
    color: #94a3b8;
    
    span { font-size: 32px; display: block; margin-bottom: 8px; }
    p { margin: 0; font-size: 14px; }
    small { font-size: 12px; color: #cbd5e1; }
  }
`;

const LiveIndicator = styled.span`
  background-color: #f0fdf4;
  color: #16a34a;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MobileLogItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px;
  background: #f8fafc;
  border-radius: 8px;

  .log-content {
    flex: 1;
    min-width: 0;

    .log-title {
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 2px 0;
    }
    .log-subtitle {
      font-size: 12px;
      color: #64748b;
      margin: 0 0 2px 0;
    }
    .log-time {
      font-size: 10px;
      color: #94a3b8;
    }
  }
`;

const LogDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
  
  background-color: ${props => 
    props.type === 'delivered' ? '#16a34a' : 
    props.type === 'alert' ? '#dc2626' : 
    props.type === 'dispatch' ? '#2563eb' : 
    props.type === 'maintenance' ? '#d97706' :
    '#94a3b8'};
`;

const ExportDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  z-index: 1000;
  overflow: hidden;
  animation: dropdownSlideIn 0.15s ease-out;

  @keyframes dropdownSlideIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ExportDropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  font-family: inherit;

  &:hover {
    background: #f1f5f9;
  }

  span {
    font-size: 20px;
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    
    strong {
      font-size: 14px;
      color: #1e293b;
      font-weight: 600;
    }
    
    small {
      font-size: 11px;
      color: #94a3b8;
    }
  }
`;

const ExportDropdownDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 4px 8px;
`;

// ==================== MODAL STYLES ====================

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.2s ease-out;

  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .btn-close {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
    &:hover { color: #475569; }
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  max-height: 60vh;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #475569;
    margin-bottom: 6px;
  }

  input[type="text"], 
  input[type="datetime-local"], 
  select, 
  textarea {
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background-color: #ffffff;
    color: #1e293b;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s ease;
    font-family: inherit;

    &:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 50px;
  }
`;

const ModalFooter = styled.div`
  padding: 14px 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: #f8fafc;

  button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .btn-secondary {
    background-color: #f1f5f9;
    color: #475569;
    &:hover:not(:disabled) { background-color: #e2e8f0; }
  }

  .btn-primary {
    background-color: #2563eb;
    color: #ffffff;
    &:hover:not(:disabled) { background-color: #1d4ed8; }
  }

  .btn-cancel {
    background-color: #f1f5f9;
    color: #475569;
    &:hover { background-color: #e2e8f0; }
  }

  .btn-edit {
    background-color: #d97706;
    color: #ffffff;
    &:hover { background-color: #b45309; }
  }
`;

// ==================== VIEW MODAL STYLES ====================

const ViewModalBody = styled.div` 
  padding: 20px; 
  max-height: 60vh; 
  overflow-y: auto; 
`;

const ViewInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ViewInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${props => props.fullWidth && 'grid-column: 1 / -1;'}

  label {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span {
    font-size: 15px;
    color: #0f172a;
  }

  .font-mono { 
    font-family: monospace; 
    font-size: 14px;
    color: #2563eb;
  }
  
  .description-text {
    font-size: 14px;
    color: #334155;
    line-height: 1.6;
    margin: 4px 0 0 0;
    background: #f8fafc;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #f1f5f9;
  }
`;

const ViewModalFooter = styled.div`
  padding: 16px 0 0 0;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;

  button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  
  background-color: ${props => 
    props.type === 'transit' ? '#ecfdf5' : 
    props.type === 'delayed' ? '#fffbeb' : 
    props.type === 'loading' ? '#e0f2fe' : 
    props.type === 'alert' ? '#fef2f2' :
    '#f0fdf4'};
    
  color: ${props => 
    props.type === 'transit' ? '#059669' : 
    props.type === 'delayed' ? '#d97706' : 
    props.type === 'loading' ? '#0284c7' : 
    props.type === 'alert' ? '#dc2626' :
    '#16a34a'};
`;
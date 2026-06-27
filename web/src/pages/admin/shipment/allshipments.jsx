    import React, { useState, useEffect } from 'react';
    import styled from 'styled-components';
    import * as XLSX from 'xlsx';
    import jsPDF from 'jspdf';
    import 'jspdf-autotable';

    export default function AllShipments() {
        // ==================== STATE MANAGEMENT ====================
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);
        const [isViewModalOpen, setIsViewModalOpen] = useState(false);
        const [selectedShipment, setSelectedShipment] = useState(null);
        const [loading, setLoading] = useState(false);
        const [showAllShipments, setShowAllShipments] = useState(false);
        const [isExportOpen, setIsExportOpen] = useState(false);
        
        // Data states
        const [shipments, setShipments] = useState([]);
        const [drivers, setDrivers] = useState([]);
        const [vehicles, setVehicles] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [filterStatus, setFilterStatus] = useState('All');

        // Form state for new shipment
        const [formData, setFormData] = useState({
            destination: '',
            driver_id: '',
            vehicle_id: '',
            eta: '',
            status: 'Loading',
            notes: '',
            client: '',
            weight: ''
        });

        // Edit form state
        const [editFormData, setEditFormData] = useState({
            id: '',
            destination: '',
            driver_id: '',
            vehicle_id: '',
            eta: '',
            status: '',
            notes: '',
            client: '',
            weight: ''
        });

        // ==================== API CALLS ====================
        const API_BASE = 'http://localhost:5000/api';

        useEffect(() => {
            fetchShipments();
            fetchDrivers();
            fetchVehicles();
        }, []);

        const fetchShipments = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE}/shipments`);
                const data = await response.json();
                
                if (response.ok) {
                    const sortedData = data.sort((a, b) => a.id - b.id);
                    setShipments(sortedData);
                } else {
                    console.error('Failed to fetch shipments:', data.message);
                }
            } catch (error) {
                console.error('Error fetching shipments:', error);
            } finally {
                setLoading(false);
            }
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

        // ==================== HELPERS ====================

        const generateTrackingId = (id) => {
            const prefix = 'TRK';
            const year = new Date().getFullYear();
            const paddedId = String(id).padStart(4, '0');
            return `${prefix}-${year}-${paddedId}`;
        };

        const getTrackingId = (shipment) => {
            if (shipment.tracking_id) {
                return shipment.tracking_id;
            }
            return generateTrackingId(shipment.id);
        };

        const getDriverName = (driverId) => {
            const driver = drivers.find(d => d.id === driverId);
            return driver ? driver.full_name : 'Unknown';
        };

        const getVehicleInfo = (vehicleId) => {
            const vehicle = vehicles.find(v => v.id === vehicleId);
            return vehicle ? `${vehicle.vehicle_id} [${vehicle.license_plate}]` : 'N/A';
        };

        const getStatusBadgeColor = (status) => {
            const colors = {
                'Delivered': { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
                'In Transit': { bg: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' },
                'Pending': { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
                'Loading': { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8' },
                'Delayed': { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
                'Alert': { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }
            };
            return colors[status] || colors['Pending'];
        };

        const formatDate = (dateString) => {
            if (!dateString || dateString === '0000-00-00 00:00:00') return 'N/A';
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

        // Filter shipments
        const filteredShipments = shipments.filter(shipment => {
            const matchesSearch = 
                (shipment.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getTrackingId(shipment).toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesStatus = filterStatus === 'All' || shipment.status === filterStatus;
            
            return matchesSearch && matchesStatus;
        });

        const displayedShipments = showAllShipments ? filteredShipments : filteredShipments.slice(0, 5);

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
                    alert(`✅ Shipment created successfully!`);
                    await fetchShipments();
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
                client: shipment.client || '',
                weight: shipment.weight || ''
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
                    alert('✅ Shipment updated successfully!');
                    await fetchShipments();
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
                    alert('✅ Shipment deleted successfully!');
                    await fetchShipments();
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
                client: '',
                weight: ''
            });
        };

        // ==================== EXPORT FUNCTIONS ====================

        // 1. Export to CSV
        const exportToCSV = () => {
            if (shipments.length === 0) {
                alert('No shipments to export!');
                return;
            }

            const headers = ['Tracking ID', 'ID', 'Client', 'Destination', 'Weight', 'Status', 'ETA', 'Driver', 'Vehicle'];
            
            const rows = shipments.map(s => [
                getTrackingId(s),
                s.id,
                s.client || 'N/A',
                s.destination || 'N/A',
                s.weight || 'N/A',
                s.status || 'N/A',
                formatDate(s.eta),
                getDriverName(s.driver_id),
                getVehicleInfo(s.vehicle_id)
            ]);

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
            
            alert(`✅ ${shipments.length} shipments exported to CSV!`);
            setIsExportOpen(false);
        };

        // 2. Export to Excel (.xlsx)
        const exportToExcel = () => {
            if (shipments.length === 0) {
                alert('No shipments to export!');
                return;
            }

            try {
                const excelData = shipments.map(s => ({
                    'Tracking ID': getTrackingId(s),
                    'ID': s.id,
                    'Client': s.client || 'N/A',
                    'Destination': s.destination || 'N/A',
                    'Weight': s.weight || 'N/A',
                    'Status': s.status || 'N/A',
                    'ETA': formatDate(s.eta),
                    'Driver': getDriverName(s.driver_id),
                    'Vehicle': getVehicleInfo(s.vehicle_id)
                }));

                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);
                
                // Set column widths
                ws['!cols'] = [
                    { wch: 20 }, // Tracking ID
                    { wch: 10 }, // ID
                    { wch: 25 }, // Client
                    { wch: 30 }, // Destination
                    { wch: 15 }, // Weight
                    { wch: 20 }, // Status
                    { wch: 30 }, // ETA
                    { wch: 25 }, // Driver
                    { wch: 25 }  // Vehicle
                ];

                XLSX.utils.book_append_sheet(wb, ws, 'Shipments');

                // Summary Sheet
                const summaryData = [
                    ['📊 SHIPMENT SUMMARY'],
                    [''],
                    ['Generated On:', new Date().toLocaleString()],
                    [''],
                    ['Metric', 'Value'],
                    ['Total Shipments', shipments.length],
                    ['Delivered', shipments.filter(s => s.status === 'Delivered').length],
                    ['In Transit', shipments.filter(s => s.status === 'In Transit').length],
                    ['Pending', shipments.filter(s => s.status === 'Pending').length],
                    ['Loading', shipments.filter(s => s.status === 'Loading').length],
                    ['Delayed', shipments.filter(s => s.status === 'Delayed').length],
                    ['Alert', shipments.filter(s => s.status === 'Alert').length]
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
                setIsExportOpen(false);
            } catch (error) {
                console.error('Error exporting Excel:', error);
                alert('❌ Failed to export Excel: ' + error.message);
            }
        };

        // 3. Export to PDF
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
                    { label: 'Delivered', value: shipments.filter(s => s.status === 'Delivered').length },
                    { label: 'In Transit', value: shipments.filter(s => s.status === 'In Transit').length },
                    { label: 'Delayed', value: shipments.filter(s => s.status === 'Delayed').length }
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
                
                const tableHeaders = ['Tracking ID', 'ID', 'Client', 'Destination', 'Weight', 'Status', 'ETA', 'Driver', 'Vehicle'];
                const tableRows = shipments.map(s => [
                    getTrackingId(s),
                    s.id,
                    s.client || 'N/A',
                    s.destination || 'N/A',
                    s.weight || 'N/A',
                    s.status || 'N/A',
                    formatDate(s.eta),
                    getDriverName(s.driver_id),
                    getVehicleInfo(s.vehicle_id)
                ]);

                doc.autoTable({
                    startY: 75,
                    head: [tableHeaders],
                    body: tableRows,
                    theme: 'striped',
                    headStyles: {
                        fillColor: [37, 99, 235],
                        textColor: [255, 255, 255],
                        fontSize: 8,
                        fontStyle: 'bold'
                    },
                    bodyStyles: { fontSize: 7 },
                    alternateRowStyles: { fillColor: [248, 250, 252] },
                    margin: { left: 14, right: 14 },
                    columnStyles: {
                        0: { cellWidth: 25 },
                        1: { cellWidth: 15 },
                        2: { cellWidth: 25 },
                        3: { cellWidth: 30 },
                        4: { cellWidth: 20 },
                        5: { cellWidth: 25 },
                        6: { cellWidth: 30 },
                        7: { cellWidth: 25 },
                        8: { cellWidth: 25 }
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
                setIsExportOpen(false);
            } catch (error) {
                console.error('Error exporting PDF:', error);
                alert('❌ Failed to export PDF: ' + error.message);
            }
        };

        // 4. Export Current View (Filtered Data) to CSV
        const exportCurrentViewCSV = () => {
            if (filteredShipments.length === 0) {
                alert('No shipments to export! Please adjust your filters.');
                return;
            }

            const headers = ['Tracking ID', 'ID', 'Client', 'Destination', 'Weight', 'Status', 'ETA', 'Driver', 'Vehicle'];
            
            const rows = filteredShipments.map(s => [
                getTrackingId(s),
                s.id,
                s.client || 'N/A',
                s.destination || 'N/A',
                s.weight || 'N/A',
                s.status || 'N/A',
                formatDate(s.eta),
                getDriverName(s.driver_id),
                getVehicleInfo(s.vehicle_id)
            ]);

            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');

            const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `filtered_shipments_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            alert(`✅ ${filteredShipments.length} shipments exported to CSV!`);
            setIsExportOpen(false);
        };

        // 5. Export Current View to Excel
        const exportCurrentViewExcel = () => {
            if (filteredShipments.length === 0) {
                alert('No shipments to export! Please adjust your filters.');
                return;
            }

            try {
                const excelData = filteredShipments.map(s => ({
                    'Tracking ID': getTrackingId(s),
                    'ID': s.id,
                    'Client': s.client || 'N/A',
                    'Destination': s.destination || 'N/A',
                    'Weight': s.weight || 'N/A',
                    'Status': s.status || 'N/A',
                    'ETA': formatDate(s.eta),
                    'Driver': getDriverName(s.driver_id),
                    'Vehicle': getVehicleInfo(s.vehicle_id)
                }));

                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);
                
                ws['!cols'] = [
                    { wch: 20 }, { wch: 10 }, { wch: 25 }, 
                    { wch: 30 }, { wch: 15 }, { wch: 20 }, 
                    { wch: 30 }, { wch: 25 }, { wch: 25 }
                ];

                XLSX.utils.book_append_sheet(wb, ws, 'Filtered Shipments');

                // Filter Info Sheet
                const filterInfo = [
                    ['🔍 FILTER INFORMATION'],
                    [''],
                    ['Generated On:', new Date().toLocaleString()],
                    ['Filter Applied:', filterStatus !== 'All' ? filterStatus : 'No filter'],
                    ['Search Term:', searchTerm || 'None'],
                    ['Total Records:', filteredShipments.length]
                ];

                const wsFilter = XLSX.utils.aoa_to_sheet(filterInfo);
                wsFilter['!cols'] = [{ wch: 30 }, { wch: 25 }];
                XLSX.utils.book_append_sheet(wb, wsFilter, 'Filter Info');

                const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([wbout], { 
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                });
                
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `filtered_shipments_${new Date().toISOString().split('T')[0]}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                alert(`✅ ${filteredShipments.length} shipments exported to Excel!`);
                setIsExportOpen(false);
            } catch (error) {
                console.error('Error exporting Excel:', error);
                alert('❌ Failed to export Excel: ' + error.message);
            }
        };

        // 6. Export Current View to PDF
        const exportCurrentViewPDF = () => {
            if (filteredShipments.length === 0) {
                alert('No shipments to export! Please adjust your filters.');
                return;
            }

            try {
                const doc = new jsPDF('landscape', 'mm', 'a4');
                const pageWidth = doc.internal.pageSize.getWidth();
                
                doc.setFontSize(20);
                doc.setTextColor(37, 99, 235);
                doc.text('📊 Shipment Report (Filtered View)', pageWidth / 2, 20, { align: 'center' });
                
                doc.setFontSize(10);
                doc.setTextColor(100, 116, 139);
                doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 28, { align: 'center' });
                doc.text(`Filter: ${filterStatus !== 'All' ? filterStatus : 'All Status'}`, pageWidth / 2, 34, { align: 'center' });
                
                doc.setFillColor(248, 250, 252);
                doc.rect(14, 40, pageWidth - 28, 25, 'F');
                
                const summaryItems = [
                    { label: 'Total Records', value: filteredShipments.length },
                    { label: 'Delivered', value: filteredShipments.filter(s => s.status === 'Delivered').length },
                    { label: 'In Transit', value: filteredShipments.filter(s => s.status === 'In Transit').length },
                    { label: 'Delayed', value: filteredShipments.filter(s => s.status === 'Delayed').length }
                ];
                
                const itemWidth = (pageWidth - 28) / summaryItems.length;
                summaryItems.forEach((item, index) => {
                    const x = 14 + (index * itemWidth);
                    doc.setFontSize(8);
                    doc.setTextColor(100, 116, 139);
                    doc.text(item.label, x + itemWidth / 2, 47, { align: 'center' });
                    doc.setFontSize(14);
                    doc.setTextColor(30, 41, 59);
                    doc.text(String(item.value), x + itemWidth / 2, 57, { align: 'center' });
                });
                
                const tableHeaders = ['Tracking ID', 'ID', 'Client', 'Destination', 'Weight', 'Status', 'ETA', 'Driver', 'Vehicle'];
                const tableRows = filteredShipments.map(s => [
                    getTrackingId(s),
                    s.id,
                    s.client || 'N/A',
                    s.destination || 'N/A',
                    s.weight || 'N/A',
                    s.status || 'N/A',
                    formatDate(s.eta),
                    getDriverName(s.driver_id),
                    getVehicleInfo(s.vehicle_id)
                ]);

                doc.autoTable({
                    startY: 75,
                    head: [tableHeaders],
                    body: tableRows,
                    theme: 'striped',
                    headStyles: {
                        fillColor: [37, 99, 235],
                        textColor: [255, 255, 255],
                        fontSize: 8,
                        fontStyle: 'bold'
                    },
                    bodyStyles: { fontSize: 7 },
                    alternateRowStyles: { fillColor: [248, 250, 252] },
                    margin: { left: 14, right: 14 }
                });

                const finalY = doc.lastAutoTable.finalY + 10;
                doc.setFontSize(8);
                doc.setTextColor(148, 163, 184);
                doc.text(
                    `© ${new Date().getFullYear()} Fleet Management • ${filteredShipments.length} shipments`,
                    pageWidth / 2,
                    finalY,
                    { align: 'center' }
                );

                doc.save(`filtered_shipments_${new Date().toISOString().split('T')[0]}.pdf`);
                alert(`✅ ${filteredShipments.length} shipments exported to PDF!`);
                setIsExportOpen(false);
            } catch (error) {
                console.error('Error exporting PDF:', error);
                alert('❌ Failed to export PDF: ' + error.message);
            }
        };

        // ==================== RENDER ====================

        return (
            <PageWrapper>
                {/* Header */}
                <HeaderControl>
                    <TitleBlock>
                        <h1>📦 All Cargo Shipments</h1>
                        <p>Track, audit, and dispatch system-wide freight transactions.</p>
                    </TitleBlock>
                    
                    {/* ============ EXPORT DROPDOWN - ONLY ONCE ============ */}
    <ActionButtons>
        <div className="export-wrapper">
            <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setIsExportOpen(!isExportOpen)}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Export
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </button>
            
            {/* ✅ ExportDropdown - SIRF EK BAAR */}
        {isExportOpen && (
        <ExportDropdown>
            <ExportDropdownItem onClick={exportCurrentViewCSV} className="current-view">
                <span>🔍</span>
                <div>
                    <strong>Current View (CSV)</strong>
                    <small>{filteredShipments.length} records</small>
                </div>
            </ExportDropdownItem>
            <ExportDropdownItem onClick={exportCurrentViewExcel} className="current-view">
                <span>📊</span>
                <div>
                    <strong>Current View (Excel)</strong>
                    <small>{filteredShipments.length} records</small>
                </div>
            </ExportDropdownItem>
            <ExportDropdownItem onClick={exportCurrentViewPDF} className="current-view">
                <span>📑</span>
                <div>
                    <strong>Current View (PDF)</strong>
                    <small>{filteredShipments.length} records</small>
                </div>
            </ExportDropdownItem>
        </ExportDropdown>
    )}
        </div>
        
        <button type="button" className="btn-primary" onClick={() => setIsModalOpen(true)}>
            ➕ Add Shipment
        </button>
    </ActionButtons>    
                </HeaderControl>

                {/* Search and Filter */}
                <FilterBar>
                    <SearchBox>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search by Tracking ID, Client, or Destination..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchBox>
                    <FilterSelect 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Delivered">✅ Delivered</option>
                        <option value="In Transit">🚚 In Transit</option>
                        <option value="Pending">⏰ Pending</option>
                        <option value="Loading">⏳ Loading</option>
                        <option value="Delayed">⚠️ Delayed</option>
                        <option value="Alert">🚨 Alert</option>
                    </FilterSelect>
                </FilterBar>

                {/* Table */}
                <TableCard>
                    <div className="card-header">
                        <h2>📋 Recent Shipments</h2>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <span className="record-count">{filteredShipments.length} records</span>
                            {filteredShipments.length > 5 && (
                                <button 
                                    className="view-toggle"
                                    onClick={() => setShowAllShipments(!showAllShipments)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#60a5fa',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        fontFamily: 'inherit',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = 'rgba(96, 165, 250, 0.1)'}
                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                >
                                    {showAllShipments ? 'Show Less ↑' : 'View All →'}
                                </button>
                            )}
                        </div>
                    </div>
                    <TableResponsiveWrapper>
                        <ShipmentsTable>
                            <thead>
                                <tr>
                                    <th>Tracking ID</th>
                                    <th>ID</th>
                                    <th>Client</th>
                                    <th>Destination</th>
                                    <th>Weight</th>
                                    <th>Status</th>
                                    <th>ETA</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                            ⏳ Loading shipments...
                                        </td>
                                    </tr>
                                ) : displayedShipments.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                            📭 No shipments found. Create a new shipment!
                                        </td>
                                    </tr>
                                ) : (
                                    displayedShipments.map((shipment) => {
                                        const statusColors = getStatusBadgeColor(shipment.status);
                                        const trackingId = getTrackingId(shipment);
                                        return (
                                            <tr key={shipment.id}>
                                                <td className="font-mono tracking-id">{trackingId}</td>
                                                <td className="font-mono">#{shipment.id}</td>
                                                <td className="font-bold text-white">
                                                    {shipment.client || 'N/A'}
                                                </td>
                                                <td className="text-slate">{shipment.destination}</td>
                                                <td className="text-slate">{shipment.weight || 'N/A'}</td>
                                                <td>
                                                    <StatusBadge 
                                                        bgColor={statusColors.bg} 
                                                        textColor={statusColors.color}
                                                    >
                                                        {shipment.status}
                                                    </StatusBadge>
                                                </td>
                                                <td className={shipment.status === 'Pending' || shipment.status === 'Delayed' ? 'text-danger font-bold' : 'font-bold text-white'}>
                                                    {formatDate(shipment.eta)}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <ActionGroup>
                                                        <IconButton 
                                                            aria-label="View Details"
                                                            onClick={() => handleViewShipment(shipment)}
                                                            className="view-btn"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                                <circle cx="12" cy="12" r="3"/>
                                                            </svg>
                                                        </IconButton>
                                                        <IconButton 
                                                            aria-label="Edit"
                                                            onClick={() => handleEditShipment(shipment)}
                                                            className="edit-btn"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                                                            </svg>
                                                        </IconButton>
                                                        <IconButton 
                                                            aria-label="Delete"
                                                            onClick={() => handleDeleteShipment(shipment.id)}
                                                            className="delete-btn"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="3 6 5 6 21 6"/>
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                            </svg>
                                                        </IconButton>
                                                    </ActionGroup>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </ShipmentsTable>
                    </TableResponsiveWrapper>
                    {showAllShipments && filteredShipments.length > 5 && (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '12px', 
                            color: '#94a3b8',
                            fontSize: '13px',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            marginTop: '8px'
                        }}>
                            Showing all {filteredShipments.length} shipments
                        </div>
                    )}
                </TableCard>


                {/* ============ CREATE MODAL ============ */}
                {isModalOpen && (
                    <ModalOverlay onClick={() => setIsModalOpen(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <h5>➕ Create New Shipment</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleCreateShipment}>
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

                                    <FormGroup>
                                        <label htmlFor="weight">⚖️ Cargo Weight</label>
                                        <input 
                                            type="text" 
                                            id="weight" 
                                            placeholder="e.g., 12 Tons" 
                                            value={formData.weight}
                                            onChange={handleFormChange}
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <label htmlFor="driver_id">👤 Assign Driver</label>
                                        <select 
                                            id="driver_id" 
                                            value={formData.driver_id}
                                            onChange={handleFormChange}
                                            required
                                        >
                                            <option value="">Select driver...</option>
                                            {drivers.map((driver) => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.full_name} ({driver.license_number})
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
                                                    {vehicle.vehicle_id} - {vehicle.company_name} [{vehicle.license_plate}]
                                                </option>
                                            ))}
                                        </select>
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor="status">📊 Status</label>
                                        <select 
                                            id="status" 
                                            value={formData.status}
                                            onChange={handleFormChange}
                                        >
                                            <option value="Loading">⏳ Loading</option>
                                            <option value="In Transit">🚚 In Transit</option>
                                            <option value="Delayed">⚠️ Delayed</option>
                                            <option value="Alert">🚨 Alert</option>
                                            <option value="Delivered">✅ Delivered</option>
                                            <option value="Pending">⏰ Pending</option>
                                        </select>
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor="eta">📅 Expected Delivery Date</label>
                                        <input 
                                            type="date" 
                                            id="eta" 
                                            value={formData.eta}
                                            onChange={handleFormChange}
                                        />
                                    </FormGroup>

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

                                    <ModalFooter>
                                        <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                                            Cancel
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn-submit" 
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

                {/* ============ EDIT MODAL ============ */}
                {isEditModalOpen && (
                    <ModalOverlay onClick={() => setIsEditModalOpen(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <h5>✏️ Edit Shipment</h5>
                                <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}>✕</button>
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleUpdateShipment}>
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

                                    <FormGroup>
                                        <label htmlFor="weight">⚖️ Cargo Weight</label>
                                        <input 
                                            type="text" 
                                            id="weight" 
                                            placeholder="e.g., 12 Tons" 
                                            value={editFormData.weight}
                                            onChange={handleEditFormChange}
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <label htmlFor="driver_id">👤 Assign Driver</label>
                                        <select 
                                            id="driver_id" 
                                            value={editFormData.driver_id}
                                            onChange={handleEditFormChange}
                                            required
                                        >
                                            <option value="">Select driver...</option>
                                            {drivers.map((driver) => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.full_name} ({driver.license_number})
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
                                                    {vehicle.vehicle_id} - {vehicle.company_name} [{vehicle.license_plate}]
                                                </option>
                                            ))}
                                        </select>
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor="status">📊 Status</label>
                                        <select 
                                            id="status" 
                                            value={editFormData.status}
                                            onChange={handleEditFormChange}
                                        >
                                            <option value="Loading">⏳ Loading</option>
                                            <option value="In Transit">🚚 In Transit</option>
                                            <option value="Delayed">⚠️ Delayed</option>
                                            <option value="Alert">🚨 Alert</option>
                                            <option value="Delivered">✅ Delivered</option>
                                            <option value="Pending">⏰ Pending</option>
                                        </select>
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor="eta">📅 Expected Delivery Date</label>
                                        <input 
                                            type="date" 
                                            id="eta" 
                                            value={editFormData.eta}
                                            onChange={handleEditFormChange}
                                        />
                                    </FormGroup>

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

                                    <ModalFooter>
                                        <button type="button" className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>
                                            Cancel
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn-submit" 
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

                {/* ============ VIEW MODAL ============ */}
                {isViewModalOpen && selectedShipment && (
                    <ModalOverlay onClick={() => setIsViewModalOpen(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <h5>📋 Shipment Details</h5>
                                <button type="button" className="btn-close" onClick={() => setIsViewModalOpen(false)}>✕</button>
                            </ModalHeader>
                            <ViewModalBody>
                                <ViewInfoGrid>
                                    <ViewInfoItem>
                                        <label>Tracking ID</label>
                                        <span className="font-mono tracking-id">{getTrackingId(selectedShipment)}</span>
                                    </ViewInfoItem>
                                    <ViewInfoItem>
                                        <label>Shipment ID</label>
                                        <span className="font-mono">#{selectedShipment.id}</span>
                                    </ViewInfoItem>
                                    <ViewInfoItem>
                                        <label>Status</label>
                                        <StatusBadge 
                                            bgColor={getStatusBadgeColor(selectedShipment.status).bg} 
                                            textColor={getStatusBadgeColor(selectedShipment.status).color}
                                        >
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
                                        <label>⚖️ Weight</label>
                                        <span>{selectedShipment.weight || 'N/A'}</span>
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
                                        <label>⏰ ETA</label>
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
            </PageWrapper>
        );
    }

    // ==================== STYLED COMPONENTS ====================

    const PageWrapper = styled.div`
        max-width: 1400px;
        margin: 0 auto;
        padding: 40px 24px;
        padding-top: 110px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%);
        min-height: 100vh;

        @media (max-width: 1024px) {
            padding: 20px 16px;
            padding-top: 90px;
        }
    `;

    const HeaderControl = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        gap: 16px;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
        }
    `;

    const TitleBlock = styled.div`
        h1 {
            font-size: 32px;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
            letter-spacing: -0.02em;
        }
        p {
            font-size: 15px;
            color: #64748b;
            margin: 6px 0 0 0;
        }
    `;

    const ActionButtons = styled.div`
        display: flex;
        gap: 12px;
        position: relative;

        @media (max-width: 768px) {
            width: 100%;
            button { flex: 1; }
        }

        button {
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;
            border: none;
        }

        .btn-secondary {
            background-color: #ffffff;
            border: 1px solid #cbd5e1;
            color: #475569;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            &:hover { background-color: #f1f5f9; }
        }

        .btn-primary {
            background-color: #2563eb;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            &:hover { 
                background-color: #1d4ed8;
                transform: translateY(-1px);
            }
        }

        .export-wrapper {
            position: relative;
        }
    `;

    const FilterBar = styled.div`
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;

        @media (max-width: 576px) {
            flex-direction: column;
        }
    `;

    const SearchBox = styled.div`
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        flex: 1;
        min-width: 200px;

        svg {
            color: #94a3b8;
            flex-shrink: 0;
        }

        input {
            border: none;
            outline: none;
            font-size: 14px;
            color: #1e293b;
            width: 100%;
            background: transparent;

            &::placeholder {
                color: #94a3b8;
            }
        }
    `;

    const FilterSelect = styled.select`
        padding: 10px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        color: #1e293b;
        background: #ffffff;
        cursor: pointer;
        min-width: 150px;

        &:focus {
            outline: none;
            border-color: #2563eb;
        }
    `;

    const TableCard = styled.div`
        background: linear-gradient(145deg, #0a1628, #060d1e);
        border-radius: 16px;
        overflow: hidden;
        padding: 32px;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.3);

        @media (max-width: 576px) {
            padding: 20px 16px;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            
            h2 { 
                font-size: 20px; 
                font-weight: 600; 
                color: #ffffff; 
                margin: 0; 
            }

            .record-count {
                font-size: 13px;
                color: #64748b;
                background: rgba(255, 255, 255, 0.05);
                padding: 4px 12px;
                border-radius: 20px;
            }
        }
    `;

    const TableResponsiveWrapper = styled.div`
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    `;

    const ShipmentsTable = styled.table`
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 14px;
        color: #cbd5e1;

        thead tr {
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            color: #94a3b8;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }

        th, td {
            padding: 18px 16px;
            white-space: nowrap;
        }

        tbody tr {
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            transition: background-color 0.2s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.02);
            }
            &:last-child {
                border-bottom: none;
            }
        }

        .font-mono { 
            font-family: monospace; 
            color: #60a5fa; 
            font-size: 13px; 
            font-weight: 600;
        }
        .font-bold { font-weight: 600; }
        .text-slate { color: #94a3b8; }
        .text-white { color: #ffffff; }
        .text-danger { color: #f87171; }
        .tracking-id {
            color: #60a5fa;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.5px;
        }
    `;

    const StatusBadge = styled.span`
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background-color: ${props => props.bgColor || 'rgba(148, 163, 184, 0.12)'};
        color: ${props => props.textColor || '#94a3b8'};

        &::before {
            content: "●";
            font-size: 8px;
            color: ${props => props.textColor || '#94a3b8'};
        }
    `;

    const ActionGroup = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
    `;

    const IconButton = styled.button`
        background: none;
        border: none;
        color: #475569;
        cursor: pointer;
        padding: 6px;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        
        &.view-btn {
            &:hover { 
                color: #60a5fa; 
                background-color: rgba(96, 165, 250, 0.1); 
            }
        }
        
        &.edit-btn {
            &:hover { 
                color: #fbbf24; 
                background-color: rgba(251, 191, 36, 0.1); 
            }
        }
        
        &.delete-btn {
            &:hover { 
                color: #f87171; 
                background-color: rgba(248, 113, 113, 0.1); 
            }
        }
    `;

    // ==================== MODAL STYLES ====================

    const ModalOverlay = styled.div`
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(15, 23, 42, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 16px;
    `;

    const ModalContent = styled.div`
        background-color: #ffffff;
        border-radius: 12px;
        width: 100%;
        max-width: 550px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: modalSlideIn 0.2s ease-out;

        @keyframes modalSlideIn {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
    `;

    const ModalHeader = styled.div`
        padding: 18px 24px;
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
            &:hover { color: #475569; }
        }
    `;

    const ModalBody = styled.div`
        padding: 24px;
        max-height: 70vh;
        overflow-y: auto;
    `;

    const FormGroup = styled.div`
        margin-bottom: 18px;
        &:last-child { margin-bottom: 0; }

        label { 
            display: block; 
            font-size: 14px; 
            font-weight: 500; 
            color: #334155; 
            margin-bottom: 8px; 
        }
        
        input[type="text"], 
        input[type="date"], 
        select, 
        textarea {
            width: 100%; 
            padding: 10px 14px; 
            font-size: 14px; 
            border-radius: 6px;
            border: 1px solid #cbd5e1; 
            background-color: #ffffff; 
            color: #0f172a; 
            outline: none; 
            box-sizing: border-box;
            font-family: inherit;
            
            &:focus { 
                border-color: #2563eb; 
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15); 
            }
        }

        textarea {
            resize: vertical;
            min-height: 60px;
        }
    `;

    const ModalFooter = styled.div`
        padding: 16px 24px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: flex-end;
        gap: 12px;

        button { 
            padding: 10px 20px; 
            font-size: 14px; 
            font-weight: 600; 
            border-radius: 6px; 
            cursor: pointer; 
            border: none; 
            transition: all 0.2s;
            
            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }
        
        .btn-cancel { 
            background-color: #f1f5f9; 
            color: #475569; 
            &:hover:not(:disabled) { background-color: #e2e8f0; } 
        }
        
        .btn-submit { 
            background-color: #2563eb; 
            color: #ffffff; 
            &:hover:not(:disabled) { background-color: #1d4ed8; } 
        }
    `;

    // ==================== VIEW MODAL STYLES ====================

    const ViewModalBody = styled.div` 
        padding: 24px; 
        max-height: 70vh; 
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
            font-size: 12px;
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
            border-radius: 6px;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
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

    // ==================== EXPORT DROPDOWN STYLES ====================

// ==================== EXPORT DROPDOWN STYLES ====================

const ExportDropdown = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    min-width: 280px;
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

    &.current-view {
        border-top: 1px solid #e2e8f0;
        margin-top: 4px;
        padding-top: 12px;
    }
`;

// ✅ ADD THIS
const ExportDropdownDivider = styled.div`
    height: 1px;
    background: #e2e8f0;
    margin: 4px 8px;
`;      
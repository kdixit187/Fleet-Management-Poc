import React, { useState } from 'react';

export default function AddVehicle({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    SRno: "", // Auto-managed sequence indicator fallback
    Comapnyname: "Kartikey Lodha", // Default fallback initialization
    truckmodelname: "",
    truckmodelyear: "",
    numberplate: "",
    status: "Available"
  });

  if (!isOpen) return null; // Modal system layout guard closure

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.truckmodelname || !formData.numberplate) return;
    
    // Parent components data stack sync update callback triggers
    onSave(formData);
    onClose(); 
    
    // Form variables state array flushing clean reset
    setFormData({
      SRno: "",
      Comapnyname: "Kartikey Lodha",
      truckmodelname: "",
      truckmodelyear: "",
      numberplate: "",
      status: "Available"
    });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(2, 6, 23, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: '#0b1329', width: '100%', maxWidth: '520px', borderRadius: '16px', border: '1px solid #1e293b', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Modal Window Ribbon Header */}
        <div style={{ padding: '20px 24px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0' }}>🚛 Fleet Registry Console</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Register operational tracking containers to active nodes.</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
        </div>

        {/* Form Interactive Context Area */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Company Owner Entity</label>
            <input type="text" value={formData.Comapnyname} onChange={(e) => setFormData({...formData, Comapnyname: e.target.value})} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }} required />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Truck Model Name</label>
              <input type="text" placeholder="e.g. TRK-5011" value={formData.truckmodelname} onChange={(e) => setFormData({...formData, truckmodelname: e.target.value})} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }} required />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Model Production Year</label>
              <input type="number" placeholder="e.g. 2024" value={formData.truckmodelyear} onChange={(e) => setFormData({...formData, truckmodelyear: e.target.value})} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' }} required />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>Number Plate Registry ID</label>
            <input type="text" placeholder="e.g. RJ06-GA-9999" value={formData.numberplate} onChange={(e) => setFormData({...formData, numberplate: e.target.value})} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', textTransform: 'uppercase' }} required />
          </div>

          {/* Call-to-action Action Matrix Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
            <button type="button" onClick={onClose} style={{ backgroundColor: 'transparent', color: '#94a3b8', padding: '10px 20px', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel Action</button>
            <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 24px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Initialize Vehicle</button>
          </div>

        </form>
      </div>
    </div>
  );
}
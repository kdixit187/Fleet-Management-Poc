import React, { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [systemLogs, setSystemLogs] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Hardened Structural Styles to secure text visibility against parent global styles
  const styles = {
    container: { backgroundColor: '#f1f5f9', color: '#0f172a', padding: '24px', minHeight: '100vh', width: '100%', fontFamily: 'sans-serif' },
    header: { borderBottom: '2px solid #cbd5e1', paddingBottom: '16px', marginBottom: '24px' },
    title: { color: '#0f172a', fontSize: '26px', fontWeight: '900', margin: 0 },
    subtitle: { color: '#475569', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '600' },
    layoutGrid: { display: 'flex', flexWrap: 'wrap', gap: '24px' },
    sidebarCard: { backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', minWidth: '220px', flex: '1 1 200px', alignSelf: 'flex-start', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    mainContentCard: { backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '24px', flex: '3 1 500px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    tabButton: (isActive) => ({
      display: 'block', width: '100%', padding: '12px 16px', backgroundColor: isActive ? '#0f172a' : 'transparent',
      color: isActive ? '#ffffff' : '#334155', border: 'none', borderRadius: '8px', textAlign: 'left',
      fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginBottom: '6px', transition: 'all 0.2s'
    }),
    sectionTitle: { color: '#0f172a', fontSize: '18px', fontWeight: '800', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', marginTop: 0 },
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', color: '#1e293b', fontSize: '14px', fontWeight: '700', marginBottom: '6px' },
    input: { width: '100%', padding: '10px 14px', border: '2px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: '600', backgroundColor: '#f8fafc', color: '#0f172a', outline: 'none' },
    rowToggle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' },
    btnSave: { backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER BAR */}
      <header style={styles.header}>
        <h1 style={styles.title}>⚙️ Admin System Settings</h1>
        <p style={styles.subtitle}>Configure logistics operational parameters, security tiers, and notification channels.</p>
      </header>

      {/* CORE INTERFACE GRID */}
      <div style={styles.layoutGrid}>
        
        {/* LEFT COLUMN: NAVIGATION TABS */}
        <div style={styles.sidebarCard}>
          <button style={styles.tabButton(activeTab === 'general')} onClick={() => setActiveTab('general')}>💼 General Settings</button>
          <button style={styles.tabButton(activeTab === 'security')} onClick={() => setActiveTab('security')}>🔐 Security & Terminal</button>
          <button style={styles.tabButton(activeTab === 'notifications')} onClick={() => setActiveTab('notifications')}>📢 Fleet Notifications</button>
        </div>

        {/* RIGHT COLUMN: ACTION PANELS */}
        <div style={styles.mainContentCard}>
          
          {/* TAB 1: GENERAL SYSTEM PANELS */}
          {activeTab === 'general' && (
            <div>
              <h2 style={styles.sectionTitle}>General Fleet Configurations</h2>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Logistics Company Brand Name</label>
                <input type="text" defaultValue="KArtikey LogiTrans" style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Primary Terminal Operational Hub ID</label>
                <input type="text" defaultValue="HUB-DELHI-01" style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Default Currency Metric</label>
                <input type="text" defaultValue="INR (₹)" style={styles.input} />
              </div>

              <button style={styles.btnSave}>Save Operational Configs</button>
            </div>
          )}

          {/* TAB 2: SECURITY MODES */}
          {activeTab === 'security' && (
            <div>
              <h2 style={styles.sectionTitle}>Security & Gate Authorization</h2>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Administrator Session Timeout (Minutes)</label>
                <input type="number" defaultValue="30" style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Root Dispatch Encryption Keys</label>
                <input type="password" defaultValue="••••••••••••••••" style={styles.input} />
              </div>

              <div style={styles.rowToggle}>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>Automatic Error / Crash Manifest Logs</div>
                  <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', marginTop: '2px' }}>Broadcast code faults back to regional DevOps terminal logs automatically.</div>
                </div>
                <input type="checkbox" checked={systemLogs} onChange={() => setSystemLogs(!systemLogs)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              </div>

              <button style={styles.btnSave}>Update Security Profile</button>
            </div>
          )}

          {/* TAB 3: ALERTS FEED */}
          {activeTab === 'notifications' && (
            <div>
              <h2 style={styles.sectionTitle}>Fleet Notification Distribution Rules</h2>
              
              <div style={styles.rowToggle}>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>Critical Exception Delay Email Alerts</div>
                  <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', marginTop: '2px' }}>Instantly dispatch operational alert flags to clients on major route stalls.</div>
                </div>
                <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              </div>

              <div style={{ ...styles.formGroup, marginTop: '20px' }}>
                <label style={styles.label}>Automated SMS Driver Notification Format</label>
                <input type="text" defaultValue="ALERT: Fleet run [ID] leg disrupted due to [REASON]. Contact dispatcher panel immediately." style={styles.input} />
              </div>

              <button style={styles.btnSave}>Confirm Rule Triggers</button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
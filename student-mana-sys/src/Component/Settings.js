import React, { useState, useEffect } from 'react';

function Settings() {
  // LOAD INITIAL VALUES FROM LOCALSTORAGE (DYNAMIC)
  const [adminData, setAdminData] = useState(() => {
    const saved = localStorage.getItem('adminProfile');
    return saved ? JSON.parse(saved) : { name: 'Administrator', email: 'admin@system.com' };
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState(() => {
    const savedPref = localStorage.getItem('appPreferences');
    return savedPref ? JSON.parse(savedPref) : {
      defaultPageSize: '5',
      emailNotifications: true,
      darkMode: document.body.classList.contains('dark-theme')
    };
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Sync dark mode state with <body> class on render
  useEffect(() => {
    if (preferences.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [preferences.darkMode]);

  const handleProfileChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePrefChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPreferences({ ...preferences, [e.target.name]: value });
  };

  const handleThemeToggle = () => {
    const isDark = !preferences.darkMode;
    const updatedPref = { ...preferences, darkMode: isDark };
    setPreferences(updatedPref);
    localStorage.setItem('appPreferences', JSON.stringify(updatedPref));
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setError('');

    // Password validation logic
    if (passwords.newPassword) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setError('New passwords do not match!');
        return;
      }
      if (passwords.newPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
    }

    // SAVE DYNAMICALLY TO LOCALSTORAGE
    localStorage.setItem('adminProfile', JSON.stringify(adminData));
    localStorage.setItem('appPreferences', JSON.stringify(preferences));

    setMessage('Settings updated and saved dynamically!');
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleClearCache = () => {
    localStorage.removeItem('appPreferences');
    setMessage('System cache and saved preferences cleared!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="table-section" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <h2>System & Profile Settings</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Manage your administrator profile, application preferences, and system defaults.
      </p>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert danger">{error}</div>}

      <form onSubmit={handleSaveAll}>
        {/* SECTION 1: PROFILE DETAILS */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-main)' }}>👤 Profile Information</h3>
          
          <div className="form-group">
            <label>Admin Name</label>
            <input 
              type="text" 
              name="name" 
              value={adminData.name} 
              onChange={handleProfileChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={adminData.email} 
              onChange={handleProfileChange} 
              required 
            />
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

        {/* SECTION 2: SYSTEM PREFERENCES & DISPLAY */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-main)' }}>⚙️ System Preferences</h3>

          <div className="form-group">
            <label>Default Table Page Size</label>
            <select name="defaultPageSize" value={preferences.defaultPageSize} onChange={handlePrefChange}>
              <option value="5">5 records per page</option>
              <option value="10">10 records per page</option>
              <option value="25">25 records per page</option>
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <div>
              <label style={{ margin: 0 }}>Dark Mode Appearance</label>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toggle between light and dark dashboard theme</span>
            </div>
            <button type="button" className="btn-secondary" onClick={handleThemeToggle}>
              {preferences.darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
            <input 
              type="checkbox" 
              name="emailNotifications" 
              id="emailNotifications" 
              checked={preferences.emailNotifications} 
              onChange={handlePrefChange}
              style={{ width: 'auto' }}
            />
            <label htmlFor="emailNotifications" style={{ margin: 0, cursor: 'pointer' }}>
              Receive automated email alerts for student deletion events
            </label>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

        {/* SECTION 3: SECURITY & PASSWORD */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-main)' }}>🔒 Security (Optional)</h3>

          <div className="form-group">
            <label>Current Password</label>
            <input 
              type="password" 
              name="oldPassword" 
              placeholder="Leave blank if not changing password" 
              value={passwords.oldPassword} 
              onChange={handlePasswordChange} 
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              placeholder="••••••••" 
              value={passwords.newPassword} 
              onChange={handlePasswordChange} 
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="••••••••" 
              value={passwords.confirmPassword} 
              onChange={handlePasswordChange} 
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn-submit">
            Save All Settings
          </button>
          <button type="button" className="btn-secondary" onClick={handleClearCache}>
            🧹 Clear System Cache
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
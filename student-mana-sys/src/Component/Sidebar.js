import React from 'react';
import '../App.css';
function Sidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">SMS Admin</div>
      <ul className="sidebar-menu">
        <li 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="icon">📊</i> Dashboard
        </li>
        <li 
          className={activeTab === 'student-list' ? 'active' : ''} 
          onClick={() => setActiveTab('student-list')}
        >
          <i className="icon">🎓</i> Student List
        </li>
        <li 
          className={activeTab === 'student-form' ? 'active' : ''} 
          onClick={() => setActiveTab('student-form')}
        >
          <i className="icon">➕</i> Add Student
        </li>
        <li className={activeTab === 'settings' ? 'active':''}
        onClick={() => setActiveTab('settings')}>
          <i className="icon">⚙️</i> Settings
        </li>
        <li className="logout-item" onClick={onLogout}>
          <i className="icon">🚪</i> Logout
        </li>


      </ul>
    </aside>
  );
}

export default Sidebar;
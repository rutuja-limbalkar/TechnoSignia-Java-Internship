import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import Settings from './Settings'

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [totalStudents, setTotalStudents] = useState(0);
  const [recentStudents, setRecentStudents] = useState([]);
  const [courseStats, setCourseStats] = useState([]);

  // Max System Capacity configuration
  const maxCapacity = 1000;
  const capacityPercentage = Math.min(Math.round((totalStudents / maxCapacity) * 100), 100);

useEffect(() => {
  // Check saved theme preference on initial load
  const savedPref = localStorage.getItem('appPreferences');
  if (savedPref) {
    const { darkMode } = JSON.parse(savedPref);
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}, []);

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch recent 5 records for the summary table
      const recentRes = await axios.get('http://localhost:8080/students?pageNo=0&pageSize=5&sortBy=id&sortDir=desc');
      setRecentStudents(recentRes.data.content || []);
      const totalCount = recentRes.data.totalElements || 0;
      setTotalStudents(totalCount);

      // 2. Fetch all students to dynamically compute course distribution percentages
      if (totalCount > 0) {
        const allRes = await axios.get(`http://localhost:8080/students?pageNo=0&pageSize=${totalCount}&sortBy=id&sortDir=desc`);
        const allStudents = allRes.data.content || [];
        calculateCourseDistribution(allStudents, totalCount);
      } else {
        setCourseStats([]);
      }
    } catch (err) {
      console.error('Failed to load dynamic dashboard data', err);
    }
  };

  // DYNAMICALLY COUNT AND COMPUTE PERCENTAGES BY COURSE
  const calculateCourseDistribution = (students, totalCount) => {
    const counts = {};

    // Count occurrences of each course
    students.forEach((student) => {
      const courseName = student.course ? student.course.trim().toUpperCase() : 'OTHER';
      counts[courseName] = (counts[courseName] || 0) + 1;
    });

    // Color choices for dynamic course bars
    const colors = ['fill-purple', 'fill-blue', 'fill-green', 'fill-orange'];

    // Convert count map to array with dynamic percentage calculations
    const statsArray = Object.keys(counts).map((course, index) => {
      const count = counts[course];
      const percentage = Math.round((count / totalCount) * 100);
      return {
        courseName: course,
        count: count,
        percentage: percentage,
        colorClass: colors[index % colors.length]
      };
    });

    // Sort by largest percentage first
    statsArray.sort((a, b) => b.percentage - a.percentage);
    setCourseStats(statsArray);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR NAVIGATION */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="welcome-message">
            <h1>Welcome Back, Administrator!</h1>
            <p>Real-time dynamic student metrics and system operational stats.</p>
          </div>
  
        </header>

        {/* TAB 1: DASHBOARD VIEW WITH DYNAMIC BARS */}
        {activeTab === 'dashboard' && (
          <div>
            {/* STAT CARDS */}
            <section className="stats-container">
              <div className="card">
                <div className="card-info">
                  <h3>Total Registered</h3>
                  <p className="card-number">{totalStudents}</p>
                </div>
                <div className="card-icon blue-bg">👨‍🎓</div>
              </div>

              <div className="card">
                <div className="card-info">
                  <h3>Max System Capacity</h3>
                  <p className="card-number">{maxCapacity}</p>
                </div>
                <div className="card-icon green-bg">🏫</div>
              </div>
            </section>

            {/* DYNAMIC PROGRESS & ANALYTICS BARS */}
            <section className="analytics-grid">
              {/* Card 1: Dynamic Enrollment Capacity */}
              <div className="metric-card">
                <h3>Enrollment Capacity <span>{capacityPercentage}%</span></h3>
                
                <div className="progress-item">
                  <div className="progress-labels">
                    <span>Capacity Used ({totalStudents} / {maxCapacity})</span>
                    <span>{capacityPercentage}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill fill-blue" 
                      style={{ width: `${capacityPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="progress-item" style={{ marginTop: '20px' }}>
                  <div className="progress-labels">
                    <span>Remaining Slots</span>
                    <span>{Math.max(maxCapacity - totalStudents, 0)} slots</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill fill-green" 
                      style={{ width: `${100 - capacityPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Card 2: Dynamic Course / Department Distribution */}
              <div className="metric-card">
                <h3>Dynamic Course Distribution</h3>
                
                {courseStats.length > 0 ? (
                  courseStats.map((item) => (
                    <div className="progress-item" key={item.courseName}>
                      <div className="progress-labels">
                        <span>{item.courseName} ({item.count} students)</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div 
                          className={`progress-bar-fill ${item.colorClass}`} 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '10px' }}>
                    No student course records available yet to display distribution.
                  </p>
                )}
              </div>
            </section>

           

          </div>
        )}
        
        

        {/* TAB 2: STORED STUDENT LIST */}
        {(activeTab === 'students' || activeTab === 'student-list') && (
          <StudentList onDataChanged={fetchDashboardData} />
        )}

        {/* TAB 3: INSERT STUDENT FORM */}
        {activeTab === 'student-form' && (
          <div className="table-section">
            <StudentForm 
              onSuccess={() => {
                fetchDashboardData();
                setActiveTab('student-list');
              }} 
              onCancel={() => setActiveTab('student-list')}
            />
          </div>
        )}

        {activeTab === 'settings' && (
  <Settings />
)}
      </div>
    </div>
  );
}

export default Dashboard;
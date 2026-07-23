import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';

function StudentList({ onDataChanged }) {
  const [students, setStudents] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Search & Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('name'); // 'name', 'email', 'course', 'rollno', 'city'
  
  // Sorting state variables
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');

  // Modal / Form state variables
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [pageNo, searchQuery, searchCategory, sortBy, sortDir]);

  // Main function to query your backend endpoints
  const fetchStudents = async () => {
    try {
      let url = 'http://localhost:8080/students';
      
      // If a search query exists, route to your specific search endpoints
      if (searchQuery.trim() !== '') {
        url += `/search/${searchCategory}?${searchCategory}=${encodeURIComponent(searchQuery)}&pageNo=${pageNo}&pageSize=5&sortBy=${sortBy}&sortDir=${sortDir}`;
      } else {
        // Default endpoint for all students
        url += `?pageNo=${pageNo}&pageSize=5&sortBy=${sortBy}&sortDir=${sortDir}`;
      }

      const response = await axios.get(url);
      
      // Spring Data Page object returns content & totalPages
      if (response.data && Array.isArray(response.data.content)) {
        setStudents(response.data.content);
        setTotalPages(response.data.totalPages || 1);
        setError('');
      } else {
        setStudents([]);
      }
    } catch (err) {
      setError('Unable to fetch student records from server.');
      setStudents([]);
    }
  };

  // Toggle sorting directions on column header click
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  // Delete student via your DELETE /{id} endpoint
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/students/${deletingStudentId}`);
      setMessage(response.data || 'Student deleted successfully.');
      setDeletingStudentId(null);
      fetchStudents();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      setError(err.response?.data || 'Failed to delete student record.');
    }
  };

  return (
    <div className="table-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Student Management Directory</h2>
        <button className="btn-submit" style={{ width: 'auto', margin: 0 }} onClick={() => { setEditingStudent(null); setShowFormModal(true); }}>
          + Add New Student
        </button>
      </div>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert danger">{error}</div>}

      {/* SEARCH BAR & CATEGORY DROPDOWN */}
      <div className="filter-bar" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <input 
          type={searchCategory === 'rollno' ? 'number' : 'text'} 
          placeholder={`Search by ${searchCategory}...`} 
          value={searchQuery} 
          onChange={(e) => { setSearchQuery(e.target.value); setPageNo(0); }}
          style={{ flex: 1, padding: '8px' }}
        />
        <select 
          value={searchCategory} 
          onChange={(e) => { setSearchCategory(e.target.value); setSearchQuery(''); setPageNo(0); }}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="name">Search by Name</option>
          <option value="email">Search by Email</option>
          <option value="course">Search by Course</option>
          <option value="rollno">Search by Roll No</option>
          <option value="city">Search by City</option>
        </select>
      </div>

      {/* TABLE WITH SORTABLE HEADERS */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                ID {sortBy === 'id' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                Name {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                Email {sortBy === 'email' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('rollno')} style={{ cursor: 'pointer' }}>
                Roll No {sortBy === 'rollno' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('course')} style={{ cursor: 'pointer' }}>
                Course {sortBy === 'course' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('address')} style={{ cursor: 'pointer' }}>
                City {sortBy === 'address' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.rollno}</td>
                  <td>{student.course}</td>
                  <td>{student.address}</td>
                  <td>
                    <button className="btn-edit" onClick={() => { setEditingStudent(student); setShowFormModal(true); }}>✏️ Edit</button>
                    <button className="btn-delete" onClick={() => setDeletingStudentId(student.id)}>🗑️ Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No student records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination-wrapper">
        <button disabled={pageNo === 0} onClick={() => setPageNo(pageNo - 1)} className="btn-pagination">Previous</button>
        <span>Page {pageNo + 1} of {totalPages || 1}</span>
        <button disabled={pageNo >= totalPages - 1} onClick={() => setPageNo(pageNo + 1)} className="btn-pagination">Next</button>
      </div>

      {/* ADD/EDIT FORM MODAL */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <StudentForm 
              editingStudent={editingStudent} 
              onSuccess={(msg) => {
                setMessage(msg);
                setShowFormModal(false);
                fetchStudents();
                if (onDataChanged) onDataChanged();
              }} 
              onCancel={() => setShowFormModal(false)} 
            />
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingStudentId && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to permanently delete this student record?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
              <button className="btn-delete" onClick={confirmDelete}>Yes, Delete</button>
              <button className="btn-secondary" onClick={() => setDeletingStudentId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
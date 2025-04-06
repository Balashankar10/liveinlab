// src/pages/admin/AdminComplaints.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE;

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API}/complaint/all`);
      setComplaints(res.data);
    } catch (err) {
      console.error('❌ Error fetching complaints:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API}/complaint/update-status/${id}`, { status: newStatus });
      fetchComplaints(); // refresh after update
    } catch (err) {
      alert('❌ Failed to update status');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 All Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((comp) => (
          <div key={comp._id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
            <p><strong>Subject:</strong> {comp.subject}</p>
            <p><strong>Name:</strong> {comp.name}</p>
            <p><strong>Address:</strong> {comp.address}</p>
            <p><strong>Description:</strong> {comp.description}</p>
            <p>
              <strong>Status:</strong>{' '}
              <select
                value={comp.status}
                onChange={(e) => handleStatusChange(comp._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Working">Working</option>
                <option value="Completed">Completed</option>
              </select>
            </p>
            {comp.imageUrl && (
              <div>
                <img
                  src={`http://localhost:5000${comp.imageUrl}`} // Direct file path
                  alt="Complaint"
                  width="200"
                />
              </div>
            )}
            {comp.location && comp.location.gmapUrl && (
              <p>
                <strong>Location:</strong>{' '}
                <a href={comp.location.gmapUrl} target="_blank" rel="noreferrer">
                  View on Map
                </a>
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminComplaints;

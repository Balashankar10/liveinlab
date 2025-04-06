import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const goToComplaints = () => {
    navigate('/admin/complaints');
  };

  return (
    <div>
      <h2>👮‍♂️ Admin Dashboard</h2>
      <button onClick={goToComplaints}>📋 View Complaints</button>
    </div>
  );
};

export default AdminDashboard;

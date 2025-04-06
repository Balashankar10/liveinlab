import React from 'react';
import { useNavigate } from 'react-router-dom';

const VillagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Villager Dashboard</h2>

      <button onClick={() => navigate('/villager/file-complaint')} style={{ marginRight: 10 }}>
        File Complaint
      </button>

      <button onClick={() => navigate('/villager/view-complaints')} style={{ marginRight: 10 }}>
        View Complaints
      </button>

      <button onClick={() => navigate('/villager/my-complaints')}>
        My Complaints
      </button>
    </div>
  );
};

export default VillagerDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Select Your Role</h2>
      <button onClick={() => handleSelect('villager')}>Villager</button>
      <button onClick={() => handleSelect('admin')}>Admin</button>
    </div>
  );
};

export default RoleSelector;

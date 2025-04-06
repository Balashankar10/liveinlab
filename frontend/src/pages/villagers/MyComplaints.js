import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyComplaints = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        setError('User email not found');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/complaint/my-complaints?email=${email}`);
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch complaints');
      }
    };

    fetchMyComplaints();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 My Complaints</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul>
          {complaints.map((complaint, index) => (
            <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
              <p><strong>Subject:</strong> {complaint.subject}</p>
              <p><strong>Address:</strong> {complaint.address}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              {complaint.imageUrl && (
                <img src={`http://localhost:5000${complaint.imageUrl}`} alt="Complaint" width="200" />
              )}
              <p><a href={complaint.location.gmapUrl} target="_blank" rel="noreferrer">📍 View on Map</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComplaints;

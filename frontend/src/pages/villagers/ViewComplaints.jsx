import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/complaint/all');
        setComplaints(res.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Failed to fetch complaints');
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📄 All Filed Complaints</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((c) => (
          <div key={c._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
            <p><strong>📌 Subject:</strong> {c.subject}</p>
            <p><strong>👤 Name:</strong> {c.name}</p>
            <p><strong>🏠 Address:</strong> {c.address}</p>
            <p><strong>📝 Description:</strong> {c.description}</p>
            <p><strong>📍 Location:</strong> <a href={c.location?.gmapUrl} target="_blank" rel="noopener noreferrer">View on Map</a></p>
            <p><strong>📊 Status:</strong> {c.status}</p>
            {c.imageUrl && (
              <img
                src={`http://localhost:5000${c.imageUrl}`}
                alt="Complaint"
                style={{ width: '200px', height: 'auto', marginTop: '10px' }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewComplaints;

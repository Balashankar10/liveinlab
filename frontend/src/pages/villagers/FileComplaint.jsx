import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileComplaint = () => {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    address: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error('Failed to get location', err);
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
  
    if (!location.lat || !location.lng) {
      setErrorMsg("📍 Location not ready yet");
      return;
    }
  
    const data = new FormData();
    data.append('subject', formData.subject);
    data.append('name', formData.name);
    data.append('address', formData.address);
    data.append('description', formData.description);
    data.append('image', image);
    data.append('lat', location.lat);
    data.append('lng', location.lng);
    data.append('userEmail', localStorage.getItem('email')); // ✅ Add this line
  
    try {
      const res = await axios.post('http://localhost:5000/api/complaint/file', data);
      if (res.data.message === 'Complaint filed successfully') {
        setSuccessMsg('✅ Complaint submitted!');
        setFormData({ subject: '', name: '', address: '', description: '' });
        setImage(null);
      } else {
        setErrorMsg('❌ Failed to file complaint');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('❌ Error submitting complaint');
    }
  };
  
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 File Complaint</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required /><br /><br />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required /><br /><br />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea><br /><br />

        <label>📷 Image (Camera/File):</label><br />
        <input type="file" accept="image/*" capture="environment" onChange={(e) => setImage(e.target.files[0])} required /><br /><br />

        {location.lat && location.lng && (
          <button type="button" onClick={() => window.open(`https://maps.google.com/?q=${location.lat},${location.lng}`, '_blank')}>
            📍 View Location on Google Maps
          </button>
        )}
        <br /><br />

        <button type="submit">Submit Complaint</button>
      </form>

      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
};

export default FileComplaint;

import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

const ConsultantProfile = () => {
  const [consultantData, setConsultantData] = useState({
    type: '', // e.g., "Individual", "Enterprise"
    domain: '', // e.g., "Tech", "Finance", "Business"
    bio: '',
    languages: '', // comma-separated
    hourly_price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchConsultantProfile();
  }, []);

  const fetchConsultantProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch('http://localhost:5000/consultant/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        setConsultantData(data);
        setIsEditing(true);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultantData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in');
        return;
      }

      // Validate
      if (!consultantData.domain) {
        setError('Domain is required');
        return;
      }
      if (!consultantData.hourly_price || isNaN(consultantData.hourly_price)) {
        setError('Valid hourly price is required');
        return;
      }

      const token = await user.getIdToken();
      const endpoint = isEditing ? 'http://localhost:5000/consultant/profile' : 'http://localhost:5000/consultant/register';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...consultantData,
          hourly_price: parseFloat(consultantData.hourly_price)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      setSuccess(isEditing ? 'Profile updated successfully!' : 'Profile created successfully!');
      setConsultantData(data);
      setIsEditing(true);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>👨‍💼 {isEditing ? 'Update' : 'Create'} Consultant Profile</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          <span>Consultant Type</span>
          <select
            name="type"
            value={consultantData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="Individual">Individual</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </label>

        <label>
          <span>Domain/Expertise *</span>
          <input
            type="text"
            name="domain"
            placeholder="e.g., Tech, Finance, Business, Healthcare"
            value={consultantData.domain}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Bio</span>
          <textarea
            name="bio"
            placeholder="Tell clients about your expertise, experience, and what you offer"
            value={consultantData.bio}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </label>

        <label>
          <span>Languages (comma-separated)</span>
          <input
            type="text"
            name="languages"
            placeholder="e.g., English, Hindi, Spanish"
            value={consultantData.languages}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Hourly Price ($) *</span>
          <input
            type="number"
            name="hourly_price"
            placeholder="50"
            value={consultantData.hourly_price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </label>

        {error && <p style={{ color: '#ff6b6b', marginBottom: '10px' }}>❌ {error}</p>}
        {success && <p style={{ color: '#90ee90', marginBottom: '10px' }}>✓ {success}</p>}

        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '15px' }}>
          {loading ? 'Saving...' : isEditing ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '4px', fontSize: '0.9em', color: '#999' }}>
        <p><strong>💡 Tip:</strong> Complete your profile to start receiving consultation requests from clients!</p>
        {isEditing && <p style={{ marginTop: '10px', color: '#90ee90' }}>✓ Your profile is active and visible to clients</p>}
      </div>
    </div>
  );
};

export default ConsultantProfile;

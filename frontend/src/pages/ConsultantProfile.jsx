import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

const ConsultantProfile = () => {
  const [consultantData, setConsultantData] = useState({
    type: '', // e.g., "Individual", "Enterprise"
    domain: '', // e.g., "Tech", "Finance", "Business"
    bio: '',
    languages: '', // comma-separated
    hourly_price: '',
    profile_pic: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setPageLoading(true);
    await fetchConsultantProfile();
    setPageLoading(false);
  };

  const fetchConsultantProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('No user logged in');
        return;
      }

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
        console.log('Profile loaded:', data);
        setConsultantData(data);
        if (data.profile_pic) setProfilePicPreview(data.profile_pic);
        setIsEditing(true);
        setSuccess('✓ Profile loaded successfully');
        setTimeout(() => setSuccess(''), 2000);
      } else if (response.status === 404) {
        console.log('No profile created yet');
        setIsEditing(false);
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

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary via backend
    setUploading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in');
        return;
      }

      const token = await user.getIdToken();
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/consultant/upload-profile-pic', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload profile picture');
      }

      setConsultantData(prev => ({
        ...prev,
        profile_pic: data.profile_pic
      }));
      setSuccess('Profile picture updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Error uploading profile picture');
    } finally {
      setUploading(false);
    }
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>👨‍💼 {isEditing ? 'Update' : 'Create'} Consultant Profile</h2>
        <button 
          onClick={loadProfile} 
          style={{ 
            padding: '8px 12px', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '12px'
          }}
          disabled={pageLoading}
        >
          {pageLoading ? '⟳ Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {pageLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <p>📊 Loading your profile...</p>
        </div>
      ) : (
        <>
      <div className="profile-pic-section" style={styles.profilePicSection}>
        <div style={styles.profilePicContainer}>
          {profilePicPreview ? (
            <img src={profilePicPreview} alt="Profile" style={styles.profilePic} />
          ) : (
            <div style={styles.profilePicPlaceholder}>📸</div>
          )}
        </div>
        <label htmlFor="profile-pic-input" style={styles.uploadLabel}>
          📤 {uploading ? 'Uploading...' : 'Upload Profile Picture'}
        </label>
        <input
          id="profile-pic-input"
          type="file"
          accept="image/*"
          onChange={handleProfilePicUpload}
          disabled={uploading}
          style={{ display: 'none' }}
        />
        <p style={styles.hint}>Max 5MB • JPG, PNG, GIF</p>
      </div>
      
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
          <span>Hourly Price (₹) *</span>
          <input
            type="number"
            name="hourly_price"
            placeholder="500"
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
        </>
      )}
    </div>
  );
};

const styles = {
  profilePicSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: '2px dashed rgba(255, 255, 255, 0.2)'
  },
  profilePicContainer: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px',
    overflow: 'hidden',
    border: '3px solid rgba(37, 99, 235, 0.5)'
  },
  profilePic: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  profilePicPlaceholder: {
    fontSize: '48px'
  },
  uploadLabel: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    marginTop: '10px'
  }
};

export default ConsultantProfile;

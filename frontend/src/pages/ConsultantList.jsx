import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  useEffect(() => {
    fetchConsultants();
  }, [filter]);

  const fetchConsultants = async () => {
    setLoading(true);
    setError('');
    try {
      const url = filter 
        ? `http://localhost:5000/consultants?domain=${filter}`
        : 'http://localhost:5000/consultants';

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch consultants');
      }

      const data = await response.json();
      setConsultants(data);
    } catch (err) {
      setError(err.message || 'Error loading consultants');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (consultantId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Please login first');
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch('http://localhost:5000/bookings/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          consultant_id: consultantId,
          date: new Date().toISOString().split('T')[0],
          time_slot: '10:00 AM'
        })
      });

      if (response.ok) {
        alert('Booking request sent! Consultant will confirm soon.');
      } else {
        const data = await response.json();
        alert('Error: ' + (data.error || 'Could not create booking'));
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) {
    return <div className="login-container"><p style={{ textAlign: 'center' }}>Loading consultants...</p></div>;
  }

  return (
    <div className="login-container">
      <h2>🔍 Find Consultants</h2>
      
      {/* Search & Filter */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Filter by domain (Tech, Finance, Business, etc.)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#222',
            color: '#fff',
            marginBottom: '10px'
          }}
        />
        <button onClick={() => setFilter('')} style={{ background: '#444', marginRight: '5px' }}>
          Clear Filter
        </button>
      </div>

      {error && <p style={{ color: '#ff6b6b', marginBottom: '15px' }}>❌ {error}</p>}

      {consultants.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          {filter ? '❌ No consultants found in this domain' : '📭 No consultants available yet'}
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {consultants.map((consultant) => (
            <div
              key={consultant.id}
              style={{
                padding: '15px',
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                border: '1px solid #444',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: selectedConsultant?.id === consultant.id ? '0 0 10px #4CAF50' : 'none'
              }}
              onClick={() => setSelectedConsultant(selectedConsultant?.id === consultant.id ? null : consultant)}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>👨‍💼 {consultant.type === 'Enterprise' ? '🏢' : '⭐'} {consultant.domain}</h3>
                  <p style={{ margin: '0', color: '#999', fontSize: '0.9em' }}>
                    {consultant.type} Consultant
                  </p>
                </div>
                <span style={{
                  fontSize: '1.3em',
                  fontWeight: 'bold',
                  color: '#4CAF50'
                }}>
                  ${consultant.hourly_price}/hr
                </span>
              </div>

              {/* Bio */}
              {consultant.bio && (
                <p style={{
                  margin: '10px 0',
                  color: '#bbb',
                  fontSize: '0.95em',
                  lineHeight: '1.4'
                }}>
                  {consultant.bio.substring(0, 100)}
                  {consultant.bio.length > 100 ? '...' : ''}
                </p>
              )}

              {/* Languages */}
              {consultant.languages && (
                <p style={{ margin: '8px 0', color: '#999', fontSize: '0.9em' }}>
                  🌐 Languages: {consultant.languages}
                </p>
              )}

              {/* Rating */}
              {consultant.rating > 0 && (
                <p style={{ margin: '8px 0', color: '#FFD700', fontSize: '0.9em' }}>
                  ⭐ {consultant.rating.toFixed(1)} ({consultant.total_reviews} reviews)
                </p>
              )}

              {/* Expanded Details */}
              {selectedConsultant?.id === consultant.id && (
                <div style={{
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #444'
                }}>
                  <p style={{ color: '#ddd', marginBottom: '10px' }}>
                    <strong>📋 Full Bio:</strong>
                  </p>
                  <p style={{ color: '#bbb', lineHeight: '1.6', marginBottom: '10px' }}>
                    {consultant.bio || 'No bio provided'}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBooking(consultant.id);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    📅 Book Consultation
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{
        padding: '15px',
        backgroundColor: '#333',
        borderRadius: '4px',
        color: '#999',
        fontSize: '0.9em'
      }}>
        <p>💡 <strong>Tip:</strong> Click on a consultant card to see full details and book a consultation!</p>
        <p style={{ margin: '5px 0 0 0' }}>Total consultants available: <strong>{consultants.length}</strong></p>
      </div>
    </div>
  );
};

export default ConsultantList;

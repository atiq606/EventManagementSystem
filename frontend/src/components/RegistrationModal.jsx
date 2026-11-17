import React, { useState } from 'react';
import axios from 'axios';

const RegistrationModal = ({ event, isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/registrations', {
        eventId: event.id,
        ...formData
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 2000);
    } catch (error) {
      alert('Registration failed: ' + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        
        {!success ? (
          <>
            <h2 className="modal-title">Register for Event</h2>
            <p className="modal-sub">{event.title}</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-input" 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-input" 
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-state" style={{display: 'block'}}>
            <div className="success-icon">✓</div>
            <h3 style={{color: 'var(--text)'}}>Registration Successful!</h3>
            <p style={{color: 'var(--text2)', marginTop: '8px'}}>You have been registered for {event.title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;

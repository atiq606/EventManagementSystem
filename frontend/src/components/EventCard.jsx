import React from 'react';

const EventCard = ({ event, onRegister }) => {
  const getTagClassName = (category) => {
    switch(category) {
      case 'technical':
        return 'tag technical';
      case 'cultural':
        return 'tag cultural';
      case 'sports':
        return 'tag sports';
      default:
        return 'tag';
    }
  };

  const statusClass = `status-badge status-${event.status}`;
  const capacityPercent = (event.registered / event.capacity) * 100;

  return (
    <div className="event-card">
      <div className="event-card-header">
        <div className="event-card-accent" style={{
          background: event.category === 'technical' ? '#4bb8f0' : 
                     event.category === 'cultural' ? '#f0a04b' : '#4cd98a'
        }}></div>
        <div className="event-card-tags">
          <span className={getTagClassName(event.category)}>{event.category}</span>
          <span className={statusClass}>{event.status}</span>
        </div>
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-desc">{event.description}</p>
      </div>
      <div className="event-card-body">
        <div className="event-meta-row">
          📅 {event.date} at {event.time}
        </div>
        <div className="event-meta-row">
          📍 {event.location}
        </div>
      </div>
      <div className="event-card-footer">
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', flex: 1}}>
          <div className="capacity-bar">
            <div className="capacity-fill" style={{width: `${capacityPercent}%`}}></div>
          </div>
          <span className="capacity-text">{event.registered}/{event.capacity}</span>
        </div>
        <button className="register-btn" onClick={() => onRegister(event)}>Register</button>
      </div>
    </div>
  );
};

export default EventCard;

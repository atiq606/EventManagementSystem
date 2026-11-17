import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const Home = ({ onOpenRegister }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.category === filter);

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="page active">
      <section id="hero-section">
        <div className="hero-orb orb1"></div>
        <div className="hero-orb orb2"></div>
        
        <div className="hero-content">
          <div className="hero-badge">
            🎓 Connect. Learn. Celebrate.
          </div>
          <h1 className="hero-title">
            Discover College <span className="highlight">Events</span> That Matter
          </h1>
          <p className="hero-sub">
            Browse, register, and participate in the most exciting events happening on your campus. All in one place.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Explore Events</button>
            <button className="btn-secondary">Learn More</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">{events.length}</span>
              <span className="stat-label">Active Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">2.5K+</span>
              <span className="stat-label">Registered</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">98%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-cards">
            <div className="fcard">
              <div className="fcard-tag">Popular</div>
              <div className="fcard-title">Code Sprint</div>
              <div className="fcard-meta">24-hour coding challenge</div>
              <div className="fcard-bar">
                <div className="fcard-bar-fill" style={{width: '45%', background: '#4bb8f0'}}></div>
              </div>
              <div className="fcard-footer">
                <div className="fcard-avatars">
                  <div className="fcard-av">45</div>
                </div>
                <span className="fcard-count">registrations</span>
              </div>
            </div>
            <div className="fcard">
              <div className="fcard-tag">Trending</div>
              <div className="fcard-title">Cultural Fest</div>
              <div className="fcard-meta">Annual celebration event</div>
              <div className="fcard-bar">
                <div className="fcard-bar-fill" style={{width: '50%', background: '#f0a04b'}}></div>
              </div>
              <div className="fcard-footer">
                <div className="fcard-avatars">
                  <div className="fcard-av">250</div>
                </div>
                <span className="fcard-count">registrations</span>
              </div>
            </div>
            <div className="fcard">
              <div className="fcard-tag">Featured</div>
              <div className="fcard-title">Sports Meet</div>
              <div className="fcard-meta">Inter-college competition</div>
              <div className="fcard-bar">
                <div className="fcard-bar-fill" style={{width: '30%', background: '#4cd98a'}}></div>
              </div>
              <div className="fcard-footer">
                <div className="fcard-avatars">
                  <div className="fcard-av">120</div>
                </div>
                <span className="fcard-count">registrations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Featured Events</div>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px'}}>
          <div>
            <h2 className="section-title">Upcoming & Popular</h2>
            <p className="section-sub">Find events that match your interests and join the community</p>
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-tab ${filter === 'technical' ? 'active' : ''}`} onClick={() => setFilter('technical')}>Technical</button>
            <button className={`filter-tab ${filter === 'cultural' ? 'active' : ''}`} onClick={() => setFilter('cultural')}>Cultural</button>
            <button className={`filter-tab ${filter === 'sports' ? 'active' : ''}`} onClick={() => setFilter('sports')}>Sports</button>
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onRegister={onOpenRegister} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

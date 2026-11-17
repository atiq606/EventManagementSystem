import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = ({ onPageChange }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      onPageChange('home');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page active" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px'}}>
      <div className="modal" style={{maxWidth: '400px', margin: '0 auto'}}>
        <h2 className="modal-title">Login</h2>
        <p className="modal-sub">Sign in to access your dashboard</p>
        
        {error && <div style={{color: '#f05a5a', marginBottom: '16px', fontSize: '13px'}}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{marginTop: '20px', fontSize: '13px', color: 'var(--text2)', textAlign: 'center'}}>
          <p>Demo credentials:</p>
          <p>Admin: admin@college.com / admin123</p>
          <p>Organizer: techclub@college.com / org123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

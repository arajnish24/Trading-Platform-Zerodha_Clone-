import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';

const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.port === '3000' ? 'http://localhost:3002' : '');
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || 
  (window.location.port === '3000' ? 'http://localhost:3001/dashboard' : '/dashboard');

function Signup() {
  const [activeTab, setActiveTab] = useState('signup'); // 'signup' or 'login'
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear alerts when switching tabs
  useEffect(() => {
    setError('');
    setSuccess('');
    setName('');
    setUsername('');
    setEmail('');
    setMobile('');
    setPassword('');
    setConfirmPassword('');
    setEmailOrUsername('');
  }, [activeTab]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !confirmPassword || !mobile) {
      setError('Please fill in all fields.');
      return;
    }

    // Basic mobile validation (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Confirm password check
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/signup`, {
        name,
        username,
        email,
        mobile,
        password,
      });

      // Show success message and clear form inputs
      setSuccess('Signup successfully completed! Now login to your account through the Login page.');
      
      setName('');
      setUsername('');
      setEmail('');
      setMobile('');
      setPassword('');
      setConfirmPassword('');

      // Wait 3.5 seconds and switch tab to login automatically
      setTimeout(() => {
        setActiveTab('login');
        setSuccess('');
      }, 3500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrUsername || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        emailOrUsername,
        password,
      });

      setSuccess('Login successful! Redirecting to trading terminal...');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      setTimeout(() => {
        // Redirect to Dashboard passing the token as a query parameter
        window.location.href = `${DASHBOARD_URL}?token=${response.data.token}`;
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side: Brand Branding */}
        <div className="auth-image-side">
          <img src="/media/images/signup.png" alt="Zerodha Signup Illustration" />
          <h2>Invest in everything</h2>
          <p>Online platform to invest in stocks, derivatives, mutual funds, and more.</p>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <div className="auth-header">
            <h1>Welcome to Zerodha</h1>
            <p>Join over 1.5+ crore investors trading with us</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
          </div>

          {error && <div className="auth-alert auth-alert-error">{error}</div>}
          {success && <div className="auth-alert auth-alert-success">{success}</div>}

          {activeTab === 'signup' ? (
            <form onSubmit={handleSignupSubmit}>
              <div className="auth-form-group">
                <label htmlFor="reg-name">Full Name</label>
                <div className="auth-input-wrapper">
                  <input
                    type="text"
                    id="reg-name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="reg-username">Username</label>
                <div className="auth-input-wrapper">
                  <input
                    type="text"
                    id="reg-username"
                    placeholder="Create a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="reg-email">Email Address</label>
                <div className="auth-input-wrapper">
                  <input
                    type="email"
                    id="reg-email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="reg-mobile">Mobile Number</label>
                <div className="auth-input-wrapper">
                  <input
                    type="tel"
                    id="reg-mobile"
                    placeholder="Enter your 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="reg-password">Password</label>
                <div className="auth-input-wrapper">
                  <input
                    type="password"
                    id="reg-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="reg-confirm-password">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <input
                    type="password"
                    id="reg-confirm-password"
                    placeholder="Re-type password to confirm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <div className="auth-form-group">
                <label htmlFor="log-username">Username, Email, or Mobile</label>
                <div className="auth-input-wrapper">
                  <input
                    type="text"
                    id="log-username"
                    placeholder="Enter your username, email, or mobile"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="log-password">Password</label>
                <div className="auth-input-wrapper">
                  <input
                    type="password"
                    id="log-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          )}

          <div className="auth-footer">
            {activeTab === 'signup' ? (
              <>
                Already have an account?
                <button type="button" onClick={() => setActiveTab('login')}>
                  Log In
                </button>
              </>
            ) : (
              <>
                Don't have an account?
                <button type="button" onClick={() => setActiveTab('signup')}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
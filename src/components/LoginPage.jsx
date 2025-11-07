import React, { useState } from 'react';
import { FaUserShield, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    if (loginError) {
      setLoginError('');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple authentication - Replace with actual API call
    setTimeout(() => {
      if (loginData.username === 'admin' && loginData.password === 'iste2026') {
        // Store login status in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        
        setLoginError('');
        // Redirect to admin page
        navigate('/admin');
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="login-container">
      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="login-content">
        {/* Back Button */}
        <button onClick={handleGoBack} className="back-button">
          <FaArrowLeft className="back-icon" />
          Back to Site
        </button>

        {/* Login Card */}
        <div className="login-card">
          <div className="login-header">
            <FaUserShield className="login-main-icon" />
            <h1 className="login-title">
              Admin <span className="gradient-text">Login</span>
            </h1>
            <p className="login-subtitle">
              Access the admin dashboard to manage registrations
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                required
                className="login-input"
                placeholder="Enter admin username"
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                required
                className="login-input"
                placeholder="Enter admin password"
                disabled={isLoading}
              />
            </div>

            {loginError && (
              <div className="login-error">
                {loginError}
              </div>
            )}

            <div className="login-note">
              <p><strong>Demo Credentials:</strong></p>
              <p>Username: <code>admin</code></p>
              <p>Password: <code>iste2026</code></p>
            </div>

            <button 
              type="submit" 
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <FaUserShield className="btn-icon" />
              )}
              {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
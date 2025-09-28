import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Users, Shield, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'stakeholder',
      title: 'Value Chain Stakeholders',
      description: 'Vedanta, Hindalco, NALCO, and other aluminium companies',
      icon: <Building2 className="user-type-icon" />,
      color: 'blue'
    },
    {
      type: 'government',
      title: 'Government Regulatory Bodies',
      description: 'Ministry of Mines, CPCB, MoSPI, State Pollution Boards',
      icon: <Shield className="user-type-icon" />,
      color: 'green'
    },
    {
      type: 'citizen',
      title: 'Citizens',
      description: 'Public access to view circularity scores and trends',
      icon: <Users className="user-type-icon" />,
      color: 'purple'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation - in real app, this would be API call
    if (!userType) {
      setError('Please select a user type');
      return;
    }

    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }

    // Mock login - in real app, this would authenticate with backend
    const mockUser = {
      id: 1,
      name: credentials.email.split('@')[0],
      email: credentials.email,
      type: userType
    };

    login(mockUser, userType);

    // Navigate to appropriate dashboard
    switch (userType) {
      case 'stakeholder':
        navigate('/studio');
        break;
      case 'government':
        navigate('/regulatory');
        break;
      case 'citizen':
        navigate('/public');
        break;
      default:
        navigate('/');
    }
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome to Ayura</h1>
          <p>Please select your role and sign in to access the platform</p>
        </div>

        <div className="login-content">
          {/* User Type Selection */}
          <div className="user-type-selection">
            <h2>Select Your Role</h2>
            <div className="user-types-grid">
              {userTypes.map((type) => (
                <div
                  key={type.type}
                  className={`user-type-card ${type.color} ${userType === type.type ? 'selected' : ''}`}
                  onClick={() => handleUserTypeSelect(type.type)}
                >
                  {type.icon}
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form */}
          {userType && (
            <div className="login-form-section">
              <h2>Sign In</h2>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="login-button">
                  Sign In
                </button>
              </form>

              <div className="demo-credentials">
                <h3>Demo Credentials</h3>
                <p><strong>Email:</strong> demo@ayura.com</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;


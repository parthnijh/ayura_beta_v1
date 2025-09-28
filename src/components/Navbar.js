import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Users, Shield, LogOut, Home } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, userType, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    switch (userType) {
      case 'stakeholder':
        return '/studio';
      case 'government':
        return '/regulatory';
      case 'citizen':
        return '/public';
      default:
        return '/';
    }
  };

  const getUserIcon = () => {
    switch (userType) {
      case 'stakeholder':
        return <Building2 className="nav-icon" />;
      case 'government':
        return <Shield className="nav-icon" />;
      case 'citizen':
        return <Users className="nav-icon" />;
      default:
        return <Users className="nav-icon" />;
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Government Portal Top Bar */}
      <div className="gov-header-top">
        <div className="gov-container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span>Government of India</span>
              <span>|</span>
              <span>Ministry of Environment, Forest and Climate Change</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
              <span>|</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="gov-header">
        <div className="gov-container">
          <div className="gov-header-main">
            <div className="flex justify-between items-center">
              <Link to="/" className="gov-logo">
                <div className="logo-icon">
                  <Shield size={60} color="#ff6b35" />
                </div>
                <div className="gov-logo-text">
                  <h1>AYURA</h1>
                  <p>Aluminium Circularity & Sustainability Portal</p>
                  <p className="logo-subtitle">Government of India Initiative</p>
                </div>
              </Link>
              
              <div className="header-actions">
                {isAuthenticated ? (
                  <div className="user-profile">
                    <div className="user-info">
                      {getUserIcon()}
                      <div className="user-details">
                        <span className="user-name">{user?.name || user?.email}</span>
                        <span className="user-role">{userType?.toUpperCase()}</span>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="gov-nav">
        <div className="gov-container">
          <ul className="gov-nav-list">
            <li className="gov-nav-item">
              <Link 
                to="/" 
                className={`gov-nav-link ${isActive('/') ? 'active' : ''}`}
              >
                <Home size={16} />
                Home
              </Link>
            </li>

            {isAuthenticated && (
              <>
                <li className="gov-nav-item">
                  <Link 
                    to={getDashboardLink()} 
                    className={`gov-nav-link ${isActive(getDashboardLink()) ? 'active' : ''}`}
                  >
                    {getUserIcon()}
                    Dashboard
                  </Link>
                </li>
                
                {userType === 'stakeholder' && (
                  <li className="gov-nav-item">
                    <Link 
                      to="/studio/data-input" 
                      className={`gov-nav-link ${isActive('/studio/data-input') ? 'active' : ''}`}
                    >
                      <Building2 size={16} />
                      Data Input
                    </Link>
                  </li>
                )}
                
                {userType === 'government' && (
                  <li className="gov-nav-item">
                    <Link 
                      to="/regulatory/audit-tools" 
                      className={`gov-nav-link ${isActive('/regulatory/audit-tools') ? 'active' : ''}`}
                    >
                      <Shield size={16} />
                      Audit Tools
                    </Link>
                  </li>
                )}

                <li className="gov-nav-item">
                  <Link 
                    to="/public" 
                    className={`gov-nav-link ${isActive('/public') ? 'active' : ''}`}
                  >
                    <Users size={16} />
                    Public Portal
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


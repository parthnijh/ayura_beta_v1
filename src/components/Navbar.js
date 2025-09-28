import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Users, Shield, LogOut, Home } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, userType, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Ayura</span>
          <span className="logo-subtitle">Circularity Platform</span>
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">
            <Home className="nav-icon" />
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to={getDashboardLink()} className="nav-link">
                {getUserIcon()}
                Dashboard
              </Link>
              
              {userType === 'stakeholder' && (
                <Link to="/studio/data-input" className="nav-link">
                  <Building2 className="nav-icon" />
                  Data Input
                </Link>
              )}
              
              {userType === 'government' && (
                <Link to="/regulatory/audit-tools" className="nav-link">
                  <Shield className="nav-icon" />
                  Audit Tools
                </Link>
              )}

              <div className="nav-user">
                <span className="user-info">
                  {getUserIcon()}
                  {user?.name || user?.email}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut className="nav-icon" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


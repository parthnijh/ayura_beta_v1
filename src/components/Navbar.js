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
      case 'government':
        return '/government-dashboard';
      case 'company':
        return '/company-dashboard';
      case 'citizen':
        return '/citizen-dashboard';
      default:
        return '/';
    }
  };

  const getUserIcon = () => {
    switch (userType) {
      case 'government':
        return <Shield className="nav-icon" />;
      case 'company':
        return <Building2 className="nav-icon" />;
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
              
              {userType === 'company' && (
                <Link to="/data-input" className="nav-link">
                  <Building2 className="nav-icon" />
                  Data Input
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

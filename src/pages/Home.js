import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Shield, TrendingUp, BarChart3, Leaf } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Building2 className="feature-icon" />,
      title: "Company Portal",
      description: "Track your circularity scores, input production data, and get actionable recommendations.",
      link: "/login",
      color: "blue"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Government Dashboard",
      description: "Monitor compliance, view national trends, and manage approvals across all companies.",
      link: "/login",
      color: "green"
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Citizen Portal",
      description: "Explore gamified dashboards, view company performance, and understand environmental impact.",
      link: "/login",
      color: "purple"
    }
  ];

  const stats = [
    { label: "Companies Tracked", value: "50+", icon: <Building2 /> },
    { label: "States Monitored", value: "15+", icon: <Shield /> },
    { label: "Circularity Score", value: "85%", icon: <TrendingUp /> },
    { label: "CO₂ Reduced", value: "2.5M", icon: <Leaf /> }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Ayura Circularity Platform
          </h1>
          <p className="hero-subtitle">
            Transforming aluminium industry sustainability through data-driven circularity tracking, 
            government oversight, and citizen engagement.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/citizen-dashboard" className="btn btn-secondary">
              View Public Dashboard
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="circularity-wheel">
            <div className="wheel-center">
              <BarChart3 className="wheel-icon" />
            </div>
            <div className="wheel-ring"></div>
            <div className="wheel-ring-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Platform Access</h2>
          <p className="section-subtitle">
            Choose your role to access the appropriate dashboard and features
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card ${feature.color}`}>
                <div className="feature-header">
                  {feature.icon}
                  <h3 className="feature-title">{feature.title}</h3>
                </div>
                <p className="feature-description">{feature.description}</p>
                <Link to={feature.link} className="feature-link">
                  Access Portal →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Data Collection</h3>
              <p>Companies input stage-wise production and environmental data monthly</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Verification & ML</h3>
              <p>AI models verify data, detect anomalies, and predict missing values</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>LCA Scoring</h3>
              <p>Calculate circularity scores based on carbon intensity, energy efficiency, and waste recovery</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Dashboard & Insights</h3>
              <p>Real-time dashboards for companies, government oversight, and citizen engagement</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

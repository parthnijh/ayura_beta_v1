import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Shield, TrendingUp, Leaf, ArrowRight, CheckCircle, Globe, Target, Award, BarChart3 } from 'lucide-react';
import './Home.css';

const Home = () => {
  const portals = [
    {
      icon: <Building2 className="portal-icon" />,
      title: "Stakeholder Portal",
      subtitle: "For Industry & Companies",
      description: "Submit production data, track circularity scores, and access sustainability insights for your aluminium operations.",
      features: ["Data Submission", "Performance Tracking", "Sustainability Reports", "Compliance Monitoring"],
      link: "/login",
      color: "primary"
    },
    {
      icon: <Shield className="portal-icon" />,
      title: "Regulatory Portal",
      subtitle: "For Government Bodies",
      description: "Monitor industry compliance, conduct audits, and manage regulatory oversight across all aluminium companies.",
      features: ["Compliance Monitoring", "Audit Management", "Regulatory Reports", "Policy Implementation"],
      link: "/login",
      color: "secondary"
    },
    {
      icon: <Users className="portal-icon" />,
      title: "Public Portal",
      subtitle: "For Citizens & Researchers",
      description: "Explore industry performance, access public data, and understand environmental impact of aluminium production.",
      features: ["Public Data Access", "Industry Insights", "Environmental Impact", "Research Resources"],
      link: "/public",
      color: "accent"
    }
  ];

  const stats = [
    { label: "Registered Companies", value: "156", icon: <Building2 />, trend: "+12%" },
    { label: "States Covered", value: "15", icon: <Globe />, trend: "100%" },
    { label: "Average Circularity Score", value: "87%", icon: <TrendingUp />, trend: "+5%" },
    { label: "CO₂ Emissions Reduced", value: "2.5M", icon: <Leaf />, trend: "-15%" }
  ];

  const initiatives = [
    {
      title: "Digital India Initiative",
      description: "Part of the Government of India's Digital India program for transparent governance",
      icon: <Globe />
    },
    {
      title: "Make in India",
      description: "Supporting sustainable manufacturing practices in the aluminium industry",
      icon: <Target />
    },
    {
      title: "Swachh Bharat Mission",
      description: "Contributing to waste reduction and circular economy principles",
      icon: <Award />
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="gov-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                AYURA
                <span className="hero-subtitle">Aluminium Circularity & Sustainability Portal</span>
              </h1>
              <p className="hero-description">
                A comprehensive digital platform for monitoring and managing aluminium industry sustainability 
                across the entire value chain. Supporting India's commitment to environmental stewardship and 
                circular economy principles.
              </p>
              <div className="hero-actions">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Access Portal
                  <ArrowRight size={20} />
                </Link>
                <Link to="/public" className="btn btn-secondary btn-lg">
                  View Public Data
                </Link>
                <Link to="/ay-demo" className="btn btn-accent btn-lg">
                  <BarChart3 size={20} />
                  AI Demo System
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="circularity-visual">
                <div className="visual-center">
                  <Shield size={80} color="#ff6b35" />
                </div>
                <div className="visual-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="stats-section">
        <div className="gov-container">
          <h2 className="section-title">Platform Statistics</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-trend positive">{stat.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Access */}
      <section className="portals-section">
        <div className="gov-container">
          <div className="section-header">
            <h2 className="section-title">Portal Access</h2>
            <p className="section-subtitle">
              Choose your role to access the appropriate portal and features
            </p>
          </div>
          <div className="portals-grid">
            {portals.map((portal, index) => (
              <div key={index} className={`portal-card ${portal.color}`}>
                <div className="portal-header">
                  <div className="portal-icon-container">
                    {portal.icon}
                  </div>
                  <div className="portal-title-section">
                    <h3 className="portal-title">{portal.title}</h3>
                    <p className="portal-subtitle">{portal.subtitle}</p>
                  </div>
                </div>
                <p className="portal-description">{portal.description}</p>
                <div className="portal-features">
                  {portal.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to={portal.link} className="portal-link">
                  Access Portal
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Initiatives */}
      <section className="initiatives-section">
        <div className="gov-container">
          <h2 className="section-title">Government Initiatives</h2>
          <div className="initiatives-grid">
            {initiatives.map((initiative, index) => (
              <div key={index} className="initiative-card">
                <div className="initiative-icon">{initiative.icon}</div>
                <h3 className="initiative-title">{initiative.title}</h3>
                <p className="initiative-description">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section">
        <div className="gov-container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Data Collection</h3>
                <p>Companies submit monthly production and environmental data across all six stages of aluminium processing</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Verification</h3>
                <p>Machine learning models verify data accuracy, detect anomalies, and predict missing values</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Circularity Scoring</h3>
                <p>Calculate comprehensive circularity scores based on carbon intensity, energy efficiency, and waste recovery</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Dashboard & Insights</h3>
                <p>Real-time dashboards provide insights for companies, government oversight, and public transparency</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


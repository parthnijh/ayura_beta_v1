import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Users, Shield, TrendingUp, Leaf, ArrowRight, CheckCircle, Globe, Target, Award, BarChart3
} from 'lucide-react';
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
    { label: "CO₂ Emissions Reduced", value: "2.5M t", icon: <Leaf />, trend: "-15%" }
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

  const processSteps = [
    {
      number: "1",
      title: "Data Collection",
      description: "Companies submit monthly production and environmental data across all stages of aluminium processing."
    },
    {
      number: "2",
      title: "AI Verification",
      description: "AI models verify data accuracy, detect anomalies and predict missing values using advanced algorithms."
    },
    {
      number: "3",
      title: "Circularity Scoring",
      description: "Calculate comprehensive scores from carbon intensity, energy efficiency and waste recovery metrics."
    },
    {
      number: "4",
      title: "Dashboard & Insights",
      description: "Real-time dashboards provide actionable insights for companies, government oversight, and public transparency."
    }
  ];

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              AYURA
              <span className="hero-subtitle">Aluminium Circularity & Sustainability Portal</span>
            </h1>

            <p className="hero-description">
              A comprehensive digital platform for monitoring and managing aluminium industry sustainability 
              across the entire value chain. Supporting India's commitment to environmental stewardship 
              and circular economy principles.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">
                <span>ACCESS PORTAL</span>
                <ArrowRight size={18} />
              </Link>
              
              <Link to="/public" className="btn btn-outline">
                VIEW PUBLIC DATA
              </Link>
              
              <Link to="/ay-demo" className="btn btn-accent">
                <BarChart3 size={16} />
                <span>AI DEMO SYSTEM</span>
              </Link>
            </div>

            <div className="hero-badges">
              <span className="badge">
                <strong>Pilot:</strong> Odisha — 5 plants
              </span>
              <span className="badge">
                <strong>Metric:</strong> ISO-aligned LCA & Circularity Scores
              </span>
            </div>
          </div>

          <div className="hero-right">
            <div className="circularity-visual">
              <div className="visual-center">
                <Shield size={64} />
              </div>
              <div className="visual-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Platform Statistics</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className={`stat-trend ${stat.trend.startsWith('-') ? 'negative' : 'positive'}`}>
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="portals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Portal Access</h2>
            <p className="section-description">
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
                  {portal.features.map((feature, i) => (
                    <div key={i} className="feature-item">
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
        <div className="container">
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

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
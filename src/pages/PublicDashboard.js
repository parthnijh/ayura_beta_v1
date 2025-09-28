import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Globe, 
  Award, 
  BarChart3, 
  Users,
  MapPin,
  Calendar,
  Star,
  Target,
  Zap,
  Leaf,
  Eye,
  ArrowRight,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import './PublicDashboard.css';

const PublicDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedState, setSelectedState] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const leaderboard = [
    { rank: 1, company: 'Vedanta Limited', score: 94, change: '+2', state: 'Odisha', grade: 'A+', trend: 'up' },
    { rank: 2, company: 'Hindalco Industries', score: 91, change: '+1', state: 'Maharashtra', grade: 'A', trend: 'up' },
    { rank: 3, company: 'NALCO', score: 89, change: '-1', state: 'Odisha', grade: 'A', trend: 'down' },
    { rank: 4, company: 'BALCO', score: 87, change: '+3', state: 'Chhattisgarh', grade: 'B+', trend: 'up' },
    { rank: 5, company: 'Jindal Aluminium', score: 85, change: '+1', state: 'Karnataka', grade: 'B+', trend: 'up' },
    { rank: 6, company: 'Century Aluminium', score: 83, change: '+2', state: 'Gujarat', grade: 'B', trend: 'up' },
    { rank: 7, company: 'Aluminium Corporation', score: 81, change: '0', state: 'Odisha', grade: 'B', trend: 'stable' },
    { rank: 8, company: 'Metro Aluminium', score: 79, change: '-2', state: 'Maharashtra', grade: 'B', trend: 'down' },
    { rank: 9, company: 'Prime Aluminium', score: 77, change: '+1', state: 'Karnataka', grade: 'C+', trend: 'up' },
    { rank: 10, company: 'Green Aluminium Co.', score: 75, change: '+3', state: 'Gujarat', grade: 'C+', trend: 'up' }
  ];

  const statePerformance = [
    { state: 'Odisha', companies: 45, avgScore: 88.5, rank: 1, trend: 'up', compliance: 96 },
    { state: 'Maharashtra', companies: 38, avgScore: 85.2, rank: 2, trend: 'up', compliance: 92 },
    { state: 'Karnataka', companies: 25, avgScore: 86.7, rank: 3, trend: 'up', compliance: 94 },
    { state: 'Gujarat', companies: 20, avgScore: 84.3, rank: 4, trend: 'stable', compliance: 90 },
    { state: 'Chhattisgarh', companies: 28, avgScore: 82.1, rank: 5, trend: 'down', compliance: 89 }
  ];

  const environmentalImpact = {
    totalProduction: 2500000,
    carbonSaved: 125000,
    energySaved: 45000,
    waterSaved: 850000,
    recyclingRate: 78.5,
    renewableEnergyRate: 45.2
  };

  const achievements = [
    { id: 1, title: 'Carbon Neutral Leader', description: 'Leading in renewable energy adoption', icon: <Leaf />, companies: 12 },
    { id: 2, title: 'Water Conservation Champion', description: 'Excellence in water management', icon: <Zap />, companies: 8 },
    { id: 3, title: 'Waste Reduction Pioneer', description: 'Zero waste to landfill achievement', icon: <Target />, companies: 15 },
    { id: 4, title: 'Innovation Excellence', description: 'Cutting-edge technology implementation', icon: <Star />, companies: 6 }
  ];

  const recentUpdates = [
    { type: 'milestone', message: 'Industry achieved 80% recycling rate milestone', time: '2 days ago' },
    { type: 'achievement', message: '5 companies earned Carbon Neutral certification', time: '1 week ago' },
    { type: 'trend', message: 'National circularity score improved by 3 points', time: '2 weeks ago' },
    { type: 'impact', message: 'Saved 1.2M tonnes of CO2 emissions this quarter', time: '3 weeks ago' }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return '#27ae60';
      case 'A': return '#2ecc71';
      case 'B+': return '#f39c12';
      case 'B': return '#e67e22';
      case 'C+': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ChevronUp className="trend-icon up" />;
      case 'down': return <ChevronDown className="trend-icon down" />;
      default: return <div className="trend-icon stable">—</div>;
    }
  };

  return (
    <div className="public-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Public Dashboard</h1>
            <p>Transparent view of aluminium industry circularity performance</p>
          </div>
          <div className="header-right">
            <div className="current-time">
              <Calendar size={20} />
              <span>{currentTime.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h2>Gamified Dashboard</h2>
            <div className="hero-features">
              <span className="feature-tag">Real-Time Updates</span>
              <span className="feature-tag">Interactive Visualizations</span>
              <span className="feature-tag">Leaderboards</span>
              <span className="feature-tag">Achievement System</span>
            </div>
            <p className="hero-description">
              Track the circularity performance of aluminium companies across India. 
              See how industry leaders are driving sustainable practices and environmental impact.
            </p>
          </div>
        </div>

        {/* Environmental Impact Overview */}
        <div className="impact-overview">
          <div className="section-header">
            <h2>Environmental Impact</h2>
            <p>Real-time environmental benefits from circular practices</p>
          </div>
          
          <div className="impact-stats">
            <div className="impact-card primary">
              <div className="impact-icon">
                <Globe />
              </div>
              <div className="impact-content">
                <h3>Carbon Saved</h3>
                <div className="impact-value">{environmentalImpact.carbonSaved.toLocaleString()}</div>
                <div className="impact-unit">tonnes CO₂</div>
              </div>
            </div>

            <div className="impact-card secondary">
              <div className="impact-icon">
                <Zap />
              </div>
              <div className="impact-content">
                <h3>Energy Saved</h3>
                <div className="impact-value">{environmentalImpact.energySaved.toLocaleString()}</div>
                <div className="impact-unit">MWh</div>
              </div>
            </div>

            <div className="impact-card tertiary">
              <div className="impact-icon">
                <Target />
              </div>
              <div className="impact-content">
                <h3>Water Saved</h3>
                <div className="impact-value">{environmentalImpact.waterSaved.toLocaleString()}</div>
                <div className="impact-unit">liters</div>
              </div>
            </div>

            <div className="impact-card quaternary">
              <div className="impact-icon">
                <Leaf />
              </div>
              <div className="impact-content">
                <h3>Recycling Rate</h3>
                <div className="impact-value">{environmentalImpact.recyclingRate}%</div>
                <div className="impact-unit">Industry Average</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Leaderboard */}
          <div className="leaderboard-section">
            <div className="section-header">
              <h2>Industry Leaderboard</h2>
              <div className="leaderboard-filters">
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                  <option value="all">All States</option>
                  <option value="odisha">Odisha</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="chhattisgarh">Chhattisgarh</option>
                </select>
                <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="leaderboard-list">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className={`leaderboard-entry ${entry.rank <= 3 ? 'top-three' : ''}`}>
                  <div className="rank-section">
                    <div className="rank">#{entry.rank}</div>
                    {entry.rank <= 3 && (
                      <div className="rank-badge">
                        <Trophy size={20} />
                      </div>
                    )}
                  </div>
                  
                  <div className="company-info">
                    <div className="company-name">{entry.company}</div>
                    <div className="company-location">
                      <MapPin size={14} />
                      <span>{entry.state}</span>
                    </div>
                  </div>
                  
                  <div className="score-section">
                    <div className="score-value">{entry.score}%</div>
                    <div className="score-grade" style={{ color: getGradeColor(entry.grade) }}>
                      {entry.grade}
                    </div>
                  </div>
                  
                  <div className="trend-section">
                    <div className="change-value">{entry.change}</div>
                    {getTrendIcon(entry.trend)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* State Performance */}
          <div className="state-performance">
            <h3>State Performance</h3>
            <div className="performance-list">
              {statePerformance.map((state, index) => (
                <div key={index} className="performance-item">
                  <div className="state-rank">#{state.rank}</div>
                  <div className="state-info">
                    <div className="state-name">{state.state}</div>
                    <div className="state-details">
                      {state.companies} companies • {state.compliance}% compliance
                    </div>
                  </div>
                  <div className="state-score">
                    <div className="score">{state.avgScore}%</div>
                    {getTrendIcon(state.trend)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="achievements-section">
          <div className="section-header">
            <h2>Industry Achievements</h2>
            <p>Recognizing excellence in circular practices</p>
          </div>
          
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">
                  {achievement.icon}
                </div>
                <div className="achievement-content">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  <div className="achievement-stats">
                    <Users size={16} />
                    <span>{achievement.companies} companies achieved</span>
                  </div>
                </div>
                <div className="achievement-badge">
                  <Award size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="recent-updates">
          <h3>Recent Industry Updates</h3>
          <div className="updates-list">
            {recentUpdates.map((update, index) => (
              <div key={index} className="update-item">
                <div className={`update-icon ${update.type}`}>
                  {update.type === 'milestone' && <Trophy />}
                  {update.type === 'achievement' && <Award />}
                  {update.type === 'trend' && <TrendingUp />}
                  {update.type === 'impact' && <Globe />}
                </div>
                <div className="update-content">
                  <p>{update.message}</p>
                  <span className="update-time">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Stay Informed</h2>
            <p>Get the latest updates on industry circularity performance and environmental impact</p>
            <div className="cta-actions">
              <button className="cta-btn primary">
                <Eye size={20} />
                <span>View Detailed Reports</span>
                <ArrowRight size={16} />
              </button>
              <button className="cta-btn secondary">
                <BarChart3 size={20} />
                <span>Download Data</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;

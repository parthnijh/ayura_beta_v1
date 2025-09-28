import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  TrendingUp, 
  Award, 
  BarChart3, 
  Upload, 
  Target,
  Zap,
  Globe,
  Users,
  Calendar,
  ArrowRight,
  Trophy,
  Star
} from 'lucide-react';
import './StudioDashboard.css';

const StudioDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedStage, setSelectedStage] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const processingStages = [
    { id: 'mining', name: 'Mining', icon: '⛏️', score: 85, trend: 'up' },
    { id: 'refining', name: 'Refining', icon: '🏭', score: 78, trend: 'up' },
    { id: 'smelting', name: 'Smelting', icon: '🔥', score: 82, trend: 'down' },
    { id: 'casting', name: 'Casting', icon: '🏗️', score: 90, trend: 'up' },
    { id: 'fabrication', name: 'Fabrication', icon: '⚙️', score: 88, trend: 'up' },
    { id: 'recycling', name: 'Recycling', icon: '♻️', score: 92, trend: 'up' }
  ];

  const achievements = [
    { id: 1, title: 'Carbon Neutral', description: 'Achieved 100% renewable energy', icon: <Globe />, earned: true },
    { id: 2, title: 'Water Champion', description: 'Reduced water usage by 30%', icon: <Zap />, earned: true },
    { id: 3, title: 'Waste Warrior', description: 'Zero waste to landfill', icon: <Target />, earned: false },
    { id: 4, title: 'Innovation Leader', description: 'Implemented 5 new technologies', icon: <Star />, earned: false }
  ];

  const leaderboard = [
    { rank: 1, company: 'Vedanta Limited', score: 94, change: '+2' },
    { rank: 2, company: 'Hindalco Industries', score: 91, change: '+1' },
    { rank: 3, company: 'NALCO', score: 89, change: '-1' },
    { rank: 4, company: 'BALCO', score: 87, change: '+3' },
    { rank: 5, company: 'Jindal Aluminium', score: 85, change: '+1' }
  ];

  const recentUpdates = [
    { type: 'data', message: 'Monthly data submitted for Mining stage', time: '2 hours ago' },
    { type: 'score', message: 'Circularity score improved by 2 points', time: '1 day ago' },
    { type: 'achievement', message: 'Earned "Carbon Neutral" achievement', time: '3 days ago' },
    { type: 'audit', message: 'Government audit scheduled for next month', time: '1 week ago' }
  ];

  const overallScore = 87;
  const rank = 2;

  return (
    <div className="studio-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Studio Dashboard</h1>
            <p>Value Chain Stakeholder Portal</p>
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
        {/* Top Stats */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Trophy />
            </div>
            <div className="stat-content">
              <h3>Overall Score</h3>
              <div className="stat-value">{overallScore}%</div>
              <div className="stat-change positive">+2% this month</div>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-icon">
              <Award />
            </div>
            <div className="stat-content">
              <h3>Industry Rank</h3>
              <div className="stat-value">#{rank}</div>
              <div className="stat-change positive">+1 position</div>
            </div>
          </div>

          <div className="stat-card tertiary">
            <div className="stat-icon">
              <Target />
            </div>
            <div className="stat-content">
              <h3>Goals Achieved</h3>
              <div className="stat-value">8/12</div>
              <div className="stat-change">67% complete</div>
            </div>
          </div>

          <div className="stat-card quaternary">
            <div className="stat-icon">
              <TrendingUp />
            </div>
            <div className="stat-content">
              <h3>Trend</h3>
              <div className="stat-value">↗️</div>
              <div className="stat-change positive">Improving</div>
            </div>
          </div>
        </div>

        {/* Six Stages of Aluminium Processing */}
        <div className="stages-section">
          <div className="section-header">
            <h2>Six Stages of Aluminium Processing</h2>
            <p>Monitor performance across all production stages</p>
          </div>
          
          <div className="stages-grid">
            {processingStages.map((stage) => (
              <div key={stage.id} className={`stage-card ${selectedStage === stage.id ? 'selected' : ''}`}>
                <div className="stage-header">
                  <div className="stage-icon">{stage.icon}</div>
                  <div className="stage-info">
                    <h3>{stage.name}</h3>
                    <div className={`stage-score ${stage.trend}`}>
                      {stage.score}%
                      <span className={`trend-icon ${stage.trend}`}>
                        {stage.trend === 'up' ? '↗️' : '↘️'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="stage-actions">
                  <Link to="/studio/data-input" className="action-btn primary">
                    <Upload size={16} />
                    Submit Data
                  </Link>
                  <button className="action-btn secondary">
                    <BarChart3 size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Gamified Dashboard */}
          <div className="gamified-dashboard">
            <div className="section-header">
              <h2>Gamified Dashboard</h2>
              <div className="dashboard-features">
                <span className="feature-tag">Real-Time Updates</span>
                <span className="feature-tag">Interactive Visualizations</span>
                <span className="feature-tag">Leaderboards</span>
                <span className="feature-tag">Achievement System</span>
              </div>
            </div>

            <div className="dashboard-widgets">
              {/* Leaderboard */}
              <div className="widget leaderboard-widget">
                <h3>Industry Leaderboard</h3>
                <div className="leaderboard-list">
                  {leaderboard.map((entry) => (
                    <div key={entry.rank} className={`leaderboard-entry ${entry.rank <= 3 ? 'top-three' : ''}`}>
                      <div className="rank">#{entry.rank}</div>
                      <div className="company">{entry.company}</div>
                      <div className="score">{entry.score}%</div>
                      <div className={`change ${entry.change.startsWith('+') ? 'positive' : 'negative'}`}>
                        {entry.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="widget achievements-widget">
                <h3>Achievements</h3>
                <div className="achievements-grid">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
                      <div className="achievement-icon">
                        {achievement.icon}
                      </div>
                      <div className="achievement-info">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.description}</p>
                      </div>
                      {achievement.earned && <div className="earned-badge">✓</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="recent-updates">
            <h3>Recent Updates</h3>
            <div className="updates-list">
              {recentUpdates.map((update, index) => (
                <div key={index} className="update-item">
                  <div className={`update-icon ${update.type}`}>
                    {update.type === 'data' && <Upload />}
                    {update.type === 'score' && <TrendingUp />}
                    {update.type === 'achievement' && <Award />}
                    {update.type === 'audit' && <Users />}
                  </div>
                  <div className="update-content">
                    <p>{update.message}</p>
                    <span className="update-time">{update.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/studio/data-input" className="action-card primary">
              <Upload size={24} />
              <span>Submit Monthly Data</span>
              <ArrowRight size={16} />
            </Link>
            <button className="action-card secondary">
              <BarChart3 size={24} />
              <span>View Analytics</span>
              <ArrowRight size={16} />
            </button>
            <button className="action-card tertiary">
              <Target size={24} />
              <span>Set Goals</span>
              <ArrowRight size={16} />
            </button>
            <button className="action-card quaternary">
              <Users size={24} />
              <span>Team Management</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioDashboard;

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Trophy, TrendingUp, Leaf, Award, Star, Users, Target } from 'lucide-react';
import './Dashboard.css';

const CitizenDashboard = () => {
  const [selectedState, setSelectedState] = useState('All States');

  // Mock data - in real app, this would come from API
  const leaderboard = [
    { rank: 1, company: 'Vedanta', score: 95, state: 'Odisha', badge: 'Gold', color: '#ffd700' },
    { rank: 2, company: 'Hindalco', score: 92, state: 'Maharashtra', badge: 'Silver', color: '#c0c0c0' },
    { rank: 3, company: 'NALCO', score: 88, state: 'Odisha', badge: 'Bronze', color: '#cd7f32' },
    { rank: 4, company: 'BALCO', score: 85, state: 'Chhattisgarh', badge: 'Green', color: '#10b981' },
    { rank: 5, company: 'Hindalco Industries', score: 82, state: 'Gujarat', badge: 'Green', color: '#10b981' }
  ];

  const statePerformance = [
    { state: 'Odisha', avgScore: 88, companies: 12, population: '4.2M' },
    { state: 'Jharkhand', avgScore: 82, companies: 8, population: '3.3M' },
    { state: 'Chhattisgarh', avgScore: 85, companies: 6, population: '2.9M' },
    { state: 'Maharashtra', avgScore: 90, companies: 10, population: '11.2M' },
    { state: 'Gujarat', avgScore: 78, companies: 7, population: '6.0M' }
  ];

  const impactMetrics = [
    { metric: 'CO₂ Reduced', value: '2.5M tonnes', icon: <Leaf />, color: '#10b981' },
    { metric: 'Energy Saved', value: '1.8M MWh', icon: <TrendingUp />, color: '#3b82f6' },
    { metric: 'Water Conserved', value: '850M litres', icon: <Target />, color: '#06b6d4' },
    { metric: 'Waste Recycled', value: '95%', icon: <Award />, color: '#8b5cf6' }
  ];

  const monthlyTrends = [
    { month: 'Jan', nationalAvg: 75, topPerformer: 90, yourState: 78 },
    { month: 'Feb', nationalAvg: 78, topPerformer: 92, yourState: 82 },
    { month: 'Mar', nationalAvg: 82, topPerformer: 94, yourState: 85 },
    { month: 'Apr', nationalAvg: 85, topPerformer: 95, yourState: 88 },
    { month: 'May', nationalAvg: 87, topPerformer: 96, yourState: 90 },
    { month: 'Jun', nationalAvg: 90, topPerformer: 97, yourState: 92 }
  ];

  const awarenessData = [
    { topic: 'Aluminium Recycling', awareness: 85, color: '#10b981' },
    { topic: 'Circular Economy', awareness: 72, color: '#3b82f6' },
    { topic: 'Environmental Impact', awareness: 78, color: '#8b5cf6' },
    { topic: 'Industry Sustainability', awareness: 68, color: '#f59e0b' }
  ];

  const achievements = [
    {
      title: 'Green Champion',
      description: 'Your state achieved 90% circularity score this month',
      icon: <Trophy className="achievement-icon" />,
      earned: true
    },
    {
      title: 'Eco Warrior',
      description: 'Participated in 5 environmental awareness campaigns',
      icon: <Award className="achievement-icon" />,
      earned: false
    },
    {
      title: 'Sustainability Advocate',
      description: 'Shared 10 posts about aluminium recycling',
      icon: <Star className="achievement-icon" />,
      earned: true
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Citizen Dashboard</h1>
        <p>Explore circularity scores, track environmental impact, and engage with sustainability</p>
      </div>

      {/* Impact Metrics */}
      <div className="stats-grid">
        {impactMetrics.map((metric, index) => (
          <div key={index} className={`stat-card ${metric.color.includes('10b981') ? 'green' : metric.color.includes('3b82f6') ? 'blue' : metric.color.includes('06b6d4') ? 'cyan' : 'purple'}`}>
            <div className="stat-icon">{metric.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{metric.value}</div>
              <div className="stat-label">{metric.metric}</div>
            </div>
          </div>
        ))}
      </div>

      {/* State Filter */}
      <div className="filter-section">
        <h2>State-wise Performance</h2>
        <select 
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
          className="state-selector"
        >
          <option value="All States">All States</option>
          {statePerformance.map(state => (
            <option key={state.state} value={state.state}>{state.state}</option>
          ))}
        </select>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Company Leaderboard */}
        <div className="chart-card">
          <h3>🏆 Company Leaderboard</h3>
          <div className="leaderboard">
            {leaderboard.map((company, index) => (
              <div key={index} className="leaderboard-item">
                <div className="rank-badge" style={{ backgroundColor: company.color }}>
                  {company.rank}
                </div>
                <div className="company-info">
                  <span className="company-name">{company.company}</span>
                  <span className="company-state">{company.state}</span>
                </div>
                <div className="score-section">
                  <span className="score">{company.score}%</span>
                  <span className="badge">{company.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Performance */}
        <div className="chart-card">
          <h3>State Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends */}
        <div className="chart-card">
          <h3>National Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="nationalAvg" stroke="#3b82f6" strokeWidth={2} name="National Average" />
              <Line type="monotone" dataKey="topPerformer" stroke="#10b981" strokeWidth={2} name="Top Performer" />
              <Line type="monotone" dataKey="yourState" stroke="#8b5cf6" strokeWidth={2} name="Your State" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Awareness Levels */}
        <div className="chart-card">
          <h3>Public Awareness Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={awarenessData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="awareness"
                label={({ topic, awareness }) => `${topic}: ${awareness}%`}
              >
                {awarenessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h2>Your Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
              <div className="achievement-icon-container">
                {achievement.icon}
              </div>
              <div className="achievement-content">
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
                {achievement.earned ? (
                  <span className="achievement-status earned">✓ Earned</span>
                ) : (
                  <span className="achievement-status locked">🔒 Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="education-section">
        <h2>Learn About Circularity</h2>
        <div className="education-cards">
          <div className="education-card">
            <Leaf className="education-icon" />
            <h4>Why Aluminium Recycling Matters</h4>
            <p>Recycling aluminium saves 95% of the energy needed to produce new aluminium and reduces CO₂ emissions significantly.</p>
            <button className="education-btn">Learn More</button>
          </div>
          <div className="education-card">
            <Target className="education-icon" />
            <h4>Understanding Circularity Scores</h4>
            <p>Circularity scores measure how efficiently companies use resources and minimize waste in their production processes.</p>
            <button className="education-btn">Learn More</button>
          </div>
          <div className="education-card">
            <Users className="education-icon" />
            <h4>Your Role in Sustainability</h4>
            <p>As a citizen, you can contribute by recycling aluminium products and supporting sustainable companies.</p>
            <button className="education-btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;

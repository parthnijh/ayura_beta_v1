import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Target, AlertCircle, CheckCircle, BarChart3, Leaf, Zap, Droplets } from 'lucide-react';
import './Dashboard.css';

const CompanyDashboard = () => {
  const [selectedStage, setSelectedStage] = useState('All Stages');

  // Mock data - in real app, this would come from API
  const stageData = [
    { stage: 'Mining', score: 85, carbonIntensity: 2.3, energyEfficiency: 78, waterUse: 1200 },
    { stage: 'Refining', score: 92, carbonIntensity: 1.8, energyEfficiency: 85, waterUse: 800 },
    { stage: 'Smelting', score: 88, carbonIntensity: 2.1, energyEfficiency: 82, waterUse: 950 },
    { stage: 'Fabrication', score: 76, carbonIntensity: 2.8, energyEfficiency: 75, waterUse: 1100 },
    { stage: 'Recycling', score: 95, carbonIntensity: 1.2, energyEfficiency: 90, waterUse: 600 }
  ];

  const monthlyTrends = [
    { month: 'Jan', circularityScore: 78, carbonIntensity: 2.5, energyEfficiency: 75 },
    { month: 'Feb', circularityScore: 82, carbonIntensity: 2.3, energyEfficiency: 78 },
    { month: 'Mar', circularityScore: 85, carbonIntensity: 2.1, energyEfficiency: 82 },
    { month: 'Apr', circularityScore: 88, carbonIntensity: 1.9, energyEfficiency: 85 },
    { month: 'May', circularityScore: 90, carbonIntensity: 1.8, energyEfficiency: 87 },
    { month: 'Jun', circularityScore: 92, carbonIntensity: 1.7, energyEfficiency: 90 }
  ];

  const peerComparison = [
    { company: 'Your Company', score: 92 },
    { company: 'Industry Average', score: 78 },
    { company: 'Top Performer', score: 95 },
    { company: 'Competitor A', score: 85 },
    { company: 'Competitor B', score: 72 }
  ];

  const circularityMetrics = [
    { metric: 'Carbon Intensity', value: 85, fullMark: 100 },
    { metric: 'Energy Efficiency', value: 90, fullMark: 100 },
    { metric: 'Water Usage', value: 78, fullMark: 100 },
    { metric: 'Waste Recovery', value: 92, fullMark: 100 },
    { metric: 'Recycled Input', value: 88, fullMark: 100 },
    { metric: 'Transport Efficiency', value: 82, fullMark: 100 }
  ];

  const stats = [
    { label: 'Overall Score', value: '92%', icon: <Target />, color: 'green' },
    { label: 'Carbon Intensity', value: '1.7 kg/tonne', icon: <Leaf />, color: 'blue' },
    { label: 'Energy Efficiency', value: '90%', icon: <Zap />, color: 'yellow' },
    { label: 'Water Usage', value: '800 L/tonne', icon: <Droplets />, color: 'blue' }
  ];

  const recommendations = [
    {
      title: 'Switch to Renewable Energy',
      impact: 'Reduce carbon intensity by 15%',
      effort: 'Medium',
      priority: 'High',
      description: 'Installing solar panels in smelting facility could reduce your carbon footprint significantly.'
    },
    {
      title: 'Improve Water Recycling',
      impact: 'Reduce water usage by 20%',
      effort: 'Low',
      priority: 'Medium',
      description: 'Implement closed-loop water system in refining process.'
    },
    {
      title: 'Optimize Transport Routes',
      impact: 'Reduce transport emissions by 12%',
      effort: 'Low',
      priority: 'Low',
      description: 'Use AI-powered route optimization for material transport.'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Company Dashboard</h1>
        <p>Track your circularity performance and get actionable insights</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stage Filter */}
      <div className="filter-section">
        <h2>Stage-wise Analysis</h2>
        <select 
          value={selectedStage} 
          onChange={(e) => setSelectedStage(e.target.value)}
          className="stage-selector"
        >
          <option value="All Stages">All Stages</option>
          {stageData.map(stage => (
            <option key={stage.stage} value={stage.stage}>{stage.stage}</option>
          ))}
        </select>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Stage Performance */}
        <div className="chart-card">
          <h3>Stage-wise Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends */}
        <div className="chart-card">
          <h3>Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="circularityScore" stroke="#10b981" strokeWidth={2} name="Circularity Score" />
              <Line type="monotone" dataKey="energyEfficiency" stroke="#3b82f6" strokeWidth={2} name="Energy Efficiency" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Circularity Radar */}
        <div className="chart-card">
          <h3>Circularity Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={circularityMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Score" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Peer Comparison */}
        <div className="chart-card">
          <h3>Peer Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peerComparison} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="company" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h2>Actionable Recommendations</h2>
        <div className="recommendations-grid">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <div className="recommendation-header">
                <h4>{rec.title}</h4>
                <span className={`priority-badge ${rec.priority.toLowerCase()}`}>
                  {rec.priority} Priority
                </span>
              </div>
              <p className="recommendation-description">{rec.description}</p>
              <div className="recommendation-metrics">
                <div className="metric">
                  <span className="metric-label">Impact:</span>
                  <span className="metric-value">{rec.impact}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Effort:</span>
                  <span className="metric-value">{rec.effort}</span>
                </div>
              </div>
              <button className="recommendation-btn">Implement</button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Input Reminder */}
      <div className="reminder-section">
        <div className="reminder-card">
          <AlertCircle className="reminder-icon" />
          <div className="reminder-content">
            <h3>Monthly Data Submission Due</h3>
            <p>Please submit your June 2024 production and environmental data by July 5th</p>
            <button className="reminder-btn">Submit Data</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;

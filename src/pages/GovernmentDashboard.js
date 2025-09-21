import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Building2, AlertTriangle, CheckCircle, Users, MapPin } from 'lucide-react';
import './Dashboard.css';

const GovernmentDashboard = () => {
  const [selectedState, setSelectedState] = useState('All States');

  // Mock data - in real app, this would come from API
  const stateData = [
    { state: 'Odisha', companies: 12, avgScore: 78, compliance: 95 },
    { state: 'Jharkhand', companies: 8, avgScore: 72, compliance: 88 },
    { state: 'Chhattisgarh', companies: 6, avgScore: 85, compliance: 92 },
    { state: 'Maharashtra', companies: 10, avgScore: 81, compliance: 90 },
    { state: 'Gujarat', companies: 7, avgScore: 76, compliance: 87 }
  ];

  const monthlyTrends = [
    { month: 'Jan', score: 75, compliance: 88 },
    { month: 'Feb', score: 78, compliance: 90 },
    { month: 'Mar', score: 82, compliance: 92 },
    { month: 'Apr', score: 79, compliance: 89 },
    { month: 'May', score: 85, compliance: 94 },
    { month: 'Jun', score: 88, compliance: 96 }
  ];

  const companyPerformance = [
    { name: 'Vedanta', score: 92, status: 'Excellent', color: '#10b981' },
    { name: 'Hindalco', score: 88, status: 'Good', color: '#3b82f6' },
    { name: 'NALCO', score: 85, status: 'Good', color: '#8b5cf6' },
    { name: 'BALCO', score: 78, status: 'Average', color: '#f59e0b' },
    { name: 'Hindalco Industries', score: 72, status: 'Below Average', color: '#ef4444' }
  ];

  const complianceData = [
    { name: 'Compliant', value: 85, color: '#10b981' },
    { name: 'Non-Compliant', value: 15, color: '#ef4444' }
  ];

  const stats = [
    { label: 'Total Companies', value: '43', icon: <Building2 />, color: 'blue' },
    { label: 'Avg Circularity Score', value: '81%', icon: <TrendingUp />, color: 'green' },
    { label: 'Compliance Rate', value: '92%', icon: <CheckCircle />, color: 'green' },
    { label: 'Pending Approvals', value: '7', icon: <AlertTriangle />, color: 'orange' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Government Dashboard</h1>
        <p>National oversight and compliance monitoring</p>
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

      {/* State Filter */}
      <div className="filter-section">
        <h2>State-wise Analysis</h2>
        <select 
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
          className="state-selector"
        >
          <option value="All States">All States</option>
          {stateData.map(state => (
            <option key={state.state} value={state.state}>{state.state}</option>
          ))}
        </select>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* State Performance */}
        <div className="chart-card">
          <h3>State-wise Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends */}
        <div className="chart-card">
          <h3>Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Overview */}
        <div className="chart-card">
          <h3>Compliance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Company Performance */}
        <div className="chart-card">
          <h3>Top Company Performance</h3>
          <div className="company-list">
            {companyPerformance.map((company, index) => (
              <div key={index} className="company-item">
                <div className="company-info">
                  <span className="company-name">{company.name}</span>
                  <span className={`company-status ${company.status.toLowerCase().replace(' ', '-')}`}>
                    {company.status}
                  </span>
                </div>
                <div className="score-bar">
                  <div 
                    className="score-fill" 
                    style={{ 
                      width: `${company.score}%`, 
                      backgroundColor: company.color 
                    }}
                  ></div>
                  <span className="score-text">{company.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="action-section">
        <h2>Action Items</h2>
        <div className="action-cards">
          <div className="action-card urgent">
            <AlertTriangle className="action-icon" />
            <div className="action-content">
              <h4>Pending Approvals</h4>
              <p>7 companies awaiting data verification approval</p>
              <button className="action-btn">Review Now</button>
            </div>
          </div>
          <div className="action-card">
            <Building2 className="action-icon" />
            <div className="action-content">
              <h4>Audit Schedule</h4>
              <p>Quarterly audits due for 12 companies</p>
              <button className="action-btn">Schedule</button>
            </div>
          </div>
          <div className="action-card">
            <TrendingUp className="action-icon" />
            <div className="action-content">
              <h4>Performance Review</h4>
              <p>Monthly performance report ready</p>
              <button className="action-btn">View Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;

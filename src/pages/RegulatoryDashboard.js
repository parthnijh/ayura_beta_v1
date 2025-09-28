import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Search, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Building2,
  MapPin,
  Calendar,
  Filter,
  Eye,
  ArrowRight
} from 'lucide-react';
import './RegulatoryDashboard.css';

const RegulatoryDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const complianceStats = {
    totalCompanies: 156,
    compliantCompanies: 142,
    pendingReviews: 8,
    overdueSubmissions: 6,
    complianceRate: 91.0
  };

  const auditSchedule = [
    { id: 1, company: 'Vedanta Limited', location: 'Odisha', scheduledDate: '2024-02-15', status: 'scheduled', type: '6-month' },
    { id: 2, company: 'Hindalco Industries', location: 'Maharashtra', scheduledDate: '2024-02-20', status: 'in-progress', type: '6-month' },
    { id: 3, company: 'NALCO', location: 'Odisha', scheduledDate: '2024-02-25', status: 'completed', type: '6-month' },
    { id: 4, company: 'BALCO', location: 'Chhattisgarh', scheduledDate: '2024-03-01', status: 'scheduled', type: '6-month' }
  ];

  const recentSubmissions = [
    { id: 1, company: 'Vedanta Limited', stage: 'Mining', submittedDate: '2024-01-15', status: 'approved', score: 87 },
    { id: 2, company: 'Hindalco Industries', stage: 'Smelting', submittedDate: '2024-01-14', status: 'under-review', score: null },
    { id: 3, company: 'NALCO', stage: 'Refining', submittedDate: '2024-01-13', status: 'approved', score: 92 },
    { id: 4, company: 'BALCO', stage: 'Fabrication', submittedDate: '2024-01-12', status: 'rejected', score: null },
    { id: 5, company: 'Jindal Aluminium', stage: 'Recycling', submittedDate: '2024-01-11', status: 'approved', score: 89 }
  ];

  const statePerformance = [
    { state: 'Odisha', companies: 45, avgScore: 88.5, compliance: 96, trend: 'up' },
    { state: 'Maharashtra', companies: 38, avgScore: 85.2, compliance: 92, trend: 'up' },
    { state: 'Chhattisgarh', companies: 28, avgScore: 82.1, compliance: 89, trend: 'down' },
    { state: 'Karnataka', companies: 25, avgScore: 86.7, compliance: 94, trend: 'up' },
    { state: 'Gujarat', companies: 20, avgScore: 84.3, compliance: 90, trend: 'stable' }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: '6 companies have overdue submissions', priority: 'high' },
    { id: 2, type: 'info', message: 'Monthly compliance report ready for review', priority: 'medium' },
    { id: 3, type: 'success', message: 'Audit completed for NALCO - Odisha facility', priority: 'low' },
    { id: 4, type: 'warning', message: 'Data integrity issues detected in 3 submissions', priority: 'high' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="status-icon approved" />;
      case 'under-review': return <Clock className="status-icon pending" />;
      case 'rejected': return <AlertTriangle className="status-icon rejected" />;
      case 'scheduled': return <Calendar className="status-icon scheduled" />;
      case 'in-progress': return <Clock className="status-icon in-progress" />;
      case 'completed': return <CheckCircle className="status-icon completed" />;
      default: return <Clock className="status-icon" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="alert-icon warning" />;
      case 'info': return <Eye className="alert-icon info" />;
      case 'success': return <CheckCircle className="alert-icon success" />;
      default: return <AlertTriangle className="alert-icon" />;
    }
  };

  return (
    <div className="regulatory-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Regulatory Dashboard</h1>
            <p>Government Regulatory Bodies Portal</p>
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
        {/* Compliance Overview */}
        <div className="compliance-overview">
          <div className="section-header">
            <h2>Compliance Overview</h2>
            <p>Real-time monitoring of industry compliance</p>
          </div>
          
          <div className="compliance-stats">
            <div className="stat-card primary">
              <div className="stat-icon">
                <Building2 />
              </div>
              <div className="stat-content">
                <h3>Total Companies</h3>
                <div className="stat-value">{complianceStats.totalCompanies}</div>
                <div className="stat-change">Registered</div>
              </div>
            </div>

            <div className="stat-card secondary">
              <div className="stat-icon">
                <CheckCircle />
              </div>
              <div className="stat-content">
                <h3>Compliant</h3>
                <div className="stat-value">{complianceStats.compliantCompanies}</div>
                <div className="stat-change positive">{complianceStats.complianceRate}% rate</div>
              </div>
            </div>

            <div className="stat-card tertiary">
              <div className="stat-icon">
                <Clock />
              </div>
              <div className="stat-content">
                <h3>Pending Reviews</h3>
                <div className="stat-value">{complianceStats.pendingReviews}</div>
                <div className="stat-change">Awaiting approval</div>
              </div>
            </div>

            <div className="stat-card quaternary">
              <div className="stat-icon">
                <AlertTriangle />
              </div>
              <div className="stat-content">
                <h3>Overdue</h3>
                <div className="stat-value">{complianceStats.overdueSubmissions}</div>
                <div className="stat-change negative">Requires attention</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="alerts-section">
          <h3>System Alerts</h3>
          <div className="alerts-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-item ${alert.type} ${alert.priority}`}>
                <div className="alert-icon-container">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="alert-content">
                  <p>{alert.message}</p>
                  <span className="alert-priority">{alert.priority} priority</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* All Data Reports */}
          <div className="data-reports-section">
            <div className="section-header">
              <h2>All Data Reports</h2>
              <div className="section-actions">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-dropdown">
                  <Filter size={20} />
                  <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Under Review</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="reports-table">
              <div className="table-header">
                <div className="col-company">Company</div>
                <div className="col-stage">Stage</div>
                <div className="col-date">Submitted</div>
                <div className="col-status">Status</div>
                <div className="col-score">Score</div>
                <div className="col-actions">Actions</div>
              </div>
              <div className="table-body">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="table-row">
                    <div className="col-company">
                      <div className="company-info">
                        <Building2 size={16} />
                        <span>{submission.company}</span>
                      </div>
                    </div>
                    <div className="col-stage">{submission.stage}</div>
                    <div className="col-date">{submission.submittedDate}</div>
                    <div className="col-status">
                      {getStatusIcon(submission.status)}
                      <span className={`status-text ${submission.status}`}>
                        {submission.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="col-score">
                      {submission.score ? `${submission.score}%` : '-'}
                    </div>
                    <div className="col-actions">
                      <button className="action-btn view">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn download">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* State Performance */}
          <div className="state-performance">
            <h3>State Performance</h3>
            <div className="performance-list">
              {statePerformance.map((state, index) => (
                <div key={index} className="performance-item">
                  <div className="state-info">
                    <MapPin size={16} />
                    <span className="state-name">{state.state}</span>
                    <span className="company-count">{state.companies} companies</span>
                  </div>
                  <div className="performance-metrics">
                    <div className="metric">
                      <span className="metric-label">Avg Score</span>
                      <span className="metric-value">{state.avgScore}%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Compliance</span>
                      <span className="metric-value">{state.compliance}%</span>
                    </div>
                    <div className={`trend ${state.trend}`}>
                      {state.trend === 'up' ? '↗️' : state.trend === 'down' ? '↘️' : '➡️'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Tools Section */}
        <div className="audit-tools-section">
          <div className="section-header">
            <h2>Audit Tools</h2>
            <p>6-Month In-Person Audit Management</p>
          </div>

          <div className="audit-schedule">
            <div className="schedule-header">
              <h3>Upcoming Audits</h3>
              <Link to="/regulatory/audit-tools" className="view-all-btn">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="audit-list">
              {auditSchedule.map((audit) => (
                <div key={audit.id} className={`audit-item ${audit.status}`}>
                  <div className="audit-info">
                    <div className="audit-company">
                      <Building2 size={16} />
                      <span>{audit.company}</span>
                    </div>
                    <div className="audit-location">
                      <MapPin size={14} />
                      <span>{audit.location}</span>
                    </div>
                    <div className="audit-date">
                      <Calendar size={14} />
                      <span>{audit.scheduledDate}</span>
                    </div>
                  </div>
                  <div className="audit-status">
                    {getStatusIcon(audit.status)}
                    <span className={`status-text ${audit.status}`}>
                      {audit.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="audit-actions">
                    <button className="action-btn primary">
                      <Eye size={16} />
                      View
                    </button>
                    {audit.status === 'scheduled' && (
                      <button className="action-btn secondary">
                        <Calendar size={16} />
                        Reschedule
                      </button>
                    )}
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
            <Link to="/regulatory/audit-tools" className="action-card primary">
              <Shield size={24} />
              <span>Audit Tools</span>
              <ArrowRight size={16} />
            </Link>
            <button className="action-card secondary">
              <FileText size={24} />
              <span>Generate Report</span>
              <ArrowRight size={16} />
            </button>
            <button className="action-card tertiary">
              <Download size={24} />
              <span>Export Data</span>
              <ArrowRight size={16} />
            </button>
            <button className="action-card quaternary">
              <BarChart3 size={24} />
              <span>Analytics</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryDashboard;

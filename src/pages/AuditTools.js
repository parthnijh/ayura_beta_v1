import React, { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  FileText,
  Download,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Users,
  Target
} from 'lucide-react';
import './AuditTools.css';

const AuditTools = () => {
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const auditSchedule = [
    { 
      id: 1, 
      company: 'Vedanta Limited', 
      location: 'Odisha', 
      facility: 'Jharsuguda Smelter',
      scheduledDate: '2024-02-15', 
      status: 'scheduled', 
      type: '6-month',
      auditor: 'Dr. Rajesh Kumar',
      team: ['Dr. Rajesh Kumar', 'Ms. Priya Sharma', 'Mr. Amit Singh'],
      checklist: [
        { item: 'Environmental Compliance', status: 'pending', priority: 'high' },
        { item: 'Data Accuracy Verification', status: 'pending', priority: 'high' },
        { item: 'Safety Protocols', status: 'pending', priority: 'medium' },
        { item: 'Waste Management', status: 'pending', priority: 'medium' }
      ]
    },
    { 
      id: 2, 
      company: 'Hindalco Industries', 
      location: 'Maharashtra', 
      facility: 'Renukoot Plant',
      scheduledDate: '2024-02-20', 
      status: 'in-progress', 
      type: '6-month',
      auditor: 'Dr. Sunita Patel',
      team: ['Dr. Sunita Patel', 'Mr. Vikram Joshi', 'Ms. Anjali Mehta'],
      checklist: [
        { item: 'Environmental Compliance', status: 'completed', priority: 'high' },
        { item: 'Data Accuracy Verification', status: 'in-progress', priority: 'high' },
        { item: 'Safety Protocols', status: 'completed', priority: 'medium' },
        { item: 'Waste Management', status: 'pending', priority: 'medium' }
      ]
    },
    { 
      id: 3, 
      company: 'NALCO', 
      location: 'Odisha', 
      facility: 'Angul Complex',
      scheduledDate: '2024-02-25', 
      status: 'completed', 
      type: '6-month',
      auditor: 'Dr. Ravi Shankar',
      team: ['Dr. Ravi Shankar', 'Ms. Deepika Reddy', 'Mr. Suresh Kumar'],
      checklist: [
        { item: 'Environmental Compliance', status: 'completed', priority: 'high' },
        { item: 'Data Accuracy Verification', status: 'completed', priority: 'high' },
        { item: 'Safety Protocols', status: 'completed', priority: 'medium' },
        { item: 'Waste Management', status: 'completed', priority: 'medium' }
      ]
    },
    { 
      id: 4, 
      company: 'BALCO', 
      location: 'Chhattisgarh', 
      facility: 'Korba Plant',
      scheduledDate: '2024-03-01', 
      status: 'scheduled', 
      type: '6-month',
      auditor: 'Dr. Meera Gupta',
      team: ['Dr. Meera Gupta', 'Mr. Rajesh Verma', 'Ms. Kavita Singh'],
      checklist: [
        { item: 'Environmental Compliance', status: 'pending', priority: 'high' },
        { item: 'Data Accuracy Verification', status: 'pending', priority: 'high' },
        { item: 'Safety Protocols', status: 'pending', priority: 'medium' },
        { item: 'Waste Management', status: 'pending', priority: 'medium' }
      ]
    }
  ];

  const auditTemplates = [
    { id: 1, name: 'Standard 6-Month Audit', description: 'Comprehensive environmental and compliance audit', items: 25 },
    { id: 2, name: 'Data Verification Audit', description: 'Focus on data accuracy and reporting', items: 15 },
    { id: 3, name: 'Safety Compliance Audit', description: 'Workplace safety and protocol verification', items: 20 },
    { id: 4, name: 'Environmental Impact Audit', description: 'Environmental footprint and sustainability', items: 18 }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Calendar className="status-icon scheduled" />;
      case 'in-progress': return <Clock className="status-icon in-progress" />;
      case 'completed': return <CheckCircle className="status-icon completed" />;
      default: return <Clock className="status-icon" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const filteredAudits = auditSchedule.filter(audit => {
    const matchesSearch = audit.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || audit.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="audit-tools">
      {/* Header */}
      <div className="audit-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={() => window.history.back()}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1>Audit Tools</h1>
              <p>6-Month In-Person Audit Management System</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="action-btn primary">
              <Plus size={20} />
              Schedule New Audit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="audit-content">
        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search companies or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={20} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Main Grid */}
        <div className="audit-grid">
          {/* Audit List */}
          <div className="audit-list-section">
            <div className="section-header">
              <h2>Audit Schedule</h2>
              <span className="audit-count">{filteredAudits.length} audits</span>
            </div>

            <div className="audit-list">
              {filteredAudits.map((audit) => (
                <div 
                  key={audit.id} 
                  className={`audit-card ${audit.status} ${selectedAudit?.id === audit.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAudit(audit)}
                >
                  <div className="audit-header">
                    <div className="audit-info">
                      <div className="company-name">
                        <Building2 size={16} />
                        <span>{audit.company}</span>
                      </div>
                      <div className="facility-location">
                        <MapPin size={14} />
                        <span>{audit.facility}, {audit.location}</span>
                      </div>
                    </div>
                    <div className="audit-status">
                      {getStatusIcon(audit.status)}
                      <span className={`status-text ${audit.status}`}>
                        {audit.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="audit-details">
                    <div className="audit-date">
                      <Calendar size={14} />
                      <span>{audit.scheduledDate}</span>
                    </div>
                    <div className="audit-type">
                      <Shield size={14} />
                      <span>{audit.type} audit</span>
                    </div>
                    <div className="audit-auditor">
                      <Users size={14} />
                      <span>{audit.auditor}</span>
                    </div>
                  </div>

                  <div className="audit-progress">
                    <div className="progress-label">Progress</div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${(audit.checklist.filter(item => item.status === 'completed').length / audit.checklist.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {audit.checklist.filter(item => item.status === 'completed').length} / {audit.checklist.length} completed
                    </div>
                  </div>

                  <div className="audit-actions">
                    <button className="action-btn view">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn download">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Details */}
          <div className="audit-details-section">
            {selectedAudit ? (
              <div className="audit-detail-card">
                <div className="detail-header">
                  <h3>Audit Details</h3>
                  <div className="detail-actions">
                    <button className="action-btn primary">
                      <Edit size={16} />
                      Edit
                    </button>
                    <button className="action-btn secondary">
                      <Download size={16} />
                      Export
                    </button>
                  </div>
                </div>

                <div className="detail-content">
                  <div className="detail-section">
                    <h4>Company Information</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <Building2 size={16} />
                        <span>{selectedAudit.company}</span>
                      </div>
                      <div className="info-item">
                        <MapPin size={16} />
                        <span>{selectedAudit.facility}, {selectedAudit.location}</span>
                      </div>
                      <div className="info-item">
                        <Calendar size={16} />
                        <span>{selectedAudit.scheduledDate}</span>
                      </div>
                      <div className="info-item">
                        <Shield size={16} />
                        <span>{selectedAudit.type} audit</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Audit Team</h4>
                    <div className="team-list">
                      {selectedAudit.team.map((member, index) => (
                        <div key={index} className="team-member">
                          <Users size={16} />
                          <span>{member}</span>
                          {index === 0 && <span className="lead-auditor">Lead</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Audit Checklist</h4>
                    <div className="checklist">
                      {selectedAudit.checklist.map((item, index) => (
                        <div key={index} className="checklist-item">
                          <div className="item-info">
                            <span className="item-name">{item.item}</span>
                            <span 
                              className="item-priority" 
                              style={{ color: getPriorityColor(item.priority) }}
                            >
                              {item.priority}
                            </span>
                          </div>
                          <div className={`item-status ${item.status}`}>
                            {item.status === 'completed' && <CheckCircle size={16} />}
                            {item.status === 'in-progress' && <Clock size={16} />}
                            {item.status === 'pending' && <AlertTriangle size={16} />}
                            <span>{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <Shield size={48} />
                <h3>Select an Audit</h3>
                <p>Choose an audit from the list to view detailed information and manage the audit process.</p>
              </div>
            )}
          </div>
        </div>

        {/* Audit Templates */}
        <div className="templates-section">
          <div className="section-header">
            <h2>Audit Templates</h2>
            <p>Pre-configured audit checklists for different types of inspections</p>
          </div>

          <div className="templates-grid">
            {auditTemplates.map((template) => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <div className="template-icon">
                    <FileText size={24} />
                  </div>
                  <div className="template-info">
                    <h3>{template.name}</h3>
                    <p>{template.description}</p>
                  </div>
                </div>
                <div className="template-stats">
                  <div className="stat">
                    <Target size={16} />
                    <span>{template.items} items</span>
                  </div>
                </div>
                <div className="template-actions">
                  <button className="action-btn primary">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="action-btn secondary">
                    <Plus size={16} />
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTools;

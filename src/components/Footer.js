import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="gov-footer">
      <div className="gov-footer-content">
        <div className="gov-footer-links">
          <div className="gov-footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/public">Public Portal</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><a href="mailto:support@ayura.gov.in" target="_blank" rel="noopener noreferrer">
                Help & Support <ExternalLink size={12} />
              </a></li>
            </ul>
          </div>
          
          <div className="gov-footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link to="/studio">Stakeholder Portal</Link></li>
              <li><Link to="/regulatory">Regulatory Portal</Link></li>
              <li><Link to="/studio/data-input">Data Submission</Link></li>
              <li><Link to="/regulatory/audit-tools">Audit Tools</Link></li>
            </ul>
          </div>
          
          <div className="gov-footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://ayura.gov.in/guidelines" target="_blank" rel="noopener noreferrer">
                Guidelines <ExternalLink size={12} />
              </a></li>
              <li><a href="https://ayura.gov.in/docs" target="_blank" rel="noopener noreferrer">
                Documentation <ExternalLink size={12} />
              </a></li>
              <li><a href="https://ayura.gov.in/api" target="_blank" rel="noopener noreferrer">
                API Reference <ExternalLink size={12} />
              </a></li>
              <li><a href="https://ayura.gov.in/training" target="_blank" rel="noopener noreferrer">
                Training Materials <ExternalLink size={12} />
              </a></li>
            </ul>
          </div>
          
          <div className="gov-footer-section">
            <h4>Contact Information</h4>
            <ul>
              <li>
                <MapPin size={14} />
                <span>Ministry of Environment, Forest and Climate Change<br />
                Government of India, New Delhi</span>
              </li>
              <li>
                <Phone size={14} />
                <span>+91-11-2436-0700</span>
              </li>
              <li>
                <Mail size={14} />
                <span>ayura@moef.gov.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="gov-footer-bottom">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>© 2024 Government of India. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://ayura.gov.in/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="https://ayura.gov.in/terms" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="https://ayura.gov.in/accessibility" className="text-gray-300 hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

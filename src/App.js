import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import StudioDashboard from './pages/StudioDashboard';
import RegulatoryDashboard from './pages/RegulatoryDashboard';
import PublicDashboard from './pages/PublicDashboard';
import DataInput from './pages/DataInput';
import AuditTools from './pages/AuditTools';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="gov-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              {/* Studio Interface - Value Chain Stakeholders */}
              <Route path="/studio" element={<StudioDashboard />} />
              <Route path="/studio/data-input" element={<DataInput />} />
              {/* Regulatory Interface - Government Bodies */}
              <Route path="/regulatory" element={<RegulatoryDashboard />} />
              <Route path="/regulatory/audit-tools" element={<AuditTools />} />
              {/* Public Interface - Citizens */}
              <Route path="/public" element={<PublicDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
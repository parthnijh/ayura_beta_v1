import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import GovernmentDashboard from './pages/GovernmentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import CitizenDashboard from './pages/CitizenDashboard';
import DataInput from './pages/DataInput';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/government-dashboard" element={<GovernmentDashboard />} />
              <Route path="/company-dashboard" element={<CompanyDashboard />} />
              <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
              <Route path="/data-input" element={<DataInput />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
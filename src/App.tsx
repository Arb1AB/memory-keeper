import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';
import MedicalInfo from './pages/MedicalInfo';
import InsuranceInfo from './pages/InsuranceInfo';
import Passwords from './pages/Passwords';
import Wishes from './pages/Wishes';
import CheckIns from './pages/CheckIns';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/network" element={token ? <Network /> : <Navigate to="/login" />} />
        <Route path="/medical" element={token ? <MedicalInfo /> : <Navigate to="/login" />} />
        <Route path="/insurance" element={token ? <InsuranceInfo /> : <Navigate to="/login" />} />
        <Route path="/passwords" element={token ? <Passwords /> : <Navigate to="/login" />} />
        <Route path="/wishes" element={token ? <Wishes /> : <Navigate to="/login" />} />
        <Route path="/checkins" element={token ? <CheckIns /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';
import Medical from './pages/Medical';
import Insurance from './pages/Insurance';
import Passwords from './pages/Passwords';
import Wishes from './pages/Wishes';
import CheckIns from './pages/CheckIns';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/network" element={token ? <Network /> : <Navigate to="/login" />} />
        <Route path="/medical" element={token ? <Medical /> : <Navigate to="/login" />} />
        <Route path="/insurance" element={token ? <Insurance /> : <Navigate to="/login" />} />
        <Route path="/passwords" element={token ? <Passwords /> : <Navigate to="/login" />} />
        <Route path="/wishes" element={token ? <Wishes /> : <Navigate to="/login" />} />
        <Route path="/checkins" element={token ? <CheckIns /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

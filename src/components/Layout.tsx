import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const downloadPacket = () => {
    const token = localStorage.getItem('token');
    if (token) {
      window.open(`/api/packet/emergency-packet?token=${token}`, '_blank');
    }
  };

  return (
    <div>
      <div className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/network">Network</Link>
        <Link to="/medical">Medical</Link>
        <Link to="/insurance">Insurance</Link>
        <Link to="/passwords">Credentials</Link>
        <Link to="/wishes">Wishes</Link>
        <Link to="/checkins">Check-Ins</Link>
        <button onClick={downloadPacket} className="btn btn-success">Emergency Packet</button>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
      <div className="container">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
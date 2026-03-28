import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [network, setNetwork] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);

        const networkRes = await axios.get('/api/network/my-network', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNetwork(networkRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
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
        <a href="/dashboard">Dashboard</a>
        <a href="/network">Network</a>
        <a href="/medical">Medical</a>
        <a href="/insurance">Insurance</a>
        <a href="/passwords">Credentials</a>
        <a href="/wishes">Wishes</a>
        <a href="/checkins">Check-Ins</a>
        <button onClick={downloadPacket} className="btn btn-success">Emergency Packet</button>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div className="container">
        <h1>Welcome, {user?.firstName} {user?.lastName}!</h1>
        
        {network && (
          <div className="card">
            <h2>Network: {network.name}</h2>
            <p><strong>Invite Code:</strong> {network.inviteCode}</p>
            <p>Share this code with others to join your network</p>
            
            <h3>Network Members:</h3>
            {network.members?.map((member: any) => (
              <div key={member.id} className="member-item">
                <strong>{member.firstName} {member.lastName}</strong> - {member.role}
                <br />
                <small>{member.email}</small>
                {member.phone && <div>Phone: {member.phone}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
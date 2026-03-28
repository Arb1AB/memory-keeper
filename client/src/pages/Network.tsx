import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Network: React.FC = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState<any>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchNetwork();
  }, []);

  const fetchNetwork = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/network/my-network', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNetwork(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createNetwork = async () => {
    const token = localStorage.getItem('token');
    const name = prompt('Enter network name:');
    if (!name) return;
    try {
      await axios.post('/api/network/create', { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNetwork();
      setMessage('Network created!');
    } catch (err) {
      setMessage('Error creating network');
    }
  };

  const joinNetwork = async () => {
    const token = localStorage.getItem('token');
    if (!inviteCode) return;
    try {
      await axios.post('/api/network/join', { inviteCode }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNetwork();
      setMessage('Joined network!');
      setInviteCode('');
    } catch (err) {
      setMessage('Invalid invite code');
    }
  };

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
        <h1>Network Management</h1>
        
        {message && (
          <div className="card" style={{ background: '#e6fffa', color: '#276749' }}>
            {message}
          </div>
        )}
        
        {!network ? (
          <div className="card">
            <p>You are not in a network yet.</p>
            <button onClick={createNetwork} className="btn">Create Network</button>
            <hr style={{ margin: '20px 0' }} />
            <h3>Join Existing Network</h3>
            <input
              type="text"
              placeholder="Enter invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
            <button onClick={joinNetwork} className="btn">Join</button>
          </div>
        ) : (
          <div className="card">
            <h2>{network.name}</h2>
            <p><strong>Invite Code:</strong> <code style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: '5px' }}>{network.inviteCode}</code></p>
            <p>Share this code with others to join your network</p>
            
            <h3>Network Members ({network.members?.length || 0})</h3>
            {network.members && network.members.length > 0 ? (
              network.members.map((member: any) => (
                <div key={member.id} className="member-item">
                  <strong>{member.firstName} {member.lastName}</strong> - {member.role}
                  <br />
                  <small>{member.email}</small>
                  {member.phone && <div>Phone: {member.phone}</div>}
                </div>
              ))
            ) : (
              <p>No members yet. Share your invite code to add members.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Network;

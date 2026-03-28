import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Network: React.FC = () => {
  const [network, setNetwork] = useState<any>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
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

  return (
    <Layout title="Network Management">
      {message && <div className="card" style={{ background: '#e6fffa', color: '#276749' }}>{message}</div>}
      
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
          <p><strong>Invite Code:</strong> <code>{network.inviteCode}</code></p>
          <p>Share this code with others to join your network</p>
          
          <h3>Members:</h3>
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
    </Layout>
  );
};

export default Network;
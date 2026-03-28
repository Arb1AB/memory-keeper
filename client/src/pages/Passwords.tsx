import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Passwords: React.FC = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState<any[]>([]);
  const [newPassword, setNewPassword] = useState({ serviceName: '', username: '', passwordEncrypted: '', notes: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/info/passwords', { headers: { Authorization: `Bearer ${token}` } });
      setPasswords(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/info/passwords', newPassword, { headers: { Authorization: `Bearer ${token}` } });
      setNewPassword({ serviceName: '', username: '', passwordEncrypted: '', notes: '' });
      fetchPasswords();
    } catch (err) { alert('Error'); }
  };

  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login'); };
  const downloadPacket = () => { const token = localStorage.getItem('token'); if (token) window.open(`/api/packet/emergency-packet?token=${token}`, '_blank'); };

  return (
    <div>
      <div className="nav">
        <a href="/dashboard">Dashboard</a><a href="/network">Network</a><a href="/medical">Medical</a>
        <a href="/insurance">Insurance</a><a href="/passwords">Credentials</a><a href="/wishes">Wishes</a>
        <a href="/checkins">Check-Ins</a>
        <button onClick={downloadPacket} className="btn btn-success">Emergency Packet</button>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
      <div className="container">
        <h1>Credentials</h1>
        <div className="card">
          <h3>Add New</h3>
          <form onSubmit={handleSubmit}>
            <input placeholder="Service Name" value={newPassword.serviceName} onChange={(e) => setNewPassword({...newPassword, serviceName: e.target.value})} required />
            <input placeholder="Username" value={newPassword.username} onChange={(e) => setNewPassword({...newPassword, username: e.target.value})} />
            <input placeholder="Password" value={newPassword.passwordEncrypted} onChange={(e) => setNewPassword({...newPassword, passwordEncrypted: e.target.value})} required />
            <textarea placeholder="Notes" value={newPassword.notes} onChange={(e) => setNewPassword({...newPassword, notes: e.target.value})} />
            <button type="submit" className="btn">Save</button>
          </form>
        </div>
        <div className="card">
          <h3>Saved Credentials</h3>
          {passwords.map((pwd) => (
            <div key={pwd.id} className="member-item">
              <strong>{pwd.serviceName}</strong><br />
              Username: {pwd.username}<br />
              Password: {pwd.passwordEncrypted}
              {pwd.notes && <div>Notes: {pwd.notes}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Passwords;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckIns: React.FC = () => {
  const navigate = useNavigate();
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [newCheckIn, setNewCheckIn] = useState({ title: '', description: '', frequency: 'daily', scheduledTime: '09:00' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchCheckIns();
  }, []);

  const fetchCheckIns = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/checkins', { headers: { Authorization: `Bearer ${token}` } });
      setCheckIns(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/checkins', newCheckIn, { headers: { Authorization: `Bearer ${token}` } });
      setNewCheckIn({ title: '', description: '', frequency: 'daily', scheduledTime: '09:00' });
      fetchCheckIns();
    } catch (err) { alert('Error'); }
  };

  const respondToCheckIn = async (id: number, response: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`/api/checkins/${id}/respond`, { response }, { headers: { Authorization: `Bearer ${token}` } });
      fetchCheckIns();
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
        <h1>Check-Ins</h1>
        <div className="card">
          <h3>Create New Check-In</h3>
          <form onSubmit={handleSubmit}>
            <input placeholder="Title" value={newCheckIn.title} onChange={(e) => setNewCheckIn({...newCheckIn, title: e.target.value})} required />
            <textarea placeholder="Description" value={newCheckIn.description} onChange={(e) => setNewCheckIn({...newCheckIn, description: e.target.value})} />
            <select value={newCheckIn.frequency} onChange={(e) => setNewCheckIn({...newCheckIn, frequency: e.target.value})}>
              <option value="daily">Daily</option><option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option><option value="once">Once</option>
            </select>
            <input type="time" value={newCheckIn.scheduledTime} onChange={(e) => setNewCheckIn({...newCheckIn, scheduledTime: e.target.value})} />
            <button type="submit" className="btn">Create</button>
          </form>
        </div>
        <div className="card">
          <h3>Check-Ins</h3>
          {checkIns.map((check) => (
            <div key={check.id} className="member-item">
              <strong>{check.title}</strong> - {check.frequency}<br />
              {check.description}<br />
              Status: {check.status}
              {check.status === 'pending' && (
                <div>
                  <button onClick={() => respondToCheckIn(check.id, 'Yes')} className="btn btn-success">Yes</button>
                  <button onClick={() => respondToCheckIn(check.id, 'No')} className="btn btn-danger">No</button>
                </div>
              )}
              {check.response && <div>Response: {check.response}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CheckIns;

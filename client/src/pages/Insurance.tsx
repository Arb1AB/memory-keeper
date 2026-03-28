import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Insurance: React.FC = () => {
  const navigate = useNavigate();
  const [insurance, setInsurance] = useState({ provider: '', policyNumber: '', groupNumber: '', memberId: '', phone: '', notes: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchInsurance();
  }, []);

  const fetchInsurance = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/info/insurance', { headers: { Authorization: `Bearer ${token}` } });
      setInsurance(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('/api/info/insurance', insurance, { headers: { Authorization: `Bearer ${token}` } });
      alert('Saved!');
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
        <h1>Insurance Information</h1>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <label>Provider</label><input value={insurance.provider} onChange={(e) => setInsurance({...insurance, provider: e.target.value})} />
            <label>Policy Number</label><input value={insurance.policyNumber} onChange={(e) => setInsurance({...insurance, policyNumber: e.target.value})} />
            <label>Group Number</label><input value={insurance.groupNumber} onChange={(e) => setInsurance({...insurance, groupNumber: e.target.value})} />
            <label>Member ID</label><input value={insurance.memberId} onChange={(e) => setInsurance({...insurance, memberId: e.target.value})} />
            <label>Insurance Phone</label><input value={insurance.phone} onChange={(e) => setInsurance({...insurance, phone: e.target.value})} />
            <label>Notes</label><textarea rows={3} value={insurance.notes} onChange={(e) => setInsurance({...insurance, notes: e.target.value})} />
            <button type="submit" className="btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Insurance;

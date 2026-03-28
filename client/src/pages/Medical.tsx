import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Medical: React.FC = () => {
  const navigate = useNavigate();
  const [medical, setMedical] = useState({ conditions: '', allergies: '', medications: '', bloodType: '', primaryDoctor: '', doctorPhone: '', emergencyNotes: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchMedical();
  }, []);

  const fetchMedical = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/info/medical', { headers: { Authorization: `Bearer ${token}` } });
      setMedical(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('/api/info/medical', medical, { headers: { Authorization: `Bearer ${token}` } });
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
        <h1>Medical Information</h1>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <label>Conditions</label><textarea rows={3} value={medical.conditions} onChange={(e) => setMedical({...medical, conditions: e.target.value})} />
            <label>Allergies</label><textarea rows={3} value={medical.allergies} onChange={(e) => setMedical({...medical, allergies: e.target.value})} />
            <label>Medications</label><textarea rows={3} value={medical.medications} onChange={(e) => setMedical({...medical, medications: e.target.value})} />
            <label>Blood Type</label><input value={medical.bloodType} onChange={(e) => setMedical({...medical, bloodType: e.target.value})} />
            <label>Primary Doctor</label><input value={medical.primaryDoctor} onChange={(e) => setMedical({...medical, primaryDoctor: e.target.value})} />
            <label>Doctor Phone</label><input value={medical.doctorPhone} onChange={(e) => setMedical({...medical, doctorPhone: e.target.value})} />
            <label>Emergency Notes</label><textarea rows={3} value={medical.emergencyNotes} onChange={(e) => setMedical({...medical, emergencyNotes: e.target.value})} />
            <button type="submit" className="btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Medical;

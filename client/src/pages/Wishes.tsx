import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wishes: React.FC = () => {
  const navigate = useNavigate();
  const [wishes, setWishes] = useState<any[]>([]);
  const [newWish, setNewWish] = useState({ title: '', description: '', category: 'personal' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/info/wishes', { headers: { Authorization: `Bearer ${token}` } });
      setWishes(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/info/wishes', newWish, { headers: { Authorization: `Bearer ${token}` } });
      setNewWish({ title: '', description: '', category: 'personal' });
      fetchWishes();
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
        <h1>Wishes</h1>
        <div className="card">
          <h3>Add New Wish</h3>
          <form onSubmit={handleSubmit}>
            <input placeholder="Title" value={newWish.title} onChange={(e) => setNewWish({...newWish, title: e.target.value})} required />
            <textarea placeholder="Description" value={newWish.description} onChange={(e) => setNewWish({...newWish, description: e.target.value})} />
            <select value={newWish.category} onChange={(e) => setNewWish({...newWish, category: e.target.value})}>
              <option value="funeral">Funeral</option><option value="medical">Medical</option>
              <option value="estate">Estate</option><option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
            <button type="submit" className="btn">Save</button>
          </form>
        </div>
        <div className="card">
          <h3>Saved Wishes</h3>
          {wishes.map((wish) => (
            <div key={wish.id} className="member-item">
              <strong>{wish.title}</strong> ({wish.category})<br />
              {wish.description}<br />
              Status: {wish.isCompleted ? 'Completed' : 'Pending'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Wishes;

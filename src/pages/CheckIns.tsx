import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const CheckIns: React.FC = () => {
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [newCheckIn, setNewCheckIn] = useState({ title: '', description: '', frequency: 'daily', scheduledTime: '09:00' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCheckIns();
  }, []);

  const fetchCheckIns = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/checkins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCheckIns(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/checkins', newCheckIn, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewCheckIn({ title: '', description: '', frequency: 'daily', scheduledTime: '09:00' });
      fetchCheckIns();
    } catch (err) {
      alert('Error creating check-in');
    }
  };

  const respondToCheckIn = async (id: number, response: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`/api/checkins/${id}/respond`, { response }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCheckIns();
    } catch (err) {
      alert('Error responding');
    }
  };

  return (
    <Layout title="Check-Ins">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Check-In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Title *</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Did Mom take her meds?"
              value={newCheckIn.title}
              onChange={(e) => setNewCheckIn({...newCheckIn, title: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Additional details"
              value={newCheckIn.description}
              onChange={(e) => setNewCheckIn({...newCheckIn, description: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Frequency</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newCheckIn.frequency}
                onChange={(e) => setNewCheckIn({...newCheckIn, frequency: e.target.value})}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="once">Once</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Time</label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newCheckIn.scheduledTime}
                onChange={(e) => setNewCheckIn({...newCheckIn, scheduledTime: e.target.value})}
              />
            </div>
          </div>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition font-medium">
            Create Check-In
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Check-Ins</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : checkIns.length === 0 ? (
          <p className="text-gray-500">No check-ins created yet. Create your first check-in above.</p>
        ) : (
          <div className="space-y-4">
            {checkIns.map((check) => (
              <div key={check.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{check.title}</h3>
                    <p className="text-sm text-gray-500">Frequency: {check.frequency} | Time: {check.scheduledTime || 'Anytime'}</p>
                    {check.description && <p className="text-gray-600 mt-1">{check.description}</p>}
                    <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                      check.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      Status: {check.status}
                    </span>
                    {check.response && <p className="text-sm text-gray-500 mt-2">Response: {check.response}</p>}
                  </div>
                  {check.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => respondToCheckIn(check.id, 'Yes')}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        ✓ Yes
                      </button>
                      <button
                        onClick={() => respondToCheckIn(check.id, 'No')}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        ✗ No
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CheckIns;
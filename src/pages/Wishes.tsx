import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<any[]>([]);
  const [newWish, setNewWish] = useState({ title: '', description: '', category: 'personal' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/info/wishes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishes(res.data);
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
      await axios.post('/api/info/wishes', newWish, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewWish({ title: '', description: '', category: 'personal' });
      fetchWishes();
    } catch (err) {
      alert('Error saving');
    }
  };

  return (
    <Layout title="Wishes & Preferences">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Wish</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Title *</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Funeral wishes, Legacy plan"
              value={newWish.title}
              onChange={(e) => setNewWish({...newWish, title: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Details about this wish"
              value={newWish.description}
              onChange={(e) => setNewWish({...newWish, description: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newWish.category}
              onChange={(e) => setNewWish({...newWish, category: e.target.value})}
            >
              <option value="funeral">Funeral</option>
              <option value="medical">Medical</option>
              <option value="estate">Estate</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition font-medium">
            Save Wish
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Wishes</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : wishes.length === 0 ? (
          <p className="text-gray-500">No wishes saved yet. Add your first wish above.</p>
        ) : (
          <div className="space-y-4">
            {wishes.map((wish) => (
              <div key={wish.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{wish.title}</h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mt-1">
                      {wish.category}
                    </span>
                    {wish.description && (
                      <p className="text-gray-600 mt-2">{wish.description}</p>
                    )}
                    <p className="text-sm text-gray-400 mt-2">
                      Status: {wish.isCompleted ? 'Completed ✓' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishes;
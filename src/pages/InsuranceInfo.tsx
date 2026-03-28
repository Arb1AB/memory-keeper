import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const InsuranceInfo: React.FC = () => {
  const [insurance, setInsurance] = useState({
    provider: '',
    policyNumber: '',
    groupNumber: '',
    memberId: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    fetchInsurance();
  }, []);

  const fetchInsurance = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/info/insurance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInsurance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('/api/info/insurance', insurance, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Insurance info saved!');
    } catch (err) {
      alert('Error saving');
    }
  };

  return (
    <Layout title="Insurance Information">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Provider</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={insurance.provider}
              onChange={(e) => setInsurance({...insurance, provider: e.target.value})}
              placeholder="Insurance company name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Policy Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={insurance.policyNumber}
              onChange={(e) => setInsurance({...insurance, policyNumber: e.target.value})}
              placeholder="Policy number"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Group Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={insurance.groupNumber}
              onChange={(e) => setInsurance({...insurance, groupNumber: e.target.value})}
              placeholder="Group number"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Member ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={insurance.memberId}
              onChange={(e) => setInsurance({...insurance, memberId: e.target.value})}
              placeholder="Member ID"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Insurance Phone</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={insurance.phone}
              onChange={(e) => setInsurance({...insurance, phone: e.target.value})}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Notes</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={insurance.notes}
              onChange={(e) => setInsurance({...insurance, notes: e.target.value})}
              placeholder="Additional notes"
            />
          </div>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition font-medium">
            Save Insurance Info
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default InsuranceInfo;
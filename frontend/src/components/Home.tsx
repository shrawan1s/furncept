import React from 'react';
import PackingList from './PackingList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
      <div className="w-full mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full">
          <h3 className="text-3xl font-bold text-gray-800">Dashboard</h3>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md">
            Generate Report
          </button>
        </div>
      </div>
      <PackingList />
    </div>
  );
};

export default Home;

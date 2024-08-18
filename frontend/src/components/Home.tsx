import React from 'react';
import { Link } from 'react-router-dom';
import PackingList from './PackingList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen mt-16">
      <div className="w-full mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full">
          <h3 className="text-3xl font-bold text-gray-800">Dashboard</h3>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md">
            Generate Report
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link
            to="/createCustomer"
            className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-md text-center"
          >
            Create Customer
          </Link>
          <Link
            to="/addData"
            className="w-full md:w-auto px-6 py-3 bg-green-500 text-white font-semibold rounded-md text-center"
          >
            Add Data
          </Link>
        </div>
      </div>
      <PackingList />
    </div>
  );
};

export default Home;

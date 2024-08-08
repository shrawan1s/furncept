import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Home Page</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <Link
          to="/addHeader"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Header Form
        </Link>
        <Link
          to="/addDataForm"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Data Form
        </Link>
      </div>
    </div>
  );
};

export default Home;

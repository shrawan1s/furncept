import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PackingDataForm from './components/PackingDataForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Customer from './components/CustomerCompo';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<SigninForm />} />
        <Route path='/Signup' element={<SignupForm />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ResetPassword/:resetToken' element={<ResetPassword />} />

        {/* Private Routes */}
        <Route path="/Home" element={<ProtectedRoute component={Home} />} />
        <Route path="/createCustomer" element={<ProtectedRoute component={Customer} />} />
        <Route path="/addData" element={<ProtectedRoute component={PackingDataForm} />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;

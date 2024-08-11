import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import HeaderForm from './components/HeaderForm';
import AddDataForm from './components/AddDataForm';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<SigninForm />} />
        <Route path='/Signup' element={<SignupForm />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ResetPassword/:resetToken' element={<ResetPassword />} />
        <Route path="/Home" element={<ProtectedRoute component={Home} />} />
        <Route path="/addHeader" element={<ProtectedRoute component={HeaderForm} />} />
        <Route path="/addDataForm" element={<ProtectedRoute component={AddDataForm} fieldCount={0} />} />
      </Routes>
    </>
  );
};

export default App;

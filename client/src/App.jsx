import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SwapLanding from './SwapLanding';
import Login from './Login';
import SignUp from './SignUp';
import ProfileSetup from './ProfileSetup';
import UserProfile from './UserProfile';
import SwapRequest from './SwapRequest';
import SwapRequestsList from './SwapRequestsList';
import NavBar from './NavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [profileComplete, setProfileComplete] = useState(false);

  function LoginPage() {
    const navigate = useNavigate();
    return <Login onLogin={(user) => { setIsLoggedIn(true); navigate('/profile-setup'); }} />;
  }
  function SignUpPage() {
    const navigate = useNavigate();
    return <SignUp onSignUp={(user) => { setIsLoggedIn(true); navigate('/profile-setup'); }} />;
  }
  function ProfileSetupPage() {
    const navigate = useNavigate();
    return <ProfileSetup onSave={() => { setProfileComplete(true); navigate('/'); }} />;
  }

  function ProtectedRoute({ children }) {
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (!profileComplete) return <Navigate to="/profile-setup" />;
    return children;
  }

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to={profileComplete ? '/' : '/profile-setup'} /> : <LoginPage />
        } />
        <Route path="/signup" element={
          isLoggedIn ? <Navigate to={profileComplete ? '/' : '/profile-setup'} /> : <SignUpPage />
        } />
        <Route path="/profile-setup" element={
          !isLoggedIn ? <Navigate to="/login" /> : profileComplete ? <Navigate to="/" /> : <ProfileSetupPage />
        } />
        <Route path="/profile" element={
          <ProtectedRoute><UserProfile /></ProtectedRoute>
        } />
        <Route path="/swap-request/:userId" element={
          <ProtectedRoute><SwapRequest /></ProtectedRoute>
        } />
        <Route path="/swap-requests" element={
          <ProtectedRoute><SwapRequestsList /></ProtectedRoute>
        } />
        <Route path="/" element={
          <SwapLanding isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        } />
      </Routes>
    </Router>
  );
}

export default App;

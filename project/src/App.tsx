import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import CoursePage from '@/components/CoursePage';
import LessonPage from '@/components/LessonPage';

function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user has already entered their name
    const savedName = localStorage.getItem('devTatawiUser');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleStart = (name: string) => {
    setUserName(name);
    localStorage.setItem('devTatawiUser', name);
  };

  const handleBackToLanding = () => {
    setUserName('');
    localStorage.removeItem('devTatawiUser');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route 
            index
            element={
              userName ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LandingPage onStart={handleStart} />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              userName ? (
                <Dashboard userName={userName} onBackToLanding={handleBackToLanding} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/course/:courseId" 
            element={
              userName ? (
                <CoursePage />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/lesson/:courseId/:lessonId" 
            element={
              userName ? (
                <LessonPage />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
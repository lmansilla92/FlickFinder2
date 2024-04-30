import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import App from './App';
import Error from './pages/Error';
import Results from './components/Results';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import CurrentMovie from './components/CurrentMovie';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile'; 
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="results" element={<Results />} />
        <Route path="results/:id" element={<CurrentMovie />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </Router>
);

reportWebVitals();
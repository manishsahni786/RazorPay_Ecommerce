import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './App.css';
import { AuthProvider } from './context/AuthContext';

// Create a root element using createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AuthProvider>
      {/* Add CartProvider here if necessary */}
      <App />
    </AuthProvider>
  </Router>
);

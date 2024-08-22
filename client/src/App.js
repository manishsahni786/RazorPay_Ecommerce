import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import RazorpayPayment from './components/RazorpayPayment';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext'; // Import AuthContext
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user, logout } = useContext(AuthContext); // Get user and logout function from AuthContext
  const navigate = useNavigate();

  const products = [
    { name: 'Shirt', amount: 50000 },
    { name: 'Shoe', amount: 200000 },
    { name: 'Suit', amount: 1500000 },
    { name: 'Blue Jeans', amount: 70000 },
    { name: 'Jacket', amount: 120000 },
    { name: 'Lehenga', amount: 2500000 },
    { name: 'T-shirt', amount: 30000 },
  ];

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    navigate('/payment'); // Navigate to the payment page
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
    navigate('/'); // Navigate back to the home page
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to Manish's Store 🛒</h1>
        <div className="auth-buttons">
          {!user ? (
            <>
              <button className="signup-button" onClick={() => navigate('/signup')}>Signup</button>
              <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            </>
          ) : (
            <div className="user-info">
              <span>{user.name} ({user.email})</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        {selectedProduct && <button className="back-button" onClick={handleBackClick}>Back to Home</button>}
      </header>

      <Routes>
        <Route path="/" element={
          <div className="product-list">
            <h2>Products</h2>
            {products.map((product, index) => (
              <div 
                className={`product-card ${selectedProduct && selectedProduct.name === product.name ? 'active' : ''}`} 
                key={index}
              >
                <h3>{product.name}</h3>
                <p className="price">₹{product.amount / 100}</p>
                <button className="buy-button" onClick={() => handleBuyClick(product)}>
                  Buy {product.name}
                </button>
              </div>
            ))}
          </div>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={
          <RazorpayPayment 
            productName={selectedProduct?.name} 
            amount={selectedProduct?.amount} 
          />
        } />
      </Routes>
    </div>
  );
}

export default App;

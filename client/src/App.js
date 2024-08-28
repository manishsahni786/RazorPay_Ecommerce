import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import RazorpayPayment from './components/RazorpayPayment';
import Signup from './components/Signup';
import Login from './components/Login';
import RecoverPassword from './components/RecoverPassword';
import Sidebar from './components/Sidebar';
import { AuthContext } from './context/AuthContext'; // Import AuthContext
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('/');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user, logout } = useContext(AuthContext); // Get user and logout function from AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current route

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    navigate(`/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`);
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    navigate('/payment'); // Navigate to the payment page
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
    navigate('/'); // Navigate back to the home page
  };

  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate('/login'); // Redirect to the login page
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
        {(location.pathname !== '/login' && location.pathname !== '/signup') && user && (
          <button className="back-button" onClick={handleBackClick}>Home</button>
        )}
      </header>

      <div className="main-content">
        {location.pathname === '/' ? (
          <>
            <Sidebar 
              categories={categories.map(cat => cat.name)} // Render category names from state
              selectedCategory={selectedCategory} 
              onCategoryClick={handleCategoryClick} 
            />
            <div className="product-section">
              <h2>Select a category to view products.</h2>
              <div className="intro-section">
                <p className="intro-text">
                  Welcome to Manish's Store! Explore a wide range of products across various categories.
                  Whether you're looking for the latest electronics, stylish fashion, or home essentials,
                  Manish's Store has it all. Start shopping today and enjoy exclusive deals and discounts!
                </p>
              </div>
            </div>
          </>
        ) : (
          location.pathname.startsWith('/category/') ? (
            <div className="product-section">
              <h2>{selectedCategory} Products</h2>
              <div className="product-list">
                {categories.find(cat => cat.name === selectedCategory)?.products.map((product, index) => (
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
            </div>
          ) : null
        )}

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/payment" element={
            <RazorpayPayment 
              productName={selectedProduct?.name} 
              amount={selectedProduct?.amount} 
            />
          } />
          {categories.map(category => (
            <Route 
              key={category.name}
              path={`/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
              element={
                <div className="product-section">
                  <h2>{category.name} Products</h2>
                  <div className="product-list">
                    {category.products.map((product, index) => (
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
                </div>
              } 
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;

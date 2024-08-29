import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import RazorpayPayment from './components/RazorpayPayment';
import Signup from './components/Signup';
import Login from './components/Login';
import RecoverPassword from './components/RecoverPassword';
import Sidebar from './components/Sidebar';
import Cart from './components/Cart';
import { AuthContext } from './context/AuthContext';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('/');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load cart items from local storage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

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

  useEffect(() => {
    // Save cart items to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    navigate(`/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`);
  };

  const handleAddToCart = (product) => {
    const productInCart = cart.find(item => item.name === product.name);

    if (productInCart) {
      setCart(cart.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter(item => item.name !== product.name));
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    navigate('/payment');
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
    navigate('/');
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
          {user && (
            <div className="cart-container">
              <button className="cart-button" onClick={() => navigate('/cart')}>
                🛒
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </button>
            </div>
          )}
          {!user ? (
            <>
              <button className="signup-button" onClick={() => navigate('/signup')}>Signup</button>
              <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            </>
          ) : (
            <div className="user-info">
              <span className="user-email">{user.name} ({user.email})</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
          {(location.pathname !== '/login' && location.pathname !== '/signup') && user && (
            <button className="back-button" onClick={handleBackClick}>Home</button>
          )}
        </div>
      </header>

      <div className="main-content">
        {location.pathname === '/' ? (
          <>
            <Sidebar 
              categories={categories.map(cat => cat.name)}
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
                    <span className="cart-icon" onClick={() => handleAddToCart(product)}>
                     🛒
                    </span>
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
          <Route path="/cart" element={<Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onBuyClick={handleBuyClick} />} />
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
                        <span className="cart-icon" onClick={() => handleAddToCart(product)}>
                          🛒
                        </span>
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

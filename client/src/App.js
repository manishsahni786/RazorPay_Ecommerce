import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import RazorpayPayment from './components/RazorpayPayment';
import Signup from './components/Signup';
import Login from './components/Login';
import RecoverPassword from './components/RecoverPassword';
import Sidebar from './components/Sidebar';
import Cart from './components/Cart';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import MostPopularProducts from './components/MostPopularProducts';
import { AuthContext } from './context/AuthContext';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('/');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { user, authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/catgories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (authToken) {
        try {
          const response = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          console.log('Cart data:', response.data.items); // Check data here
          setCart(response.data.items || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };
    fetchCart();
  }, [authToken]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    navigate(`/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`);
  };

  const handleAddToCart = async (product) => {
    if (!product || !product._id) {
      console.error('Invalid product:', product);
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
  
      // Fetch the updated cart after adding the product
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const handleRemoveFromCart = async (item) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/items/${item._id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      // Fetch the updated cart after removing the product
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
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

  const userMenu = (
    <Menu>
      <Menu.Item key="orders" onClick={() => navigate('/orders')}>
        Orders
      </Menu.Item>
    </Menu>
  );

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
            <div className="user-dropdown-container">
              <Dropdown overlay={userMenu} trigger={['click']}>
                <Button className="user-info">
                  {user.email} <DownOutlined />
                </Button>
              </Dropdown>
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
                <div>
                  {/* <MostPopularProducts/> */}
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
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
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

import React, { useState, useContext } from 'react';
import { BrowserRouter as  Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import RazorpayPayment from './components/RazorpayPayment';
import Signup from './components/Signup';
import Login from './components/Login';
import RecoverPassword from './components/RecoverPassword';
import Sidebar from './components/Sidebar';
import { AuthContext } from './context/AuthContext'; // Import AuthContext
import './App.css';


function App() {
  const [selectedCategory, setSelectedCategory] = useState('/');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user, logout } = useContext(AuthContext); // Get user and logout function from AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current route

  const categories = {
    Fashion:[
      { "name": "Shirt", "amount": 150000 },
      { "name": "Jeans", "amount": 2000 },
      { "name": "Jacket", "amount": 3000 },
      { "name": "Dress", "amount": 2500 },
      { "name": "Shoes", "amount": 3500 },
      { "name": "Hat", "amount": 800 },
      { "name": "Sunglasses", "amount": 1200 },
      { "name": "Belt", "amount": 900 },
      { "name": "Scarf", "amount": 700 },
      { "name": "Gloves", "amount": 600 },
      { "name": "Sweater", "amount": 2000 },
      { "name": "T-shirt", "amount": 1000 },
      { "name": "Shorts", "amount": 1200 },
      { "name": "Skirt", "amount": 1500 },
      { "name": "Suit", "amount": 5000 },
      { "name": "Blazer", "amount": 3000 },
      { "name": "Cardigan", "amount": 1800 },
      { "name": "Poncho", "amount": 2200 },
      { "name": "Boots", "amount": 4000 },
      { "name": "Sandals", "amount": 1200 },
      { "name": "Watch", "amount": 2500 }
    ],
    "Electronics": [
    { "name": "Smartphone", "amount": 70000 },
    { "name": "Laptop", "amount": 150000 },
    { "name": "Headphones", "amount": 20000 },
    { "name": "Smartwatch", "amount": 25000 },
    { "name": "Tablet", "amount": 30000 },
    { "name": "Camera", "amount": 60000 },
    { "name": "Bluetooth Speaker", "amount": 8000 },
    { "name": "External Hard Drive", "amount": 10000 },
    { "name": "Smart TV", "amount": 50000 },
    { "name": "Printer", "amount": 15000 },
    { "name": "Projector", "amount": 25000 },
    { "name": "Microphone", "amount": 7000 },
    { "name": "Keyboard", "amount": 2000 },
    { "name": "Mouse", "amount": 1500 },
    { "name": "Router", "amount": 3000 },
    { "name": "Smart Home Hub", "amount": 12000 },
    { "name": "Gaming Console", "amount": 35000 },
    { "name": "VR Headset", "amount": 40000 },
    { "name": "Action Camera", "amount": 25000 },
    { "name": "Drone", "amount": 80000 },
    { "name": "Electric Toothbrush", "amount": 5000 }
  ],
  "Groceries": [
    { "name": "Rice", "amount": 1000 },
    { "name": "Wheat Flour", "amount": 800 },
    { "name": "Cooking Oil", "amount": 1200 },
    { "name": "Pulses", "amount": 700 },
    { "name": "Sugar", "amount": 500 },
    { "name": "Tea", "amount": 300 },
    { "name": "Salt", "amount": 100 },
    { "name": "Spices", "amount": 400 },
    { "name": "Coffee", "amount": 600 },
    { "name": "Milk", "amount": 800 },
    { "name": "Butter", "amount": 250 },
    { "name": "Cheese", "amount": 400 },
    { "name": "Bread", "amount": 100 },
    { "name": "Eggs", "amount": 150 },
    { "name": "Yogurt", "amount": 200 },
    { "name": "Noodles", "amount": 300 },
    { "name": "Tomato Sauce", "amount": 150 },
    { "name": "Ketchup", "amount": 180 },
    { "name": "Juice", "amount": 250 },
    { "name": "Cereal", "amount": 500 },
    { "name": "Chocolate", "amount": 200 }
  ],
    "Books": [
    { "name": "The Great Gatsby", "amount": 800 },
    { "name": "1984", "amount": 700 },
    { "name": "To Kill a Mockingbird", "amount": 850 },
    { "name": "Moby Dick", "amount": 900 },
    { "name": "War and Peace", "amount": 1000 },
    { "name": "Pride and Prejudice", "amount": 750 },
    { "name": "The Catcher in the Rye", "amount": 850 },
    { "name": "The Hobbit", "amount": 950 },
    { "name": "The Alchemist", "amount": 800 },
    { "name": "The Lord of the Rings", "amount": 1200 },
    { "name": "Jane Eyre", "amount": 900 },
    { "name": "Brave New World", "amount": 850 },
    { "name": "The Odyssey", "amount": 1000 },
    { "name": "Fahrenheit 451", "amount": 750 },
    { "name": "Catch-22", "amount": 950 },
    { "name": "Little Women", "amount": 800 },
    { "name": "Great Expectations", "amount": 900 },
    { "name": "Les Misérables", "amount": 1200 },
    { "name": "Wuthering Heights", "amount": 850 },
    { "name": "The Picture of Dorian Gray", "amount": 750 },
    { "name": "Dracula", "amount": 850 }
  ],
  "Sports & Outdoors": [
    { "name": "Tennis Racket", "amount": 5000 },
    { "name": "Yoga Mat", "amount": 1500 },
    { "name": "Basketball", "amount": 2500 },
    { "name": "Running Shoes", "amount": 3000 },
    { "name": "Camping Tent", "amount": 6000 },
    { "name": "Fishing Rod", "amount": 4000 },
    { "name": "Soccer Ball", "amount": 2000 },
    { "name": "Dumbbells", "amount": 3500 },
    { "name": "Kayak", "amount": 12000 },
    { "name": "Bicycle", "amount": 15000 },
    { "name": "Hiking Boots", "amount": 4000 },
    { "name": "Golf Club", "amount": 8000 },
    { "name": "Tent", "amount": 5000 },
    { "name": "Sleeping Bag", "amount": 3000 },
    { "name": "Wetsuit", "amount": 6000 },
    { "name": "Snowboard", "amount": 10000 },
    { "name": "Skateboard", "amount": 2500 },
    { "name": "Baseball Glove", "amount": 1500 },
    { "name": "Hockey Stick", "amount": 4000 },
    { "name": "Fishing Tackle Box", "amount": 2000 },
    { "name": "Climbing Gear", "amount": 8000 }
  ],
  "Home && Kitchen": [
    { "name": "Mixer Grinder", "amount": 8000 },
    { "name": "Microwave", "amount": 12000 },
    { "name": "Refrigerator", "amount": 30000 },
    { "name": "Dishwasher", "amount": 45000 },
    { "name": "Air Fryer", "amount": 10000 },
    { "name": "Vacuum Cleaner", "amount": 15000 },
    { "name": "Blender", "amount": 6000 },
    { "name": "Coffee Maker", "amount": 3500 },
    { "name": "Toaster", "amount": 2000 },
    { "name": "Electric Kettle", "amount": 1500 },
    { "name": "Rice Cooker", "amount": 2500 },
    { "name": "Slow Cooker", "amount": 3000 },
    { "name": "Washing Machine", "amount": 20000 },
    { "name": "Iron", "amount": 2000 },
    { "name": "Oven", "amount": 12000 },
    { "name": "Air Purifier", "amount": 8000 },
    { "name": "Humidifier", "amount": 3000 },
    { "name": "Dish Rack", "amount": 1500 },
    { "name": "Cutlery Set", "amount": 2000 },
    { "name": "Cookware Set", "amount": 8000 },
    { "name": "Wall Clock", "amount": 1500 }
  ],
  "Personal Care": [
    { "name": "Shampoo", "amount": 100 },
    { "name": "Conditioner", "amount": 120 },
    { "name": "Body Lotion", "amount": 150 },
    { "name": "Toothpaste", "amount": 50 },
    { "name": "Soap", "amount": 30 },
    { "name": "Face Cream", "amount": 200 },
    { "name": "Hand Cream", "amount": 80 },
    { "name": "Body Wash", "amount": 100 },
    { "name": "Sunscreen", "amount": 150 },
    { "name": "Deodorant", "amount": 90 },
    { "name": "Face Mask", "amount": 120 },
    { "name": "Moisturizer", "amount": 180 },
    { "name": "Hair Oil", "amount": 200 },
    { "name": "Lip Balm", "amount": 50 },
    { "name": "Shaving Cream", "amount": 80 },
    { "name": "Aftershave", "amount": 120 },
    { "name": "Nail Polish", "amount": 70 },
    { "name": "Nail Polish Remover", "amount": 60 },
    { "name": "Face Wash", "amount": 100 },
    { "name": "Body Scrub", "amount": 150 },
    { "name": "Foot Cream", "amount": 80 }
  ],
  };

  
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
        categories={categories} 
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
                {categories[selectedCategory]?.map((product, index) => (
                  <div 
                    className={`product-card ${selectedProduct && selectedProduct.name === product.name ? 'active' : ''}`} 
                    key={index}
                  >
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.amount}</p>
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
          <Route  element={<Sidebar />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/payment" element={
            <RazorpayPayment 
              productName={selectedProduct?.name} 
              amount={selectedProduct?.amount} 
            />
          } />
          {Object.keys(categories).map(category => (
            <Route 
              key={category}
              path={`/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
              element={
                <div className="product-section">
                  <h2>{category} Products</h2>
                  <div className="product-list">
                    {categories[category].map((product, index) => (
                      <div 
                        className={`product-card ${selectedProduct && selectedProduct.name === product.name ? 'active' : ''}`} 
                        key={index}
                      >
                        <h3>{product.name}</h3>
                        <p className="price">₹{product.amount/100}</p>
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
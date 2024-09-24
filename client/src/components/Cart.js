import React, { useState, useEffect } from 'react';
import '../App.css';

const Cart = ({ cartItems, onRemoveFromCart, onBuyClick }) => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading process
  useEffect(() => {
    const fetchData = async () => {
      // Simulate loading with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  // Calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => {
    if (item.productId) {
      return acc + (item.productId.amount / 100) * item.quantity;
    }
    return acc; // Skip this item if productId is null
  }, 0).toFixed(2);

  if (loading) {
    return (
      <div className="loading-container">
      <div className="loading-content">
        <p>Loading...</p>
      </div>
    </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              item.productId ? (
                <div className="cart-item" key={index}>
                  <h3>{item.productId.name}</h3>
                  <p className="price">₹{(item.productId.amount / 100).toFixed(2)}</p>
                  <p className="quantity">Quantity: {item.quantity}</p>
                  <div className="button-container">
                    <button className="remove-button" onClick={() => onRemoveFromCart(item)}>Remove</button>
                    <button className="buy-button" onClick={() => onBuyClick(item)}>Buy Now</button>
                  </div>
                </div>
              ) : (
                <div className="cart-item" key={index}>
                  <p>Product information is unavailable. Please remove this item.</p>
                  <button className="remove-button" onClick={() => onRemoveFromCart(item)}>Remove</button>
                </div>
              )
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ₹{totalAmount}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

import React from 'react';
import '../App.css';

const Cart = ({ cartItems, onRemoveFromCart, onBuyClick }) => {
  // Calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.amount / 100) * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <h3>{item.name}</h3>
                <p className="price">₹{(item.amount / 100).toFixed(2)}</p>
                <p className="quantity">Quantity: {item.quantity}</p>
                <div className="button-container">
                  <button className="remove-button" onClick={() => onRemoveFromCart(item)}>Remove</button>
                  <button className="buy-button" onClick={() => onBuyClick(item)}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ₹{totalAmount}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

import React, { useState } from 'react';
import axios from 'axios';

const RazorpayPayment = ({ productName, amount }) => { 
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      // Step 1: Create an order on the server
      const orderUrl = 'http://localhost:5000/api/payment/order';
      const token = localStorage.getItem('authToken');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const orderData = await axios.post(orderUrl, {
        amount,
        email,
        shippingDetails: {
          address,
          city,
          postalCode,
          country,
        },
        product: [{ 
          name: productName,
          price: amount / 100, // Include the price field (in rupees, if amount is in paise)
          quantity: 1 // Assuming a quantity of 1, modify if necessary
        }],
      }, { headers });

      const { amount: orderAmount, id: order_id, currency } = orderData.data;

      if (!order_id || !orderAmount || !currency) {
        throw new Error('Invalid order data received from the server');
      }

      // Step 2: Configure Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderAmount.toString(),
        currency: currency,
        name: "Manish Sahni's Store",
        description: `Payment for ${productName}`,
        order_id: order_id,
        handler: async (response) => {
          try {
            // Step 3: Handle the payment verification on the client side
            const paymentData = {
              razorpay_order_id: order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyUrl = 'http://localhost:5000/api/payment/verify';
            const verifyResult = await axios.post(verifyUrl, paymentData, { headers });

            if (verifyResult.data.success) {
              window.location.href = 'http://localhost:3000';
            } else {
              alert(verifyResult.data.message);
            }
          } catch (verifyError) {
            console.error("Error verifying payment:", verifyError);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Manish Sahni",
          contact: "9999999999"
        },
        theme: {
          color: "#3f51b5" // Apply the theme color from App.css
        },
      };

      // Step 4: Open Razorpay payment UI
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      console.error("Error creating Razorpay order:", error.message);
      alert("Error creating payment order. Please try again.");
    }
  };

  return (
    <div>
      <h3>{productName}</h3>
      <p>Price: ₹{amount / 100}</p>
      <input
        type="email"
        className="payment-input"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="payment-input"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        className="payment-input"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        className="payment-input"
        placeholder="Enter your postal code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <input
        type="text"
        className="payment-input"
        placeholder="Enter your country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button className="buy-button" onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Buy Now'}
      </button>
    </div>
  );
};

export default RazorpayPayment;
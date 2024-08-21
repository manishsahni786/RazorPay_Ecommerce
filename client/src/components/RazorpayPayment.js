import React from 'react';
import axios from 'axios';
import '../App.css'; // Ensure this file is in the correct path

const RazorpayPayment = ({ productName, amount }) => {

  const handlePayment = async () => {
    try {
      // Step 1: Create an order on the server
      const orderUrl = 'http://localhost:5000/api/payment/order';
      const orderData = await axios.post(orderUrl, { amount }); // Amount in paise
      const { amount: orderAmount, id: order_id, currency } = orderData.data;

      // Step 2: Configure Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay API key
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
            const result = await axios.post(verifyUrl, paymentData);

            if (result.data.success) {
              // Redirect to homepage or another page
              window.location.href = 'http://localhost:3000';
            } else {
              alert(result.data.message);
            }
          } catch (verifyError) {
            console.error("Error verifying payment:", verifyError);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Manish Sahni",
          email: "manishsahni111@example.com",
          contact: "9855887694"
        },
        theme: {
          color: "#3f51b5" // Apply the theme color from App.css
        },
      };

      // Step 4: Open Razorpay payment UI
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Error creating payment order. Please try again.");
    }
  };

  return (
    <div>
      <h3>{productName}</h3>
      <p>Price: ₹{amount / 100}</p>
      <button className="buy-button" onClick={handlePayment}>
        Buy Now
      </button>
    </div>
  );
};

export default RazorpayPayment;

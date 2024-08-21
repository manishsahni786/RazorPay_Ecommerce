import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleBuy = async (product) => {
    const { data: order } = await axios.post('/api/payment/order', { amount: product.price });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'MERN Payment App',
      description: `Purchase ${product.name}`,
      order_id: order.id,
      handler: (response) => {
        // Handle successful payment
        console.log('Payment successful:', response);
      },
      prefill: {
        name: 'Manish Sahni',
        email: 'manish@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button onClick={() => handleBuy(product)}>Buy Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

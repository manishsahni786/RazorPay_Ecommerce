import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../App.css';
const MostPopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const categories = ['Fashion', 'Electronics'];
        const allProducts = [];

        for (const category of categories) {
          const response = await axios.get(`http://localhost:5000/api/categories/${category}`);
          console.log('Fetched products:', response.data.products);
          if (response.data.products) {
            allProducts.push(...response.data.products);
          }
        }

        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  console.log('Products state:', products); // Debugging line to check products state

  return (
    <div className="most-popular-products">
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">${product.amount}</p>
              <button className="buy-button">Buy</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No popular products available.</p>
      )}
    </div>
  );
};


export default MostPopularProducts;

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                
                if (response.data && response.data.length > 0) {
                    setOrders(response.data);
                } else {
                    console.log('No orders found for the user.');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        if (authToken) {
            fetchOrders();
        }
    }, [authToken]);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="order-list">
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id} className="order-card">
                        <h3>Order #{order._id}</h3>
                        <div className="products-list">
                            {order.product.map((product, index) => (
                                <div key={index} className="product-item">
                                    <p><strong>Product Name:</strong> {product.name}</p>
                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <p><strong>Total Amount:</strong> ₹{order.amount / 100}</p> {/* Razorpay stores amounts in paise */}
                        <p><strong>Status:</strong> {order.orderStatus}</p>
                        
                        <Link to={`/orders/${order._id}`} className="view-order-details">
                            View Order Details
                        </Link>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

export default OrderList;

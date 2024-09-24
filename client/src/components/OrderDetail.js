import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}` // Include authToken if required
                    }
                });
                setOrder(response.data);
                console.log('Order Data:', response.data); // Inspect data
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('Failed to load order details');
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!order) return <p>Order not found</p>;

    return (
        <div className="order-detail">
            <h2>Order #{order._id}</h2>

            {/* Check if orderDate exists and format it */}
            <p>Order Date: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'Date not available'}</p>

            <p>Status: {order.orderStatus}</p>
            
            <h3>Shipping Details</h3>
            <p>{order.shippingDetails.address}</p>
            <p>{order.shippingDetails.city}, {order.shippingDetails.postalCode}</p>
            <p>{order.shippingDetails.country}</p>
            
            <h3>Product Ordered</h3>
            {order.product.length > 0 ? ( // Ensure product is accessed consistently as in OrderList
                order.product.map((product, index) => (
                    <div key={index} className="product-detail">
                        <p><strong>Product Name:</strong> {product.name}</p>
                        <p><strong>Quantity:</strong> {product.quantity}</p>
                    </div>
                ))
            ) : (
                <p>No products found for this order.</p>
            )}
            
            <p><strong>Total Amount:</strong> ₹{order.amount / 100}</p> {/* Razorpay stores amounts in paise */}
        </div>
    );
};

export default OrderDetail;

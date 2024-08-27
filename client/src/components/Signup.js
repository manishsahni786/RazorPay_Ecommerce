import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import '../App.css';

const { Title, Text } = Typography;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-form-container" style={{ width: '500px', margin: '0 auto' }}>
      <Title level={2} className="auth-form-title">Create an Account</Title>
      <Text>Sign up to start shopping with us!</Text>
      <Form onSubmitCapture={handleSignup} className="auth-form" layout="vertical" style={{ marginTop: '20px' }}>
        <Form.Item label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Signup</Button>
      </Form>
    </div>
  );
};

export default Signup;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
// import '../App.css';

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const userData = {
        token: res.data.token,
        name: res.data.name,
        email: res.data.email,
      };
      login(res.data.token, userData);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/recover-password');
  };

  return (
    <div className="auth-form-container" style={{ width: '500px', margin: '0 auto' }}>
      <Title level={2} className="auth-form-title">Login</Title>
      <Form onSubmitCapture={handleLogin} className="auth-form" layout="vertical">
        <Form.Item label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Login</Button>
      </Form>
      <Button type="link" onClick={handleForgotPassword} className="auth-forgot-password">
        Forgot Password?
      </Button>
    </div>
  );
};

export default Login;

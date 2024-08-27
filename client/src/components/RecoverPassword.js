import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import '../App.css';
const { Title } = Typography;

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('http://localhost:5000/api/auth/recover-password', { email });
      setMessage('Recovery email sent. Please check your inbox.');
    } catch (err) {
      console.error('Recovery failed:', err);
      setMessage('Recovery failed. Please try again.');
    }
  };

  return (
    <div className="auth-form-container">
      <Title level={2} className="auth-form-title">Recover Password</Title>
      <Form onSubmitCapture={handleRecoverPassword} className="auth-form" layout="vertical">
        <Form.Item label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Recover Password</Button>
      </Form>
      {message && <Typography.Paragraph>{message}</Typography.Paragraph>}
    </div>
  );
};

export default RecoverPassword;

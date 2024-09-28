import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

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
    <Container maxWidth="lg">
      <Box className="custom-container">
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '30px' }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            className="custom-input"
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box className="spacing">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              className="custom-input"
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            className="custom-button"
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          style={{
            color: 'black',
            cursor: 'pointer',
            textAlign: 'center',
            marginTop: '10px',
          }}
          onClick={handleForgotPassword}
          onMouseOver={(e) => e.currentTarget.style.color = '#3f51b5'}
          onMouseOut={(e) => e.currentTarget.style.color = 'black'}
        >
          Forgot Password?
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;

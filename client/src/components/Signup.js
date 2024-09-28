import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

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
    <Container maxWidth="lg">
      <Box className="custom-container">
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '30px' }}>
          Create an Account
        </Typography>
        <form onSubmit={handleSignup}>
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
            Signup
          </Button>
        </form>
        <Typography variant="body2" className="extra-text">
          Already have an account? <a href="/login" style={{ color: '#3f51b5', textDecoration: 'none' }}>Login here</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;

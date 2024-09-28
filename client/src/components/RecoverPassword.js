import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/recover-password', { email });
      setMessage('Recovery email sent. Please check your inbox.');
    } catch (err) {
      console.error('Recovery failed:', err);
      setMessage('Recovery failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box className="custom-container">
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '30px' }}>
          Recover Password
        </Typography>
        <form onSubmit={handleRecoverPassword}>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              className="custom-input"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
          </Box>
          <Button 
            type="submit" 
            variant="contained" 
            className="custom-button"
          >
            Recover Password
          </Button>
        </form>
        {message && (
          <Typography 
            variant="body2" 
            align="center" 
            color="textSecondary" 
            style={{ marginTop: '20px' }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default RecoverPassword;

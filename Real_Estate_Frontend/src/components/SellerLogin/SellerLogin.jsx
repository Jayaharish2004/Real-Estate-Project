import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper, Snackbar, IconButton } from '@mui/material';
import { Close as CloseIcon, Home as HomeIcon } from '@mui/icons-material';
import './SellerLogin.scss'; // Import the CSS file

function SellerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy validation for illustration
    if (email === 'seller@gmail.com' && password === 'propertyowner') {
      localStorage.setItem('sellerAuth', 'true');
      navigate('/seller');
    } else {
      setSnackbarMessage('Invalid credentials');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" className="seller-login-container">
      <IconButton className="home-button" onClick={() => navigate('/')}>
        <HomeIcon fontSize="large" />
      </IconButton>
      <Paper className="login-form">
        <Typography variant="h5" component="h1" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Seller Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            required fullWidth sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required fullWidth sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
}

export default SellerLogin;

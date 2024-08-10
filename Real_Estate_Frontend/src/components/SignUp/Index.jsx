import React, { useState } from 'react';
import {
  Button, FormControl, InputLabel, OutlinedInput,
  InputAdornment, IconButton, Typography, Box, Container,
  Grid, Link, Snackbar, Alert, createTheme, ThemeProvider
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignUp.scss';

const theme = createTheme({
  palette: { primary: { main: "#222B59" } },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: { "&:before": { borderBottom: "1px solid #222B59" } },
      },
    },
  },
});

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickShowPassword = (field) => setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  const handleMouseDownPassword = (e) => e.preventDefault();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validate the form data
    const isValid = validate();
    
    if (!isValid) {
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      
      console.log('Response:', response.data);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Signup successful! Redirecting to login...',
        severity: 'success',
      });
      
      // Redirect to login page after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);  // Adjust timing if necessary
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error message
      setSnackbar({
        open: true,
        message: error.response ? error.response.data.message : 'Signup failed. Please try again.',
        severity: 'error',
      });
    }
  };
  

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <ThemeProvider theme={theme}>
      <div id="signup-container" style={{
        backgroundImage: "url('/assets/image/background.jpg')",
        backgroundRepeat: "no-repeat", backgroundSize: "cover",
        width: "100%", height: "100vh", display: "flex",
        justifyContent: "center", alignItems: "center"
      }}>
        <Container component="main" maxWidth="sm" sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 1, boxShadow: 3, px: 2, py: 4,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
        }}>
          <Typography component="h1" variant="h5" fontWeight="600" fontSize="45px" color="#222B59">
            Pinnacle Ventures
          </Typography>
          <Typography component="h1" variant="h5" color="#222B59">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1, width: '70%' }}>
            {['name', 'email', 'password', 'confirmPassword'].map((field) => (
              <FormControl key={field} variant="outlined" required fullWidth sx={{ my: 2 }}>
                <InputLabel htmlFor={`outlined-adornment-${field}`}>{field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
                <OutlinedInput
                  id={`outlined-adornment-${field}`}
                  type={field === 'password' || field === 'confirmPassword' ? (showPassword[field] ? 'text' : 'password') : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  endAdornment={(field === 'password' || field === 'confirmPassword') && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword(field)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword[field] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}
                  label={field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                  error={Boolean(errors[field])}
                />
                <Typography color="error" variant="caption">{errors[field]}</Typography>
              </FormControl>
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: 3, mb: 2, background: "#222B59", "&:hover": { background: "#262f5d" } }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2" sx={{ color: "#222B59" }} underline="hover">
                  Already a User? Login.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

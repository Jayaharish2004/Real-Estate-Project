import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/userSlice'; // Corrected import
import {
  Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box,
  Typography, Container, Snackbar, Alert, IconButton, InputAdornment,
  createTheme, ThemeProvider
} from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';
import './Index.scss';

const theme = createTheme({
  palette: { primary: { main: "#222B59" } },
  components: { MuiInput: { styleOverrides: { underline: { "&:before": { borderBottom: "1px solid #222B59" } } } } }
});

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validate = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');
      if (email === storedEmail && password === storedPassword) {
        setSnackbarMessage('Login successful');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        dispatch(updateUser({ name: 'User Name', email })); // Corrected dispatch
        setTimeout(() => navigate('/user'), 2000);
      } else {
        setSnackbarMessage('Invalid credentials');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="container">
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: 1,
            boxShadow: 3,
            px: 2,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
          }}
        >
          <Typography component="h1" variant="h5" fontWeight="600" fontSize="45px" color="#222B59">
            Pinnacle Ventures
          </Typography>
          <Typography component="h1" variant="h5" color="#222B59">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '70%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" size="medium" sx={{ mt: 3, mb: 2, background: "#222B59", "&:hover": { background: "#262f5d" } }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "#222B59" }} underline="hover">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ color: "#222B59" }} underline="hover">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
            iconMapping={{ success: <CheckCircle sx={{ color: 'green' }} /> }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

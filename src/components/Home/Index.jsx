import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Container,
  TextField,
  MenuItem,
  Button,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { SearchRounded, BorderAll, House, Apartment, LocationCity } from "@mui/icons-material";
import "./Index.scss";

const propertyOptions = [
  { type: "All Residentials", icon: <BorderAll /> },
  { type: "Home", icon: <House /> },
  { type: "Apartment", icon: <Apartment /> },
  { type: "Building", icon: <LocationCity /> },
];

function Home() {
  const showUP780 = useMediaQuery("(min-width: 780px)");
  const [option, setOption] = useState("All Residentials");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const userEmail = useSelector((state) => state.user.email);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) setOpenSnackbar(true);
  }, [isLoggedIn]);

  return (
    <div className="hm-pg">
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Typography variant="h2" color="white" align="center" gutterBottom>
            Find Your Dream Home
          </Typography>
          <Typography variant="h5" color="white" align="center" gutterBottom>
            Discover the best properties in your area
          </Typography>
          <Box className="search-bar">
            <TextField
              select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              sx={{
                width: "40%",
                height: "56px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderBottomLeftRadius: "20px",
              }}
            >
              {propertyOptions.map((opt) => (
                <MenuItem key={opt.type} value={opt.type}>
                  {showUP780 ? <Typography>{opt.type}</Typography> : <Typography>{opt.icon}</Typography>}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="filled"
              label={<SearchRounded />}
              sx={{ height: "56px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              fullWidth
            />
            <Button
              variant="contained"
              sx={{
                borderBottomRightRadius: "20px",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                width: "14%",
                padding: "auto 10px",
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Welcome, {userEmail}!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;

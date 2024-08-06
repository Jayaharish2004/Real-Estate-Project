import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import "./Index.scss";

const topCities = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Tirupur",
  "Vellore",
  "Thootukudi",
  "Dindigul",
  "Thanjavur",
  "Hosur",
  "Karur",
  "Nagapattinam",
  "Rajapalayam",
  "Nagercoil",
  "Bengaluru",
  "Hyderabad",
  "Kochi",
  "Vizag",
];

function Home() {
  const [selectedCity, setSelectedCity] = useState("Chennai");
  const [searchInput, setSearchInput] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const city = searchInput.trim().toLowerCase() || selectedCity.toLowerCase();
    if (topCities.map(city => city.toLowerCase()).includes(city)) {
      navigate(`/properties/${city}`);
    } else {
      setSnackbarMessage("Properties currently not available");
      setOpenSnackbar(true);
    }
  };

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
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              sx={{
                width: "40%",
                height: "56px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderBottomLeftRadius: "20px",
              }}
            >
              {topCities.map((city) => (
                <MenuItem key={city} value={city}>
                  <Typography>{city}</Typography>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="filled"
              label={<SearchRounded />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
              onClick={handleSearch}
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
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;

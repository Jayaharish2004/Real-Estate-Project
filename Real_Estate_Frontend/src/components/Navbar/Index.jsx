import { useState } from "react";
import { Container, Box, AppBar, Toolbar, Typography, Button, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Index.scss";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // State for user menu
  const showUpMd = useMediaQuery("(min-width: 961px)");
  const showDownMd = useMediaQuery("(max-width: 960px)");

  const handleClick = () => setNavbarOpen(!navbarOpen);
  const handleUserMenuClick = () => setUserMenuOpen(!userMenuOpen);

  const handleSignInClick = () => {
    setUserMenuOpen(false);
  };

  const handleSignUpClick = () => {
    setUserMenuOpen(false);
  };

  const linkStyles = { textDecoration: "none" };
  const buttonStyles = {
    color: "#E4D9FF",
    margin: "auto 23px",
    fontSize: "16px"
  };
  const signUpButtonStyles = {
    background: "#c5aa6a", // Updated color
    color: "black", // Updated text color
    boxShadow: "none", // Removed box shadow
    margin: "10px 0" // Space between buttons
  };
  const signInButtonStyles = {
    background: "#c5aa6a", // Updated color
    color: "black", // Updated text color
    boxShadow: "none", // Removed box shadow
    margin: "10px 0" // Space between buttons
  };

  return (
    <div className="nav-bar">
      <AppBar sx={{ backgroundColor: "#2f2626", padding: "0px 20px" }} className={navbarOpen ? "nav-bar-open" : ""}>
        <Container maxWidth="xl" sx={{ color: "bisque", padding: "0px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "24px" }} className={navbarOpen ? "nav-bar-container" : ""} disableGutters>
          {(navbarOpen || showUpMd) && (
            <RouterLink to="/" style={linkStyles}>
              <Typography color="whiteSmoke" sx={{ flexGrow: 1, display: "block", fontSize: "22px", cursor: "pointer", fontWeight: 600 }} className={navbarOpen ? "nav-home-link" : ""}>
                Pinnacle&nbsp;Ventures
              </Typography>
            </RouterLink>
          )}

          {(showUpMd || navbarOpen) && (
            <Toolbar sx={{ display: "flex", margin: "auto", alignItems: "center", zIndex: 121 }} className={navbarOpen ? "toolbar" : ""}>
              <RouterLink to="/" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>Home</Button></RouterLink>
              <RouterLink to="/about-us" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>About Us</Button></RouterLink>
              <RouterLink to="/service" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>Service</Button></RouterLink>
              <RouterLink to="/seller" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>Seller</Button></RouterLink>
              {/* <RouterLink to="/destinations" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>Destinations</Button></RouterLink> */}
              <RouterLink to="/properties" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>Properties</Button></RouterLink>
              <RouterLink to="/admin-login" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>Admin</Button></RouterLink>
              <Button 
                color="inherit" 
                variant="text" 
                sx={buttonStyles} 
                onClick={handleUserMenuClick}
              >
                User
              </Button>
              {userMenuOpen && (
                <Box sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '60px', right: '20px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px' }}>
                  <RouterLink to="/login" style={linkStyles}>
                    <Button 
                      sx={signInButtonStyles} 
                      className="btn-reg" 
                      variant="contained" 
                      disableElevation 
                      disableFocusRipple
                      onClick={handleSignInClick}
                    >
                      Sign-In
                    </Button>
                  </RouterLink>
                  <RouterLink to="/signup" style={linkStyles}>
                    <Button 
                      sx={signUpButtonStyles} 
                      className="btn-reg" 
                      variant="contained" 
                      disableElevation
                      onClick={handleSignUpClick}
                    >
                      Sign-Up
                    </Button>
                  </RouterLink>
                </Box>
              )}
            </Toolbar>
          )}

          {showDownMd && (
            <Box height={"69px"} display={"flex"}>
              <Button color="inherit" className="nav-open-btn" onClick={handleClick} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} id={navbarOpen ? "nav-btn-open" : ""}>
                <Typography className="ham" id={navbarOpen ? "active" : ""} />
                <Typography className="ham" id={navbarOpen ? "active" : ""} />
                <Typography className="ham" id={navbarOpen ? "active" : ""} />
              </Button>
            </Box>
          )}
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
}

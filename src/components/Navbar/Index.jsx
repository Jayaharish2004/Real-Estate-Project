import { useState } from "react";
import { Container, Box, AppBar, Toolbar, Typography, Button, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Index.scss";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const showUpMd = useMediaQuery("(min-width: 961px)");
  const showDownMd = useMediaQuery("(max-width: 960px)");

  const handleClick = () => setNavbarOpen(!navbarOpen);

  const linkStyles = { textDecoration: "none" };
  const buttonStyles = {
    color: " #E4D9FF",
    margin: "auto 23px",
    fontSize: "16px"
  };
  const navButtonStyles = {
    background: "linear-gradient(45deg, #ff9a9e 30%, #fecfef 90%)",
    height: "50px",
    color: "#000",
    borderRadius: "25px",
    textTransform: "none",
    padding: "10px 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  };
  const signUpButtonStyles = {
    ...navButtonStyles,
    background: "linear-gradient(45deg, #a1c4fd 30%, #c2e9fb 90%)",
    boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
    marginLeft : "10px"
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
              <RouterLink to="/admin" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>Admin</Button></RouterLink>
              <RouterLink to="/user" style={linkStyles}><Button color="inherit" variant="text" sx={buttonStyles}>User</Button></RouterLink>
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

          {!navbarOpen && (
            <Box sx={{ display: "flex", flexDirection: "row", right: "20px" }}>
              <RouterLink to="/login" style={linkStyles}><Button sx={navButtonStyles} className="btn-reg" variant="contained" disableElevation disableFocusRipple>Sign-In</Button></RouterLink>
              <RouterLink to="/signup" style={linkStyles}><Button sx={signUpButtonStyles} className="btn-reg" variant="contained" disableElevation>Sign-Up</Button></RouterLink>
            </Box>
          )}
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
}

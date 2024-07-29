import {Container,FormControl,Input,createTheme,ThemeProvider,Button,FormLabel,Typography,Box,Link,Snackbar,Alert,} from "@mui/material";
import { Email as EmailIcon, Message as MessageIcon, Person as PersonIcon, Send as SendIcon } from "@mui/icons-material";
import { useState } from "react";
import { pink } from "@mui/material/colors";
import "./Index.scss";

const theme = createTheme({
  palette: {
    primary: { main: "#5a48a7" },
    secondary: pink,
  },
});

export default function Footer() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100vw", position: "relative", bottom: 0, background: "#2f2626", color: "#FCD6C5" }}>
        <Container>
          <form onSubmit={handleSubmit} className="form" maxWidth="100%">
            <FormLabel>
              <Typography variant="h6" component="h1" sx={{ fontSize: "25px", fontWeight: "bold", color: "white" }}>
                Contact Information
              </Typography>
            </FormLabel>
            {[
              { icon: <PersonIcon />, placeholder: "Name", type: "text" },
              { icon: <EmailIcon />, placeholder: "Email", type: "email" },
              { icon: <MessageIcon />, placeholder: "Message", type: "text" },
            ].map(({ icon, placeholder, type }) => (
              <FormControl key={placeholder} color="primary" variant="standard" focused sx={{ margin: "6px 0", width: "50%" }}>
                <Input
                  sx={{ margin: "10px 0", padding: "2px 5px", color: "#FCD6C5" }}
                  startAdornment={icon}
                  placeholder={placeholder}
                  type={type}
                  required
                />
              </FormControl>
            ))}
            <Button variant="contained" color="secondary" type="submit" sx={{ width: "110px" }}>
              Send <SendIcon />
            </Button>
          </form>
        </Container>
        <Container
          sx={{ height: "60px", backgroundColor: "#1a1818", display: "flex", justifyContent: "center", alignItems: "center" }}
          maxWidth="100%"
        >
          <Typography align="center" color="#FCD6C5">
            &copy; {new Date().getFullYear()} Pinnacle Ventures. All rights reserved.<br />
            Discover your dream property with us. Connect on{" "}
            <Link underline="none" sx={{ color: "#ff9800" }} href="https://www.linkedin.com/in/jayaharish-r-m-9a673a258/" target="_blank">
              LinkedIn
            </Link>.
          </Typography>
        </Container>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

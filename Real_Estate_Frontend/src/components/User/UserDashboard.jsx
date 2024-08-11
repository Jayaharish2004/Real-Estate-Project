import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent, TextField, Snackbar, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Divider, Avatar, IconButton
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, BarChart, Bar } from 'recharts';
import { Home, Dashboard, ExitToApp, CloudUpload } from '@mui/icons-material';
import { updateUser } from '../../redux/userSlice'; // Adjust the import according to your slice
import "./UserDashboard.css";

const lineChartData = [
  { name: 'Jan', activity: 40 },
  { name: 'Feb', activity: 30 },
  { name: 'Mar', activity: 20 },
  { name: 'Apr', activity: 27 },
  { name: 'May', activity: 18 },
  { name: 'Jun', activity: 23 },
  { name: 'Jul', activity: 34 },
];

const barChartData = [
  { name: 'Viewed Property', value: 40 },
  { name: 'Saved Property', value: 30 },
  { name: 'Contacted Agent', value: 20 },
];

const initialActivities = [
  { id: 1, date: '2024-07-01', activity: 'Viewed Property', details: 'Viewed a 3BHK apartment' },
  { id: 2, date: '2024-07-10', activity: 'Saved Property', details: 'Saved a villa in California' },
  { id: 3, date: '2024-07-15', activity: 'Contacted Agent', details: 'Contacted agent for a townhouse' },
  { id: 4, date: '2024-07-20', activity: 'Viewed Property', details: 'Viewed a studio apartment' },
];

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activities, setActivities] = useState(initialActivities);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePic: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const userEmail = useSelector((state) => state.user.email);
  const userProfilePic = useSelector((state) => state.user.profilePic);

  const handleEditProfileClick = () => setOpenEditProfile(true);

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfileSubmit = () => {
    dispatch(updateUser({ ...profile, profilePic: profilePicFile ? profile.profilePic : userProfilePic }));
    setOpenEditProfile(false);
    setSnackbarMessage('Profile updated successfully');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const renderChart = (title, component) => (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#555' }}>
          {title}
        </Typography>
        {component}
      </Paper>
    </Grid>
  );

  const renderTable = () => (
    <Grid item xs={12} sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#555' }}>
          User Activity
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>{activity.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#2f2626', color: '#fff' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ textAlign: 'center', py: 2 }}>
            Pinnacle Ventures
          </Typography>
          <Avatar src={profile.profilePic || userProfilePic} sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
            {profile.name || userEmail}
          </Typography>
          <Button
            variant="contained"
            onClick={handleEditProfileClick}
            sx={{ mb: 2, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
          >
            Edit Profile
          </Button>
          <List sx={{ width: '100%' }}>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => navigate('/about-us')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button onClick={() => navigate('/service')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Service" />
            </ListItem>
            {/* <ListItem button onClick={() => navigate('/destinations')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Destinations" />
            </ListItem> */}
            <ListItem button onClick={() => navigate('/properties')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Properties" />
            </ListItem>
            <Divider sx={{ backgroundColor: '#fff' }} />
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <ListItem button onClick={() => navigate('/login')}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </Drawer>
      <Container maxWidth="xl" sx={{ p: 3, ml: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ color: '#333' }}>
            User Dashboard
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {renderChart('Number of Activities by Type', (
            <BarChart width={500} height={300} data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          ))}
          {renderChart('User Activity Over Time', (
            <LineChart width={500} height={300} data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Legend />
              <Line type="monotone" dataKey="activity" stroke="#82ca9d" />
            </LineChart>
          ))}
          {renderTable()}
        </Grid>
      </Container>
      <Dialog open={openEditProfile} onClose={() => setOpenEditProfile(false)}>
        <DialogContent>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit Profile
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={profile.name}
              onChange={handleEditProfileChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={profile.email}
              onChange={handleEditProfileChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleEditProfileChange}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Profile Picture
              </Typography>
              <Avatar src={profile.profilePic || userProfilePic} sx={{ width: 100, height: 100, mb: 2 }} />
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
                startIcon={<CloudUpload />}
              >
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfilePicChange}
                />
              </Button>
              <Box
                sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
              >
                {profilePicFile && (
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {profilePicFile.name}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditProfile(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditProfileSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default UserDashboard;

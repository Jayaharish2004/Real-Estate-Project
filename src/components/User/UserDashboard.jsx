import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Tooltip, Dialog, DialogActions, DialogContent, TextField, Snackbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, BarChart, Bar } from 'recharts';
import { Edit, Delete, Close, Home, Dashboard, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [activities, setActivities] = useState(initialActivities);
  const [open, setOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const userEmail = useSelector((state) => state.user.email);
  const userProfilePic = useSelector((state) => state.user.profilePic);

  const handleEditClick = (activity) => {
    setCurrentActivity(activity);
    setOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };

  const handleEditSubmit = () => {
    setActivities((prevActivities) => prevActivities.map((activity) => activity.id === currentActivity.id ? currentActivity : activity));
    setOpen(false);
    setSnackbarMessage('Record saved successfully');
    setSnackbarOpen(true);
  };

  const handleDelete = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
    setSnackbarMessage('Record deleted successfully');
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>{activity.details}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditClick(activity)} color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(activity.id)} color="secondary">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
          <Avatar src={userProfilePic} sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
            {userEmail}
          </Typography>
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
            <ListItem button onClick={() => navigate('/destinations')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Destinations" />
            </ListItem>
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
              <Line type="monotone" dataKey="activity" stroke="#8884d8" />
            </LineChart>
          ))}
          {renderTable()}
        </Grid>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <TextField
              margin="dense"
              name="date"
              label="Date"
              type="date"
              value={currentActivity?.date || ''}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="activity"
              label="Activity"
              type="text"
              value={currentActivity?.activity || ''}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="details"
              label="Details"
              type="text"
              value={currentActivity?.details || ''}
              onChange={handleEditChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          action={
            <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </Box>
  );
};

export default UserDashboard;

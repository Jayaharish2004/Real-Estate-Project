import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Tooltip, TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Snackbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon, Home, Dashboard, ExitToApp } from '@mui/icons-material';

// Define initialData
const initialData = {
  pieChart: [
    { name: 'Residential', value: 400 },
    { name: 'Commercial', value: 300 },
    { name: 'Industrial', value: 300 },
    { name: 'Land', value: 200 },
  ],
  salesBreakdown: [
    { name: 'Houses', value: 2400 },
    { name: 'Apartments', value: 4567 },
    { name: 'Offices', value: 1398 },
    { name: 'Warehouses', value: 9800 },
    { name: 'Land plots', value: 3908 },
  ],
  recentSales: [
    { id: 1, name: 'Sale 1', location: 'Location 1', type: 'Type 1', amount: 1000 },
    { id: 2, name: 'Sale 2', location: 'Location 2', type: 'Type 2', amount: 2000 },
    // Add more sales data as needed
  ],
};

// Define ChartComponent
const ChartComponent = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Paper sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  </Grid>
);

function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEdit = (item) => {
    setEditItem(item);
    setEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setData((prevData) => ({
      ...prevData,
      recentSales: prevData.recentSales.filter((item) => item.id !== id),
    }));
    setSnackbarMessage('Record deleted successfully');
    setSnackbarOpen(true);
  };

  const handleEditSave = () => {
    setData((prevData) => ({
      ...prevData,
      recentSales: prevData.recentSales.map((item) => (item.id === editItem.id ? editItem : item)),
    }));
    setEditDialogOpen(false);
    setSnackbarMessage('Record saved successfully');
    setSnackbarOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

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
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h5" sx={{ textAlign: 'center', py: 2 }}>
            Pinnacle Ventures
          </Typography>
          <List>
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
          <ListItem button onClick={handleLogout}>
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
            Admin Dashboard
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <ChartComponent title="Distribution of Property Types">
            <PieChart width={400} height={400}>
              <Pie data={data.pieChart} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {data.pieChart.map((entry, index) => <Cell key={index} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />)}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ChartComponent>

          <ChartComponent title="Breakdown of Sales by Property Type">
            <PieChart width={400} height={400}>
              <Pie data={data.salesBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
                {data.salesBreakdown.map((entry, index) => <Cell key={index} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />)}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ChartComponent>
        </Grid>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.name}</TableCell>
                    <TableCell>{sale.location}</TableCell>
                    <TableCell>{sale.type}</TableCell>
                    <TableCell>{sale.amount}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(sale)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(sale.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit the details of the record below:</DialogContentText>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={editItem?.name || ''}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              value={editItem?.location || ''}
              onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Type"
              type="text"
              fullWidth
              value={editItem?.type || ''}
              onChange={(e) => setEditItem({ ...editItem, type: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Amount"
              type="number"
              fullWidth
              value={editItem?.amount || ''}
              onChange={(e) => setEditItem({ ...editItem, amount: parseFloat(e.target.value) })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="error">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </Box>
  );
}

export default AdminDashboard;

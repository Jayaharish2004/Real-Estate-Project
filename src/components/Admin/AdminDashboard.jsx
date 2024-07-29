import React, { useState } from 'react';
import {
  Box, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Tooltip, TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Snackbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon, Close as CloseIcon, Home, Dashboard, ExitToApp } from '@mui/icons-material';

const initialData = {
  pieChart: [{ name: 'Apartments', value: 4000 }, { name: 'Villas', value: 3000 }, { name: 'Houses', value: 2000 }],
  doughnutChart: [{ name: 'Residential', value: 24000 }, { name: 'Commercial', value: 14000 }, { name: 'Land', value: 5000 }, { name: 'Industrial', value: 3000 }],
  recentSales: [
    { id: 1, propertyId: 'P1234', saleDate: '2024-07-01', salePrice: '$500,000', buyer: 'John Doe', agent: 'Jane Smith' },
    { id: 2, propertyId: 'P1235', saleDate: '2024-07-10', salePrice: '$300,000', buyer: 'Alice Johnson', agent: 'Tom Brown' },
    { id: 3, propertyId: 'P1236', saleDate: '2024-07-15', salePrice: '$450,000', buyer: 'Michael Scott', agent: 'Jim Halpert' },
    { id: 4, propertyId: 'P1237', saleDate: '2024-07-20', salePrice: '$1,200,000', buyer: 'Dwight Schrute', agent: 'Pam Beesly' },
  ],
};

const ChartComponent = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{ marginBottom: 2, color: '#555' }}>
        {title}
      </Typography>
      {children}
    </Paper>
  </Grid>
);

const TableComponent = ({ title, data, onEdit, onDelete }) => (
  <Grid item xs={12}>
    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{ marginBottom: 2, color: '#555' }}>
        {title}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((key) => <TableCell key={key}>{key.toUpperCase()}</TableCell>)}
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {Object.keys(item).map((key) => <TableCell key={key}>{item[key]}</TableCell>)}
                <TableCell>
                  <Tooltip title="Edit"><IconButton onClick={() => onEdit(item)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => onDelete(item.id)}><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Grid>
);

const EditDialog = ({ open, item, onClose, onSave, onChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Item</DialogTitle>
    <DialogContent>
      <DialogContentText>Edit the details of the item below:</DialogContentText>
      {item && (
        <Box component="form" sx={{ mt: 2 }}>
          {Object.keys(item).filter(key => key !== 'id').map((key) => (
            <TextField
              key={key} margin="dense" name={key} label={key.charAt(0).toUpperCase() + key.slice(1)}
              type="text" fullWidth value={item[key]} onChange={onChange} sx={{ mb: 2 }}
            />
          ))}
        </Box>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} startIcon={<CancelIcon />}>Cancel</Button>
      <Button onClick={onSave} startIcon={<SaveIcon />} color="primary">Save</Button>
    </DialogActions>
  </Dialog>
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
            <ListItem button onClick={() => navigate('/user')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="User Dashboard" />
            </ListItem>
            <Divider sx={{ backgroundColor: '#fff' }} />
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <ListItem button onClick={() => navigate('/logout')}>
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
              <Pie data={data.doughnutChart} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={80} fill="#8884d8" label>
                {data.doughnutChart.map((entry, index) => <Cell key={index} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />)}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ChartComponent>

          <TableComponent title="Recent Sales" data={data.recentSales} onEdit={handleEdit} onDelete={handleDelete} />
        </Grid>

        <EditDialog open={editDialogOpen} item={editItem} onClose={() => setEditDialogOpen(false)} onSave={handleEditSave} onChange={(e) => setEditItem({ ...editItem, [e.target.name]: e.target.value })} />

        <Snackbar
          open={snackbarOpen} autoHideDuration={6000} onClose={(event, reason) => reason !== 'clickaway' && setSnackbarOpen(false)}
          message={snackbarMessage}
          action={
            <>
              <Button color="secondary" size="small" onClick={() => setSnackbarOpen(false)}>UNDO</Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}><CloseIcon fontSize="small" /></IconButton>
            </>
          }
        />
      </Container>
    </Box>
  );
}

export default AdminDashboard;

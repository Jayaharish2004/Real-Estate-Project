import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import ReportIcon from '@mui/icons-material/Assessment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { resetUser } from '../../redux/userSlice';

// Styled components for Sidebar
const SidebarContainer = styled('div')(({ theme }) => ({
  width: 250,
  height: '100vh',
  backgroundColor: '#2f2626',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
}));

const LogoutButton = styled('div')(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const SidebarLink = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SidebarIcon = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

// Dummy Data
const properties = {
  total: 150,
  sold: 45,
  rented: 75,
  available: 30,
};

const propertyListings = [
  { id: 1, name: 'Luxury Apartment', location: 'Chennai', price: '₹1.5 Cr', status: 'Available' },
  { id: 2, name: 'Beach House', location: 'Pondicherry', price: '₹2.8 Cr', status: 'Sold' },
  { id: 3, name: 'Penthouse', location: 'Bangalore', price: '₹3.5 Cr', status: 'Rented' },
];

const salesReports = [
  { month: 'January', totalSales: '₹15 Cr', propertiesSold: 10 },
  { month: 'February', totalSales: '₹20 Cr', propertiesSold: 12 },
  { month: 'March', totalSales: '₹18 Cr', propertiesSold: 11 },
];

const userProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 9876543210',
  address: '123 Main St, Chennai, TN',
  role: 'Admin',
};

const settingsOptions = [
  'Change Password',
  'Manage Notifications',
  'Privacy Settings',
  'Account Settings',
];

// Dashboard Components
const Dashboard = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardHeader title="Total Properties" />
        <CardContent>
          <Typography variant="h6">{properties.total}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardHeader title="Sold Properties" />
        <CardContent>
          <Typography variant="h6">{properties.sold}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardHeader title="Rented Properties" />
        <CardContent>
          <Typography variant="h6">{properties.rented}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardHeader title="Available Properties" />
        <CardContent>
          <Typography variant="h6">{properties.available}</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

const PropertyListings = () => (
  <Paper elevation={3} style={{ padding: 20 }}>
    <Typography variant="h4" gutterBottom>Property Listings</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {propertyListings.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.id}</TableCell>
            <TableCell>{property.name}</TableCell>
            <TableCell>{property.location}</TableCell>
            <TableCell>{property.price}</TableCell>
            <TableCell>{property.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

const SalesReports = () => (
  <Paper elevation={3} style={{ padding: 20 }}>
    <Typography variant="h4" gutterBottom>Sales Reports</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Month</TableCell>
          <TableCell>Total Sales</TableCell>
          <TableCell>Properties Sold</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {salesReports.map((report) => (
          <TableRow key={report.month}>
            <TableCell>{report.month}</TableCell>
            <TableCell>{report.totalSales}</TableCell>
            <TableCell>{report.propertiesSold}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

const Profile = () => (
  <Paper elevation={3} style={{ padding: 20 }}>
    <Typography variant="h4" gutterBottom>Profile</Typography>
    <Typography variant="body1"><strong>Name:</strong> {userProfile.name}</Typography>
    <Typography variant="body1"><strong>Email:</strong> {userProfile.email}</Typography>
    <Typography variant="body1"><strong>Phone:</strong> {userProfile.phone}</Typography>
    <Typography variant="body1"><strong>Address:</strong> {userProfile.address}</Typography>
    <Typography variant="body1"><strong>Role:</strong> {userProfile.role}</Typography>
  </Paper>
);

const Settings = () => (
  <Paper elevation={3} style={{ padding: 20 }}>
    <Typography variant="h4" gutterBottom>Settings</Typography>
    <List>
      {settingsOptions.map((option, index) => (
        <React.Fragment key={index}>
          <ListItem button>
            <ListItemText primary={option} />
          </ListItem>
          {index < settingsOptions.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

// Admin Dashboard Component
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');

  // Handle Sidebar Clicks
  const handleNavigation = (component) => {
    setSelectedComponent(component);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(resetUser());
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/admin-login';
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarContainer>
        <SidebarLink onClick={() => handleNavigation('Dashboard')}>
          <SidebarIcon><HomeIcon /></SidebarIcon>
          <Typography>Dashboard</Typography>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('PropertyListings')}>
          <SidebarIcon><ListIcon /></SidebarIcon>
          <Typography>Property Listings</Typography>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('SalesReports')}>
          <SidebarIcon><ReportIcon /></SidebarIcon>
          <Typography>Sales Reports</Typography>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('Profile')}>
          <SidebarIcon><AccountCircleIcon /></SidebarIcon>
          <Typography>Profile</Typography>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('Settings')}>
          <SidebarIcon><SettingsIcon /></SidebarIcon>
          <Typography>Settings</Typography>
        </SidebarLink>
        <LogoutButton onClick={handleLogout}>
          <LogoutIcon /> Logout
        </LogoutButton>
      </SidebarContainer>
      <main style={{ flexGrow: 1, padding: 20 }}>
        <Typography variant="h4" gutterBottom>Real Estate Management Dashboard</Typography>
        {selectedComponent === 'Dashboard' && <Dashboard />}
        {selectedComponent === 'PropertyListings' && <PropertyListings />}
        {selectedComponent === 'SalesReports' && <SalesReports />}
        {selectedComponent === 'Profile' && <Profile />}
        {selectedComponent === 'Settings' && <Settings />}
      </main>
    </div>
  );
};

export default AdminDashboard;

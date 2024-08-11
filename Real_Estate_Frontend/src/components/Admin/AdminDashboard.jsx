import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'; // Import Recharts components
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [cityCounts, setCityCounts] = useState({});
  const [editProperty, setEditProperty] = useState(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [agents, setAgents] = useState([]);
  const [editAgent, setEditAgent] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAgentConfirmDialog, setOpenAgentConfirmDialog] = useState(false);
  const [deletePropertyId, setDeletePropertyId] = useState(null);
  const [deleteAgentId, setDeleteAgentId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
    fetchAgents();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/properties");
      setProperties(response.data);
      calculatePropertyCounts(response.data);
    } catch (error) {
      console.error("There was an error fetching the properties!", error);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/agents");
      setAgents(response.data);
    } catch (error) {
      console.error("There was an error fetching the agents!", error);
    }
  };

  const calculatePropertyCounts = (properties) => {
    setPropertyCount(properties.length);
    const counts = properties.reduce((acc, property) => {
      acc[property.city] = (acc[property.city] || 0) + 1;
      return acc;
    }, {});
    setCityCounts(counts);
  };

  const handlePropertyDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/properties/${deletePropertyId}`);
      setSnackbar({ open: true, message: "Property deleted successfully!", severity: "success" });
      fetchProperties();
      setOpenConfirmDialog(false);
    } catch (error) {
      setSnackbar({ open: true, message: "There was an error deleting the property!", severity: "error" });
      console.error("There was an error deleting the property!", error);
      setOpenConfirmDialog(false);
    }
  };

  const handleAgentDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/agents/${deleteAgentId}`);
      setSnackbar({ open: true, message: "Agent deleted successfully!", severity: "success" });
      fetchAgents();
      setOpenAgentConfirmDialog(false);
    } catch (error) {
      setSnackbar({ open: true, message: "There was an error deleting the agent!", severity: "error" });
      console.error("There was an error deleting the agent!", error);
      setOpenAgentConfirmDialog(false);
    }
  };

  const handlePropertyEdit = (property) => {
    setEditProperty(property);
    setShowPropertyForm(true);
  };

  const handleAgentEdit = (agent) => {
    setEditAgent(agent);
    setShowAgentForm(true);
  };

  const handleAddProperty = () => {
    setEditProperty(null);
    setShowPropertyForm(true);
  };

  const handleAddAgent = () => {
    setEditAgent(null);
    setShowAgentForm(true);
  };

  const handleFormClose = () => {
    setShowPropertyForm(false);
    setEditProperty(null);
  };

  const handleAgentFormClose = () => {
    setShowAgentForm(false);
    setEditAgent(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePropertyFormSubmit = async (e) => {
    e.preventDefault();
    const { city, name, description, price } = e.target.elements;
    const propertyData = {
      city: city.value,
      name: name.value,
      description: description.value,
      price: price.value
    };

    try {
      if (editProperty) {
        await axios.put(`http://localhost:8080/api/properties/${editProperty.id}`, propertyData);
        setSnackbar({ open: true, message: "Property updated successfully!", severity: "success" });
      } else {
        await axios.post("http://localhost:8080/api/properties", propertyData);
        setSnackbar({ open: true, message: "Property added successfully!", severity: "success" });
      }
      fetchProperties();
      handleFormClose();
    } catch (error) {
      setSnackbar({ open: true, message: "Error saving property!", severity: "error" });
      console.error("Error saving property:", error);
    }
  };

  const handleAgentFormSubmit = async (e) => {
    e.preventDefault();
    const { name, gender, phone, address, city, rating } = e.target.elements;
    const agentData = {
      name: name.value,
      gender: gender.value,
      phone: phone.value,
      address: address.value,
      city: city.value,
      rating: rating.value
    };

    try {
      if (editAgent) {
        await axios.put(`http://localhost:8080/api/agents/${editAgent.id}`, agentData);
        setSnackbar({ open: true, message: "Agent updated successfully!", severity: "success" });
      } else {
        await axios.post("http://localhost:8080/api/agents", agentData);
        setSnackbar({ open: true, message: "Agent added successfully!", severity: "success" });
      }
      fetchAgents();
      handleAgentFormClose();
    } catch (error) {
      setSnackbar({ open: true, message: "Error saving agent!", severity: "error" });
      console.error("Error saving agent:", error);
    }
  };

  const handleConfirmDialogOpen = (id) => {
    setDeletePropertyId(id);
    setOpenConfirmDialog(true);
  };

  const handleAgentConfirmDialogOpen = (id) => {
    setDeleteAgentId(id);
    setOpenAgentConfirmDialog(true);
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false);
    setDeletePropertyId(null);
  };

  const handleAgentConfirmDialogClose = () => {
    setOpenAgentConfirmDialog(false);
    setDeleteAgentId(null);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogoutClick = () => {
    navigate('/admin-login');
  };

  // Prepare data for the chart
  const chartData = Object.entries(cityCounts).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all posted properties and agents from this dashboard.</p><br></br>
        <div className="header-icons">
          <HomeIcon onClick={handleHomeClick} className="header-icon" />
          <LogoutIcon onClick={handleLogoutClick} className="header-icon" />
        </div>
        <div className="button-container">
          <button className="add-property" onClick={handleAddProperty}>Add Property</button><br></br><br></br>
          <button className="add-agent" onClick={handleAddAgent}>Add Agent</button>
        </div>
      </header>

      {showPropertyForm && (
        <div className="property-form-container">
          <h2>{editProperty ? "Edit Property" : "Add New Property"}</h2>
          <form onSubmit={handlePropertyFormSubmit} className="property-form">
            <div className="form-group">
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  defaultValue={editProperty ? editProperty.city : ""}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  defaultValue={editProperty ? editProperty.name : ""}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Description:
                <textarea
                  name="description"
                  defaultValue={editProperty ? editProperty.description : ""}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  defaultValue={editProperty ? editProperty.price : ""}
                  required
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={handleFormClose}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <br></br>
      <br></br>

      {showAgentForm && (
  <div className="agent-form-container">
    <h2>{editAgent ? "Edit Agent" : "Add New Agent"}</h2>
    <form onSubmit={handleAgentFormSubmit} className="agent-form">
      <div className="form-group">
        <label>
          Name:
          <input
            type="text"
            name="name"
            defaultValue={editAgent ? editAgent.name : ""}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Gender:
          <select
            name="gender"
            defaultValue={editAgent ? editAgent.gender : ""}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            defaultValue={editAgent ? editAgent.phone : ""}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Address:
          <input
            type="text"
            name="address"
            defaultValue={editAgent ? editAgent.address : ""}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          City:
          <input
            type="text"
            name="city"
            defaultValue={editAgent ? editAgent.city : ""}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            defaultValue={editAgent ? editAgent.rating : ""}
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={handleAgentFormClose}>Cancel</button>
      </div>
    </form>
  </div>
)}


      <br></br>
      <br></br>

      <section className="dashboard-summary"> 
        <div className="summary-card">
          <h3>Total Properties</h3>
          <p>{propertyCount}</p>
        </div>
        <div className="summary-card">
          <h3>Total Agents</h3>
          <p>{agents.length}</p>
        </div>
        {Object.entries(cityCounts).map(([city, count]) => (
          <div key={city} className="summary-card">
            <h3>{city}</h3>
            <p>{count} Properties</p>
          </div>
        ))}
      </section>
      <br></br>
      <br></br>

      <section className="property-stats">
        <h2>Property Statistics</h2><br></br>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <br></br>
      <br></br>

      <section className="property-list">
        <h2>Property Listings</h2><br></br>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>City</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.city}</td>
                  <td>{property.name}</td>
                  <td>{property.description}</td>
                  <td>{property.price}</td>
                  <td>
                    <button onClick={() => handlePropertyEdit(property)}>Edit</button>
                    <button onClick={() => handleConfirmDialogOpen(property.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" align="center">No properties found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <br></br>

      <section className="agent-list">
  <h2>Agent Listings</h2><br />
  <p>Total Number of Agents: {agents.length}</p> {/* Display total count here */}
  <br />
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Phone</th>
        <th>Address</th>
        <th>City</th>
        <th>Rating</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {agents.length > 0 ? (
        agents.map((agent) => (
          <tr key={agent.id}>
            <td>{agent.id}</td>
            <td>{agent.name}</td>
            <td>{agent.gender}</td>
            <td>{agent.phone}</td>
            <td>{agent.address}</td>
            <td>{agent.city}</td>
            <td>{agent.rating}</td>
            <td>
              <button onClick={() => handleAgentEdit(agent)}>Edit</button>
              <button onClick={() => handleAgentConfirmDialogOpen(agent.id)}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" align="center">No agents found</td>
        </tr>
      )}
    </tbody>
  </table>
</section>


      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={openConfirmDialog} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this property?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePropertyDelete} color="primary">Yes</Button>
          <Button onClick={handleConfirmDialogClose} color="secondary">No</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAgentConfirmDialog} onClose={handleAgentConfirmDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this agent?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgentDelete} color="primary">Yes</Button>
          <Button onClick={handleAgentConfirmDialogClose} color="secondary">No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

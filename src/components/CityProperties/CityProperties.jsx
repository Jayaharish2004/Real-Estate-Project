import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import './CityProperties.scss';

// Import icons
import apartmentIcon from './icons/Apartment.jpg';
import homeIcon from './icons/Home.jpg';
import landIcon from './icons/Land.jpg';
import agentMale from './icons/Agent_Male.webp';
import agentFemale from './icons/Agent_Female.png';

const CityProperties = () => {
  const { city } = useParams();
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [viewAgentContact, setViewAgentContact] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    dealer: '',
    name: '',
    phone: '',
    email: '',
    interested: false,
    terms: false,
  });

  useEffect(() => {
    // Fetch properties and agents data based on the city
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/${city}`);
        setProperties(response.data.properties || []);
        setAgents(response.data.agents || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [city]);

  const handleInterestedClick = () => {
    setFormOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.reason &&
      formData.dealer &&
      formData.name &&
      formData.phone &&
      formData.email &&
      formData.interested &&
      formData.terms
    ) {
      setViewAgentContact(true);
      setOpenSnackbar(true); // Show Snackbar after successful submission
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setViewAgentContact(false);
  };

  return (
    <div className="city-properties-container">
      <div className="city-properties-header">
        <h1>Properties in {city}</h1>
        <p>Explore our selection of properties and find your dream home.</p>
      </div>

      <div className="properties-list">
        {properties.map((property, index) => (
          <div key={index} className="property-card">
            <div className="property-icon">
              <img src={property.icon || apartmentIcon} alt={property.type} />
            </div>
            <h2>{property.name}</h2>
            <p>{property.description}</p>
            <p><strong>Price:</strong> {property.price}</p>
            <button className="interested-button" onClick={handleInterestedClick}>Interested</button>
          </div>
        ))}
      </div>

      {formOpen && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="interested-form">
            <div className="form-section-left">
              <h3>BASIC INFORMATION</h3>
              <div className="form-group">
                <label>Your reason to buy is:</label>
                <label>
                  <input type="radio" name="reason" value="Investment" onChange={handleFormChange} /> Investment
                </label>
                <label>
                  <input type="radio" name="reason" value="Self Use" onChange={handleFormChange} /> Self Use
                </label>
              </div>
              <div className="form-group">
                <label>Are you a property dealer:</label>
                <label>
                  <input type="radio" name="dealer" value="Yes" onChange={handleFormChange} /> Yes
                </label>
                <label>
                  <input type="radio" name="dealer" value="No" onChange={handleFormChange} /> No
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required />
              </div>
            </div>
            <div className="form-section-right">
              <h3>OPTIONAL INFORMATION</h3>
              <div className="form-group">
                <label>
                  <input type="checkbox" name="interested" checked={formData.interested} onChange={handleFormChange} />
                  Interested in this property
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" name="terms" checked={formData.terms} onChange={handleFormChange} />
                  I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
                </label>
              </div>
              <button type="submit" className="form-button">View Agent Contact</button>
              <button type="button" className="form-button" onClick={handleCloseForm}>Close</button>
            </div>
          </form>
        </div>
      )}

      {viewAgentContact && (
        <div className="agent-details">
          <h3>Agents for {city}</h3>
          {agents.map((agent, index) => (
            <div key={index} className="agent-card">
              <img src={agent.icon || agentMale} alt={agent.name} className="agent-icon" />
              <div className="agent-info">
                <h4>{agent.name}</h4>
                <p><strong>Phone:</strong> {agent.phone}</p>
                <p><strong>Address:</strong> {agent.address}</p>
                <p><strong>Rating:</strong> {agent.rating}/10</p>
              </div>
            </div>
          ))}
          <button className="close-agent-button" onClick={handleCloseForm}>Close</button>
        </div>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          User details have been sent to the Agent successfully. The agent will contact you soon.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CityProperties;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import "./CityProperties.scss";

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
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/search`, {
          params: { city },
        });
        setProperties(response.data || []);
        // Assuming agents are fetched separately or included in the response
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
      setOpenSnackbar(true); 
    } else {
      alert("Please fill out all fields and agree to the terms.");
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setViewAgentContact(false);
  };

  // Function to determine the icon based on property name
  const getPropertyIcon = (name) => {
    if (/home|house|villa/i.test(name)) {
      return homeIcon;
    }
    if (/apartment/i.test(name)) {
      return apartmentIcon;
    }
    if (/plot|land/i.test(name)) {
      return landIcon;
    }
    return homeIcon; // Default icon if none of the conditions match
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
              <img src={getPropertyIcon(property.name)} alt={property.type} />
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
                  <input type="radio" name="reason" value="Investment" onChange={handleFormChange} required /> Investment
                </label>
                <label>
                  <input type="radio" name="reason" value="Self Use" onChange={handleFormChange} required /> Self Use
                </label>
              </div>
              <div className="form-group">
                <label>Are you a property dealer:</label>
                <label>
                  <input type="radio" name="dealer" value="Yes" onChange={handleFormChange} required /> Yes
                </label>
                <label>
                  <input type="radio" name="dealer" value="No" onChange={handleFormChange} required /> No
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

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import "./CityProperties.scss";

// // Import icons
// import apartmentIcon from "./icons/Apartment.jpg";
// import homeIcon from "./icons/Home.jpg";
// import landIcon from "./icons/Land.jpg";
// import agentMale from "./icons/Agent_Male.webp";
// import agentFemale from "./icons/Agent_Female.png";

// const propertyData = {
//   chennai: [
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Sea View", price: "₹1.5 Cr", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Apartment", description: "2 BHK, Near Metro", price: "₹80 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Affordable Apartment", description: "1 BHK, City Center", price: "₹35 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant Villa", description: "4 BHK, Garden View", price: "₹2 Cr", icon: homeIcon },
//     { type: "Home", name: "Modern Home", description: "3 BHK, Close to Schools", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Quiet Area", price: "₹75 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "5000 sq.ft, Main Road", price: "₹3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹70 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "1500 sq.ft, Growing Area", price: "₹50 L", icon: landIcon },
//   ],
//   coimbatore: [
//     { type: "Apartment", name: "Modern Apartment", description: "2 BHK, City Center", price: "₹55 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, Near Park", price: "₹1 Cr", icon: apartmentIcon },
//     { type: "Apartment", name: "Affordable Studio", description: "1 BHK, Market Area", price: "₹30 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant Villa", description: "4 BHK, Garden", price: "₹1.8 Cr", icon: homeIcon },
//     { type: "Home", name: "Modern Home", description: "3 BHK, Quiet Neighborhood", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Close to Schools", price: "₹85 L", icon: homeIcon },
//     { type: "Land", name: "Commercial Plot", description: "1 Acre, Main Road", price: "₹4 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2500 sq.ft, Prime Location", price: "₹90 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "3000 sq.ft, Growing Area", price: "₹70 L", icon: landIcon },
//   ],
//   madurai: [
//     { type: "Apartment", name: "City Apartment", description: "2 BHK, City Center", price: "₹45 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Flat", description: "1 BHK, Near Market", price: "₹30 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, River View", price: "₹90 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden Area", price: "₹1.5 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Neighborhood", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "3000 sq.ft, Main Road", price: "₹1.5 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Land", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹50 L", icon: landIcon },
//   ],
//   trichy: [
//     { type: "Apartment", name: "Spacious Flat", description: "2 BHK, City Center", price: "₹40 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Apartment", description: "1 BHK, Near Bus Stand", price: "₹35 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Lake View", price: "₹85 L", icon: apartmentIcon },
//     { type: "Home", name: "Comfortable Villa", description: "3 BHK, Garden", price: "₹1 Cr", icon: homeIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Quiet Area", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Charming Cottage", description: "2 BHK, Near Market", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "2500 sq.ft, Main Road", price: "₹90 L", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near School", price: "₹55 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "3000 sq.ft, Growing Area", price: "₹65 L", icon: landIcon },
//   ],
//   salem: [
//     { type: "Apartment", name: "Cozy Apartment", description: "1 BHK, City Center", price: "₹25 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, Near Park", price: "₹50 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Hill View", price: "₹75 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant Villa", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Spacious Home", description: "3 BHK, Near Schools", price: "₹85 L", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Quiet Neighborhood", price: "₹60 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.2 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹55 L", icon: landIcon },
//     { type: "Land", name: "Investment Plot", description: "2500 sq.ft, Growing Area", price: "₹50 L", icon: landIcon },
//   ],
//   tirunelveli: [
//     { type: "Apartment", name: "Luxury Apartment", description: "2 BHK, City Center", price: "₹40 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Apartment", description: "1 BHK, Near Market", price: "₹30 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Flat", description: "3 BHK, Lake View", price: "₹60 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.1 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹75 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "2500 sq.ft, Main Road", price: "₹70 L", icon: landIcon },
//     { type: "Land", name: "Residential Land", description: "2000 sq.ft, Near Park", price: "₹50 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "3000 sq.ft, Growing Area", price: "₹65 L", icon: landIcon },
//   ],
//   erode: [
//     { type: "Apartment", name: "Modern Apartment", description: "2 BHK, City Center", price: "₹45 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, Near Park", price: "₹70 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹35 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Close to Schools", price: "₹85 L", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Quiet Neighborhood", price: "₹60 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "3000 sq.ft, Main Road", price: "₹1.2 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Land", description: "2000 sq.ft, Near Park", price: "₹55 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹50 L", icon: landIcon },
//   ],
//   tirupur: [
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, City Center", price: "₹50 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Near Park", price: "₹75 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹35 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant Home", description: "4 BHK, Garden", price: "₹1.3 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable House", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.5 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹65 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   vellore: [
//     { type: "Apartment", name: "Cozy Apartment", description: "1 BHK, City Center", price: "₹30 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, Near Park", price: "₹45 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Hill View", price: "₹70 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.1 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Close to Schools", price: "₹85 L", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Quiet Neighborhood", price: "₹65 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "3000 sq.ft, Main Road", price: "₹1.3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   thoothukudi: [
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, City Center", price: "₹45 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Beach View", price: "₹80 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Near Market", price: "₹30 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   dindigul: [
//     { type: "Apartment", name: "Modern Apartment", description: "2 BHK, City Center", price: "₹40 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, Hill View", price: "₹75 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Flat", description: "1 BHK, Market Area", price: "₹30 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant Villa", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Quiet Area", price: "₹85 L", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Near Schools", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   thanjavur: [
//     { type: "Apartment", name: "Cozy Apartment", description: "1 BHK, City Center", price: "₹30 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, Near Park", price: "₹45 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, Hill View", price: "₹70 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.1 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Close to Schools", price: "₹85 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹65 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "3000 sq.ft, Main Road", price: "₹1.3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   hosur: [
//     { type: "Apartment", name: "Modern Apartment", description: "2 BHK, City Center", price: "₹50 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, Near Park", price: "₹75 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹35 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant Home", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable House", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Quiet Neighborhood", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "3000 sq.ft, Main Road", price: "₹1.5 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Land", description: "2000 sq.ft, Near Park", price: "₹65 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   karur: [
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, City Center", price: "₹40 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Near Park", price: "₹70 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹30 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Close to Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   nagapattinam: [
//     { type: "Apartment", name: "Modern Apartment", description: "2 BHK, City Center", price: "₹40 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, Beach View", price: "₹80 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹30 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.1 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Near Schools", price: "₹85 L", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Quiet Area", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   rajapalayam: [
//     { type: "Apartment", name: "Luxury Apartment", description: "2 BHK, City Center", price: "₹40 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Flat", description: "1 BHK, Near Park", price: "₹30 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "3 BHK, Hill View", price: "₹50 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "3000 sq.ft, Main Road", price: "₹1.5 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹65 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   nagercoil: [
//     { type: "Apartment", name: "Modern Apartment", description: "2 BHK, City Center", price: "₹45 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Flat", description: "3 BHK, Near Park", price: "₹75 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹35 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable House", description: "3 BHK, Close to Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming House", description: "2 BHK, Quiet Neighborhood", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹60 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   bengaluru: [
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, City Center", price: "₹1.5 Cr", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Apartment", description: "2 BHK, Near Metro", price: "₹80 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Affordable Apartment", description: "1 BHK, City Center", price: "₹35 L", icon: apartmentIcon },
//     { type: "Home", name: "Modern Villa", description: "4 BHK, Garden", price: "₹2 Cr", icon: homeIcon },
//     { type: "Home", name: "Studio Home", description: "1 BHK, City Center", price: "₹50 L", icon: homeIcon },
//     { type: "Home", name: "Comfortable House", description: "3 BHK, Near Schools", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Land", name: "Commercial Plot", description: "1 Acre, Main Road", price: "₹4 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2500 sq.ft, Prime Location", price: "₹90 L", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "3000 sq.ft, Growing Area", price: "₹70 L", icon: landIcon },
//   ],
//   hyderabad: [
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, City Center", price: "₹1.2 Cr", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, Near Metro", price: "₹70 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹40 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.8 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable House", description: "3 BHK, Near Schools", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹85 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "1 Acre, Main Road", price: "₹3 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Prime Location", price: "₹1 Cr", icon: landIcon },
//     { type: "Land", name: "Investment Property", description: "2500 sq.ft, Growing Area", price: "₹75 L", icon: landIcon },
//   ],
//   kochi: [
//     { type: "Apartment", name: "Luxury Apartment", description: "2 BHK, City Center", price: "₹40 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Modern Flat", description: "1 BHK, Near Park", price: "₹30 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "3 BHK, Hill View", price: "₹50 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant House", description: "4 BHK, Garden", price: "₹1.2 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable Home", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Plot", description: "3000 sq.ft, Main Road", price: "₹1.5 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹65 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
//   vizag: [
//     { type: "Apartment", name: "Modern Flat", description: "2 BHK, City Center", price: "₹50 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Luxury Apartment", description: "3 BHK, Near Park", price: "₹75 L", icon: apartmentIcon },
//     { type: "Apartment", name: "Cozy Studio", description: "1 BHK, Market Area", price: "₹35 L", icon: apartmentIcon },
//     { type: "Home", name: "Elegant Home", description: "4 BHK, Garden", price: "₹1.3 Cr", icon: homeIcon },
//     { type: "Home", name: "Comfortable House", description: "3 BHK, Near Schools", price: "₹90 L", icon: homeIcon },
//     { type: "Home", name: "Charming Villa", description: "2 BHK, Quiet Area", price: "₹70 L", icon: homeIcon },
//     { type: "Land", name: "Prime Land", description: "3000 sq.ft, Main Road", price: "₹1.5 Cr", icon: landIcon },
//     { type: "Land", name: "Residential Plot", description: "2000 sq.ft, Near Park", price: "₹65 L", icon: landIcon },
//     { type: "Land", name: "Investment Land", description: "2500 sq.ft, Growing Area", price: "₹55 L", icon: landIcon },
//   ],
// };

// const agentData = {
//   chennai: [
//     { icon: agentMale, name: "Ravi Kumar", phone: "+91 98765 43210", address: "123, Marina Road, Chennai", rating: 9 },
//     { icon: agentFemale, name: "Priya Singh", phone: "+91 87654 32109", address: "456, Anna Nagar, Chennai", rating: 8.5 },
//   ],
//   coimbatore: [
//     { icon: agentMale, name: "Arun Prasad", phone: "+91 91234 56789", address: "789, Race Course, Coimbatore", rating: 9.2 },
//     { icon: agentFemale, name: "Anita Raj", phone: "+91 99887 65432", address: "321, RS Puram, Coimbatore", rating: 8.8 },
//   ],
//   madurai: [
//     { icon: agentMale, name: "Suresh Kumar", phone: "+91 98765 12345", address: "12, South Masi Street, Madurai", rating: 8.9 },
//     { icon: agentFemale, name: "Lakshmi Rao", phone: "+91 87654 54321", address: "45, North Veli Street, Madurai", rating: 9.0 },
//   ],
//   trichy: [
//     { icon: agentMale, name: "Mani Raj", phone: "+91 91234 67890", address: "67, Main Bazaar, Trichy", rating: 8.7 },
//     { icon: agentFemale, name: "Nina Patel", phone: "+91 99887 76543", address: "89, Chatram Bus Stand, Trichy", rating: 8.6 },
//   ],
//   salem: [
//     { icon: agentMale, name: "Vijay Sharma", phone: "+91 98765 67890", address: "23, Fairlands, Salem", rating: 9.1 },
//     { icon: agentFemale, name: "Geetha Nair", phone: "+91 87654 98765", address: "56, New Bus Stand, Salem", rating: 8.8 },
//   ],
//   tirunelveli: [
//     { icon: agentMale, name: "Ravi Shankar", phone: "+91 91234 56789", address: "34, Main Road, Tirunelveli", rating: 8.9 },
//     { icon: agentFemale, name: "Sushma Rao", phone: "+91 99887 65432", address: "78, South Car Street, Tirunelveli", rating: 9.2 },
//   ],
//   erode: [
//     { icon: agentMale, name: "Rajesh Kumar", phone: "+91 98765 54321", address: "56, Perundurai Road, Erode", rating: 8.6 },
//     { icon: agentFemale, name: "Aarti Jain", phone: "+91 87654 32109", address: "89, Gandhiji Road, Erode", rating: 8.7 },
//   ],
//   tirupur: [
//     { icon: agentMale, name: "Arun Kumar", phone: "+91 91234 67890", address: "12, KCP Complex, Tirupur", rating: 9.0 },
//     { icon: agentFemale, name: "Rama Devi", phone: "+91 99887 76543", address: "45, Palladam Road, Tirupur", rating: 8.5 },
//   ],
//   vellore: [
//     { icon: agentMale, name: "Kumaravelan", phone: "+91 98765 43210", address: "23, Vellore Fort, Vellore", rating: 8.8 },
//     { icon: agentFemale, name: "Jaya Lakshmi", phone: "+91 87654 32109", address: "56, New Bus Stand, Vellore", rating: 9.1 },
//   ],
//   thoothukudi: [
//     { icon: agentMale, name: "Selvam", phone: "+91 91234 56789", address: "67, South Beach Road, Thoothukudi", rating: 9.0 },
//     { icon: agentFemale, name: "Anjali", phone: "+91 99887 65432", address: "89, East Car Street, Thoothukudi", rating: 8.9 },
//   ],
//   dindigul: [
//     { icon: agentMale, name: "Prakash", phone: "+91 98765 67890", address: "12, Kottai Road, Dindigul", rating: 8.7 },
//     { icon: agentFemale, name: "Kavitha", phone: "+91 87654 98765", address: "45, New Bus Stand, Dindigul", rating: 8.8 },
//   ],
//   thanjavur: [
//     { icon: agentMale, name: "Ravi", phone: "+91 91234 67890", address: "34, East Main Street, Thanjavur", rating: 9.1 },
//     { icon: agentFemale, name: "Priya", phone: "+91 99887 76543", address: "56, Central Road, Thanjavur", rating: 8.6 },
//   ],
//   hosur: [
//     { icon: agentMale, name: "Sankar", phone: "+91 98765 43210", address: "78, Hosur Road, Hosur", rating: 8.9 },
//     { icon: agentFemale, name: "Aishwarya", phone: "+91 87654 32109", address: "12, Industrial Area, Hosur", rating: 9.0 },
//   ],
//   karur: [
//     { icon: agentMale, name: "Karthik", phone: "+91 91234 56789", address: "23, Market Road, Karur", rating: 8.8 },
//     { icon: agentFemale, name: "Meera", phone: "+91 99887 65432", address: "45, Central Road, Karur", rating: 8.7 },
//   ],
//   nagapattinam: [
//     { icon: agentMale, name: "Raj", phone: "+91 98765 67890", address: "67, Kuthambakkam Road, Nagapattinam", rating: 8.6 },
//     { icon: agentFemale, name: "Ranjini", phone: "+91 87654 98765", address: "89, East Coast Road, Nagapattinam", rating: 8.5 },
//   ],
//   rajapalayam: [
//     { icon: agentMale, name: "Tharun", phone: "+91 91234 67890", address: "12, Raja Street, Rajapalayam", rating: 9.2 },
//     { icon: agentFemale, name: "Nandhini", phone: "+91 99887 76543", address: "45, North Road, Rajapalayam", rating: 9.0 },
//   ],
//   nagercoil: [
//     { icon: agentMale, name: "Ganesan", phone: "+91 98765 43210", address: "23, Kottar, Nagercoil", rating: 8.7 },
//     { icon: agentFemale, name: "Anitha", phone: "+91 87654 32109", address: "56, South Car Street, Nagercoil", rating: 8.8 },
//   ],
//   bengaluru: [
//     { icon: agentMale, name: "Vikram", phone: "+91 91234 56789", address: "78, Brigade Road, Bengaluru", rating: 9.1 },
//     { icon: agentFemale, name: "Shruti", phone: "+91 99887 65432", address: "12, Indiranagar, Bengaluru", rating: 8.9 },
//   ],
//   hyderabad: [
//     { icon: agentMale, name: "Ravi", phone: "+91 98765 43210", address: "56, Banjara Hills, Hyderabad", rating: 9.0 },
//     { icon: agentFemale, name: "Pooja", phone: "+91 87654 32109", address: "34, Jubilee Hills, Hyderabad", rating: 8.7 },
//   ],
//   kochi: [
//     { icon: agentMale, name: "Ajay", phone: "+91 91234 67890", address: "89, MG Road, Kochi", rating: 8.9 },
//     { icon: agentFemale, name: "Meena", phone: "+91 99887 76543", address: "23, Ernakulam, Kochi", rating: 9.0 },
//   ],
//   vizag: [
//     { icon: agentMale, name: "Suresh", phone: "+91 98765 67890", address: "12, Beach Road, Vizag", rating: 9.2 },
//     { icon: agentFemale, name: "Sunitha", phone: "+91 87654 98765", address: "34, Dwaraka Nagar, Vizag", rating: 8.8 },
//   ],
// };

// const CityProperties = () => {
//   const { city } = useParams();
//   const properties = propertyData[city.toLowerCase()] || [];
//   const agents = agentData[city.toLowerCase()] || [];
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [formOpen, setFormOpen] = useState(false);
//   const [viewAgentContact, setViewAgentContact] = useState(false);
//   const [formData, setFormData] = useState({
//     reason: "",
//     dealer: "",
//     name: "",
//     phone: "",
//     email: "",
//     time: "",
//     homeLoan: false,
//     siteVisits: false,
//     terms: false,
//   });

//   const [agentDialogOpen, setAgentDialogOpen] = useState(false);

//   const handleInterestedClick = () => {
//     setFormOpen(true);
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenSnackbar(false);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       formData.reason &&
//       formData.dealer &&
//       formData.name &&
//       formData.phone &&
//       formData.email &&
//       formData.time &&
//       formData.terms
//     ) {
//       setViewAgentContact(true);
//       setAgentDialogOpen(true);
//     }
//   };

//   const handleCloseForm = () => {
//     setFormOpen(false);
//     setViewAgentContact(false);
//   };

//   const handleCloseAgentDialog = () => {
//     setAgentDialogOpen(false);
//   };

//   return (
//     <div className="city-properties-container">
//       <h1>Properties in {city}</h1><br />
//       <div className="properties-list">
//         {properties.map((property, index) => (
//           <div key={index} className="property-card">
//             <div className="property-icon">
//               <img src={property.icon} alt={property.type} />
//             </div>
//             <h2>{property.name}</h2>
//             <p>{property.description}</p>
//             <p><strong>Price:</strong> {property.price}</p><br />
//             <button className="interested-button" onClick={handleInterestedClick}>Interested</button>
//           </div>
//         ))}
//       </div>

//       {formOpen && (
//         <div className="form-overlay">
//           <div className="form-container">
//             <form onSubmit={handleSubmit} className="interested-form">
//               <div className="form-section">
//                 <h3>BASIC INFORMATION</h3>
//                 <div className="form-group">
//                   <label>Your reason to buy is</label>
//                   <input type="radio" name="reason" value="investment" onChange={handleFormChange} />Investment <nbsp></nbsp>
//                   <input type="radio" name="reason" value="self-use" onChange={handleFormChange} />Self Use 
//                 </div>
//                 <div className="form-group">
//                   <label>Are you a property dealer</label>
//                   <input type="radio" name="dealer" value="yes" onChange={handleFormChange} />Yes <nbsp></nbsp>
//                   <input type="radio" name="dealer" value="no" onChange={handleFormChange} />No
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="name">Name</label>
//                   <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phone">Phone</label>
//                   <input type="tel" id="phone" name="phone" placeholder="+91 IND" value={formData.phone} onChange={handleFormChange} required />
                
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required />
//                 </div>
//               </div>
//               <div className="form-section">
//                 <h3>OPTIONAL INFORMATION</h3>
//                 <div className="form-group">
//                   <label>By when are you planning to buy the property?</label>
//                   <input type="radio" name="time" value="3-months" onChange={handleFormChange} />3 months <nbsp></nbsp>
//                   <input type="radio" name="time" value="6-months" onChange={handleFormChange} />6 months <nbsp></nbsp>
//                   <input type="radio" name="time" value="more-than-6-months" onChange={handleFormChange} />More than 6 months
//                 </div>
//                 <div className="form-group">
//                   <input type="checkbox" id="home-loan" name="homeLoan" onChange={handleFormChange} />
//                   <label htmlFor="home-loan">I am interested in home loan</label>
//                 </div>
//                 <div className="form-group">
//                   <input type="checkbox" id="site-visits" name="siteVisits" defaultChecked onChange={handleFormChange} />
//                   <label htmlFor="site-visits">I am interested in site visits</label>
//                 </div>
//                 <div className="form-group">
//                   <input type="checkbox" id="terms" name="terms" onChange={handleFormChange} required />
//                   <label htmlFor="terms">I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></label>
//                 </div>
//                 <button className="form-button" type="submit">View Seller contact</button>
//               </div>
//             </form>
//             <button className="close-button" onClick={handleCloseForm}>Close</button>
//           </div>
//         </div>  
//       )}

//       <Dialog open={agentDialogOpen} onClose={handleCloseAgentDialog}>
//         <DialogTitle>Agent Details</DialogTitle>
//         <DialogContent>
//           {agents.map((agent, index) => (
//             <div key={index} className="agent-card">
//               <div className="agent-icon">
//                 <img src={agent.icon} alt="agent" />
//               </div>
//               <div>
//                 <h3>{agent.name}</h3>
//                 <p>Phone: {agent.phone}</p>
//                 <p>Address: {agent.address}</p>
//                 <p>Rating: {agent.rating}</p>
//               </div>
//             </div>
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAgentDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CityProperties;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./SellerPage.scss";

const SellerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    price: "",
  });

  const [postedData, setPostedData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Retrieve posted data from local storage on component mount
    const savedData = localStorage.getItem('postedData');
    if (savedData) {
      setPostedData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editMode && postedData) {
        // Update existing data
        response = await axios.put(`http://localhost:8080/api/properties/${postedData.id}`, formData);
        setSnackbarMessage("Property updated successfully!");
      } else {
        // Post new data
        response = await axios.post("http://localhost:8080/api/properties", formData);
        setSnackbarMessage("Property posted successfully!");
      }
      const updatedData = response.data;
      setPostedData(updatedData);
      localStorage.setItem('postedData', JSON.stringify(updatedData));
      setFormData({ name: "", city: "", description: "", price: "" });
      setSnackbarOpen(true);
      setEditMode(false);
    } catch (error) {
      console.error("There was an error posting or updating the property!", error);
    }
  };

  const handleEdit = () => {
    setFormData(postedData);
    setEditMode(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRefresh = () => {
    localStorage.removeItem('postedData');
    setPostedData(null);
  };

  return (
    <div className="seller-page-container">
      <header className="seller-page-header">
        <h1>Post Your Property</h1>
        <p>Fill in the details to list your property for sale or rent.</p>
      </header>
      <form className="seller-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Property Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter property name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter property description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{editMode ? "Update Property" : "Post Property"}</button>
      </form><br></br>

      {postedData && (
        <div className="property-card">
          <h2>{postedData.name}</h2>
          <p>City: {postedData.city}</p>
          <p>Description: {postedData.description}</p>
          <p>Price: {postedData.price}</p>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <button className="refresh-button" onClick={handleRefresh}>Refresh Data</button>
    </div>
  );
};

export default SellerPage;

// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Index";
import Home from "./components/Home/Index";
import SignUp from "./components/SignUp/Index";
import Login from "./components/Login/Index";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import PrivateRoute from "./components/AdminLogin/PrivateRoute";
import Destinations from "./components/Destination/Destinations";
import Properties from "./components/Properties/Properties";
import CityProperties from "./components/CityProperties/CityProperties"; // New component for city-specific properties
import './App.scss';
import Services from "./components/Service/Services";
import AboutUs from "./components/AboutUs/AboutUs";
import SellerPage from "./components/SellerPage/SellerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="about-us" element={<AboutUs/>} />
          {/* <Route path="destinations" element={<Destinations />} /> */}
          <Route path="seller" element={<SellerPage/>} />
          <Route path="service" element={<Services/>} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:city" element={<CityProperties />} /> {/* Route for city-specific properties */}
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

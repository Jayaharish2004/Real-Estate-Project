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
import SellerLogin from "./components/SellerLogin/SellerLogin"; 
import Destinations from "./components/Destination/Destinations";
import Properties from "./components/Properties/Properties";
import CityProperties from "./components/CityProperties/CityProperties";
import Services from "./components/Service/Services";
import AboutUs from "./components/AboutUs/AboutUs";
import SellerPage from "./components/SellerPage/SellerPage";
import './App.scss';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="seller" element={<SellerPage />} />
          <Route path="service" element={<Services />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:city" element={<CityProperties />} />
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
        <Route path="/seller-login" element={<SellerLogin />} /> {/* Seller Login route */}
        <Route
          path="/seller"
          element={
            <PrivateRoute>
              <SellerPage/>
            </PrivateRoute>
          }
        />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

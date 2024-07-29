import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Index";
import Home from "./components/Home/Index";

import SignUp from "./components/SignUp/Index";
import Login from "./components/Login/Index";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard";
import './App.scss';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

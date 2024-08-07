import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="main">
      <p className="heading">Welcome to Login App</p>      
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default Home;

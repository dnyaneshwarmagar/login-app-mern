import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return <>
  <Routes>
    <Route path="/" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgot" element={<ForgotPassword/>}/>
    <Route path="/reset" element={<ResetPassword/>}/>

  </Routes>

  </>;
}

export default App;

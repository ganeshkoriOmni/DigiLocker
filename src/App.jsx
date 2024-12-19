import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Layout from './components/Layout';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard/dashboard';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
    </>
  )
}

export default App

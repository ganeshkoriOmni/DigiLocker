import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter } from "react-router-dom";

import Layout from './components/Layout';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard/dashboard';
import Documents from './pages/documents/documents'
import DocumentsAdd from './pages/documents/documentsAdd'
import DocumentsEdit from './pages/documents/documentsEdit'
import DocumentsView from './pages/documents/documentsView';
import Folder from './pages/folder/folder';
import Shares from './pages/share/shares';
import Profile from './pages/profile/profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Documents" element={<Documents />} />
              <Route path="/DocumentsAdd" element={<DocumentsAdd />} />
              <Route path="/DocumentsEdit/:id" element={<DocumentsEdit />} />
              <Route path="/DocumentsView/:id" element={<DocumentsView />} />
              <Route path="/Folder" element={<Folder />} />
              <Route path="/Shares" element={<Shares />} />
              <Route path="/Profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

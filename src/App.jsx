import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Barbers from './pages/Barbers';
import Services from './pages/Services';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barberos" element={<Barbers />} />
        <Route path="/servicios" element={<Services />} />
      </Routes>
    </Layout>
  );
}

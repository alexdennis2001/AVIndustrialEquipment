import React from 'react';
import '@fontsource/roboto'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import '@fontsource/roboto'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ViewAll from './pages/Inventory/ViewAll';
import ByBrand from './pages/Inventory/ByBrand';
import ByType from './pages/Inventory/ByType';
import ProductDetails from './pages/ProductDetails';
import Example from './pages/ResponsiveExample';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inventory/viewall" element={<ViewAll />} />
        <Route path="/inventory/byBrand" element={<ByBrand />} />
        <Route path="/inventory/byType" element={<ByType />} />
        <Route path="/inventory/details/:id" element={<ProductDetails />} />
        <Route path="/inventory/Responsive" element={<Example />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Views (pages)
import Home from './views/home/Home';
import About from './views/About';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;

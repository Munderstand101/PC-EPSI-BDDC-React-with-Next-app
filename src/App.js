import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';

function App() {
  return (
      <Router>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

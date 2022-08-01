import React from 'react'
import Home from './pages/Home'
import Game from './pages/Game'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2b2d42
// 8d99ae
// edf2f4
// ef233c
// d80032
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={(<Home />)} />
        <Route exact path="/game" element={(<Game />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

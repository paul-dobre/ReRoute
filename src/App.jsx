import React from "react";
import styles from "./style";
import { Navbar, Hero, Team, Button, Sponsor, Card, CardInfo, Info } from "./components";
import Home from "./Home";
import About from "./About";
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;



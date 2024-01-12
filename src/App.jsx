import React from "react";
import Home from "./Home";
import About from "./About";
import Help from "./Help";
import StartRouting from "./StartRouting";

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
      <Routes>
        <Route path="/help" element={<Help />} />
      </Routes>
      <Routes>
        <Route path="/startrouting" element={<StartRouting />} />
      </Routes>

    </div>
  );
};

export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PetHome from './components/PetHome';
import CreatePet from './components/CreatePet';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pets" element={<PetHome />} />
          <Route path="/create-pet" element={<CreatePet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

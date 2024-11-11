import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import MyPets from './components/mypets/MyPets';
import CreatePet from './components/mypets/CreatePet';
import AdminPet from './components/mypets/AdminPets';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/createpet" element={<CreatePet />} />
          <Route path="/adminpets" element={<AdminPet />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
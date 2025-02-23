import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import './App.css';  // Importing CSS for styling

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/update/:id" element={<UpdateEmployee />} />
          <Route path="*" element={<h2>Page Not Found</h2>} /> {/* Fallback Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

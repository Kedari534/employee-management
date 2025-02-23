import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Employee Management</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add">Add Employee</Link>
      </div>
    </nav>
  );
};

export default Navbar;
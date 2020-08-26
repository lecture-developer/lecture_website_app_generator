import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Lecture Website Generator</Link>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
        <Link to="/users/login" className="nav-link">Sign In</Link>
        </li>
        <li className="navbar-item">
        <Link to="/users/register" className="nav-link">Sign Up</Link>
        </li>
      </ul>
      </div>
    </nav>
  );  
}

export default Navbar;
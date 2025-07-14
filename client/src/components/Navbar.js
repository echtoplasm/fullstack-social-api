import React from "react";
import { NavLink, Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">heap</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarMain" 
          aria-controls="navbarMain" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav nav-fill me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                to="/users"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                to="/posts"
              >
                Posts
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

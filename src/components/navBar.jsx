import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          Movie Center
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink to="/movies" className="nav-item nav-link ">
              Movies
            </NavLink>
            <NavLink to="/customers" className="nav-item nav-link">
              Customers
            </NavLink>
            <NavLink to="/rentals" className="nav-item nav-link">
              Rentals
            </NavLink>
            {!user && ( //here we are saying: if there is NO user then render these 2 links
              <React.Fragment>
                <NavLink to="/login" className="nav-item nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-item nav-link">
                  Register
                </NavLink>
              </React.Fragment>
            )}

            {user && ( //here we are saying: if we Do have a user then render these 2 links
              <React.Fragment>
                <NavLink to="/profile" className="nav-item nav-link">
                  {user.name}
                </NavLink>
                <NavLink to="/logout" className="nav-item nav-link">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

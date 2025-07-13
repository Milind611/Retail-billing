import React, { useContext } from 'react';
import './Menubar.css';
import { assests } from '../../assets/assests';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Menubar = () => {
  const navigate = useNavigate();
const {setAuthData} = useContext(AppContext)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthData(null,null)
    navigate("/login"); 
  }; 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <Link className="navbar-brand" to="/explore">
        <img src={assests.logo} alt="Logo" height="40" />
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

      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <Link className="nav-link" to="/explore">Explore</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/items">Manage Items</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category">Manage Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">Manage Users</Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={assests.profile} alt="profile" height={32} width={32} />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Activity Log</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menubar;

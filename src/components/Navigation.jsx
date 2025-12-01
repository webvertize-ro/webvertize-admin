import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Navigation() {
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin">
          <Logo />
          Webvertize Admin
        </Link>

        <div className="d-flex">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

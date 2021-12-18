import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import image from '../img/PackRatLogo.png';

const MyNavbar = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="navbar">
      <img
        className="d-inline-block align-top"
        width="300"
        height="100"
        src={image}
        alt="Logo"
      />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className="home-link" href="/">
            Warehouses
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;

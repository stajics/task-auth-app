import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = ({ user, signOut }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>React-Boilerplate</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink exact style={{ marginRight: '1em' }} activeStyle={{ fontWeight: 'bold' }} to="/">Home</NavLink>
        { !user && <NavLink style={{ marginRight: '1em' }} activeStyle={{ fontWeight: 'bold' }} to="/login">Login</NavLink>}
        { !user && <NavLink style={{ marginRight: '1em' }} activeStyle={{ fontWeight: 'bold' }} to="/register">Register</NavLink>}
        { user && <button style={{ color: '#007bff', cursor: 'pointer', outline: null, border: 'none', backgroundColor: 'transparent' }} onClick={signOut}>Sign Out</button>}{/*eslint-disable-line*/} 
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;

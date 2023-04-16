import React from 'react'
import classes from './NavBar.module.css'


//bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
//

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/create">Add Person<FontAwesomeIcon className={classes.icon} icon={faUserPlus} /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar
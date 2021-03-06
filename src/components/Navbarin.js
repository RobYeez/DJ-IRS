import React from 'react'
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'

const Navbarin = ({handleLogout}) => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">DJ-IRS</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/userpage">User</Nav.Link>
      <Nav.Link href="/room">Room</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link><div onClick={handleLogout}>Logout</div></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
  )
};
export default Navbarin;

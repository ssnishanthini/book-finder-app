// src/components/Navbar.jsx
import React from "react";
import { Navbar, Container } from "react-bootstrap";

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand href="#">📚 Book Finder</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;

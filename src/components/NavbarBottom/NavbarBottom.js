import React from "react";
import { BsCart4 } from "react-icons/bs";
import { Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "../Select/Select";

const NavbarBottom = () => {
  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle />
          <Select />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand href="cart" className="NavbarComp__cart--container">
              <div className="NavbarComp__cart--icon">
                <BsCart4 />
              </div>
              <div className="NavbarComp__cart--length">{cart.length}</div>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarBottom;

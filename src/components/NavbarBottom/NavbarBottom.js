import React, { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import showAlert from "../../shared/showAlert";
import Select from "../Select/Select";

const NavbarBottom = () => {
  const state = useSelector((state) => state);
  const user = localStorage.getItem("token");
  const [conect, setConect] = useState(user);
  const { cart } = state.shopping;

  const handleSessionClose = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("response");
    showAlert({
      type: "success",
      title: "Sesión cerrada",
      message: "Sesión cerrada correctamente",
    });
    setConect(null);
  };

  useEffect(() => {
    setConect(conect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSessionClose]);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Select />
          <Nav className="justify-content-end">
            <Navbar.Brand href="cart" className="NavbarComp__cart--container">
              <div className="NavbarComp__cart--icon">
                <BsCart4 />
              </div>
              <div className="NavbarComp__cart--length">{cart.length}</div>
            </Navbar.Brand>
            {conect === null ? (
              <Navbar.Brand
                href="autenticacion"
                className="NavbarComp__cart--container"
              >
                <div className="NavbarComp__cart--icon">
                  <AiOutlineUser />
                </div>
                <div className="NavbarComp__cart--register">Registrate</div>
              </Navbar.Brand>
            ) : (
              <Button
                size="sm"
                onClick={handleSessionClose}
                variant="secondary"
                className="NavbarComp__btnClose"
              >
                Cerrar Session
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarBottom;

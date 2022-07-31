import React, { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaUserAltSlash } from "react-icons/fa";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import showAlert from "../../shared/showAlert";
import Select from "../Select/Select";
import Fav from "../../pages/Fav/Fav";

const NavbarBottom = () => {
  const state = useSelector((state) => state);
  const user = localStorage.getItem("token");
  const [conect, setConect] = useState(user);
  const { cart } = state.shopping;

  const handleSessionClose = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("response");
    localStorage.removeItem("token");
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
          <Nav className="justify-content-end NavbarComp__endNavBottom">
            <Navbar.Brand className="NavbarComp__cart--container">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="NavbarComp__cart--iconFav"
                >
                  <div>
                    <MdFavoriteBorder />
                  </div>
                  <div>Favoritos</div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="NavbarComp__cart--dropdown">
                  <Fav />
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
            <Navbar.Brand href="cart" className="NavbarComp__cart--container">
              <div className="NavbarComp__cart--icon">
                <div>
                  <BsCart4 />
                </div>
                <div>Mi Compra</div>
              </div>
              <div className="NavbarComp__cart--length">{cart.length}</div>
            </Navbar.Brand>
            {conect === null ? (
              <Navbar.Brand
                href="autenticacion"
                className="NavbarComp__cart--container"
              >
                <div className="NavbarComp__cart--icon">
                  <div>
                    <AiOutlineUser />
                  </div>
                  <div>Registrarse</div>
                </div>
                {/* <div className="NavbarComp__cart--register">Registrate</div> */}
              </Navbar.Brand>
            ) : (
              <div
                onClick={handleSessionClose}
                className="NavbarComp__btnClose"
              >
                <div>
                  <FaUserAltSlash />
                </div>
                <div>Cerrar sesion</div>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarBottom;

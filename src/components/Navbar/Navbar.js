import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "./logoCooking.png";
import { FaStore } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import { AiFillQuestionCircle } from "react-icons/ai";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import "./Navbar.scss";

const NavbarComp = () => {
  // const totalCart = cart.reduce(
  //   (previousValue, currentValue) => previousValue + currentValue.quantity,
  //   0
  // );
  return (
    <div>
      <Navbar
        bg="secondary"
        variant="dark"
        expand="lg"
        className="NavbarComp__container"
      >
        <Container>
          <Navbar.Brand href="home">
            {" "}
            <img
              src={logo}
              width="80"
              height="auto"
              className="d-inline-block align-top img-logotipo"
              alt={"logo"}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "80px", color: "white" }}
              navbarScroll
            ></Nav>
            <Nav className="NavbarComp__links">
              <Nav.Link href="home">
                <FaStore className="NavbarComp__icon" />
                INICIO
              </Nav.Link>
              <Nav.Link href="#">
                {" "}
                <AiFillQuestionCircle className="NavbarComp__icon" />
                QUIENES SOMOS
              </Nav.Link>
              <Nav.Link href="como-comprar">
                <RiShoppingBasket2Fill className="NavbarComp__icon" />
                COMO COMPRAR
              </Nav.Link>
              <Nav.Link href="#action2">
                <TbBrandTelegram className="NavbarComp__icon" />
                CONTACTO
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;

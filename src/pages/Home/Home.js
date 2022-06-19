import { Container, Col, Row } from "react-bootstrap";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import Carousel from "../../components/Carousel/Carousel";
import "./Home.scss";
import Banner from "../../components/Banner/Banner";
import NavbarBottom from "../../components/NavbarBottom/NavbarBottom";

const Home = () => {
  return (
    <div className="Home__container">
      <NavbarBottom />
      <Row className="Home__first-row">
        <Banner />
        <Col className="Home__container-h2">
          <h2>Ofertas del mes</h2>
          <Carousel />
        </Col>
      </Row>
      <Container className="Home__container-intro-cart">
        <Row className="Home__second-row">
          <Col className="Home__container-shop">
            <ShoppingCart />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

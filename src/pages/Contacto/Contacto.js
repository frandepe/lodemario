import React from "react";
import imgBanner from "../../utilities/images/bannerContacto.jpg";
import BannerHeader from "../../components/BannerHeader/BannerHeader";
import ContactForm from "../../components/ContactForm/ContactForm";
import Leaflet from "../../components/Map/Leaflet";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import "./Contacto.scss";

const Contacto = () => {
  return (
    <div>
      <BannerHeader
        title="Hacé tu compra"
        description="Estamos a tu disposición"
        src={imgBanner}
      />
      <Container>
        <div className="Contacto__titulo">
          <p>
            Completá el siguiente formulario para ponernos en contacto y poder
            coordinar la compra
          </p>
          <p>
            Al presionar en "Enviar compra", estarás enviandonos los productos
            de tu <Link to="/cart">carrito de compra</Link>, junto con los datos
            del formulario.
          </p>
        </div>
        <Row>
          <Col sm={6}>
            <ContactForm />
          </Col>
          <Col className="Contacto__col2" sm={6}>
            <Row className="Contacto__rowsContainer">
              <Col className="Contacto__container">
                <BsTelephone />
                <div className="Contacto__container--info">
                  <b>Teléfono</b>
                  <p>0800-0483243</p>
                </div>
              </Col>
            </Row>
            <Row className="Contacto__rowsContainer">
              <Col className="Contacto__container">
                <AiOutlineMail />
                <div className="Contacto__container--info">
                  <b>Email</b>
                  <p>ejemplo@email.com</p>
                </div>
              </Col>
            </Row>
            <Row className="Contacto__rowsContainer">
              <Col className="Contacto__container">
                <GoLocation />
                <div className="Contacto__container--info">
                  <b>Dirección</b>
                  <p>La Plata, 60 n° 1500, Prov. Bs As</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Leaflet />
    </div>
  );
};

export default Contacto;

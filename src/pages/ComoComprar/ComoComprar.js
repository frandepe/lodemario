import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import FAQ from "../../components/FAQ/FAQ";
import imgBanner from "../../utilities/images/banner-como-comprar.jpg";
import { FaOpencart } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import "./ComoComprar.scss";
import BannerHeader from "../../components/BannerHeader/BannerHeader";

const ComoComprar = () => {
  return (
    <div>
      <Row>
        <BannerHeader
          title="Comprá en Lo de Mario"
          description="Toda la información que necesitás"
          src={imgBanner}
        />
      </Row>
      <Container>
        <Row className="ComoComprar__descripcion">
          <p>
            Ingresá a lodemario.com y empezá a hacer tu compra desde la compu o
            el celu. Como si estuvieras en el almacén, llenás tu carrito, pagás
            y recibís tu compra en casa o la pasás a buscar por el local. Super
            cómodo!
          </p>
        </Row>
        <Row className="ComoComprar__icons">
          <Col sm={4} className="ComoComprar__flexIcons">
            <div className="ComoComprar__iconContainer">
              <span>1</span>
              <FaOpencart className="ComoComprar__icon" />
            </div>
            <b>Seleccioná los productos</b>
            <p>Tenemos un gran numero de productos y ofertas para vos</p>
          </Col>
          <Col sm={4} className="ComoComprar__flexIcons">
            <div className="ComoComprar__iconContainer">
              <span>2</span>
              <BiPencil className="ComoComprar__icon" />
            </div>
            <b>Completá tus datos</b>
            <p>
              Ingresá tus datos personales y el método de compra que prefieras
            </p>
          </Col>
          <Col sm={4} className="ComoComprar__flexIcons">
            <div className="ComoComprar__iconContainer">
              <span>3</span>
              <RiShoppingBasket2Line className="ComoComprar__icon" />
            </div>
            <b>Finalizar compra</b>
            <p>Nos pondremos en contacto para coordinar la entrega</p>
          </Col>
        </Row>
        <Row className="ComoComprar__faq">
          <h3>PREGUNTAS FRECUENTES</h3>
          <FAQ />
        </Row>
      </Container>
    </div>
  );
};

export default ComoComprar;

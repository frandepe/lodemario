import { Container, Row, Col } from "react-bootstrap";
import { BsTelephone } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { BiMessageRoundedError } from "react-icons/bi";
import logo from "../../utilities/images/logoMario.png";
import {
  AiFillCreditCard,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Container className="footer__container" fluid>
        <Row className="footer__colup">
          <Col sm={3} className="footer__atencion-al-cliente">
            <BsTelephone />
            <div className="footer__atencion-al-cliente--tel">
              <p>0800-0483243</p>
              <p>Atención al cliente</p>
            </div>
            <AiFillCreditCard />
          </Col>
          <Col className="footer__redes" sm={5}>
            <a href="https://www.instagram.com/queserialodemario22/">
              <AiFillInstagram />
            </a>
          </Col>
          <Col sm={4} className="footer__ayudarte">
            <h6>Estamos para ayudarte</h6>
            <BiMessageRoundedError />
            <div className="footer__ayudarte--text">
              <p>¿Tenés una consulta?</p>
              <p>
                Comunicate con nosotros <a href="/contact">acá</a>
              </p>
            </div>
          </Col>
        </Row>
        <Container>
          <Row className="footer__coldown">
            <Col sm={5} className="footer__links">
              <b>Lo De Mario</b>
              <Link to="/">Productos</Link>
              <Link to="/cart">Tu compra</Link>
              <Link to="/quienes-somos">¿Quiénes somos?</Link>
              <Link to="/como-comprar">
                Pregunta Frecuentes / ¿Cómo comprar?
              </Link>
              <Link to="/contacto">Contactanos</Link>
            </Col>
            <Col sm={5}>
              <b>La Plata</b>

              <p>
                <GoLocation style={{ marginRight: "5px" }} />
                60 n° 1500, Prov. Bs As
              </p>
              <p>
                <AiOutlineMail style={{ marginRight: "5px" }} />
                email@email.com
              </p>
            </Col>
            <Col className="footer__lastCol" sm={2}>
              <img src={logo} width="120" height="auto" alt={"logo"} />
              <div className="footer__seguridad">
                <BiMessageRoundedError />
                <div className="footer__seguridad--text">
                  <p>Tu compra</p>
                  <b>100% segura</b>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Row className="footer__copyright">
        <p>
          © 2022 Almacen Online by{" "}
          <a href="https://www.frandepaulo.com"> FMD</a>
        </p>
      </Row>
    </div>
  );
};

export default Footer;

// Desarrollo y diseño por{" "}
// <a href="https://www.linkedin.com/in/franco-de-paulo-13509b186/">
//   FMD
// </a>

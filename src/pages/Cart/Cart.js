import React, { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import {
  delFromCart,
  addToCart,
  productsAction,
} from "../../redux/actions/shoppingAction";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Button } from "react-bootstrap";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Cart.scss";
import Spiner from "../../shared/spiner";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const { cart, products, loading } = state.shopping;

  const handleBtnCompra = () => {
    if (total > 2000) {
      navigate("/contacto");
    } else {
      toast.warn("La compra debe superar los 2000$");
    }
  };

  useEffect(() => {
    const newAr = cart.reduce(
      (previousValue, currentValue) =>
        previousValue + parseInt(currentValue.price * currentValue.quantity),
      0
    );
    setTotal(newAr);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(productsAction(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Cart__containerAll">
      <ToastContainer position="bottom-center" limit={1} />
      <Row className="Cart__containerRows">
        <Row className="Cart__header">
          <h2>
            <RiShoppingBasket2Line
              style={{
                transform: "translate(0px, -4px)",
              }}
            />{" "}
            Mi compra
          </h2>
        </Row>
        <Col sm={10}>
          <Row className="Cart__rowMobile">
            <Card.Text>Tus productos</Card.Text>
          </Row>
          <Row className="Cart__row">
            <Col>
              <Card.Text>Producto</Card.Text>
            </Col>
            <Col>
              <Card.Text>Precio</Card.Text>
            </Col>
            <Col>
              <Card.Text>Cantidad</Card.Text>
            </Col>
            <Col>
              <Card.Text>Precio final</Card.Text>
            </Col>
            <Col>
              <Card.Text>Remover</Card.Text>
            </Col>
          </Row>
          <Row className="Cart__row2">
            {!loading ? (
              cart.map((item, index) => (
                <CartItem
                  key={index}
                  data={item}
                  delOneFromCart={() => dispatch(delFromCart(item.id))}
                  delAllFromCart={() => dispatch(delFromCart(item.id, true))}
                  addToCart={() => dispatch(addToCart(item.id))}
                />
              ))
            ) : (
              <Spiner />
            )}
          </Row>
        </Col>
        <Col sm={2} className="Cart__compra">
          <Row className="Cart__total--header">
            <Card.Text>Carrito</Card.Text>
          </Row>
          <Row className="Cart__total">
            <Col>Productos</Col>
            <Col>{cart.length}</Col>
          </Row>
          <Row className="Cart__total">
            <Col>Costo total</Col>
            <Col>${total}.00</Col>
          </Row>
          {/* <button onClick={() => dispatch(clearCart())}>Limpiar Carrito</button> */}
          <Button
            variant="secondary"
            onClick={handleBtnCompra}
            className="Cart__button--compra"
          >
            COMPRAR
          </Button>
          <Row className="Cart__total">
            <Col>Monto mínimo de compra ARS $2000</Col>
          </Row>
        </Col>
      </Row>
      <Row className="Cart__continuarCompra">
        <Link to="/">{"<"} Continuar con la compra</Link>
      </Row>
    </div>
  );
};

export default Cart;

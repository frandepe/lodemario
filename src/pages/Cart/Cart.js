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
import { Link } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const { cart, products } = state.shopping;
  console.log(cart);

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
    <div>
      <Row>
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
            {cart.map((item, index) => (
              <CartItem
                key={index}
                data={item}
                delOneFromCart={() => dispatch(delFromCart(item.id))}
                delAllFromCart={() => dispatch(delFromCart(item.id, true))}
                addToCart={() => dispatch(addToCart(item.id))}
              />
            ))}
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
          <Button variant="secondary">COMPRAR</Button>
        </Col>
      </Row>
      <Row className="Cart__continuarCompra">
        <Link to="/home">{"<"} Continuar con la compra</Link>
      </Row>
    </div>
  );
};

export default Cart;

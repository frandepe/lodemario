import { Card, Row, Col } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CartItem.scss";

const CartItem = ({ data, delOneFromCart, delAllFromCart, addToCart }) => {
  let { id, name, price, quantity, imagen } = data;

  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div>
      <Card.Body className="CartItem__container">
        <Row>
          <Col className="CartItem__container--imgTitle">
            <Card.Img variant="top" src={imagen} />
            <p>{name}</p>
          </Col>
          <Col className="CartItem__flex">
            <Card.Text>${price}.00</Card.Text>
          </Col>
          <Col className="CartItem__container--count CartItem__flex">
            <AiOutlineMinus
              className="CartItem__count"
              onClick={() => delOneFromCart(id) && setCount(quantity - 1)}
            />
            <Card.Text className="CartItem__count--number">{count}</Card.Text>
            <AiOutlinePlus
              className="CartItem__count"
              onClick={() => addToCart(id) && setCount(quantity + 1)}
            />
          </Col>
          <Col className="CartItem__flex">
            <Card.Text>${price * quantity}.00</Card.Text>
          </Col>
          <Col className="CartItem__flex">
            <AiOutlineClose
              className="CartItem__delAll"
              onClick={() => delAllFromCart(id, true)}
            />
          </Col>
        </Row>
      </Card.Body>
    </div>
  );
};

export default CartItem;

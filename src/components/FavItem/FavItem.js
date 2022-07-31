import { Card, Row, Col } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./FavItem.scss";

const FavItem = ({
  data,
  delOneFromCart,
  delAllFromFav,
  addToCart,
  fav,
  product,
}) => {
  let { id, name, price, imagen } = data;

  const state = useSelector((state) => state);
  const { cart } = state.shopping;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div>
      <Card.Body className="CartItem__container">
        <Row>
          <Col>
            <Card.Img variant="top" src={imagen} />
          </Col>
          <Col>
            <b>{name}</b>
            <p>${price}.00</p>
          </Col>
          <Col className="CartItem__container--count CartItem__flex">
            <AiOutlineMinus
              className="CartItem__count"
              onClick={() => delOneFromCart(id) && setCount(count - 1)}
            />
            <Card.Text className="CartItem__count--number">{count}</Card.Text>
            <AiOutlinePlus
              className="CartItem__count"
              onClick={() => addToCart(id) && setCount(count + 1)}
            />
          </Col>
          <Col className="CartItem__flex FavItem__price">
            <Card.Text>${price * count}.00</Card.Text>
          </Col>
          <Col className="CartItem__flex">
            <AiOutlineClose
              className="CartItem__delAll"
              onClick={() => delAllFromFav(fav, product)}
            />
          </Col>
        </Row>
      </Card.Body>
    </div>
  );
};

export default FavItem;

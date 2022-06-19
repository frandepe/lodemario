import { useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import "../Carousel/carousel.scss";
import "./ProductItem.scss";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import LazyLoad from "../../shared/LazyLoad";

const ProductItem = ({ data, addToCart, delOneFromCart }) => {
  let { id, name, price } = data;
  const [count, setCount] = useState(0);

  return (
    <div className="Carousel__item">
      <LazyLoad
        variant="top"
        src="https://t2.ev.ltmcdn.com/es/posts/7/0/2/germinar_semillas_de_manzana_como_hacerlo_y_cuidados_2207_600.jpg"
        width={246}
      />
      <Card.Body className="ProductItem__info">
        <Card.Title className="ProductItem__nombre">{name}</Card.Title>

        <Card.Text className="ProductItem__precio">${price}.00</Card.Text>
        <div className="ProductItem__container--count">
          <Card.Text className="ProductItem__count--number">
            Cantidad: {count}
          </Card.Text>
        </div>
        <ButtonGroup aria-label="Basic example">
          <Button
            className="ProductItem__button--dash"
            variant="secondary"
            onClick={() => delOneFromCart(id) && setCount(count - 1)}
          >
            <BsCartDash
              style={{
                transform: "translate(0px, -2px)",
              }}
            />
          </Button>
          <Button
            className="ProductItem__button--add"
            onClick={() => addToCart(id) && setCount(count + 1)}
            variant="primary"
          >
            <BsCartPlus style={{ transform: "translate(0px, -2px)" }} /> Agregar
          </Button>
        </ButtonGroup>
      </Card.Body>
    </div>
  );
};

export default ProductItem;

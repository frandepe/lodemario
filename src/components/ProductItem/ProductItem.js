import { useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import "../Carousel/carousel.scss";
import "./ProductItem.scss";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import LazyLoad from "../../shared/LazyLoad";
import showAlert from "../../shared/showAlert";

const ProductItem = ({ data, addToCart, delOneFromCart, addToFav }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isAuth = window.localStorage.getItem("token");

  const handlePress = () => {
    if (isAuth) {
      addToFav(id);
      setIsFavorite(!isFavorite);
    } else {
      return showAlert({
        type: "info",
        title: "Inicie sesion",
        message: "Debe iniciar sesion para añadir productos a favoritos",
      });
    }
  };
  let { id, name, price, imagen } = data;
  const [count, setCount] = useState(0);
  return (
    <div className="Carousel__item">
      <LazyLoad variant="top" src={imagen} width={246} height={222} />
      <Card.Body className="ProductItem__info">
        <Card.Title className="ProductItem__nombre">{name}</Card.Title>

        <div className="ProductItem__fav" onClick={handlePress}>
          {!isFavorite ? (
            <MdFavoriteBorder />
          ) : (
            <MdFavorite className="ProductItem__favActive" />
          )}
        </div>
        <Card.Text className="ProductItem__precio">${price}.00</Card.Text>
        <div className="ProductItem__container--count">
          <Card.Text className="ProductItem__count--number">
            Cantidad: {count}
          </Card.Text>
        </div>
        <ButtonGroup aria-label="Basic example">
          {count > 0 && (
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
          )}
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

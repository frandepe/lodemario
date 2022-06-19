import React, { useEffect, useRef } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import ProductItem from "../ProductItem/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  specialAction,
  delFromCart,
} from "../../redux/actions/shoppingAction";
import "./carousel.scss";

const Carousel = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { special } = state.shopping;
  const carousel = useRef(null);
  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  useEffect(() => {
    dispatch(specialAction(special));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Carousel__containerCarousel">
      <div className="Carousel__container">
        <div className="Carousel__buttons--left" onClick={handleLeftClick}>
          <FaChevronCircleLeft />
        </div>
        <div className="Carousel__carousel" ref={carousel}>
          {special?.special?.map((product) => (
            <ProductItem
              key={product.id}
              data={product}
              addToCart={() => dispatch(addToCart(product.id))}
              delOneFromCart={() => dispatch(delFromCart(product.id))}
            />
          ))}
        </div>

        <div className="Carousel__buttons--right" onClick={handleRightClick}>
          <FaChevronCircleRight />
        </div>
      </div>
    </div>
  );
};

export default Carousel;

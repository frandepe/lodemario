import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import FavItem from "../../components/FavItem/FavItem";
import {
  productsAction,
  delFromCart,
  addToCart,
  addToFav,
} from "../../redux/actions/shoppingAction";
import { useSelector, useDispatch } from "react-redux";
import Spiner from "../../shared/spiner";

const Fav = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { fav, products, loading } = state.shopping;

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  useEffect(() => {
    dispatch(productsAction(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Row className="Cart__row2">
        {!loading ? (
          fav.map((item, index) => (
            <FavItem
              key={index}
              data={item}
              delOneFromCart={() => dispatch(delFromCart(item.id))}
              delAllFromFav={() => dispatch(addToFav(fav, item))}
              addToCart={() => dispatch(addToCart(item.id))}
            />
          ))
        ) : (
          <Spiner />
        )}
      </Row>
    </div>
  );
};

export default Fav;

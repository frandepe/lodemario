import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  PRODUCTS,
  PRODUCTS_CATEGORY,
  PRODUCTS_SPECIAL,
} from "../types";
import { getDataMethodPrivate } from "../../services/privateApiServices";

export const addToCart = (id) => ({ type: ADD_TO_CART, payload: id });

export const delFromCart = (id, all = false) =>
  all
    ? { type: REMOVE_ALL_FROM_CART, payload: id }
    : { type: REMOVE_ONE_FROM_CART, payload: id };

export const clearCart = () => ({ type: CLEAR_CART });

export const productsAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("products");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: PRODUCTS,
      payload: { products: data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const categoryAction = (categoria) => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate(`category/${categoria}`);
    const data = response?.data;
    console.log(data);
    dispatch({
      type: PRODUCTS_CATEGORY,
      payload: { category: data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const specialAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("special");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: PRODUCTS_SPECIAL,
      payload: { special: data },
    });
  } catch (error) {
    console.log(error);
  }
};

import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  PRODUCTS,
  PRODUCTS_CATEGORY,
  PRODUCTS_SPECIAL,
  LOADING,
  BANNER,
  ADD_TO_FAV,
  REMOVE_ALL_FROM_FAV,
} from "../types";

export const initialState = {
  products: [],
  category: "",
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  loading: false,
  banner: [],
  fav: localStorage.getItem("fav")
    ? JSON.parse(localStorage.getItem("fav"))
    : [],
};

// if (localStorage.getItem("cart")) {
//   initialState.cart = JSON.parse(localStorage.getItem("cart"));
// } else {
//   initialState.cart = [];
// }
// localStorage.setItem("cart", JSON.stringify(initialState.cart));
export function shoppingReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let newItem = state.products.products.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
    }
    case REMOVE_ONE_FROM_CART: {
      action.type && localStorage.setItem("cart", JSON.stringify(state.cart));
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }

    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case PRODUCTS: {
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };
    }
    case PRODUCTS_CATEGORY: {
      return {
        ...state,
        category: action.payload.category,
        loading: false,
      };
    }
    case PRODUCTS_SPECIAL: {
      return {
        ...state,
        special: action.payload.special,
        loading: false,
      };
    }
    case ADD_TO_FAV: {
      if (state.fav.includes(action.payload)) {
        return { ...state, fav: state.fav };
      } else {
        const updatedItem = state.fav.concat(action.payload);
        return { ...state, fav: updatedItem };
      }
    }
    case REMOVE_ALL_FROM_FAV: {
      return { ...state, fav: state.fav.filter((id) => id !== action.payload) };
    }
    case BANNER:
      return {
        ...state,
        banner: action.payload.banner,
        loading: false,
      };

    case LOADING:
      return { ...state, loading: true };
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

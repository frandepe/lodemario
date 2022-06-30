import { LOGIN, REGISTER, ERROR_USER, LOADING, GET_USERS } from "../types";

export const initialState = {
  infoUser: {},
  token: null,
  loading: false,
  error: false,
};

export function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER:
      return { ...state, infoUser: payload, error: false };
    case LOGIN:
      return { ...state, infoUser: payload, error: false };
    case GET_USERS:
      return {
        ...state,
        infoUser: payload.users,
        loading: false,
      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR_USER:
      return { ...state, error: true };
    default:
      return state;
  }
}

import axios from "axios";

const defaultValue = {
  userInfo: {},
  token: null,
  error: false,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ERROR = "ERROR";

export default function AuthReducer(state = defaultValue, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { ...state, token: payload, error: false };
    case LOGOUT:
      return defaultValue;
    case ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
}

export const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        "https://back-sandbox.herokuapp.com/api/auth/login",
        {
          email,
          password,
        }
      );

      dispatch({
        type: LOGIN,
        payload: response.data.token,
        token: localStorage.setItem("token", response.data.token),
      });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  };

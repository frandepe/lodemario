import { LOGIN, REGISTER, ERROR_USER, GET_USERS } from "../types";
import {
  privatePostRequest,
  getDataMethodPrivate,
} from "../../services/privateApiServices";

export const registerAction =
  ({ email, password, firstName, lastName }) =>
  async (dispatch) => {
    try {
      const response = await privatePostRequest("user", {
        email,
        password,
        firstName,
        lastName,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("response", JSON.stringify(response));
      dispatch({
        type: REGISTER,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: ERROR_USER,
      });
    }
  };

export const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await privatePostRequest("login", {
        email,
        password,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("response", JSON.stringify(response));
      dispatch({
        type: LOGIN,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: ERROR_USER,
      });
    }
  };

export const usersAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("user");
    const data = response?.data;
    dispatch({
      type: GET_USERS,
      payload: { users: data },
    });
  } catch (error) {
    console.log(error);
  }
};

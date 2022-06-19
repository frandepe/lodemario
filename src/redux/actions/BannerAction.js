import { BANNER, LOADING } from "../types";
import { getDataMethodPrivate } from "../../services/privateApiServices";

export const bannerAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("banner");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: BANNER,
      payload: { banner: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};

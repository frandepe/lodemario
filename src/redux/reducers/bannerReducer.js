import { BANNER, LOADING } from "../types";

export const initialState = {
  banner: [],
  loading: false,
};

export function bannerReducer(state = initialState, action) {
  switch (action.type) {
    case BANNER:
      return {
        ...state,
        banner: action.payload.banner,
        loading: false,
      };
    case LOADING:
      return { ...state, loading: true };
    default:
      return initialState;
  }
}

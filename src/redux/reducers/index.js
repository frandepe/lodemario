import { combineReducers } from "redux";
import { shoppingReducer } from "./shoppingReducer";
// import { bannerReducer } from "./bannerReducer";
import { usersReducer } from "./usersReducer";

const reducer = combineReducers({
  shopping: shoppingReducer,
  // banner: bannerReducer,
  users: usersReducer,
});
export default reducer;

import { combineReducers } from "redux";
import { shoppingReducer } from "./shoppingReducer";
import { bannerReducer } from "./bannerReducer";

const reducer = combineReducers({
  shopping: shoppingReducer,
  banner: bannerReducer,
  // crud: crudReducer,
});
export default reducer;

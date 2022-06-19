// import { createStore } from "redux";
// import reducer from "../reducers";

// const store = createStore(reducer);

// store.subscribe(() => console.log(store));

// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => console.log(store));

export default store;

import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./authReducer";
import products from "./productsReducer";
import users from "./usersReducer";
import cart from "./cartReducer";

const reducer = combineReducers({ auth, products, users, cart });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./authReducer";
export * from "./cartReducer";

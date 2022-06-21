import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import auth from "./authReducer";
import products from "./productsReducer";
import product from "./productReducer";
import users from "./usersReducer";
import cart from "./cartReducer";
import info from "./infoReducer";

const reducer = combineReducers({ auth, products, users, product, cart, info });
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from "./authReducer";
export * from "./cartReducer";

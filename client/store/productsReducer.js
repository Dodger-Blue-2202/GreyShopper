import axios from "axios";
import { setError } from "./errorReducer";
import history from "../history";

const TOKEN = "token";
const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const removeProduct = (productId) => ({ type: REMOVE_PRODUCT, productId });
const addProduct = (product) => ({ type: ADD_PRODUCT, product });
const editProduct = (product) => ({ type: EDIT_PRODUCT, product });
/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    //returns all products if we have admin access
    dispatch(setProducts(res.data));
  } catch (err) {
    dispatch(setError("Error getting product data."));
  }
};
//All of the following routes are admin only
export const deleteProduct = (id) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try {
      const res = await axios.delete(`/api/products/:${id}`, {
        headers: { authentication: token },
      });
      //deletes product if we have admin access
      dispatch(removeProduct(res.data.id));
      //update store
    } catch (err) {
      dispatch(
        setError(
          "Error getting product data. Current user might not have admin access"
        )
      );
    }
  } else {
    dispatch(setError("There isn't a token. No user is logged in."));
  }
};

export const postProduct = (product) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try {
      const res = await axios.post(`/api/products/`, {
        headers: { authentication: token },
        body: product,
      });
      //adds product if we have admin access
      dispatch(addProduct(res.data));
    } catch (err) {
      dispatch(
        setError(
          "Error getting product data. Current user might not have admin access"
        )
      );
    }
  } else {
    dispatch(setError("There isn't a token. No user is logged in."));
  }
};

export const putProduct = (product) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try {
      const res = await axios.put(`/api/products/:${product.id}`, {
        headers: { authentication: token },
        body: product,
      });
      //adds product if we have admin access
      dispatch(editProduct(res.data));
    } catch (err) {
      dispatch(
        setError(
          "Error getting product data. Current user might not have admin access"
        )
      );
    }
  } else {
    dispatch(setError("There isn't a token. No user is logged in."));
  }
};

export const logout = () => {
  //clear products state when we log out of admin account
  return {
    type: SET_PRODUCTS,
    products: [],
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case REMOVE_PRODUCT:
      return state.filter((item) => {
        return item.id !== action.id;
      });
    case EDIT_PRODUCT:
      return state.map((item) => {
        if (item.id === action.product.id) {
          return action.product;
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}

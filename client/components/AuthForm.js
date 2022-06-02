import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, cart } = props;
  const renderEmail = () => {
    if (name === "signup") {
      return (
        <div className="row mb-3">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <div className="col-sm-10">
            <input name="email" type="email" />
          </div>
        </div>
      );
    }
  };
  return (
    <div className="signup">
      <form onSubmit={(e) => handleSubmit(e, cart)} name={name}>
        <div className="row mb-3">
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <div className="col-sm-10">
            <input name="username" type="text" />
          </div>
        </div>
        {renderEmail()}
        <div className="row mb-3">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <div className="col-sm-10">
            <input name="password" type="password" />
          </div>
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
    cart: state.cart,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, cart) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      let email = "";
      if (evt.target.email) {
        email = evt.target.email.value;
      }
      dispatch(authenticate(username, password, formName, email, cart));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

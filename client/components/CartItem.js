import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateOrder } from "../store";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { product, order, removeFromCart, updateOrder } = this.props;
    return (
      <div>
        <Link to={`/products/${product.id}`} className="product-link">
          <img src={product.imageUrl} />
        </Link>
        <h2>{product.name}</h2>
        <h2>${(product.price / 100).toFixed(2).toLocaleString()}</h2>
        <div className="cart-quantity-form">
          <label htmlFor="qty">Quantity: </label>
          <button
            type="button"
            className="decrement"
            onClick={() => {
              order.quantity -= 1;
              product.price = Math.floor(product.price * order.quantity);
              updateOrder(order);
            }}
          >
            Up
          </button>
          <input
            name="qty"
            value={order.quantity}
            onChange={() => {
              updateOrder(order);
            }}
          />
          <button
            type="button"
            className="increment"
            onClick={() => {
              order.quantity += 1;
              product.price = Math.floor(product.price * order.quantity);
              updateOrder(order);
            }}
          >
            Down
          </button>
        </div>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            type="button"
            className="remove"
            onClick={() => removeFromCart(product)}
          >
            X
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    updateOrder: (product) => dispatch(updateOrder(product)),
  };
};

export default connect(null, mapDispatch)(CartItem);

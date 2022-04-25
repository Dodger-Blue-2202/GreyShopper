import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, addToCart } from "../store";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.order.quantity,
    });
  }

  onDelete() {
    this.props.removeFromCart(this.props.product);
  }

  render() {
    const { product, updateOrder } = this.props;
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
            onClick={async () => {
              await this.setState({
                quantity: this.state.quantity - 1,
              });
              product.totalPrice = Math.floor(
                product.price * this.state.quantity
              );
              updateOrder(product, this.state.quantity);
            }}
          >
            Down
          </button>
          <input
            name="qty"
            value={this.state.quantity}
            onChange={async (e) => {
              await this.setState({
                quantity: e.target.value,
              });
              updateOrder(product, this.state.quantity);
            }}
          />
          <button
            type="button"
            className="increment"
            onClick={async () => {
              await this.setState({
                quantity: this.state.quantity + 1,
              });
              product.totalPrice = Math.floor(
                product.price * this.state.quantity
              );
              updateOrder(product, this.state.quantity);
            }}
          >
            Up
          </button>
        </div>
        <button type="button" className="remove" onClick={this.onDelete}>
          X
        </button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeFromCart: (product) => {
      dispatch(removeFromCart(product));
    },
    updateOrder: (product, qty) => {
      dispatch(addToCart(product, qty));
    },
  };
};

export default connect(null, mapDispatch)(CartItem);

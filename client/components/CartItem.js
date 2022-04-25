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
    console.log(
      "Component mounted. Props is ",
      this.props,
      " and state is ",
      this.state
    );
    this.setState({
      quantity: this.props.order.quantity,
    });
  }

  onDelete() {
    console.log("onDelete reached. Props before delete is ", this.props);
    this.props.removeFromCart(this.props.product);
    console.log("Props after delete is ", this.props);
  }

  render() {
    console.log(
      "Props in render is ",
      this.props,
      " and state is ",
      this.state
    );
    const { product, order, updateOrder } = this.props;
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
              this.setState({
                quantity: this.state.quantity - 1,
              });
              product.totalPrice = Math.floor(
                product.price * this.state.quantity
              );
              updateOrder(product, this.state.quantity);
            }}
          >
            Up
          </button>
          <input
            name="qty"
            value={order.quantity}
            onChange={(e) => {
              this.setState({
                quantity: e.target.value,
              });
              updateOrder(product, this.state.quantity);
            }}
          />
          <button
            type="button"
            className="increment"
            onClick={() => {
              this.setState({
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
        </div>
        {/* <form onSubmit={(ev) => ev.preventDefault()}> */}
        <button type="button" className="remove" onClick={this.onDelete}>
          X
        </button>
        {/* </form> */}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  console.log("Mapping dispatch");
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

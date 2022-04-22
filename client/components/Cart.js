import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { fetchOrders, checkOut } from "../store";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.checkOut(this.props.order);
  }

  render() {
    const { handleSubmit } = this;
    return (
      <div className="cart-component">
        {this.props.orders
          ? this.props.orders.map((order) => (
              <CartItem
                key={order.productId}
                product={order.product}
                order={order}
              />
            ))
          : ""}
        <button type="button" className="submit-order" onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    checkOut: () => dispatch(checkOut()),
  };
};

export default connect(mapState, mapDispatch)(Cart);

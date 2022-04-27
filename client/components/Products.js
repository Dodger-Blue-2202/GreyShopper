import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchProducts,
  deleteProduct,
  putProduct,
} from "../store/productsReducer";
import { addToCart } from "../store";

export class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const products = this.props.products;

    const deleteButton = (id) => (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          this.props.deleteProduct(id);
        }}
      >
        Delete
      </button>
    );
    // const editButton = () => (
    // 	<button type="button" className="btn btn-success">
    // 		Edit
    // 	</button>
    // )

    const addCartHandler = (product, event) => {
      event.preventDefault();
      this.props.addToCart(product, event.target.quantity.value);
    };
    const qtyOptions = (qty) => {
      let options = [];
      for (let i = 0; i <= qty; i++) {
        options.push(<option key={i}>{i}</option>);
      }
      return options;
    };
    const defaultQty = (product) => {
      let item = this.props.cart.filter((order) => {
        return order.product.id === product.id;
      })[0];
      if (item) {
        return item.quantity;
      } else {
        0;
      }
    };

    return (
      <div className="products">
        {products.map((product) => (
          <div className="container-fluid" key={product.id}>
            <div className="row align-items-start">
              <Link to={`/products/${product.id}`}>
                <img className="product-image" src={product.imageUrl} />
              </Link>
            </div>
            <div className="row align-items-center">
              <h4>Name: {product.name}</h4>
              <h4>Price: ${product.price}</h4>
              <h4>Description: {product.description}</h4>
              <h4>Stock: {product.stock}</h4>
            </div>
            <div className="addToCartButton">
              {/* {this.props.isAdmin ? editButton() : null} */}
              {/* <button type="button" className="btn btn-primary">
								Add to cart
							</button> */}
              {this.props.isAdmin ? deleteButton(product.id) : null}

              <form onSubmit={(e) => addCartHandler(product, e)}>
                <label for="quantity">Amount to add</label>
                <select
                  id="quantity"
                  name="quantity"
                  defaultValue={defaultQty(product)}
                >
                  {qtyOptions(product.stock)}
                </select>
                <button type="submit" className="btn btn-primary">
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  products: state.products,
  isAdmin: state.auth.isAdmin,
  cart: state.cart,
});

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),

    deleteProduct: (id) => dispatch(deleteProduct(id)),
    editProduct: () => dispatch(putProduct()),

    addToCart: (product, qty) => {
      dispatch(addToCart(product, qty));
    },
  };
};

export default connect(mapState, mapDispatch)(Products);

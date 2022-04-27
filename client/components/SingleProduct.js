import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/productReducer";
import { deleteProduct, putProduct } from "../store/productsReducer";
import { Link, Redirect } from "react-router-dom";
import { addToCart } from "../store";

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }
  render() {
    let product = this.props.product;
    if (product === undefined) {
      product = "";
    }
    const deleteButton = () => {
      console.log(this.props.match.params.id);
      return (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.deleteProduct(this.props.match.params.id)}
        >
          Delete
        </button>
      );
    };
    const editButton = () => (
      <Link to={`/edit/${product.id}`}>
        <button type="button" className="btn btn-success">
          Edit
        </button>
      </Link>
    );

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
      <div className="product">
        <div className="container-fluid" key={product.id}>
          <div className="row align-items-start">
            <Link to={`/products`}>
              <img className="product-image" src={product.imageUrl} />
            </Link>
          </div>
          <div className="row align-items-center">
            <h4>Name: {product.name}</h4>
            <h4>Price: ${product.price}</h4>
            <h4>Description: {product.description}</h4>
            <h4>Quantity: {product.stock}</h4>
          </div>
          <div className="addToCartButton">
            {this.props.isAdmin ? editButton() : null}
            {/* <button type="button" className="btn btn-primary">
							Add to cart
						</button> */}
            {/*    {this.props.isAdmin ?  deleteButton()  : null} */}
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
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.product,
  isAdmin: state.auth.isAdmin,
  cart: state.cart,
});

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    editProduct: () => dispatch(putProduct()),
    addToCart: (product, qty) => {
      dispatch(addToCart(product, qty));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

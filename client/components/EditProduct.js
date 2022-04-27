import React from "react";
import { connect } from "react-redux";
import { putProduct } from "../store/productsReducer";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/productReducer";

export class EditProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      description: "",
      stock: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();
    this.props.editProduct({ ...this.state, id: this.props.product.id });
  };

  render() {
    let product = this.props.product;
    if (product === undefined) {
      product = "";
    }
    const { name, price, description, stock } = this.state;
    const { handleSubmit, handleChange } = this;
    const prod = () => (
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
            <h4>Stock: {product.stock}</h4>
          </div>
        </div>
      </div>
    );

    return (
      <div className="product">
        {prod()}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input name="name" onChange={handleChange} value={name} />
          <label htmlFor="price">Price: </label>
          <input name="price" onChange={handleChange} value={price} />
          <label htmlFor="description">Description: </label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />
          <label htmlFor="stock">Stock: </label>
          <input name="stock" onChange={handleChange} value={stock} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.product,
});

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    editProduct: (product) => {
      dispatch(putProduct(product));
    },
  };
};

export default connect(mapState, mapDispatch)(EditProduct);

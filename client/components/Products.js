import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/productsReducer'

export class Products extends React.Component {
	componentDidMount() {
		this.props.fetchProducts()
	}
	render() {
		const products = this.props.products
		return (
			<div className="products">
				{products.map((product) => (
					<div className="container-fluid" key={product.id}>
						<div className="row align-items-start">
							<Link to={`/products/${product.id}`}>
								<img
									className="product-image"
									src={product.imageUrl}
								/>
							</Link>
						</div>
						<div className="row align-items-center">
							<h4>Name: {product.name}</h4>
							<h4>Price: ${product.price / 100}</h4>
							<h4>Description: {product.description}</h4>
							<h4>Quantity: {product.stock}</h4>
						</div>
						<div className="addToCartButton">
							<button type="button" className="btn btn-primary">
								Add to cart
							</button>
						</div>
					</div>
				))}
			</div>
		)
	}
}

const mapState = (state) => ({ products: state.products })

const mapDispatch = (dispatch) => {
	return {
		fetchProducts: () => dispatch(fetchProducts()),
	}
}

export default connect(mapState, mapDispatch)(Products)

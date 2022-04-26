import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/productReducer'
import { deleteProduct, putProduct } from '../store/productsReducer'
import { Link } from 'react-router-dom'

export class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.fetchSingleProduct(this.props.match.params.id)
	}
	render() {
		let product = this.props.product
		if (product === undefined) {
			product = ''
		}
		const deleteButton = () => (
			<button
				type="button"
				className="btn btn-danger"
				onClick={this.props.deleteProduct}
			>
				Delete
			</button>
		)
		const editButton = () => (
			<button type="button" className="btn btn-success">
				Edit
			</button>
		)
		return (
			<div className="product">
				<div className="container-fluid" key={product.id}>
					<div className="row align-items-start">
						<Link to={`/products`}>
							<img
								className="product-image"
								src={product.imageUrl}
							/>
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
						<button type="button" className="btn btn-primary">
							Add to cart
						</button>
						{this.props.isAdmin ? deleteButton() : null}
					</div>
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({
	product: state.product,
	isAdmin: state.auth.isAdmin,
})

const mapDispatch = (dispatch) => {
	return {
		fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
		deleteProduct: () => dispatch(deleteProduct()),
		editProduct: () => dispatch(putProduct()),
	}
}

export default connect(mapState, mapDispatch)(SingleProduct)

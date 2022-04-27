import React from 'react'
import { connect } from 'react-redux'
import { putProduct } from '../store/productsReducer'
import { Link, Redirect } from 'react-router-dom'
import { fetchSingleProduct } from '../store/productReducer'

export class EditProduct extends React.Component {
	componentDidMount() {
		this.props.fetchSingleProduct(this.props.match.params.id)
	}
	render() {
		let product = this.props.product
		if (product === undefined) {
			product = ''
		}
		const prod = () => (
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
				</div>
			</div>
		)

		const handleSubmit = (evnt) => {
			evnt.preventDefault()
			this.props.editProduct({ ...this.props.product, ...this.props })
		}
		return (
			<div className="product">
				{prod()}
				<form onSubmit={handleSubmit}>
					<label htmlFor="name">Name: </label>
					<input
						name="name"
						// onChange={handleChange}
						// value={product.name}
					/>
					<label htmlFor="price">Price: </label>
					<input
						name="price"
						// onChange={handleChange}
						// value={product.price}
					/>
					<label htmlFor="description">Description: </label>
					<input
						name="description"
						// onChange={handleChange}
						// value={product.description}
					/>
					<label htmlFor="quantity">Quantity: </label>
					<input
						name="quantity"
						// onChange={handleChange}
						// value={product.quantity}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

const mapState = (state) => ({
	product: state.product,
})

const mapDispatch = (dispatch) => {
	return {
		fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
		editProduct(product) {
			dispatch(putProduct(product))
		},
	}
}

export default connect(mapState, mapDispatch)(EditProduct)

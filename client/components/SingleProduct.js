import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/productReducer'

export class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.fetchSingleProduct(this.props.match.params.id)
	}
	render() {
		let product = this.props.product
		if (product === undefined) {
			product = ''
		}
		return (
			<div className="container-fluid" key={product.id}>
				<div className="row align-items-start">
					<img className="product-image" src={product.imageUrl} />
				</div>
				<div className="product" key={product.id}>
					<div className="row align-items-center">
						<h4>Name: {product.name}</h4>
						<h4>Price: ${product.price / 100}</h4>
						<h4>Description: {product.description}</h4>
						<h4>Quantity: {product.stock}</h4>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({ product: state.product })

const mapDispatch = (dispatch) => {
	return {
		fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
	}
}

export default connect(mapState, mapDispatch)(SingleProduct)

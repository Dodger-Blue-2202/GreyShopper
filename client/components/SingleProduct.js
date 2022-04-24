import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Product = (props) => {
	const product = props.match
	console.log(props)
	return (
		<div className="product">
			<div className="row align-items-center">
				<h4>Name: {product.name}</h4>
				<h4>Price: ${product.price / 100}</h4>
				<h4>Description: {product.description}</h4>
				<h4>Quantity: {product.stock}</h4>
			</div>
		</div>

		// <div>
		// 	<ul>
		// 		{products.map((product) => (
		// 			<li key={product.id}>
		// 				<div>
		// 					<Link to={`/products/${product.id}`}>
		// 						<img src={product.imageUrl} />
		// 					</Link>
		// 				</div>
		// 				<h2>{product.name}</h2>
		// 				<h2>{product.price}</h2>
		// 				<h2>{product.description}</h2>
		// 				<h2>{product.stock}</h2>
		// 			</li>
		// 		))}
		// 	</ul>
		// </div>
	)
}

const mapState = (state) => ({ products: state.products })

export default connect(mapState)(Product)

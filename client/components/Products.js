import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'

const Products = (props) => {
	// const products = props.products
	const products = [
		{
			id: 1,
			name: 'Hair Brush',
			price: 400,
			description: 'Brushes more than one hair at a time!',
			stock: 7,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 2,
			name: 'A Single Spoon',
			price: 4200000,
			description: 'This is the best spoon.',
			stock: 1,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 3,
			name: 'Two Spoons',
			price: 1,
			description: 'Almost worthless.',
			stock: 43,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 4,
			name: 'Coat Hanger',
			price: 100,
			description: 'Hang your clothes on this.',
			stock: 7,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 5,
			name: 'Coffee Beans',
			price: 800,
			description: 'Questionably sourced.',
			stock: 13,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 6,
			name: 'Chode Jeans',
			price: 4000,
			description: "Size 54 waist, 10 inch legs. They're junk.",
			stock: 2,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 7,
			name: 'Black T-Shirt',
			price: 1000,
			description: "It's got 4 holes of various sizes, figure it out.",
			stock: 3,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 8,
			name: 'White T-Shirt',
			price: 1000,
			description: 'Comes pre-stained',
			stock: 3,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 9,
			name: 'Pair of Shoes',
			price: 3000,
			description:
				"We won't tell you the size or brand. You feeling lucky?",
			stock: 7,
			imageUrl: '/images/spork.jpg',
		},
		{
			id: 10,
			name: 'One Sock',
			price: 299,
			description: 'We sell them like this so you have to buy two.',
			stock: 9,
			imageUrl: '/images/spork.jpg',
		},
	]
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

const mapState = (state) => ({ products: state.products })

export default connect(mapState)(Products)

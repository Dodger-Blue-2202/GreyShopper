import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Products = (props) => (
	<ul>
		{props.products.map((product) => {
			;<Products key={product.id} {...product} />
		})}
	</ul>
)

const mapState = (state) => ({ products: state.products })

export default connect(mapStateToProps)(Products)

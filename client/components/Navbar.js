import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import Cart from '../../public/images/cart.svg'

const Navbar = ({ handleClick, isLoggedIn }) => (
	<div>
		<h1>GraceShopper</h1>
		<nav>
			<Link to="/products" className="Nav-Products">
				Products
			</Link>
			<div className="cart">
				<Link to="/signup">Sign Up</Link>
				<Link to="/login">Log in</Link>
				<Link to="/cart">
					<img src={Cart} />
				</Link>
			</div>
		</nav>
		<hr />
	</div>
)

export default Navbar //connect(mapState, mapDispatch)(Navbar)


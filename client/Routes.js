import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import Home from './components/Home'
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'
import Users from './components/Users'
import Cart from './components/Cart'
import EditProduct from './components/EditProduct'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const { isLoggedIn } = this.props

		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route path="/home" component={Home} />
						<Route exact path="/products" component={Products} />
						<Route exact path="/users" component={Users} />
						<Route
							exact
							path="/products/:id"
							component={SingleProduct}
						/>
						<Route exact path="/cart" component={Cart} />
						<Route exact path="/edit/:id" component={EditProduct} />
						<Redirect to="/home" />
					</Switch>
				) : (
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route exact path="/products" component={Products} />
						<Route exact path="/cart" component={Cart} />
						<Route
							exact
							path="/products/:id"
							component={SingleProduct}
						/>
					</Switch>
				)}
			</div>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me())
		},
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

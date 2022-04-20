import React from 'react'
import { connect } from 'react-redux'
import { Login, Signup } from './AuthForm'

/**
 * COMPONENT
 */
export const Home = (props) => {
	const { username } = props

	return (
		<div>
			<h3>Welcome, {username}</h3>
			<Products />
			{/* <Signup />
      <Login /> */}
		</div>
	)
}

/**
 * CONTAINER
 */
<<<<<<< HEAD
const mapState = (state) => {
	return {
		username: state.auth.username,
	}
=======
const mapState = state => {
  return {
    username: state.auth.username,
    isAdmin: state.auth.isAdmin
  }
>>>>>>> 9ff3064411536742853bb7e491965141006ada39
}

export default connect(mapState)(Home)

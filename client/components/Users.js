import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../store/usersReducer'

export class UsersfetchUsers extends React.Component {
	componentDidMount() {
		this.props.fetchUsers()
	}
	render() {
		const users = this.props.users
		return (
			<div className="users">
				{users.map((user) => (
					<div className="container-fluid" key={user.id}>
						{/* <div className="row align-items-center">{'   '}</div> */}
						<div className="row align-items-center">
							<h4>Username: {user.username}</h4>
							<h4>Email: {user.email}</h4>
						</div>
					</div>
				))}
			</div>
		)
	}
}

const mapState = (state) => ({ users: state.users })

const mapDispatch = (dispatch) => {
	return {
		fetchUsers: () => dispatch(fetchUsers()),
	}
}

export default connect(mapState, mapDispatch)(UsersfetchUsers)

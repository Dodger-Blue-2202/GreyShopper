//ADMIN ONLY ACCESS!!!!!!!!!!!!

import axios from 'axios'
import {setError} from './error'
import history from '../history'

const TOKEN = 'token'
const SET_USERS = 'SET_USERS'

/**
 * ACTION CREATORS
 */
const setUsers = users => ({type: SET_USERS, users})

/**
 * THUNK CREATORS
 */
// const userAuthorization = async (token) =>{
//     let res = "Guest"
//     try{
//       res = await axios.get('/auth/me', {
//       headers: {
//         authorization: token
//       }})
//       return res
//     }
//     catch(err){
//         setError(err)
//     }
// }
// export const fetchUsers = () => async dispatch => {
//   const token = window.localStorage.getItem(TOKEN)
//   //VERIFY AUTHORIZATION WITH TOKEN
//   if (token) {
//     let res = userAuthorization(token)
//     if (res.data.role ==="Admin"){
//         const res2 =  await axios.get('/api/users')
//         setUsers(res2.data)
//     }
//     //returns data of whatever user matches our token's id/authorization
//     //if user is a logged in customer then returns customer's data
//     //if user is logged in as
//   }
// }

export const logout = () => {
  history.push('/login')
  return {
    type: SET_USERS,
    users: []
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}

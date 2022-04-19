//ADMIN ONLY ACCESS!!!!!!!!!!!!

import axios from 'axios'
import {setError} from './error'
import history from '../history'

const TOKEN = 'token'
const GET_USERS = 'GET_USERS'

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try{const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })}
    catch(err){
        setError(err)
    }
    if (res.data.role ==="Admin"){
        const res2 =  await axios.get('/api/users')
        return
    }
    //returns data of whatever user matches our token's id/authorization
    //if user is a logged in customer then returns customer's data
    //if user is logged in as
  } else{
      console.log("ERROR TOKEN")
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}

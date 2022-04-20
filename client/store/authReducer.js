import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    console.log(res.data)
    return dispatch(setAuth(res.data))
    //returns data of whatever user matches our token's id/authorization
    //if user is a logged in customer then returns customer's data
    //if user is logged in as
  }
}
//if method is sign up then it passes along the sign up email and current store to initialize db for the user
// if its log in then those two values aren't needed 
export const authenticate = (username, password, method, email = "", cart = {}) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, email, cart})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
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
      console.log(action.auth)
      return action.auth //will set user and "isAdmin"
    default:
      return state
  }
}

//ADMIN ONLY ACCESS!!!!!!!!!!!!

import axios from 'axios'
import {setError} from './errorReducer'
import history from '../history'

const TOKEN = 'token'
const SET_USERS = 'SET_USERS'
const REMOVE_USER = 'REMOVE_USER'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'
/**
 * ACTION CREATORS
 */
const setUsers = users => ({type: SET_USERS, users})
const removeUser = userId => ({type: REMOVE_USER, userId})
const addUser = user => ({type: ADD_USER, user})
const editUser = user => ({type: EDIT_USER, user})
/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try{
      const res =  await axios.get('/api/users',{headers:{authentication:token}})
      //returns all users if we have admin access
      dispatch(setUsers(res.data))
    }catch(err){
      dispatch(setError("Error getting user data. Current user might not have admin access"))
    }
  }else {
    dispatch(setError("There isn't a token. No user is logged in."))
  }
}

export const deleteUser = (id) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try{
      const res =  await axios.delete(`/api/users/:${id}`,{headers:{authentication:token}})
      //deletes user if we have admin access
      dispatch(removeUser(res.data)) 
      //update store
    }catch(err){
      dispatch(setError("Error getting user data. Current user might not have admin access"))
    }
  }else {
    dispatch(setError("There isn't a token. No user is logged in."))
  }
}


export const postUser = (user) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try{
      const res =  await axios.post(`/api/users/`,{headers:{authentication:token},body:user})
      //adds user if we have admin access
      dispatch(addUser(res.data)) 
    }catch(err){
      dispatch(setError("Error getting user data. Current user might not have admin access"))
    }
  }else {
    dispatch(setError("There isn't a token. No user is logged in."))
  }
}

export const putUser = (user) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  //VERIFY AUTHORIZATION WITH TOKEN
  if (token) {
    try{
      const res =  await axios.put(`/api/users/:${user.id}`,{headers:{authentication:token},body:user})
      //adds user if we have admin access
      dispatch(editUser(res.data)) 
    }catch(err){
      dispatch(setError("Error getting user data. Current user might not have admin access"))
    }
  }else {
    dispatch(setError("There isn't a token. No user is logged in."))
  }
}


export const logout = () => {
  //clear users state when we log out of admin account
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
    case ADD_USER:
      return [...state,action.user]
    case REMOVE_USER:
      return state.filter((item)=>{return(item.id!==action.id)})
    case EDIT_USER:
      return state.map((item)=>{if (item.id===action.user.id){return (action.user)}else{return item}})
      default:
      return state
  }
}

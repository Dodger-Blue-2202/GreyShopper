const SET_ERROR = 'SET_ERROR'

export const setError = error => ({type: SET_ERROR, error})

export default function(state = {}, action) {
    switch (action.type) {
      case SET_ERROR:
        return action.error
      default:
        return state
    }
  }
  
import axios from 'axios'
import { setError } from './errorReducer'

const SET_PRODUCT = 'SET_PRODUCT'

const setProduct = (product) => ({ type: SET_PRODUCT, product })

export const fetchSingleProduct = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/products/${id}`)
		dispatch(setProduct(res.data))
	} catch (err) {
		dispatch(setError('Error getting product data.'))
	}
}

export default function (state = [], action) {
	switch (action.type) {
		case SET_PRODUCT:
			return action.product
		default:
			return state
	}
}

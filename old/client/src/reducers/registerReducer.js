import { REGISTER_FAIL, REGISTER_SUCCEED } from '../actions/types';

//This initial state will always be empty until we make a request
//to the server then we will fill it
//In REGISTER_SUCCEED will fill it with a single message
//In REGISTER_FAIL we will fill it with all the errors returned in the back-end
const initialState = {
	errors: {},
	success: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		case REGISTER_FAIL:
			return {
				...state,
				errors: action.payload
			}
		case REGISTER_SUCCEED:
			return {
				...state,
				success: action.payload
			}
		default:
			return state;
	}
}
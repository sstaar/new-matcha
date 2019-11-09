import { REGISTER_FAIL, REGISTER_SUCCEED, ACTIVATION_SUCCESS, ACTIVATION_FAIL } from '../actions/types';

//This initial state will always be empty until we make a request
//to the server then we will fill it
//In REGISTER_SUCCEED will fill it with a single message
//In REGISTER_FAIL we will fill it with all the errors returned in the back-end
const initialState = {
	errors: {},
	success: null,
	activationSuccess:null,
	activationFailure:null,
	activationLoading:true
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
		case ACTIVATION_SUCCESS:
			return {
				...state,
				activationSuccess:action.payload,
				activationLoading:false
			}
		case ACTIVATION_FAIL:
			return {
				...state,
				activationFailure:action.payload,
				activationLoading:false
			}
		default:
			return state;
	}
}
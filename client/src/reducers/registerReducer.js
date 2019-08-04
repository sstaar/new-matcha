import { REGISTER_FAIL, REGISTER_SUCCEED } from '../actions/types';

//This initial state will always be empty until we make a request
//to the server then we will fill it
//In REGISTER_SUCCEED will fill it with a single message
//In REGISTER_FAIL we will fill it with all the errors returned in the back-end
const initialState = {
	registration: {}
}

export default function(state = initialState, action) {
	console.log('in reducer');
	switch(action.type) {
		case REGISTER_FAIL:
			state.registration = action.payload
			return state;
		case REGISTER_SUCCEED:
			state.registration = action.payload
			return state;
		default:
			return state;
	}
}
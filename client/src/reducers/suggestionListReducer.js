import { SUGGESTIONS_FAILED, SUGGESTIONS_RECIEVED } from '../actions/types';

const initialState = {
	list			: {},
	loading			: true,
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch(action.type) {
		case SUGGESTIONS_FAILED:
			return {
				error		: action.payload,
				loading		: false
			};
		case SUGGESTIONS_RECIEVED:
			return {
				list		: action.payload,
				loading		: false
			}
		default:
			return state;
	}
}
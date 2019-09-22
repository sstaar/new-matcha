import { SUGGESTIONS_FAILED, SUGGESTIONS_RECIEVED } from '../actions/types';

const initialState = {
	list			: {},
	loading			: true,
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch(action.type) {
		case SUGGESTIONS_FAILED:
			state = {
				error		: action.payload,
				loading		: false
			};
			return state;
		case SUGGESTIONS_RECIEVED:
			state = {
				list		: action.payload,
				loading		: false
			}
			return state;
		default:
			return state;
	}
}
import { INFO_FAILED, INFO_RECIEVED } from '../actions/types';

const initialState = {
	info			: {},
	loading			: true,
	error			: null
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch(action.type) {
		case INFO_FAILED:
			state = {
				error		: action.payload,
				loading		: false
			};
			return state;
		case INFO_RECIEVED:
			state = {
				info		: action.payload,
				tags		: action.tags,
				loading		: false
			}
			return state;
		default:
			return state;
	}
}
import { INFO_FAILED, INFO_RECIEVED } from '../actions/types';

const initialState = {
	info			: {},
	error			: null
};

export default function (state = initialState, action) {
	switch(action.type) {
		case INFO_FAILED:
			state = {
				error: action.payload
			};
			return state;
		case INFO_RECIEVED:
			state = {
				info: action.payload
			}
			return state;
		default:
			return state;
	}
}
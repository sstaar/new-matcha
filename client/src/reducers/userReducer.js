import { INFO_FAILED, INFO_RECIEVED, ADD_TAG, ADD_TAG_FAILED, REMOVE_TAG, UPDATE_INFO } from '../actions/types';

const initialState = {
	info			: {},
	tags			: {},
	loading			: true,
	error			: null
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch(action.type) {
		case INFO_FAILED:
			return {
				error		: action.payload,
				loading		: false
			};
		case INFO_RECIEVED:
			return {
				info		: action.payload,
				tags		: action.tags,
				loading		: false
			}
		case UPDATE_INFO:
			return{
				...state,
				tags:[ ...state.tags ],
				info: { ...state.info, ...action.payload }
			}
		case ADD_TAG:
			return {
				...state,
				info : { ...state.info },
				tags :[ ...state.tags, action.payload ]
			};
		case REMOVE_TAG:
			return {
				...state,
				info : { ...state.info },
				tags :[ ...action.payload ]
			}
		default:
			return state;
	}
}
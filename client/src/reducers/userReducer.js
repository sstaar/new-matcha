import { INFO_FAILED, INFO_RECIEVED, ADD_TAG, ADD_TAG_FAILED, REMOVE_TAG, REMOVE_IMG, ADD_IMG, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL } from '../actions/types';

const initialState = {
	info: {},
	tags: {},
	loading: true,
	errors: {},
	tagError: null
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch (action.type) {
		case REMOVE_IMG:
			return {
				...state,
				info: {
					...state.info,
					images: state.info.images.filter((img) => img.id !== action.payload)
				}
			};
		case ADD_IMG:
			return {
				...state,
				info: {
					...state.info,
					images: [...state.info.images, action.payload]
				}
			};
		case INFO_FAILED:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case INFO_RECIEVED:
			return {
				...state,
				info: action.payload,
				tags: action.tags,
				loading: false
			}
		case UPDATE_INFO_SUCCESS:
			return {
				...state,
				info: { ...state.info, ...action.payload }
			}
		case UPDATE_INFO_FAIL:
			return {
				...state,
				errors: action.payload
			}
		case ADD_TAG:
			return {
				...state,
				tags: [...state.tags, action.payload]
			};
		case ADD_TAG_FAILED:
			return {
				...state,
				tagError: action.payload
			}
		case REMOVE_TAG:
			return {
				...state,
				tags: [...action.payload]
			}
		default:
			return state;
	}
}
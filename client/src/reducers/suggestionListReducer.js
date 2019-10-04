import {
	SUGGESTIONS_FAILED,
	SUGGESTIONS_RECIEVED,
	SUGGESTIONS_SORT_AGE,
	SUGGESTIONS_SORT_DISTANCE,
	SUGGESTIONS_SORT_FAME
} from '../actions/types';

const initialState = {
	list: [],
	loading: true,
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch (action.type) {
		case SUGGESTIONS_FAILED:
			return {
				error: action.payload,
				loading: false
			};
		case SUGGESTIONS_SORT_AGE:
			return {
				...state,
				list: state.list.sort((user1, user2) => {
					return ((user1.age - user2.age) * action.payload);
				})
			}
		case SUGGESTIONS_SORT_DISTANCE:
			return {
				...state,
				list: state.list.sort((user1, user2) => {
					return ((user1.distance - user2.distance) * action.payload);
				})
			}
		case SUGGESTIONS_SORT_FAME:
			return {
				...state,
				list: state.list.sort((user1, user2) => {
					return ((user1.fame_rating - user2.fame_rating) * action.payload);
				})
			}
		case SUGGESTIONS_RECIEVED:
			return {
				list: action.payload,
				loading: false
			}
		default:
			return state;
	}
}
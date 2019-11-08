import {
	SUGGESTIONS_FAILED,
	SUGGESTIONS_RECIEVED,
	SUGGESTIONS_SORT_AGE,
	SUGGESTIONS_SORT_DISTANCE,
	SUGGESTIONS_SORT_FAME,
	SUGGESTIONS_SORT_COMMON_TAGS,
	SUGGESTIONS_FILTER
} from '../actions/types';

const initialState = {
	list: [],
	loading: true,
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch (action.type) {
		case SUGGESTIONS_FILTER:
			return {
				...state,
				list: state.list.filter((user) => {
					if (action.payload.age && user.age > action.payload.age)
						return false;
					else if (action.payload.distance && user.distance > action.payload.distance)
						return false
					else if (action.payload.fame && user.fame_rating > action.payload.fame)
						return false;
					else if (action.payload.commonTags && user.commonTagsCount > action.payload.commonTags)
						return false;
					return true;
				})
			}
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
		case SUGGESTIONS_SORT_COMMON_TAGS:
			return {
				...state,
				list: state.list.sort((user1, user2) => {
					return ((user1.commonTagsCount - user2.commonTagsCount) * action.payload);
				})
			}
		case SUGGESTIONS_RECIEVED:
			return {
				list: action.payload,
				loading: false
			}
		case SUGGESTIONS_FAILED:
			return {
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
import {
	CHANGE_SELECTED_TAGS,
	GET_SEARCH_OPTIONS,
	SEARCH_SORT_AGE,
	SEARCH_SORT_FAME,
	SEARCH_SORT_DISTANCE,
	SET_SEARCH_DATA_SUCCESS,
	SET_SEARCH_DATA_FAIL,
	GET_SEARCH_IMAGE_SUCCESS
} from "../actions/types";

const initialState = {
	searchData: {
		ageGap: 50,
		distanceGap: 50,
		fameGap: 50,
		tags: [],
		selectedTags: [],
		loading: true
	},
	searchRes: [],
	userImage: null,
	error: null
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SEARCH_IMAGE_SUCCESS:
			return {
				...state,
				userImage: action.payload
			}
		case SEARCH_SORT_AGE:
			if (state.searchRes.length === 0) return { ...state };
			return {
				...state,
				searchData: {
					...state.searchData,
					tags: [...state.searchData.tags],
					selectedTags: [...state.searchData.selectedTags]
				},
				searchRes: state.searchRes.sort((user1, user2) => {
					return (user1.age - user2.age) * action.payload;
				})
			};
		case SEARCH_SORT_DISTANCE:
			if (state.searchRes.length === 0) return { ...state };
			return {
				...state,
				searchRes: state.searchRes.sort((user1, user2) => {
					return (user1.distance - user2.distance) * action.payload;
				})
			};
		case SEARCH_SORT_FAME:
			if (state.searchRes.length === 0) return { ...state };
			return {
				...state,
				searchData: {
					...state.searchData,
					tags: [...state.searchData.tags],
					selectedTags: [...state.searchData.selectedTags]
				},
				searchRes: state.searchRes.sort((user1, user2) => {
					return (user1.fame_rate - user2.fame_rate) * action.payload;
				})
			};
		case GET_SEARCH_OPTIONS:
			return {
				...state,
				searchData: {
					...state.searchData,
					...action.payload,
					loading: false
				}
			};
		case CHANGE_SELECTED_TAGS:
			return {
				...state,
				searchData: {
					...state.searchData,
					selectedTags: action.payload
				}
			};
		case SET_SEARCH_DATA_SUCCESS:
			return {
				...state,
				searchRes: [...action.payload],
				errors: {}
			};
		case SET_SEARCH_DATA_FAIL:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}

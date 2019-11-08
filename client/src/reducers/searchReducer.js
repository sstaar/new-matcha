import {
    CHANGE_SELECTED_TAGS,
    GET_SEARCH_OPTIONS,
    SEARCH_SORT_AGE,
    SEARCH_SORT_FAME,
    SEARCH_SORT_DISTANCE,
    SET_SEARCH_DATA_SUCCESS,
    SET_SEARCH_DATA_FAIL
} from '../actions/types';

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
    error: null
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_SORT_AGE:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    tags: [...state.searchData.tags],
                    selectedTags: [...state.searchData.selectedTags],
                },
                searchRes: state.searchRes.sort((user1, user2) => {
                    return ((user1.age - user2.age) * action.payload);
                })
            }
        case SEARCH_SORT_DISTANCE:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    tags: [...state.searchData.tags],
                    selectedTags: [...state.searchData.selectedTags],
                },
                searchRes: state.searchRes.sort((user1, user2) => {
                    return ((user1.distance - user2.distance) * action.payload);
                })
            }
        case SEARCH_SORT_FAME:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    tags: [...state.searchData.tags],
                    selectedTags: [...state.searchData.selectedTags],
                },
                searchRes: state.searchRes.sort((user1, user2) => {
                    return ((user1.fame_rate - user2.fame_rate) * action.payload);
                })
            }
        case GET_SEARCH_OPTIONS:
            return {
                searchRes: {},
                errors: {},
                searchData: {
                    ...state.searchData,
                    tags: action.payload,
                    loading: false
                }
            };
        case CHANGE_SELECTED_TAGS:
            return {
                searchRes: { ...state.searchRes },
                errors: {},
                searchData: {
                    ...state.searchData,
                    selectedTags: action.payload
                }
            };
        case SET_SEARCH_DATA_SUCCESS:
            return {
                searchData: {
                    ...state.searchData,
                    tags: [...state.searchData.tags],
                    selectedTags: [...state.searchData.selectedTags],
                },
                searchRes: [...action.payload],
                errors: {}
            };
        case SET_SEARCH_DATA_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}
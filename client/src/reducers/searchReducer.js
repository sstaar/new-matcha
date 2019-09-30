import { CHANGE_SELECTED_TAGS, SET_SEARCH_DATA, GET_SEARCH_OPTIONS } from '../actions/types';

const initialState = {
    searchData: {
        ageGap: 50,
        distanceGap: 50,
        tags: [],
        selectedTags: [],
        loading: true
    },
    searchRes: [],
    errors: {}
};

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
    switch (action.type) {
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
        case SET_SEARCH_DATA:
            return {
                searchData: {
                    ...state.searchData,
                    tags: [ ...state.searchData.tags ],
                    selectedTags: [ ...state.searchData.selectedTags ],
                },
                searchRes: [ ...action.payload ],
                errors: {}
            };
        default:
            return state;
    }
}
import { VISIT_USER, BLOCK_USER } from '../actions/types';

const initialState = { loading: true };

//The user reducer is for dealing with user informations
export default function (state = initialState, action) {
	switch(action.type) {
        case VISIT_USER:
            return {
                ...action.payload,
                loading: false
            };
        case BLOCK_USER:
            return {
                loading:false,
                error: 'Error 404 user not found.'
            }
		default:
			return state;
	}
}
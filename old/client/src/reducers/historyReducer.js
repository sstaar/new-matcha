import { RECEIVE_HISTORY } from '../actions/types';

var initialState = {
    history:[],
    loading:true
}

export default function(state = initialState, action) {
	switch(action.type) {
        case RECEIVE_HISTORY:
            return {
                history: action.payload,
                loading:false
            }
		default:
			return state;
	}
}
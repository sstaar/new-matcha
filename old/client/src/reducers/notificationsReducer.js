import { RECEIVE_NOTIFICATIONS } from '../actions/types';

var initialState = {
    notifications:[],
    loading:true
}

export default function(state = initialState, action) {
	switch(action.type) {
        case RECEIVE_NOTIFICATIONS:
            return {
                notifications: action.payload,
                loading:false
            }
		default:
			return state;
	}
}
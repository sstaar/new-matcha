import { LOGIN_FAIL, LOGIN_SUCCEED, LOGOUT } from '../actions/types';


//Pulling the informations from the local storage
//In the user browser and initiating the redux store with it
//We will have to change the method later on for more security
let token = window.localStorage.getItem('token');
let connected = window.localStorage.getItem('connected');

const initialState = {
	token			: token,
	connected		: connected === "true" ? true : false,
	errors			: {}
}

//In login_success we store the informations for latter extraction
//In login_failure or logout we set everything to null
export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCEED:
			window.localStorage.setItem('token', action.payload.token);
			window.localStorage.setItem('connected', true);
			state = {
				token			: action.payload.token,
				username		:action.payload.username,
				connected		: true
			}
			return state;
		case LOGIN_FAIL:
			window.localStorage.setItem('token', null);
			window.localStorage.setItem('connected', false);
			// /state.errors = action.payload;
			state = {
				token			: null,
				connected		: false,
				errors			: action.payload
			};
			return state
		case LOGOUT:
			window.localStorage.setItem('token', null);
			window.localStorage.setItem('connected', false);
			state = {
				token			: null,
				connected		: false,
				errors			: {}
			};
			return state;
		default:
			return state;
	}
}
import { LOGIN_FAIL, LOGIN_SUCCEED, LOGOUT } from '../actions/types';

let token = window.localStorage.getItem('token');
let connected = window.localStorage.getItem('connected');

const initialState = {
	token			: token,
	connected		: connected === "true" ? true : false,
	errors			: {}
}

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
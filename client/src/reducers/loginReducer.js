import { LOGIN_FAIL, LOGIN_SUCCEED, LOGOUT, TOKEN_ERROR, TOKEN_ERROR_REMOVE } from "../actions/types";

//Pulling the informations from the local storage
//In the user browser and initiating the redux store with it
//We will have to change the method later on for more security
let token = window.localStorage.getItem("token");
let connected = window.localStorage.getItem("connected");

const initialState = {
	token: token,
	connected: connected === "true" ? true : false,
	errors: {},
	tokenError: null
};

//In login_success we store the informations for latter extraction
//In login_failure or logout we set everything to null
export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCEED:
			window.localStorage.setItem("token", action.payload.token);
			window.localStorage.setItem("connected", true);
			return {
				token: action.payload.token,
				username: action.payload.username,
				connected: true
			};
		case LOGIN_FAIL:
			window.localStorage.setItem("token", null);
			window.localStorage.setItem("connected", false);
			return {
				token: null,
				connected: false,
				errors: action.payload
			};
		case LOGOUT:
			window.localStorage.setItem("token", null);
			window.localStorage.setItem("connected", false);
			return {
				token: null,
				connected: false,
				errors: {}
			};
		case TOKEN_ERROR:
			return {
				...state,
				tokenError: action.payload
			}
		case TOKEN_ERROR_REMOVE:
			return {
				...state,
				tokenError: null
			}
		default:
			return state;
	}
}

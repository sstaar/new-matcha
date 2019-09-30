import { LOGIN_FAIL, LOGIN_SUCCEED } from './types';
import axios from 'axios';


//In case of login success we send a token and the username
//To the userReducer to store the token
//In case of failure we send the errors to the userReducer 
//To affect them in the form
export const login = async (info) => {
	let res = await axios.post('http://localhost:5000/api/login', info);

	if (res.data.errors) {
		return {
			type		: LOGIN_FAIL,
			payload		: res.data.errors
		};
	}
	else {
		return {
			type		: LOGIN_SUCCEED,
			payload: {
				token		: res.data.token,
				username	: res.data.username
			}
		}
	}
};
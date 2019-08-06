import { LOGIN_FAIL, LOGIN_SUCCEED } from './types';
import axios from 'axios';

export const login = async (info) => {
	let res = await axios.post('http://localhost:5000/api/login', info);

	console.log('in action');
	if (res.data.error_username || res.data.error_password) {
		return {
			type		: LOGIN_FAIL,
			payload		: res.data
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
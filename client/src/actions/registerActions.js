import { REGISTER_FAIL, REGISTER_SUCCEED } from './types';
import axios from 'axios';


//The dispatch function that we use in the componenets always takes in  a function
//That returns an object containing the type and the payload
//We can change the names (type and payload) Its just a fitting name
export const register = async (info) => {

	let res = await axios.post('http://localhost:5000/api/register', info);
	let respo = {};
	console.log('in action');
	if (res.data.errors)
		return {
			type: REGISTER_FAIL,
			payload: res.data.errors
		};
	else
		return {
			type: REGISTER_SUCCEED,
			payload: res.data.success
		};
};
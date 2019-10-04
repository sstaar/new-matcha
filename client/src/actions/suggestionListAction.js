import {
	SUGGESTIONS_FAILED,
	SUGGESTIONS_RECIEVED,
} from './types';
import axios from 'axios';


//The request to the back-end server will take the token
//Extract the userId embeded in the token and return the user suggestion list
//In case there is a problem with the token the response will containe an error
export const suggestionsList = async () => {
	const token = window.localStorage.getItem('token');

	const list = await axios.post('http://localhost:5000/api/matching/suggestion', { token: token });

	console.log('list');

	if (list.error)
		return {
			type: SUGGESTIONS_FAILED,
			payload: list.data.error
		};
	else
		return {
			type: SUGGESTIONS_RECIEVED,
			payload: list.data
		};
}

export const reactToUser = async (target, reaction) => {
	const token = window.localStorage.getItem('token');

	let res = await axios.post('http://localhost:5000/api/matching/relation',
		{ token: token, target, relation: reaction });
	const list = await axios.post('http://localhost:5000/api/matching/suggestion', { token: token });
	console.log(res.data);
	if (list.error)
		return {
			type: SUGGESTIONS_FAILED,
			payload: list.data.error
		};
	else
		return {
			type: SUGGESTIONS_RECIEVED,
			payload: list.data
		};
}
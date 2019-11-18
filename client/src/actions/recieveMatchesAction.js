import { SEND_MESSAGE, RECIEVE_MATCHES, HOST } from './types';
import axios from 'axios';

export const recieveMatches = async () => {
	const token = window.localStorage.getItem('token');

	const matches = await axios.post(`${HOST}/matching/getmatches`, { token: token });

	return {
		type: RECIEVE_MATCHES,
		payload: matches.data
	};
}
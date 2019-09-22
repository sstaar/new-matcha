import { SEND_MESSAGE, RECIEVE_MATCHES } from './types';
import axios from 'axios';

export const userInfo = async () => {
	const token = window.localStorage.getItem('token');

	const matches = await axios.post('http://localhost:5000/api/matching/getmatches', { token:token });

	if (info.error || tags.data.error)
		return {
			type: INFO_FAILED,
			payload:info.data.error
		};
	else
		return {
			type:INFO_RECIEVED,
			payload:info.data,
			tags:tags.data
		};
}
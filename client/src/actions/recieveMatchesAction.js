import { SEND_MESSAGE, RECIEVE_MATCHES } from './types';
import axios from 'axios';

export const recieveMatches = async () => {
	const token = window.localStorage.getItem('token');

	const matches = await axios.post('http://localhost:5000/api/matching/getmatches', { token:token });

    return {
        type: RECIEVE_MATCHES,
        payload:matches.data
    };
}
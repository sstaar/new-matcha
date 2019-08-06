import { INFO_FAILED, INFO_RECIEVED } from './types';
import axios from 'axios';

export const userInfo = async () => {
	const token = window.localStorage.getItem('token');

	const info = await axios.post('http://localhost:5000/api/info/general', { token:token });

	if (info.error)
		return {
			type: INFO_FAILED,
			payload:info.data.error
		};
	else
		return {
			type:INFO_RECIEVED,
			payload:info.data
		};
}
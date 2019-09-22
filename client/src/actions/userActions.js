import { INFO_FAILED, INFO_RECIEVED } from './types';
import axios from 'axios';


//The request to the back-end server will take the token
//Extract the userId embeded in the token and return the user informations
//In case there is a problem with the token the response will containe an error
export const userInfo = async () => {
	const token = window.localStorage.getItem('token');

	const info = await axios.post('http://localhost:5000/api/info/general', { token:token });
	const tags = await axios.post('http://localhost:5000/api/info/gettags', { token:token });

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
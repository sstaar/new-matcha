import { INFO_FAILED, INFO_RECIEVED } from './types';
import axios from 'axios';


//The request to the back-end server will take the token
//Extract the userId embeded in the token and return the user informations
//In case there is a problem with the token the response will containe an error
export const userInfo = async () => {
	const token = window.localStorage.getItem('token');

	const info = await axios.post('http://e1r4p14.1337.ma:5000/api/info/general', { token:token });

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
import { SEND_MESSAGE, RECIEVE_MATCHES } from './types';

export const sendMessage = (message, receiver) => {
	const token = window.localStorage.getItem('token');

	return {
		type: SEND_MESSAGE,
		payload:{
			token: token,
			receiver: receiver,
			message: message
		}
	};
}
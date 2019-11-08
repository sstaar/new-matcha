import { NEW_MESSAGE, RECEIVE_CONVO, SET_RECEIVER } from './types';
import axios from 'axios';



export const newMessage = (message) => {
	const token = window.localStorage.getItem('token');

	return {
		type: NEW_MESSAGE,
		payload:message
	};
}

export const recieveConvo = async (target) => {
	const token = window.localStorage.getItem('token');
	const convo = await axios.post('http://localhost:5000/api/messages/getconversation', { token, target });
	return {
		type: RECEIVE_CONVO,
		payload: convo.data,
	}
}

export const setReceiver = (receiver) => {
	return {
		type: SET_RECEIVER,
		payload:receiver
	}
}
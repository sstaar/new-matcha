import { RECEIVE_NOTIFICATIONS, ACTIVATE_SOCKET, HOST } from './types';

import axios from 'axios';

export const recieveNotifications = async () => {
	const token = window.localStorage.getItem('token');

	const notifs = await axios.post(`${HOST}/notifications/getnotifs`, { token: token });

	return {
		type: RECEIVE_NOTIFICATIONS,
		payload: notifs.data
	};
}

export const activateSocket = () => {
	return {
		type: ACTIVATE_SOCKET
	};
}
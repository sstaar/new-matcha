import { RECEIVE_NOTIFICATIONS } from './types';

import axios from 'axios';

export const recieveNotifications = async () => {
	const token = window.localStorage.getItem('token');

	const notifs = await axios.post('http://localhost:5000/api/notifications/getnotifs', { token:token });

    return {
        type: RECEIVE_NOTIFICATIONS,
        payload: notifs.data
    };
}
import { RECEIVE_HISTORY } from './types';

import axios from 'axios';

export const recieveHistory = async () => {
	const token = window.localStorage.getItem('token');

	const notifs = await axios.post('http://localhost:5000/api/notifications/gethistory', { token:token });

    return {
        type: RECEIVE_HISTORY,
        payload: notifs.data
    };
}
import { HOST, VISIT_USER, BLOCK_USER, UNLIKE_USER_SECCESS, UNLIKE_USER_FAIL, REPORT_USER } from './types';
import axios from 'axios';

export const visitUser = async (target) => {
	const token = window.localStorage.getItem('token');

	const user = await axios.post(`${HOST}/search/getuser`, { token, target });

	return {
		type: VISIT_USER,
		payload: user.data
	};
};

export const blockUser = async (target) => {
	const token = window.localStorage.getItem('token');

	await axios.post(`${HOST}/block/blockuser`, { token, target });

	return {
		type: BLOCK_USER
	}
};

export const reportUser = async (target) => {
	const token = window.localStorage.getItem('token');

	await axios.post(`${HOST}/block/reportuser`, { token, target });

	return {
		type: REPORT_USER
	}
};

export const unLikeUser = async (target) => {
	const token = window.localStorage.getItem('token');

	try {
		let response = await axios.post(`${HOST}/matching/unlike`, { token, target });
		if (response.data.error)
			return {
				type: UNLIKE_USER_FAIL
			}
		return {
			type: UNLIKE_USER_SECCESS
		}
	} catch (error) {
		return {
			type: UNLIKE_USER_FAIL
		}
	}
};

export const removeDislike = async (target) => {
	const token = window.localStorage.getItem('token');

	try {
		let response = await axios.post(`${HOST}/matching/removedislike`, { token, target });
		if (response.data.error)
			return {
				type: UNLIKE_USER_FAIL
			}
		return {
			type: UNLIKE_USER_SECCESS
		}
	} catch (error) {
		return {
			type: UNLIKE_USER_FAIL
		}
	}
};
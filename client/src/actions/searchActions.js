import { GET_SEARCH_OPTIONS, CHANGE_SELECTED_TAGS, SET_SEARCH_DATA_SUCCESS, SET_SEARCH_DATA_FAIL, GET_SEARCH_IMAGE_SUCCESS, GET_SEARCH_IMAGE_FAIL } from './types';
import axios from 'axios';

export const getSearchOptions = async () => {
	const token = window.localStorage.getItem('token');

	const tags = await axios.post('http://localhost:5000/api/search/getsearchoptions', { token: token });

	if (tags.data.error)
		return;
	return {
		type: GET_SEARCH_OPTIONS,
		payload: tags.data
	};
};

export const changeSelectedTags = async (tags) => {
	return {
		type: CHANGE_SELECTED_TAGS,
		payload: tags
	}
}

export const searchRequest = async (info) => {
	const token = window.localStorage.getItem('token');

	try {
		let res = await axios.post('http://localhost:5000/api/search/search', { ...info, token });
		console.log("SEARCH")
		console.log(res);
		if (res.data.error)
			return {
				type: SET_SEARCH_DATA_FAIL,
				payload: res.data.error
			}
		return {
			type: SET_SEARCH_DATA_SUCCESS,
			payload: res.data
		};
	} catch (error) {
		return {
			type: SET_SEARCH_DATA_SUCCESS,
			payload: "SERVER ERROR."
		};
	}
};

export const getSearchImage = async (imgId) => {
	const token = window.localStorage.getItem('token');

	try {
		let response = await axios.post('http://localhost:5000/api/info/serveimg', { token, imgId })
		return {
			type: GET_SEARCH_IMAGE_SUCCESS,
			payload: response.data.img
		}
	} catch (error) {
		return {
			type: GET_SEARCH_IMAGE_FAIL
		}
	}
}
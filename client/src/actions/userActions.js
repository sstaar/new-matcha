import { INFO_FAILED, INFO_RECIEVED, ADD_TAG, ADD_TAG_FAILED, REMOVE_TAG, UPDATE_INFO } from './types';
import axios from 'axios';


//The request to the back-end server will take the token
//Extract the userId embeded in the token and return the user informations
//In case there is a problem with the token the response will containe an error
export const userInfo = async () => {
	const token = window.localStorage.getItem('token');

	const info = await axios.post('http://localhost:5000/api/info/general', { token:token });
	const tags = await axios.post('http://localhost:5000/api/info/getusertags', { token:token });

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
};

export const updateInfo = async (newInfo) => {
	const token = window.localStorage.getItem('token');

	await axios.post('http://localhost:5000/api/info/edit', {...newInfo, token});

	
	return {
		type: UPDATE_INFO,
		payload:newInfo
	}
}

export const addTag = async (newtag) => {
	const token = window.localStorage.getItem('token');

	let res = await axios.post('http://localhost:5000/api/info/addtag', { token, tag: newtag });

	if (res.data.error)
		return {
			type: ADD_TAG_FAILED
		}

		let newer = {
			tagname: newtag,
			tagid: res.data.id
		};

		return {
			type:ADD_TAG,
			payload:newer
		}
};

export const removeTag = async (tags, tagid) => {
	const token = window.localStorage.getItem('token');

	await axios.post('http://localhost:5000/api/info/removetag', { token, tagid: tagid });

		console.log(tagid);
		let newtags = [];
		tags.forEach(element => {
			if (element.tagid !== tagid)
				newtags = [...newtags, element]
		});
		return {
			type: REMOVE_TAG,
			payload: newtags
		};
};
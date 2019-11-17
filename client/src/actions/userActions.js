import { INFO_FAILED, INFO_RECIEVED, ADD_TAG, ADD_TAG_FAILED, REMOVE_TAG, REMOVE_IMG, ADD_IMG, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL, RESET_LOCATION_FAIL, RESET_LOCATION_SUCCESS } from './types';
import axios from 'axios';
import PublicIp from 'public-ip'


//The request to the back-end server will take the token
//Extract the userId embeded in the token and return the user informations
//In case there is a problem with the token the response will containe an error
export const userInfo = async () => {
	const token = window.localStorage.getItem('token');

	const info = await axios.post('http://localhost:5000/api/info/general', { token: token });
	const tags = await axios.post('http://localhost:5000/api/info/getusertags', { token: token });

	if (info.error || tags.data.error)
		return {
			type: INFO_FAILED,
			payload: info.data.error
		};
	else
		return {
			type: INFO_RECIEVED,
			payload: info.data,
			tags: tags.data
		};
};

export const updateInfo = async (newInfo) => {
	const token = window.localStorage.getItem('token');

	try {
		let response = await axios.post('http://localhost:5000/api/info/edit', { ...newInfo, token });

		if (response.data.errors)
			return {
				type: UPDATE_INFO_FAIL,
				payload: response.data.errors
			};
		return {
			type: UPDATE_INFO_SUCCESS,
			payload: newInfo
		}
	} catch (error) {
		return {
			type: UPDATE_INFO_FAIL,
			payload: "SERVER ERRROR"
		};
	}

}

export const addTag = async (newtag) => {
	const token = window.localStorage.getItem('token');

	try {


		let res = await axios.post('http://localhost:5000/api/info/addtag', { token, tag: newtag });

		console.log(res);
		if (res.data.error)
			return {
				type: ADD_TAG_FAILED,
				payload: res.data.error
			}

		return {
			type: ADD_TAG,
			payload: {
				tagname: newtag,
				tagid: res.data.id
			}
		}
	} catch (error) {
		return {
			type: ADD_TAG_FAILED,
			payload: "Something is wrong."
		}
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

export const removeImg = async (imageId) => {
	const token = window.localStorage.getItem('token');

	await axios.post('http://localhost:5000/api/info/removeimg', { token, imageId });


	return {
		type: REMOVE_IMG,
		payload: imageId
	}
};

export const addImg = async (formData) => {

	const token = window.localStorage.getItem('token');

	formData.append('token', token);
	try {
		let img = await axios({
			url: 'http://localhost:5000/api/info/uploadimg',
			data: formData,
			method: 'POST',
			params: {
				token
			},
			contentType: false,
			processData: false,
		})
		img = img.data;

		console.log(img)

		if (!img.warning || !img.error)
			return {
				type: ADD_IMG,
				payload: {
					path: null/*base64*/,
					id: img.id
				}
			}

	} catch (error) {
		return {
			type: ADD_IMG,
			payload: {
				path: '/imgs/user.png',
				id: Date.now()
			}
		}
	}

};

export const resetLocation = async (latitude, longitude) => {
	let ip = await PublicIp.v4();
	const token = window.localStorage.getItem('token');

	try {
		let response = await axios.post('http://localhost:5000/api/info/resetloc', { latitude, longitude, ip, token })

		if (response.errors)
			return {
				type: RESET_LOCATION_FAIL,
				payload: response.errors
			}
		return {
			type: RESET_LOCATION_SUCCESS,
			payload: response.data
		}
	} catch (error) {
		return {
			type: RESET_LOCATION_FAIL,
			payload: "Something is wrong."
		}
	}
}

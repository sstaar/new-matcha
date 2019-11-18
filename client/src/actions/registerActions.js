import {
	REGISTER_FAIL,
	REGISTER_SUCCEED,
	ACTIVATION_FAIL,
	ACTIVATION_SUCCESS,
	SEND_RESET_PASSWORD_FAIL,
	SEND_RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	HOST
} from "./types";
import axios from "axios";

//The dispatch function that we use in the componenets always takes in  a function
//That returns an object containing the type and the payload
//We can change the names (type and payload) Its just a fitting name
export const register = async info => {
	console.log(info);
	let res = await axios.post(`${HOST}/register`, info);
	if (res.data.errors)
		return {
			type: REGISTER_FAIL,
			payload: res.data.errors
		};
	else
		return {
			type: REGISTER_SUCCEED,
			payload: res.data.success
		};
};

export const validateEmail = async token => {
	try {
		let res = await axios.get(
			`${HOST}/validateEmail/` + token
		);
		if (res.data.error)
			return {
				type: ACTIVATION_FAIL,
				payload: res.data.error
			};
		return {
			type: ACTIVATION_SUCCESS,
			payload: res.data.success
		};
	} catch (error) {
		return {
			type: ACTIVATION_FAIL,
			payload: "SERVER ERROR."
		};
	}
};

export const sendResetPassword = async info => {
	try {
		let res = await axios.post(
			`${HOST}/resetPassword/`,
			info
		);

		console.log(res.data);
		if (res.data.errors)
			return {
				type: SEND_RESET_PASSWORD_FAIL,
				payload: res.data.errors
			};
		return {
			type: SEND_RESET_PASSWORD_SUCCESS,
			payload: res.data.success
		};
	} catch (error) {
		return {
			type: ACTIVATION_FAIL,
			payload: "SERVER ERROR."
		};
	}
};

export const resetPassword = async info => {
	try {
		let res = await axios.post(
			`${HOST}/resetChangePassword/`,
			info
		);
		if (res.data.errors)
			return {
				type: RESET_PASSWORD_FAIL,
				payload: res.data.errors
			};
		return {
			type: RESET_PASSWORD_SUCCESS,
			payload: res.data.success
		};
	} catch (error) {
		return {
			type: RESET_PASSWORD_FAIL,
			payload: "SERVER ERROR"
		};
	}
};

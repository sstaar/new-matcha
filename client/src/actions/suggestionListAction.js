import {
	SUGGESTIONS_FAILED,
	SUGGESTIONS_RECIEVED,
	SUGGESTIONS_REACT_SUCCESS,
	SUGGESTIONS_REACT_FAIL,
	GET_IMG_FAIL,
	GET_IMG_SUCCESS,
	HOST
} from "./types";
import axios from "axios";

//The request to the back-end server will take the token
//Extract the userId embeded in the token and return the user suggestion list
//In case there is a problem with the token the response will containe an error
export const suggestionsList = async () => {
	const token = window.localStorage.getItem("token");

	const list = await axios.post(
		`${HOST}/matching/suggestion`,
		{ token: token }
	);

	if (list.error)
		return {
			type: SUGGESTIONS_FAILED,
			payload: list.data.error
		};
	else
		return {
			type: SUGGESTIONS_RECIEVED,
			payload: list.data
		};
};

export const reactToUser = async (target, reaction) => {
	const token = window.localStorage.getItem("token");

	try {
		let res = await axios.post(`${HOST}/matching/relation`, {
			token: token,
			target: target.id,
			relation: reaction
		});
		if (res.data.error)
			return {
				type: SUGGESTIONS_REACT_FAIL
			}
		return {
			type: SUGGESTIONS_REACT_SUCCESS,
			payload: target
		};
	} catch (error) {
		return {
			type: SUGGESTIONS_REACT_FAIL
		};
	}
};



export const getImage = async (imgId) => {
	const token = window.localStorage.getItem('token');

	try {
		let response = await axios.post(`${HOST}/info/serveimg`, { token, imgId })
		return {
			type: GET_IMG_SUCCESS,
			payload: response.data.img
		}
	} catch (error) {
		return {
			type: GET_IMG_FAIL
		}
	}
}
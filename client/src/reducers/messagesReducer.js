import { NEW_MESSAGE, RECIEVE_MATCHES, RECEIVE_CONVO, SET_RECEIVER } from '../actions/types';

import io from "socket.io-client";

let token = window.localStorage.getItem('token');
let connected = window.localStorage.getItem('connected');

var initialState = {
	matches: {},
	socket: null,
	receiver: {},
	messages: {
		messages: {},
		loading: true
	}
}
var socket = null;

if (connected === "true") {
	socket = io(':5000', { query: 'token=' + token });
	initialState = {
		matches: {
			users: {},
			loading: true
		},
		socket: socket,
		receiver: {},
		messages: {
			messages: {},
			loading: true
		}
	}
}

export default function (state = initialState, action) {
	switch (action.type) {
		case RECIEVE_MATCHES:
			return {
				...state,
				matches: {
					users: action.payload,
					loading: false
				}
			}
		case NEW_MESSAGE:
			return {
				...state,
				matches: { ...state.matches },
				receiver: { ...state.receiver },
				messages: {
					...state.messages,
					messages: [
						...state.messages.messages,
						action.payload
					]
				}
			}
		case RECEIVE_CONVO:
			return {
				...state,
				receiver: { ...state.receiver },
				messages: {
					messages: action.payload,
					loading: false
				}
			}
		case SET_RECEIVER:
			return {
				...state,
				matches: { ...state.matches },
				receiver: action.payload,
				messages: {
					messages: {},
					loading: true
				}
			}
		default:
			return state;
	}
}
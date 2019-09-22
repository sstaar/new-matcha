'use strict'
import { SEND_MESSAGE, RECIEVE_MATCHES } from '../actions/types';

import io from "socket.io-client";

let token = window.localStorage.getItem('token');
let connected = window.localStorage.getItem('connected');

const initialState = {};

if (connected) {
    const socket = io(':5000', { query: 'token=' + token });
    socket.emit('user1|user2', 'hello');
    socket.on('message', (msg) => {
        console.log(msg);
    });

    const initialState = {
        matches: {},
        socket: socket,
        messages: {}
    }
}

export default function(state = initialState, action) {
	switch(action.type) {
        case RECIEVE_MATCHES:
            state = {
                ...state,
                matches:action.payload
            }
            return state;
		default:
			return state;
	}
}
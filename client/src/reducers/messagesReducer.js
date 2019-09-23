'use strict'
import { SEND_MESSAGE, RECIEVE_MATCHES } from '../actions/types';

import io from "socket.io-client";

let token = window.localStorage.getItem('token');
let connected = window.localStorage.getItem('connected');

var initialState = {
    matches: {},
    socket: null,
    messages: {}
}
var socket = null;
console.log(connected);
if (connected === "true") {
    console.log(connected);
    socket = io(':5000', { query: 'token=' + token });
    // socket.emit('message', 'hello');
    socket.on('message', (msg) => {
        console.log(msg);
    });

    initialState = {
        matches: {
            users: {},
            loading: true
        },
        socket: socket,
        messages: {}
    }
}

export default function(state = initialState, action) {
	switch(action.type) {
        case RECIEVE_MATCHES:
            state = {
                ...state,
                matches: {
                    users: action.payload,
                    loading: false
                }
            }
            return state;
        case SEND_MESSAGE:
            socket.send(action.payload);
            return state;
		default:
			return state;
	}
}
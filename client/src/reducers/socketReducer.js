import io from "socket.io-client";

let token = window.localStorage.getItem("token");
let connected = window.localStorage.getItem("connected");

var initialState = {
	socket: null
};

var socket = null;

if (connected === "true") {
	console.log("SOCKET is trying to connect.")
	socket = io(":5000", { query: "token=" + token });
	// socket.emit('message', 'hello');

	initialState = {
		socket: socket
	};
}

export default function (state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}

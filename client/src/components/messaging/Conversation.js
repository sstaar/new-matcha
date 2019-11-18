import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { newMessage } from "../../actions/messagesAction";

import Message from "./Message";

import "./messaging.css";

import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "80%"
	},
	button: {
		margin: theme.spacing(1),
		minHeight: "100%",
		maxHeight: "100%"
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	text: {
		padding: theme.spacing(2, 2, 0)
	},
	paper: {
		paddingBottom: 50,
		minHeight: 700,
		maxHeight: 700,
		overflow: "auto",
		marginTop: 10
	},
	list: {
		marginBottom: theme.spacing(2)
	}
}));


const Conversation = () => {
	//Preparing the state we are gonna use for the Input field
	const [message, setMessageData] = useState("");

	const dispatch = useDispatch();

	const classes = useStyles();

	//Getting the socket object from the redux store
	const socketStore = useSelector(state => state.socket.socket);

	//Getting the receiver id and username from the redux store
	const receiverStore = useSelector(state => state.chat.receiver);

	//Getting the messages of the conversation from the redux store
	const messages = useSelector(state => state.chat.messages.messages);

	//Sending the message to the back-end using the socket
	const send = () => {
		if (message) {
			const token = window.localStorage.getItem("token");
			socketStore.send({
				token: token,
				receiver: receiverStore.id,
				message: message
			});

			//Reseting the Input field
			setMessageData("");
		}
	};

	const handleChange = e => setMessageData(e.target.value);

	//First of we make sure we have the socket
	//Then make sure we only have one event listener
	//In case we rendered the page more than once
	//We delete the first listener to keep only the latest one
	//Once we recieve a message from the back-end we add it to the list with `addMessage`
	//PS: We recieve two kinds of messages from the back-end
	//1-A message the user sent
	//2-A message the user received
	if (receiverStore && socketStore) {
		const array = socketStore.listeners("message");
		console.log(socketStore)
		if (array.length === 0) {
			socketStore.on("message", async msg => {
				console.log("You have received a message")
				dispatch(newMessage(msg));
			});
		}
	}

	return (
		<div className="conversation">
			<React.Fragment>
				<CssBaseline />
				<Paper square className={classes.paper}>
					<Typography className={classes.text} variant="h5" gutterBottom>
						{receiverStore.username}
					</Typography>
					<List className={classes.list}>
						{Object.keys(messages).length === 0 ? (
							<div></div>
						) : (
								messages.map(singleMessage => (
									<Message
										key={singleMessage.id}
										message={singleMessage.message}
										right={
											receiverStore.id == singleMessage.sender ? false : true
										}
									/>
								))
							)}
					</List>
				</Paper>

				{receiverStore.id && (
					<div className="messages-input">
						<TextField
							id="outlined-multiline-flexible"
							label="Message"
							multiline
							rowsMax="2"
							value={message}
							onChange={e => handleChange(e)}
							className={classes.textField}
							margin="normal"
							// helperText="hello"
							variant="outlined"
						/>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={e => send()}
						>
							Send
              <Icon className={classes.rightIcon}>send</Icon>
						</Button>
					</div>
				)}
			</React.Fragment>
		</div>
	);
};

export default Conversation;

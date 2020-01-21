import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addTag } from "../../actions/userActions";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		height: "auto",
		margin: "auto",
		alignItems: "center",
		display: "flex",
		flexDirection: "column"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	button: {
		marginTop: 15,
		backgroundColor: "#ff6347",
		color: "#fff",
		height: 57
	}
}));
const theme = createMuiTheme({
	palette: {
		primary: { main: "#ff6347" }
	}
});

const Tags = () => {
	//Allows to use dispatch
	const dispatch = useDispatch();

	const [newTag, setNewTag] = useState("");

	const onChange = e => setNewTag(e.target.value);

	const classes = useStyles();

	const add = async () => {
		dispatch(await addTag(newTag));
		setNewTag("");
	};

	return (
		<div>
			<TextField
				id="outlined-name"
				label="Tag"
				className={classes.textField}
				value={newTag}
				onChange={e => onChange(e)}
				margin="normal"
				variant="outlined"
				name="newtag"
			/>
			<ThemeProvider theme={theme}>
				<Button className={classes.button} onClick={add} variant="contained">
					<i className="fas fa-plus"></i>
				</Button>
			</ThemeProvider>
		</div>
	);
};

export default Tags;

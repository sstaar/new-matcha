import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTag, removeTag } from '../../actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		height: 'auto',
		margin: 'auto',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
}));

const Tags = () => {

	//Allows to use dispatch
	const dispatch = useDispatch();

	const [newTag, setNewTag] = useState('');

	const onChange = e => setNewTag(e.target.value);

	const classes = useStyles();

	const add = async () => {
		dispatch(await addTag(newTag));
		setNewTag('');
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
				name='newtag'
			/>
			<Button onClick={add} className="d-inline-block test-white bg-warning p-3 mt-3" variant="contained">
				<i className="fas fa-plus"></i>
			</Button>


		</div>
	)
}

export default Tags

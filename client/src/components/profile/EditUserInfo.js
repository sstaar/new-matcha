import React, { useState } from 'react';
import Input from '../helpers/Input';
import { useDispatch, useSelector } from 'react-redux';

import { updateInfo } from '../../actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormSelect } from "shards-react";
import { FormTextarea } from "shards-react";
import EditUserImages from './EditUserImages';


const useStyles = makeStyles(theme => ({
	center: {
		margin: '20px auto',
		textAlign: 'center',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));


const EditUserInfo = ({ user }) => {

	const classes = useStyles();

	const [open, setOpen] = useState(false);

	//Allows to use dispatch
	const dispatch = useDispatch();

	const editErrrorsStore = useSelector(state => state.user.errors);

	const handleClose = () => {
		if (open);
		setOpen(false);
	};


	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		newUsername: user.username,
		newPassword: '',
		oldPassword: '',
		firstname: user.firstname,
		lastname: user.lastname,
		gender: user.gender,
		bio: user.bio ? user.bio : 'Please enter your bio',
		orientation: user.orientation,
	});

	//simplifications
	const { newUsername, newPassword, oldPassword, firstname, lastname, gender, bio, orientation } = formData;

	//It keeps on updating the form inputs
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	//On submit we send the informations to the back-end server
	//To save it on the database and after that uses the function
	//Update to update the informations in the parent component
	const handleSave = async e => {
		dispatch(await updateInfo(formData));
		setOpen(false);
	}

	return (

		<div>
			<Input
				display="Username"
				type="text"
				name="newUsername"
				onChange={e => onChange(e)}
				value={newUsername}
				error={editErrrorsStore.newUsername}
			/>
			<Input
				display="first Name"
				type="text"
				name="firstname"
				onChange={e => onChange(e)}
				value={firstname}
				error={editErrrorsStore.firstname}
			/>
			<Input
				display="last Name"
				type="text"
				name="lastname"
				onChange={e => onChange(e)}
				value={lastname}
				error={editErrrorsStore.lastname}
			/>

			<label>Gender</label>
			<FormSelect
				value={gender ? gender : ''}
				onChange={e => onChange(e)}
				name="gender"
			>
				<option value="female">Female</option>
				<option value="male">Male</option>
			</FormSelect>
			<label>SexPref</label>
			<FormSelect
				value={orientation}
				onChange={e => onChange(e)}
				name="orientation"
			>
				<option value="female">Female</option>
				<option value="male">Male</option>
				<option value="both">everyone</option>
			</FormSelect>

			<label>Bio</label>
			<FormTextarea
				id="outlined-multiline-static"
				label="Multiline"
				rows="4"
				name="bio"
				className={classes.textField}
				onChange={e => onChange(e)}
				margin="normal"
				variant="outlined"
				value={bio}
			/>


			<Input
				display="New Password"
				type="password"
				name="newPassword"
				onChange={e => onChange(e)}
				value={newPassword}
				error={editErrrorsStore.newPassword}
			/>

			<Input
				display="Old Password"
				type="password"
				name="oldPassword"
				onChange={e => onChange(e)}
				value={oldPassword}
				error={editErrrorsStore.oldPassword}

			/>

			<label>Change your images</label>

			<EditUserImages className="d-inline" />

			<Button onClick={handleClose} color="primary">
				Cancel
			</Button>
			<Button onClick={handleSave} color="primary">
				Save
			</Button>
		</div>
	)
}

export default EditUserInfo

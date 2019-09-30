import React, { useState } from 'react';
import Input from '../helpers/Input';
import { useDispatch, useSelector } from 'react-redux';

import { updateInfo } from '../../actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


function PaperComponent(props) {
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

const useStyles = makeStyles(theme => ({
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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		firstname: user.firstname,
		lastname: user.lastname,
		age: user.age,
		gender: user.gender,
		bio: user.bio,
		errors: {}
	});

	//Getting the token from the redux store

	//simplifications
	const { firstname, lastname, age, gender, bio, errors } = formData;

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
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open form dialog
      		</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
					Subscribe
        		</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here. We will send updates
						occasionally.
          			</DialogContentText>
					<Input display="First name" type="text" name="firstname" onChange={e => onChange(e)} value={firstname} error={errors.error_firstname} />

					<Input display="Last name" type="text" name="lastname" onChange={e => onChange(e)} value={lastname} error={errors.error_lastname} />

					<Input display="Age" type="text" name="age" onChange={e => onChange(e)} value={age ? age : 0} error={errors.error_age} />

					<FormControl variant="outlined" className={classes.formControl}>
						<Select
							native
							value={gender ? gender : 'Please select your gender'}
							onChange={e => onChange(e)}
							labelWidth={50}
							inputProps={{
								name: 'gender',
								id: 'outlined-age-native-simple',
							}}
							name="gender"
						>
							<option>male</option>
							<option>female</option>
							{gender !== "male" && gender !== "female" && <option>{gender}</option>}
						</Select>
					</FormControl>

					<TextField
						id="outlined-multiline-static"
						label="Multiline"
						multiline
						rows="4"
						name="bio"
						className={classes.textField}
						onChange={e => onChange(e)}
						margin="normal"
						variant="outlined"
						value={bio ? bio : 'Please enter your bio'}
					/>

				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
          			</Button>
					<Button onClick={handleSave} color="primary">
						Save
          			</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default EditUserInfo

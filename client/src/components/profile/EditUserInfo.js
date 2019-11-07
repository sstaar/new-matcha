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
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';



function PaperComponent(props) {
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

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
		gender: user.gender,
		bio: user.bio ? user.bio : 'Please enter your bio',
		orientation: user.orientation,
		longitude: user.longitude,
		latitude: user.latitude,
		errors: {}
	});

	//Getting the token from the redux store

	//simplifications
	const { firstname, lastname, gender, bio, orientation, longitude, latitude, errors } = formData;

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

		<div className={classes.center}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Edit Your info
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

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-simple">Sexual preferences</InputLabel>
						<Select
							value={orientation}
							onChange={e => onChange(e)}
							inputProps={{
								name: 'orientation',
								id: 'age-simple',
							}}
						>
							<MenuItem value={'male'}>male</MenuItem>
							<MenuItem value={'female'}>female</MenuItem>
							<MenuItem value={'both'}>both</MenuItem>
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
						value={bio}
					/>

					<Input
						display="latitude"
						type="text"
						name="latitude"
						onChange={e => onChange(e)}
						value={latitude}
						error={errors.error_lastname}
					/>

					<Input
						display="longitude"
						type="text"
						name="longitude"
						onChange={e => onChange(e)}
						value={longitude}
						error={errors.error_lastname}
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

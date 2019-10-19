import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/registerActions';
import Input from '../helpers/Input';

import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

const formatDate = (date) => {
	let dateInfo = date.toLocaleString();
	console.log(dateInfo);
	let datePattern = /^(?:([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4,4})).+$/;
	let matches = dateInfo.match(datePattern);
	let res = matches[3] + '-' + matches[1] + '-' + matches[2];
	console.log(res);
	return (res);
};


const Register = () => {

	const classes = useStyles();

	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password1: '',
		password2: '',
		firstname: '',
		lastname: '',
		gender: 'male',
	});

	const [date, setDate] = useState(new Date())

	//This is just for simplification when calling a state variable
	const {
		username,
		email,
		firstname,
		lastname,
		password1,
		password2,
		gender
	} = formData;

	//This allows me to dispatch my action
	//My action is to send a request to the registeration api
	const dispatch = useDispatch();

	//This is to allow the input to change, While chamging the state variable as well
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleDateChange = date => {
		setDate(date);
	};

	//This part is for getting the data from the redux store
	//The main store can be found in /client/src/store.js
	const registration = useSelector(state => state.register);

	//In case of errors
	//Getting the data from the redux store
	const registerationErrors = registration.errors;

	//In case of success
	//Getting the data (message) from the redux store
	const registerationSuccess = registration.success;

	//This is activated on the submit
	const onSubmit = async e => {
		//This prevent the from from reloading the page or redirecting to somewhere else
		e.preventDefault();
		//This dispatch the action that sends the request to the ap
		//and storing the result into the redux store
		dispatch(await register({ ...formData, birthday: formatDate(date) }));
	}


	//The Input tag is a custom tag that i made that we could use when ever we have an imput
	//It manage in the error case to display the error 
	//Can be found in /client/src/components/helpers/Input.js
	return (

		<div className="container">
			<form className="needs-validation" onSubmit={e => onSubmit(e)} noValidate>

				{registerationSuccess ? <div className="alert alert-success" role="alert">{registerationSuccess}</div> : <div></div>}

				<Input display="Username" type="text" name="username" onChange={e => onChange(e)} value={username} error={registerationErrors.username} />

				<Input display="Firstname" type="text" name="firstname" onChange={e => onChange(e)} value={firstname} error={registerationErrors.firstname} />

				<Input display="Lastname" type="text" name="lastname" onChange={e => onChange(e)} value={lastname} error={registerationErrors.lastname} />

				<Input display="E-Mail" type="mail" name="email" onChange={e => onChange(e)} value={email} error={registerationErrors.email} />

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="yyyy-mm-dd"
						margin="normal"
						id="date-picker-inline"
						label="Birthdate"
						value={date}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>

				<FormControl variant="outlined" className={classes.formControl}>
					<Select
						native
						value={gender ? gender : ''}
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
					</Select>
				</FormControl>

				<Input display="Password" type="password" name="password1" onChange={e => onChange(e)} value={password1} error={registerationErrors.password1} />

				<Input display="Repeat password" type="password" name="password2" onChange={e => onChange(e)} value={password2} error={registerationErrors.password2} />
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}

export default Register;

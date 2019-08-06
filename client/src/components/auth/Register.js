import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/registerActions';
import Input from '../helpers/Input';

const Register = () => {
	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password1: '',
		password2: '',
		firstname: '',
		lastname: '',
		errors: {}
	});

	//This is just for simplification when calling a state variable
	const {
		username,
		email,
		firstname,
		lastname,
		password1,
		password2,
		errors
	} = formData;

	//This allows me to dispatch my action
	//My action is to send a request to the registeration api
	const dispatch = useDispatch();

	//This is to allow the input to change, While chamging the state variable as well
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	//This part is for getting the data from the redux store
	//The main store can be found in /client/src/store.js
	const registration = useSelector(state => state.register);

	//This is activated on the submit
	const onSubmit = async e => {
		//This prevent the from from reloading the page or redirecting to somewhere else
		e.preventDefault();

		//This dispatch the action that sends the request to the ap
		//and storing the result into the redux store
		dispatch(await register(formData));

		//Getting the data from the redux store
		let errors = registration.registration;

		//This updates the state adding the errors coming from the api if there is any
		//If no error is found it means the request got to the backend and the account is
		//registered and then we show a message that tells the user that and empty all the form fields
		if (errors.error_email || errors.error_firstname || errors.error_lastname
			|| errors.error_password1 || errors.error_password2 || errors.error_username)
			setFormData({ ...formData, errors: errors });
		else {
			setFormData({
				...formData,
				username: '',
				email: '',
				password1: '',
				password2: '',
				firstname: '',
				lastname: ''
			});
			setFormData({ ...formData, errors: { success: errors } });
		}
	}

	//The Input tag is a custom tag that i made that we could use when ever we have an imput
	//It manage in the error case to display the error 
	//Can be found in /client/src/components/helpers/Input.js
	return (

		<div className="container">
			<form className="needs-validation" onSubmit={e => onSubmit(e)} noValidate>

				{errors.success ? <div className="alert alert-success" role="alert">{errors.success}</div> : <div></div>}

				<Input display="Username" type="text" name="username" onChange={e => onChange(e)} value={username} error={errors.error_username} />

				<Input display="Firstname" type="text" name="firstname" onChange={e => onChange(e)} value={firstname} error={errors.error_firstname} />

				<Input display="Lastname" type="text" name="lastname" onChange={e => onChange(e)} value={lastname} error={errors.error_lastname} />

				<Input display="E-Mail" type="mail" name="email" onChange={e => onChange(e)} value={email} error={errors.error_email} />

				<Input display="Password" type="password" name="password1" onChange={e => onChange(e)} value={password1} error={errors.error_password1} />

				<Input display="Repeat password" type="password" name="password2" onChange={e => onChange(e)} value={password2} error={errors.error_password2} />
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}

export default Register;

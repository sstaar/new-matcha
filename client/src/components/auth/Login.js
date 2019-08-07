import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/loginActions';
import Input from '../helpers/Input';

const Login = () => {
	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		errors: {}
	});

	//This is just for simplification when calling a state variable
	const { username, password, errors } = formData;


	//This allows me to dispatch my action
	//My action is to send a request to the login api
	const dispatch = useDispatch();

	//This is to allow the input to change, While chamging the state variable as well
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	//This is activated on the submit
	const onSubmit = async e => {
		e.preventDefault();

		dispatch(await login(formData));
	}

	return (
		<div className="container">
			<form className="needs-validation" onSubmit={e => onSubmit(e)} noValidate>
			<Input display="Username" type="text" name="username" onChange={e => onChange(e)} value={username} error={errors.error_username} />

			<Input display="Password" type="password" name="password" onChange={e => onChange(e)} value={password} error={errors.error_password} />

			<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Login

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/loginActions';
import Input from '../helpers/Input';

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		errors: {}
	});

	const { username, password, errors } = formData;

	const dispatch = useDispatch();

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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

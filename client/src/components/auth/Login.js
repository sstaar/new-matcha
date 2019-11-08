import React, { useState } from 'react';
import { login } from '../../actions/loginActions';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../helpers/Input';
import './register.css';

const getGeoLocation = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve(position);
			},
			(error) => {
				if (error.code === 1)
					resolve({ coords: { latitude: 0, longitude: 0 } })
				reject(error);
			});
	});
}

const Login = () => {
	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		longitude: 0,
		latitude: 0
	});

	//This is just for simplification when calling a state variable
	const { username, password } = formData;


	//This allows me to dispatch my action
	//My action is to send a request to the login api
	const dispatch = useDispatch();

	//This is to allow the input to change, While chamging the state variable as well
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	//To get the informations in case of login fail
	const loginStore = useSelector(state => state.login);

	//This is activated on the submit
	const onSubmit = async e => {
		try {
			console.log('You are trying to connect.')
			e.preventDefault();
			let pos = await getGeoLocation();
			const { latitude, longitude } = pos.coords;
			setFormData({ ...formData, latitude, longitude });
			dispatch(await login({ ...formData, latitude, longitude }));
		} catch (error) {
			console.log(error)
		}

	}

	console.log(loginStore.errors);

	return (
		<div className=" ml-3 col-lg-6 col-md-10 col-sm-12 mx-auto">
			<h1 className="text-center font-weight-bold mb-5 animated heartBeat">Match <span className="animated rotateIn">🔥</span>, Chat  <span className="animated rotateIn">😋</span>, Date  <span className="animated rotateIn">😍</span></h1>
			<div className="bg-light rounded p-4 animated fadeInUp">
				<h3>Login</h3>
				<form className="needs-validation" onSubmit={e => onSubmit(e)} noValidate>
					<Input display="Username" type="text" name="username" onChange={e => onChange(e)} value={username} error={loginStore.errors.username} />

					<Input display="Password" type="password" name="password" onChange={e => onChange(e)} value={password} error={loginStore.errors.password} />

					<button type="submit" className="btn submit">Submit</button>
				</form>
			</div>
		</div>
	)
}

export default Login

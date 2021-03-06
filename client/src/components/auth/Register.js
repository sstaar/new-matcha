import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/registerActions";
import Input from "../helpers/Input";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { FormSelect } from "shards-react";
import DatePicker from "react-datepicker";

import "../root.css";
import "./register.css";
import "../cssTools/animate.css";

const formatDate = date => {
	try {

		let dateInfo = date.toLocaleString();
		let datePattern = /^(?:([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4,4})).+$/;
		let matches = dateInfo.match(datePattern);
		let res = matches[3] + "-" + matches[1] + "-" + matches[2];
		return res;
	} catch (error) {
		console.log("jma3 karek");
	}
};

const Register = () => {
	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
		firstname: "",
		lastname: "",
		gender: "male"
	});

	const [startDate, setStartDate] = useState(new Date());

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
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

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

		if (!startDate)
			return setStartDate(new Date())
		//This dispatch the action that sends the request to the ap
		//and storing the result into the redux store
		setFormData({ ...formData, password1: "", password2: "" })
		dispatch(await register({ ...formData, birthday: formatDate(startDate) }));
	};



	const handleDateChange2 = (date) => {
		if (!startDate)
			return setStartDate(new Date())
		if (date.getYear() < 0)
			return setStartDate(new Date())

		setStartDate(date)

	}

	//The Input tag is a custom tag that i made that we could use when ever we have an imput
	//It manage in the error case to display the error
	//Can be found in /client/src/components/helpers/Input.js
	return (
		<div className="holder col-lg-6 col-md-10 col-sm-12 mx-auto">
			<h1 className="text-center font-weight-bold mb-5 animated heartBeat">
				Match <span className="animated rotateIn" role="img" aria-label="FIRE">🔥</span>, Chat{" "}
				<span className="animated rotateIn" role="img" aria-label="SMILY">😋</span>, Date{" "}
				<span className="animated rotateIn" role="img" aria-label="LLOVE">😍</span>
			</h1>
			<div className="bg-light rounded p-4 animated fadeInUp">
				<h3>Create new Account</h3>
				<form
					className="needs-validation"
					onSubmit={e => onSubmit(e)}
					noValidate
				>
					{registerationSuccess ? (
						<div className="alert alert-success" role="alert">
							{registerationSuccess}
						</div>
					) : (
							<div></div>
						)}

					<Input
						display="Username"
						type="text"
						name="username"
						onChange={e => onChange(e)}
						value={username}
						error={registerationErrors.username}
					/>

					<Input
						display="Firstname"
						type="text"
						name="firstname"
						onChange={e => onChange(e)}
						value={firstname}
						error={registerationErrors.firstname}
					/>

					<Input
						display="Lastname"
						type="text"
						name="lastname"
						onChange={e => onChange(e)}
						value={lastname}
						error={registerationErrors.lastname}
					/>

					<Input
						display="E-Mail"
						type="mail"
						name="email"
						onChange={e => onChange(e)}
						value={email}
						error={registerationErrors.email}
					/>

					<label className="mb-2 d-block">BithDate</label>
					<DatePicker className="form-control mb-2" selected={startDate} onChange={date => handleDateChange2(date)} />
					{registerationErrors.birthday}

					<FormSelect
						value={gender ? gender : ""}
						onChange={e => onChange(e)}
						name="gender"
					>
						<option value="female">Female</option>
						<option value="male">Male</option>
					</FormSelect>

					<Input
						display="Password"
						type="password"
						name="password1"
						onChange={e => onChange(e)}
						value={password1}
						error={registerationErrors.password1}
					/>

					<Input
						display="Repeat password"
						type="password"
						name="password2"
						onChange={e => onChange(e)}
						value={password2}
						error={registerationErrors.password2}
					/>
					<button type="submit" className="btn submit w-100 ">
						Submit
          </button>
				</form>
			</div>
		</div>
	);
};

export default Register;

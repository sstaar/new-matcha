import React, { useState, createRef } from 'react';
import Input from '../helpers/Input';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const EditUserInfo = ({ user: user, update:update }) => {
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
	const token = useSelector(state => state.login).token;

	//simplifications
	const { firstname, lastname, age, gender, bio, errors } = formData;

	//Allows us to use dispatch
	const dispatch = useDispatch();

	//It keeps on updating the form inputs
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	//On submit we send the informations to the back-end server
	//To save it on the database and after that uses the function
	//Update to update the informations in the parent component
	const onSubmit = async e => {
		e.preventDefault();

		await axios.post('http://localhost:5000/api/info/edit', {...formData, token});

		update(formData);
	}


	return (


		<div className="modal fade" id="ChangeInfo" tabIndex="-1" role="dialog" aria-labelledby="changeUserInfo" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<form className="needs-validation" onSubmit={e => onSubmit(e)} noValidate>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="changeUserInfo">Informations edit</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">


							<Input display="First name" type="text" name="firstname" onChange={e => onChange(e)} value={firstname} error={errors.error_firstname} />

							<Input display="Last name" type="text" name="lastname" onChange={e => onChange(e)} value={lastname} error={errors.error_lastname} />

							<Input display="Age" type="text" name="age" onChange={e => onChange(e)} value={age?age:0} error={errors.error_age} />

							<div className="form-group">
								<label htmlFor="age">Gender</label>
								<select onChange={e => onChange(e)} value={gender?gender:'Please select your gender'} name="gender" className="form-control" id="age">
									<option>male</option>
									<option>female</option>
									{ gender !== "male" && gender !== "female" && <option>{gender}</option>}
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="biography">Biography</label>
								<textarea onChange={e => onChange(e)} name="bio" className="form-control" id="biography" rows="3" value={bio?bio:'Please enter your bio'}></textarea>
							</div>

						</div>
						<div className="modal-footer">
							<button id="butt" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="submit" className="btn btn-primary" >Save changes</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditUserInfo

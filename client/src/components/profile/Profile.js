import React, { useState, useEffect, setState } from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../actions/userActions';
import EditUserInfo from './EditUserInfo';
import Tags from './Tags';

const Profile = () => {
	//This just initialize the state im going to use throughout the component
	const [infoData, setInfoData] = useState({
		username: null,
		firstname: null,
		lastname: null,
		gender: null,
		age: null,
		bio: null,
		loading: true,
		change: true
	});

	//Simplification
	const { username, firstname, lastname, gender, age, bio, loading, change } = infoData;

	//Allows to use dispatch
	const dispatch = useDispatch();

	//Allows as to access the redux store
	const user = useSelector(state => state.user);

	//The useEffect function calls it's first parameter
	//The callback after each render it can't be an async function
	//We need the the information before laoding the user info 
	useEffect(() => {

		const test = async () => {
			dispatch(await userInfo())
		};

		test();
	}, [dispatch]);


	//We keep checking if the user info is recieved or not
	//By rendering the component until we get the informations we need
	//Check the userReducer to understand how loading works
	if (loading === true)
		setTimeout(() => {
			setInfoData({
				...infoData,
				username: user.info.username,
				firstname: user.info.firstname,
				lastname: user.info.lastname,
				gender: user.info.gender,
				age: user.info.age,
				bio: user.info.bio,
				loading: user.loading,
				change: true
			})
		}, 100);

	//We use this update function to update the component
	//After we change the user info in the child EditUserInfo
	//It will be passed as a prop to EditUserInfo
	const update = (data) => {
		setInfoData({
			...infoData,
			...data
		});

	}

	//The if statment ensures that while we still don't have the userInfo
	//The component will display a loading screen
	//And once we have the info we display them in a card
	if (loading === false)
		return (
			<div className="container" style={{ margin: '50px auto' }}>
				<div className="card bg-light text-center card-cus" >
					<img className="main-img card-img-top" src="/imgs/user.png" alt="Main pic" />
					<div className="card-body">
						<div className="badge badge-primary text-wrap" >
							{username}
						</div>
						<h5 className="card-title">{firstname + ' ' + lastname}</h5>
						<p className="card-text">{age}</p>
						<p className="card-text">{gender}</p>
						<p className="card-text">{bio}</p>
					</div>
					{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}

					<button id="edit" type="button" className="edit-butt btn btn-primary" data-toggle="modal" data-target="#ChangeInfo">
						Change your info
					</button>

					<EditUserInfo update={update} user={infoData} />

				</div>
				<Tags />
			</div>

			
		)
	else
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		)
}

export default Profile

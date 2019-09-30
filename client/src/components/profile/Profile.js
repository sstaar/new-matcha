import React, { useEffect } from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../actions/userActions';
import EditUserInfo from './EditUserInfo';
import Tags from './Tags';


const Profile = () => {

	//Allows to use dispatch
	const dispatch = useDispatch();

	//Allows as to access the redux store
	const userStore = useSelector(state => state.user);

	const { username, firstname, lastname, gender, age, bio } = userStore.info

	//The useEffect function calls it's first parameter
	//The callback after each render it can't be an async function
	//We need the the information before laoding the user info 
	useEffect(() => {

		const test = async () => {
			dispatch(await userInfo());
		};

		test();
	}, [dispatch]);

	//The if statment ensures that while we still don't have the userInfo
	//The component will display a loading screen
	//And once we have the info we display them in a card
	if (userStore.loading === false)
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

					<EditUserInfo user={userStore.info} />

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

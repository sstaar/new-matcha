import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../actions/userActions';

const Profile = () => {
	const [infoData, setInfoData] = useState({
		username: null,
		firstname: null,
		lastname: null,
		gender: null,
		age: null,
		bio: null
	});

	const { username, firstname, lastname, gender, age, bio } = infoData;

	const dispatch = useDispatch();

	const user = useSelector(state => state.user);

	// console.log(user.info.username);
	
	// console.log(user);

	useEffect(() => {
		const test = async () => {
			dispatch(await userInfo())
		};

		
		test();
		console.log(user);

		//console.log(user.info.username);

		// setTimeout(() => {
		// 	console.log(user.info.username);
		// 	setInfoData({
		// 		...infoData,
		// 		username: user.info.username,
		// 	})
		// }, 5000);
		
		
		// setInfoData({
		// 	...infoData,
		// 	username: user.info.username,
		// })
	
	}, [userInfo, dispatch]);

	if (!username)
		setTimeout(() => {
			setInfoData({
				...infoData,
				username: user.info.username,
				firstname: user.info.firstname,
				lastname: user.info.lastname,
				gender: user.info.gender,
				age: user.info.age,
				bio: user.info.bio
			})
		}, 100);

	// console.log(user.info.username);

	

	


	const change = e => {
		
	};

	return (
		<div className="container" style={{ margin: '50px auto' }}>
			<div className="card bg-light text-center card-cus" >
				<img className="main-img card-img-top" src="/imgs/user.png" alt="Main pic" />
				<div className="card-body">
					<h5 onChange={e => change(e)} className="card-title">{username}</h5>
					<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				</div>
				<a  href="#" className="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	)
}

export default Profile

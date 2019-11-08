import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import './Profile.css';
import { userInfo } from '../../actions/userActions';
import EditUserInfo from './EditUserInfo';
import AddTags from './AddTags';
import UserInfoDisplayer from '../helpers/UserInfoDisplayer';
import TagsDisplayer from '../helpers/TagsDisplayer';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import EditUserImages from './EditUserImages';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import '../root.css'

const theme = createMuiTheme({
	palette: {
	  primary: {  main: '#ff6347' }
	},
}); 

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
}));



const Profile = () => {


	const classes = useStyles();

	//Allows to use dispatch
	const dispatch = useDispatch();

	//Allows as to access the redux store
	const userStore = useSelector(state => state.user);

	const tags = useSelector(state => state.user.tags);

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
			<div class="container">
				<h3 className="font-weight-bold mb-5 text-center">👶🏻 Your Profile</h3>
				<div className="row mt-5">
					<div className="col-lg-5 mx-3 col-md-10 col-sm-12 fl-left mx-auto  ">
						<h4 class="">Your Public Profile :</h4>
						<UserInfoDisplayer user={userStore.info} />
						<h4 class="mt-4">Your Tags :</h4>
						<div>
						{
							tags.length > 0 ? <TagsDisplayer tags={tags} canDelete={true} /> : <div></div>
						}
						<AddTags />
						</div>
					</div>
					<div className="col-lg-5 col-md-10 col-sm-12 mx-3  text-left bg-light rounded fl-right p-4 ">
						<h4 class="mt-2">Edit Profile :</h4>
						<EditUserInfo className="d-inline" user={userStore.info} />
					</div>
				</div>

			

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

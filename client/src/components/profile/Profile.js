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
			<div>
				

				<UserInfoDisplayer user={userStore.info} />
				<EditUserInfo user={userStore.info} />
				<EditUserImages />
				<Grid container>
					{
						tags.length > 0 ?
							<Grid
								item
								xs={12}
								sm={8}
								style={{ margin: '20px auto' }} >
								<TagsDisplayer tags={tags} canDelete={true} />
							</Grid> : <div></div>
					}

					<Grid item xs={10} sm={5} style={{ margin: '20px auto' }} ><AddTags /></Grid>
				</Grid>


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

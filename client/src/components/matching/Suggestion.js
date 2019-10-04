import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { suggestionsList } from '../../actions/suggestionListAction';
import { sortAge, sortDistance, sortFame } from '../../actions/sortingActions';
import { SUGGESTIONS_SORT_AGE, SUGGESTIONS_SORT_DISTANCE, SUGGESTIONS_SORT_FAME } from '../../actions/types';
import UserCard from './UserCard'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const useStyles = makeStyles(theme => ({
	button: {

	},
}));

export default function Suggestion() {

	const classes = useStyles();

	const dispatch = useDispatch();

	const suggestionList = useSelector(state => state.suggestionList);

	const [sortOrder, setSortOrder] = useState(1);

	useEffect(() => {

		const test = async () => {
			dispatch(await suggestionsList())
		};

		test();
	}, [dispatch]);

	const sortAgeButton = () => {
		setSortOrder(sortOrder * (-1));
		dispatch(sortAge(sortOrder * (-1), SUGGESTIONS_SORT_AGE));
	};

	const sortDistanceButton = () => {
		setSortOrder(sortOrder * (-1));
		dispatch(sortDistance(sortOrder * (-1), SUGGESTIONS_SORT_DISTANCE));
	};

	const sortFameButton = () => {
		setSortOrder(sortOrder * (-1));
		dispatch(sortFame(sortOrder * (-1), SUGGESTIONS_SORT_FAME));
	};


	if (suggestionList.loading === false)
		return (
			<div>

				<ButtonGroup size="small" aria-label="small outlined button group">
					<Button onClick={sortAgeButton} >Sort age</Button>
					<Button onClick={sortDistanceButton} >Sort distance</Button>
					<Button onClick={sortFameButton} >Sort fame rating</Button>
				</ButtonGroup>

				{suggestionList.list.map((user) =>
					<UserCard user={user} key={user.id} />
				)}
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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { suggestionsList } from '../../actions/suggestionListAction';
import { sortAge, sortDistance, sortFame, sortCommonTags } from '../../actions/sortingActions';
import { filterSuggestion } from '../../actions/filteringActions';
import {
	SUGGESTIONS_SORT_AGE,
	SUGGESTIONS_SORT_DISTANCE,
	SUGGESTIONS_SORT_FAME
} from '../../actions/types';
import UserCard from './UserCard'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from "@material-ui/core/Slider";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root: {
		width: 300 + theme.spacing(3) * 2,
		padding: theme.spacing(3),
	},
	margin: {
		height: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(1),
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

	const sortCommonTagsButton = () => {
		setSortOrder(sortOrder * (-1));
		dispatch(sortCommonTags(sortOrder * (-1)));
	};

	var lowestAge = null;
	var highestAge = null;
	var lowestDistance = null;
	var highestDistance = null;
	var lowestFame = null;
	var highestFame = null;
	var lowestCommonTags = null;
	var highestCommonTags = null;

	const [filteringData, SetFilteringData] = useState({
		age: highestAge,
		distance: highestDistance,
		fame: highestFame,
		commonTags: highestCommonTags
	})

	if (suggestionList.list.length > 0 && suggestionList.loading === false) {
		lowestAge = Math.min(...suggestionList.list.map((item) => item.age));
		highestAge = Math.max(...suggestionList.list.map((item) => item.age));

		lowestDistance = Math.min(...suggestionList.list.map((item) => item.distance));
		highestDistance = Math.max(...suggestionList.list.map((item) => item.distance));

		lowestFame = Math.min(...suggestionList.list.map((item) => item.fame_rating));
		highestFame = Math.max(...suggestionList.list.map((item) => item.fame_rating));

		lowestCommonTags = Math.min(...suggestionList.list.map((item) => item.commonTagsCount));
		highestCommonTags = Math.max(...suggestionList.list.map((item) => item.commonTagsCount));
	}

	const filter = () => {
		dispatch(filterSuggestion(filteringData));
	};

	const reset = async () => {
		dispatch(await suggestionsList())
	}

	if (suggestionList.loading === false)
		return (
			<div>
				<Paper className={classes.root}>
					<Typography gutterBottom>
						Age
      				</Typography>
					<Slider
						defaultValue={highestAge}
						value={filteringData.age}
						aria-labelledby="discrete-slider-always"
						step={1}
						onChange={(event, newValue) => SetFilteringData({ ...filteringData, age: newValue })}
						valueLabelDisplay="on"
						min={lowestAge}
						max={highestAge}
					/>
					<Typography gutterBottom>
						Distance
      				</Typography>
					<Slider
						defaultValue={highestDistance}
						value={filteringData.distance}
						aria-labelledby="discrete-slider-always"
						step={1}
						onChange={(event, newValue) => SetFilteringData({ ...filteringData, distance: newValue })} valueLabelDisplay="on"
						min={lowestDistance}
						max={highestDistance}
					/>
					<Typography gutterBottom>
						Fame rating
      				</Typography>
					<Slider
						defaultValue={highestFame}
						value={filteringData.fame}
						aria-labelledby="discrete-slider-always"
						step={1}
						onChange={(event, newValue) => SetFilteringData({ ...filteringData, fame: newValue })} valueLabelDisplay="on"
						min={lowestFame}
						max={highestFame}
					/>
					<Typography gutterBottom>
						Common tags
      				</Typography>
					<Slider
						defaultValue={highestCommonTags}
						value={filteringData.commonTags}
						aria-labelledby="discrete-slider-always"
						step={1}
						onChange={(event, newValue) => SetFilteringData({ ...filteringData, commonTags: newValue })} valueLabelDisplay="on"
						min={lowestCommonTags}
						max={highestCommonTags}
					/>
					<Button onClick={filter} variant="contained" color="primary" className={classes.button}>
						Filter
      				</Button>

					<Button onClick={reset} variant="contained" color="primary" className={classes.button}>
						Reset
      				</Button>
				</Paper>

				<ButtonGroup size="small" aria-label="small outlined button group">
					<Button onClick={sortAgeButton} >Sort age</Button>
					<Button onClick={sortDistanceButton} >Sort distance</Button>
					<Button onClick={sortFameButton} >Sort fame rating</Button>
					<Button onClick={sortCommonTagsButton} >Sort common tags</Button>
				</ButtonGroup>

				{suggestionList.list.length > 0 && suggestionList.list.map((user) =>
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

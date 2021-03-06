import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import UserCard from '../matching/UserCard';
import { getSearchImage } from '../../actions/searchActions';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		maxWidth: 400,
		overflow: 'hidden',
		display: 'block',
		width: '100%',
	},
}));

const UsersList = () => {

	const classes = useStyles();

	const searchDataStore = useSelector(state => state.search.searchRes);
	const imgStore = useSelector(state => state.search.userImage);


	const dispatch = useDispatch();

	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = searchDataStore.length;

	const handleNext = async () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	useEffect(() => {
		const test = async () => {
			dispatch(await getSearchImage(searchDataStore[activeStep].imageId));
		};
		if (searchDataStore.length > 0)
			test();
	}, [dispatch, searchDataStore, activeStep, maxSteps]);

	const handleBack = async () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};


	if (searchDataStore.length === 0 || maxSteps === 0)
		return (<div></div>)
	return (
		<div className={classes.root}>
			<UserCard user={searchDataStore[activeStep]} img={imgStore} search={true} />
			<MobileStepper
				steps={maxSteps}
				position="static"
				variant="text"
				activeStep={activeStep}
				nextButton={
					<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
						Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
						Back
          </Button>
				}
			/>
		</div>
	)
}

export default UsersList

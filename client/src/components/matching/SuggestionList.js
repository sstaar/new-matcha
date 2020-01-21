import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserCard from './UserCard';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { getImage } from '../../actions/suggestionListAction';

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

export const SuggestionList = ({ list }) => {
	const dispatch = useDispatch();

	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = list.length;

	const handleNext = async () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	useEffect(() => {
		const test = async () => {
			dispatch(await getImage(list[activeStep].imageId));
		};
		if (maxSteps > 0)
			test();
	}, [dispatch, activeStep, maxSteps, list]);

	const handleBack = async () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const imgStore = useSelector(state => state.suggestionList.img);

	if (list.length === 0)
		return (<div></div>)
	return (
		<div className={classes.root}>
			<UserCard user={list[activeStep]} img={imgStore} />
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

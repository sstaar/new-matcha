import React, { useEffect, useState } from 'react'
import Axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import './helper.css'

const getImage = async (imgId) => {
	const token = window.localStorage.getItem('token');
	return await Axios.post('http://localhost:5000/api/info/serveimg', { token, imgId });
}

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
		height: 200,
		width: 200,
		overflow: 'hidden',
		display: 'block',
		borderRadius: '50%',
		margin: '10px auto'
	},
}));

const UserImagesDisplay = ({ imgs, deleteImg }) => {

	const classes = useStyles();

	const theme = useTheme();

	const [activeStep, setActiveStep] = React.useState(0);

	const [image, setImage] = useState(null)

	const maxSteps = imgs.length;

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	useEffect(() => {
		if (imgs[activeStep]) {
			const test = async () => {
				let img = await getImage(imgs[activeStep].id)
				console.log(img)
				setImage(img.data.img);
			};
			test();
		}
	});


	return (
		<div>
			<img
				className={classes.img}
				src={image || '/imgs/user.png'}
			/>
			<MobileStepper
				className="col-4 mx-auto bg-transparent"
				steps={maxSteps}
				position="static"
				variant="dots"
				activeStep={activeStep}
				nextButton={
					<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>

						{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
					</Button>
				}
			/>
			{imgs.length > 0 && deleteImg && <Button
				variant="contained"
				color="secondary"
				className={classes.button}
				onClick={e => deleteImg(imgs[activeStep].id)}
			>
				<i className="fas fa-trash"></i>
			</Button>}
		</div>
	)
}

export default UserImagesDisplay

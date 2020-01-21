import React, { useState, useEffect } from 'react';
import { login } from '../../actions/loginActions';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../helpers/Input';
import './register.css';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { TOKEN_ERROR_REMOVE } from '../../actions/types';


const getGeoLocation = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve(position);
			},
			(error) => {
				if (error.code === 1)
					resolve({ coords: { latitude: 0, longitude: 0 } })
				reject(error);
			});
	});
}

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}));

function MySnackbarContentWrapper(props) {
	const classes = useStyles1();
	const { className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}


const Login = () => {
	//This just initialize the state im going to use throughout the form
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		longitude: 0,
		latitude: 0
	});



	//This is just for simplification when calling a state variable
	const { username, password } = formData;

	//This allows me to dispatch my action
	//My action is to send a request to the login api
	const dispatch = useDispatch();

	//This is to allow the input to change, While chamging the state variable as well
	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	//To get the informations in case of login fail
	const loginStore = useSelector(state => state.login);

	const loginError = useSelector(state => state.login.tokenError);

	const [open, setOpen] = React.useState(false);


	//This is activated on the submit
	const onSubmit = async e => {
		try {
			e.preventDefault();
			let pos = await getGeoLocation();
			const { latitude, longitude } = pos.coords;
			setFormData({ ...formData, latitude, longitude });
			dispatch(await login({ ...formData, latitude, longitude }));
		} catch (error) {
			console.log("SOMETHING IS WRONG...BONUS <3.");
		}

	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch({ type: TOKEN_ERROR_REMOVE })
	};
	useEffect(() => {
		if (loginError) {
			setOpen(true)
			setTimeout(() => {
				dispatch({ type: TOKEN_ERROR_REMOVE })
			}, 3000);
		}
	}, [dispatch, loginError])

	return (
		<div className=" ml-3 col-lg-6 col-md-10 col-sm-12 mx-auto">
			<h1 className="text-center font-weight-bold mb-5 animated heartBeat">Match <span aria-label="FIRE" role="img" className="animated rotateIn"  >🔥</span>, Chat  <span aria-label="FIRE" role="img" className="animated rotateIn">😋</span>, Date  <span aria-label="FIRE" role="img" className="animated rotateIn">😍</span></h1>
			<div className="bg-light rounded p-4 animated fadeInUp">
				<h3>Login</h3>
				{loginError && <Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
				>
					<MySnackbarContentWrapper
						onClose={handleClose}
						variant="error"
						message={loginError}
					/>
				</Snackbar>}

				<form className="needs-validation" onSubmit={e => onSubmit(e)} noValidate>
					<Input display="Username" type="text" name="username" onChange={e => onChange(e)} value={username} error={loginStore.errors.username} />

					<Input display="Password" type="password" name="password" onChange={e => onChange(e)} value={password} error={loginStore.errors.password} />

					<button type="submit" className="btn submit">Submit</button>
				</form>
			</div>
		</div>
	)
}

export default Login

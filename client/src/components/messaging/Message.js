import React from 'react'

import './messaging.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1, 1),
	},
}));


const Message = ({ message, right }) => {

	const classes = useStyles();

	if (right === true)
		return (
			<React.Fragment >
				<div className='message-right'>


					<ListItem >
						<ListItemText>
							<Paper className={classes.root + ' text'}>
								<Typography component="p">
									{message}
								</Typography>
							</Paper>
						</ListItemText>
						<ListItemAvatar>
							<Avatar alt="Profile Picture" src="/imgs/user.png" />
						</ListItemAvatar>
					</ListItem>
				</div>
			</React.Fragment>
		)
	else
		return (
			<React.Fragment >
				<div className='message-left'>
					<ListItem >
						<ListItemAvatar>
							<Avatar alt="Profile Picture" src="/imgs/user.png" />
						</ListItemAvatar>
						<ListItemText>
							<Paper className={classes.root}>
								<Typography component="p">
									{message}
								</Typography>
							</Paper>
						</ListItemText>
					</ListItem>
				</div>
			</React.Fragment>
		)
}

export default Message

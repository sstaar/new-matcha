import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { visitUser, blockUser, unLikeUser, reportUser, removeDislike } from '../../actions/visitingUserActions';
import UserInfoDisplayer from '../helpers/UserInfoDisplayer';
import TagsDisplayer from '../helpers/TagsDisplayer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { reactToUser } from '../../actions/suggestionListAction';


const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	}
}));

const UserPage = ({ match }) => {

	const classes = useStyles();

	const dispatch = useDispatch();

	const visitedUserStore = useSelector(state => state.visitedUser);

	useEffect(() => {

		const test = async () => {
			dispatch(await visitUser(match.params.id));
		};

		test();
	}, [dispatch, match.params.id]);

	const block = async () => {
		dispatch(await blockUser(visitedUserStore.id));
	}


	const report = async () => {
		dispatch(await reportUser(visitedUserStore.id));
	}


	const unlike = async () => {
		dispatch(await unLikeUser(visitedUserStore.id));
	}

	const react = async (reaction) => {
		dispatch(await reactToUser(visitedUserStore, reaction));
	}

	const remDislike = async () => {
		dispatch(await removeDislike(visitedUserStore.id));
	}

	if (visitedUserStore.error)
		return (<div>{visitedUserStore.error}</div>)
	return (
		<div>
			{
				visitedUserStore.loading === true ? 'loading' :
					<div className="container">
						<UserInfoDisplayer user={visitedUserStore} />
						<Typography>{visitedUserStore.is_liked === true && "This user liked you"}</Typography>
						<Button onClick={block} variant="contained" color="secondary" className={classes.button}>
							Block
                        </Button>
						<Button onClick={report} variant="contained" color="secondary" className={classes.button}>
							Report fake account
                        </Button>
						{(visitedUserStore.relation === 1 || visitedUserStore.relation === 0) && <Button onClick={unlike} variant="contained" color="secondary" className={classes.button}>
							Unlike
                        </Button>}
						{visitedUserStore.relation === -2 && <Button onClick={remDislike} variant="contained" color="secondary" className={classes.button}>
							Remove dislike
                        </Button>}
						{
							visitedUserStore.relation === -1 &&
							<Fragment>
								<Button onClick={e => react(1)} variant="outlined" color="primary" className={classes.button}>
									<i className="fas fa-thumbs-up"></i>
								</Button>
								<Button onClick={e => react(-1)} variant="outlined" color="secondary" className={classes.button}>
									<i className="fas fa-thumbs-down"></i>
								</Button>
							</Fragment>

						}

						<TagsDisplayer tags={visitedUserStore.tags} canDelete={false} />
					</div>
			}
		</div>
	)
}

export default UserPage

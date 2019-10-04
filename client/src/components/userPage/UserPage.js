import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { visitUser, blockUser } from '../../actions/visitingUserActions';
import UserInfoDisplayer from '../helpers/UserInfoDisplayer';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    }, [dispatch]);

    const block = async () => {
        dispatch(await blockUser(visitedUserStore.id));
    }

    if (visitedUserStore.error)
        return (<div>{visitedUserStore.error}</div>)
    return (
        <div>
            {
                visitedUserStore.loading === true ? 'loading' :
                    <div>
                        <UserInfoDisplayer user={visitedUserStore} />
                        <Button onClick={block} variant="contained" color="secondary" className={classes.button}>
                            Block
                        </Button>
                    </div>
            }
        </div>
    )
}

export default UserPage
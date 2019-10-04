import React, { useEffect } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';

import { recieveMatches } from '../../actions/recieveMatchesAction'
import { setReceiver, recieveConvo } from '../../actions/messagesAction'

import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        minHeight: 700,
        maxHeight: 700,
        marginTop: 10,
        border: '#eee7e9 solid 2px'
    }
}));

const MatchesList = () => {


    const classes = useStyles();

    const dispatch = useDispatch();

    const matchesDataStore = useSelector(state => state.chat.matches);

    useEffect(() => {

        const test = async () => {
            dispatch(await recieveMatches());
        };

        test();
    }, [dispatch]);

    const setter = async (user) => {
        dispatch(setReceiver({ id: user.id, username: user.username }));
        dispatch(await recieveConvo(user.id));
    }

    return (
        <div className={classes.root} >
            {
                !matchesDataStore.loading && matchesDataStore.users.length > 0?
                    matchesDataStore.users.map((match) =>
                        <ListItem button onClick={e => setter(match) } key={match.id}>
                            <ListItemText primary={match.username} />
                        </ListItem>
                    ) :
                    <div></div>
            }
        </div>
    );
}

export default MatchesList

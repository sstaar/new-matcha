import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MatchesList from './MatchesList'

import './messaging.css';

import { recieveMatches } from '../../actions/recieveMatchesAction'
import { sendMessage } from '../../actions/messagesAction'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '80%',
    },
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    }
}));

const Messaging = () => {

    const [messagesData, setMessagesData] = useState({
        matches: {},
        message: '',
        receiver: null,
        loading: true
    });


    const dispatch = useDispatch();

    const classes = useStyles();

    const matchesStore = useSelector(state => state.messages.matches);

    const { matches, message, receiver, loading } = messagesData;

    const handleChange = (e) => {
        setMessagesData({ ...messagesData, message: e.target.value });
    }

    useEffect(() => {

        const test = async () => {
            dispatch(await recieveMatches());
        };

        test();
        setMessagesData({
            ...messagesData,
            matches: matchesStore.users,
            loading: matchesStore.loading
        })
    }, [dispatch]);

    if (loading === true) {
        setTimeout(() => {
            setMessagesData({
                ...messagesData,
                matches: matchesStore.users?matchesStore.users:matches,
                loading: matchesStore.loading === false?matchesStore.loading:loading
            })
        }, 100);
    }

    const send = () => {
        if (message)
            dispatch(sendMessage(message, receiver));
    }

    console.log(matches +'|'+loading);

    const setReceiver = (newReceiver) => {
        if (newReceiver)
            setMessagesData({
                ...messagesData,
                receiver:newReceiver
            });
    }

    return (
        <div className='main'>
            <div className='matches'>
                Matches
                <div className={classes.root}>
                    {/* <MatchesList matches={matches} loading={loading} /> */}
                    {
                        !loading&&matches?
                        matches.map((match) => 
                        <ListItem button onClick={e => setReceiver(match.id)} key={match.id}>
                            <ListItemText primary={match.username} />
                        </ListItem>
                    ):<div></div>
                    }
                </div>
            </div>
            <div className='messages'>
                Messages
                <div className='messages-input'>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Message"
                        multiline
                        rowsMax="2"
                        value={message}
                        onChange={e => handleChange(e)}
                        className={classes.textField}
                        margin="normal"
                        // helperText="hello"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={e => send()}
                    >
                        Send
                        <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Messaging

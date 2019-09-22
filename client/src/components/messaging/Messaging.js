import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './messaging.css';

import { recieveMatches } from '../../actions/recieveMatchesAction'

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

    const dispatch = useDispatch();

    const classes = useStyles();

    const matches = useSelector(state => state.messages.matches);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    useEffect(() => {

        const test = async () => {
            dispatch(await recieveMatches());
        };

        test();
    }, [dispatch]);

    return (
        <div className='main'>
            <div className='matches'>
                Matches
                <div className={classes.root}>
                    <ListItem button>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Drafts" />
                    </ListItem>
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

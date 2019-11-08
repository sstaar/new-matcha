import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { reactToUser } from '../../actions/suggestionListAction';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

export default function UserCard({ user }) {

    const dispatch = useDispatch();

    const classes = useStyles();

    const react = async (reaction) => {
        dispatch(await reactToUser(user.id, reaction));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Link to={"/user/" + user.id}>
                    <img className="main-img card-img-top" src="/imgs/user.png" alt="Main pic" />
                </Link>
                <Divider />
                <h4 className="bg-warning text-center text-white py-3">{user.firstname + ' ' + user.lastname} <span className="badge badge-secondary">{user.age}</span></h4>
                <Paper className={classes.root}>
                    <Typography component="p">
                        {user.bio ? user.bio : 'No bio yet!.'}
                    </Typography>
                </Paper>
                <Button onClick={e => react(1)} variant="outlined" color="primary" className={classes.button}>
                    <i className="fas fa-thumbs-up"></i>
                </Button>
                <Button onClick={e => react(-1)} variant="outlined" color="secondary" className={classes.button}>
                    <i className="fas fa-thumbs-down"></i>
                </Button>
            </Container>
        </React.Fragment>
    );
}
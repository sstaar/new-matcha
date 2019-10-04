import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

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

const UsersList = () => {

    const classes = useStyles();

    const searchDataStore = useSelector(state => state.search.searchRes);


    return (
        <div>
            {searchDataStore.length > 0 ?
                searchDataStore.map((user) =>
                    <React.Fragment key={user.id}>
                        <CssBaseline />
                        <Container maxWidth="sm">
                            <img className="main-img card-img-top" src="/imgs/user.png" alt="Main pic" />
                            <Divider />
                            <div>{user.firstname + ' ' + user.lastname}</div>
                            <div>{user.age}</div>
                            <Divider />
                            <Button variant="outlined" color="secondary" className={classes.button}>
                                dislike
                            </Button>
                        </Container>
                    </React.Fragment>
                ):<div></div>}
        </div>

    )
}

export default UsersList

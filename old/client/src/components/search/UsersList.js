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
                            <h4 class="bg-warning text-center text-white py-3">{user.firstname + ' ' + user.lastname} <span class="badge badge-secondary">{user.age}</span></h4>                            
                            <Button variant="outlined" color="secondary" className={classes.button}>
                                <i class="fas fa-thumbs-down"></i>
                            </Button>
                        </Container>
                    </React.Fragment>
                ):<div></div>}
        </div>

    )
}

export default UsersList

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TagSelection from './TagSelection';
import UsersList from './UsersList'
import { searchRequest } from '../../actions/searchActions';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    parent: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
    },
    item: {
        margin: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 700,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Search = () => {
    const classes = useStyles();

    //Allows to use dispatch
    const dispatch = useDispatch();
    
    const searchDataStore = useSelector(state => state.search.searchData);

    const [value, setValue] = useState(0);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    };

    const sendSearchRequest = async () => {
        dispatch(await searchRequest({
            ageGap:searchDataStore.ageGap,
            distanceGap:searchDataStore.distanceGap,
            tags:searchDataStore.selectedTags
        }));
    };

    return (
        <div className={classes.root}>
            <Grid className={classes.parent} container spacing={3}>
                <Grid className={classes.item} item xs={8} sm={4}>
                    <Paper className={classes.paper}>
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                        />
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                        />
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                        />
                        <TagSelection />
                        <Button onClick={e => sendSearchRequest()} variant="contained" color="primary" className={classes.button}>
                            Search
                        </Button>
                    </Paper>
                </Grid>
                <Grid className={classes.item} item xs={11} sm={8}>
                    <Paper className={classes.paper}>
                        <UsersList />
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

export default Search

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TagSelection from './TagSelection';
import UsersList from './UsersList'
import { searchRequest } from '../../actions/searchActions';
import { sortAge, sortDistance, sortFame } from '../../actions/sortingActions';
import { SEARCH_SORT_AGE, SEARCH_SORT_DISTANCE, SEARCH_SORT_FAME } from '../../actions/types'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import '../root.css'

const theme = createMuiTheme({
	palette: {
	  primary: {  main: '#ff6347' }
	},
  });

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

    const [sortOrder, setSortOrder] = useState(1);

    const [searchData,setSearchData] = useState({
        ageGap:searchDataStore.ageGap,
        distanceGap:searchDataStore.distanceGap,
        fameGap:searchDataStore.fameGap,
    })

    const handleSliderChange = (event, newValue, name) => {
        console.log(name)
        setSearchData({
            ...searchData,
            [name]:newValue
        })
        // setValue(newValue);
        // console.log(newValue);
    };

    const sendSearchRequest = async () => {
        dispatch(await searchRequest({
            ageGap: searchData.ageGap,
            fameGap:searchData.fameGap,
            distanceGap: searchData.distanceGap,
            tags: searchDataStore.selectedTags
        }));
    };

    const sortAgeButton = () => {
        setSortOrder(sortOrder * (-1));
        dispatch(sortAge(sortOrder * (-1), SEARCH_SORT_AGE));
    };

    const sortDistanceButton = () => {
        setSortOrder(sortOrder * (-1));
        dispatch(sortDistance(sortOrder * (-1), SEARCH_SORT_DISTANCE));
    };

    const sortFameButton = () => {
        setSortOrder(sortOrder * (-1));
        dispatch(sortFame(sortOrder * (-1), SEARCH_SORT_FAME));
    };


    return (
        <div className="container">
            <h3 className="font-weight-bold mb-5 text-center">🔍 Search</h3>
            <div className="row ">
					<div className="col-lg-4 col-md-6 col-sm-12 search p-4 rounded mr-auto">
                    <ThemeProvider theme={theme}>
                    AgeGap
                        <Slider
                            value={typeof value === 'number' ? searchData.ageGap : 0}
                            onChange={(event, newValue) => handleSliderChange(event, newValue, 'ageGap')}
                            aria-labelledby="input-slider"
                            name="ageGap"
                        />
                    DistanceGap
                        <Slider
                            value={typeof value === 'number' ? searchData.distanceGap : 0}
                            onChange={(event, newValue) => handleSliderChange(event, newValue, 'distanceGap')}
                            aria-labelledby="input-slider"
                            name="distanceGap"
                        />
                    fameGap
                        <Slider
                            value={typeof value === 'number' ? searchData.fameGap : 0}
                            onChange={(event, newValue) => handleSliderChange(event, newValue, 'fameGap')}
                            aria-labelledby="input-slider"
                            name="fameGap"
                        />
                        <TagSelection />
                        <Button onClick={e => sendSearchRequest()} variant="contained" color="primary" className={classes.button}>
                            Search
                        </Button>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={sortAgeButton} >Sort age</Button>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={sortDistanceButton} >Sort distance</Button>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={sortFameButton} >Sort fame rating</Button>
                        </ThemeProvider>    
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 ml-auto">
                        <div className="col-lg-6 float-left"><UsersList /></div>
                    </div>
            </div>
        </div>
    );
}

export default Search

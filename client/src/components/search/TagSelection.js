import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagOptionsList from './TagOptionsList';
import { getSearchOptions, changeSelectedTags } from '../../actions/searchActions';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

const TagSelection = () => {

    const classes = useStyles();

    const searchDataStore = useSelector(state => state.search.searchData);

    const [selectedTags, setSelectedTags] = useState([]);

    //Allows to use dispatch
	const dispatch = useDispatch();

    useEffect(() => {

		const test = async () => {
			dispatch(await getSearchOptions());
		};

		test();
	}, [dispatch]);

    const handleToggle = (value) => async () => {
        const currentIndex = selectedTags.indexOf(value);
        const newChecked = [...selectedTags];

        if (currentIndex === -1)
          newChecked.push(value);
        else
          newChecked.splice(currentIndex, 1);

        setSelectedTags(newChecked);
        dispatch(await changeSelectedTags(newChecked));
    };

    if (searchDataStore.loading === true)
        return (<div></div>);
    else
        return (
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item>
                    <TagOptionsList selectedTags={selectedTags} handleToggle={handleToggle} items={searchDataStore.tags} />
                </Grid>
            </Grid>
        )
}

export default TagSelection

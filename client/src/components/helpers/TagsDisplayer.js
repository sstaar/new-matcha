import React from 'react'
import { useDispatch } from 'react-redux';

import { removeTag } from '../../actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        height: 300,
        margin: '10px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

const TagsDisplayer = ({ tags, canDelete }) => {

    const classes = useStyles();

    //Allows to use dispatch
    const dispatch = useDispatch();

    return (
        <Paper className={classes.root}>
            {tags.map((tag) => {
                return (canDelete === true ?
                    <Chip
                        key={tag.tagid}
                        label={tag.tagname}
                        onDelete={async () => dispatch(await removeTag(tags, tag.tagid))}
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                    /> :
                    <Chip
                        key={tag.tagid}
                        label={tag.tagname}
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                    />)
            }

            )}
        </Paper>
    )
}

export default TagsDisplayer

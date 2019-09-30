import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    paper: {
      width: 200,
      height: 230,
      overflow: 'auto',
    }
  }));

const TagOptionsList = ({ items, selectedTags, handleToggle }) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map(tag => {
                    const labelId = `transfer-list-item-${tag.id}-label`;

                    return (
                        <ListItem key={tag.id} role="listitem" button onClick={handleToggle(tag.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={selectedTags.indexOf(tag.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={tag.tagname} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    )
}

export default TagOptionsList

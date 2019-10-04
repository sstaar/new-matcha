import React from 'react'

import UserImagesDisplay from './UserImagesDisplay'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider'
import SettingsInputHdmiRoundedIcon from '@material-ui/icons/SettingsInputHdmiRounded';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    center: {
        margin: '20px auto',
        textAlign: 'center',
    },
    root: {
        padding: theme.spacing(3, 2),
        width: '40%',
        minWidth: 310,
        marginTop: 50,
        flexGrow: 1,
    },
    bigAvatar: {
        maxWidth: 400,
        maxheight: 400,
        width: 200,
        height: 200,
    },
}));

const marks = [
    {
        value: 10,
        label: 10,
    },
    {
        value: 20,
        label: 20,
    },
    {
        value: 30,
        label: 30,
    },
    {
        value: 40,
        label: 40,
    },
    {
        value: 50,
        label: 50,
    },
    {
        value: 60,
        label: 60,
    },
    {
        value: 70,
        label: 70,
    },
    {
        value: 80,
        label: 80,
    },
    {
        value: 90,
        label: 90,
    },
];


const UserInfoDisplayer = ({ user }) => {

    const classes = useStyles();

    return (

        <Paper className={classes.root + ' ' + classes.center} >
            <UserImagesDisplay imgs={user.images} />
            {
                user.is_online === 1 ?
                    <Tooltip disableFocusListener title="Connected" placement="bottom">
                        <SettingsInputHdmiRoundedIcon color="primary" />
                    </Tooltip> :
                    <div></div>

            }
            {
                user.is_online === 0 ?
                    <Tooltip disableFocusListener title={user.last_connection} placement="bottom">
                        <SettingsInputHdmiRoundedIcon />
                    </Tooltip> :
                    <div></div>
            }

            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Typography className={classes.center} variant="h5" component="h3">
                        {user.username}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography className={classes.center} component="p">
                        {user.firstname + ' ' + user.lastname}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography className={classes.center} component="p">
                        {user.age}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography className={classes.center} component="p">
                        {user.gender}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography className={classes.center} component="p">
                        {user.bio}
                    </Typography>
                    <Typography className={classes.center} component="p">
                        {user.fame_rate}
                    </Typography>

                </Grid>
                <Grid className={classes.center} item xs={12} sm={10}>
                    <Slider
                        value={user.fame_rate * 10}
                        aria-labelledby="discrete-slider-always"
                        marks={marks}
                        valueLabelDisplay="on"
                    />
                </Grid>

            </Grid>
        </Paper>
    )
}

export default UserInfoDisplayer

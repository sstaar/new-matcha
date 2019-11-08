import React from 'react'
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { resetLocation } from '../../actions/userActions';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const getGeoLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                if (error.code === 1)
                    resolve({ coords: { latitude: 0, longitude: 0 } })
                reject(error);
            });
    });
}

export const ResetLocation = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleClick = async () => {
        let pos = await getGeoLocation();
        const { latitude, longitude } = pos.coords;
        dispatch(await resetLocation(latitude, longitude));
    }

    return (
        <Button onClick={handleClick} variant="contained" color="primary" className={classes.button}>
            Reset your location
        </Button>
    )
}

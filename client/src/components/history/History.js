import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { recieveHistory } from '../../actions/historyActions';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(1),
    },
}));

const History = () => {

    const classes = useStyles();

    //Allows to use dispatch
    const dispatch = useDispatch();

    const historyStore = useSelector(state => state.history);

    useEffect(() => {

        const test = async () => {
            dispatch(await recieveHistory());
        };

        test();
    }, [dispatch]);

    if (historyStore.loading === false)
        return (
            <div>
                {
                    historyStore.history.map((notif) =>
                        <div>
                            <Link className={classes.link} to={"/user/" + notif.invoker}>{notif.username}</Link>
                            <div key={notif.id}>{notif.content}</div>
                        </div>

                    )
                }
            </div>
        )
    else
        return (<div></div>)
}

export default History

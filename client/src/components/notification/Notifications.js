import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { recieveNotifications } from '../../actions/notificationsActions';

const Notifications = () => {

    //Allows to use dispatch
    const dispatch = useDispatch();

    const notificationsStore = useSelector(state => state.notifications);

    useEffect(() => {

        const test = async () => {
            dispatch(await recieveNotifications());
        };

        test();
    }, [dispatch]);

    if (notificationsStore.loading === false)
        return (
            <div>
                {
                    notificationsStore.notifications.map((notif) => <div key={notif.id}>{notif.content}</div>)
                }
            </div>
        )
    else
        return (<div></div>)
}

export default Notifications

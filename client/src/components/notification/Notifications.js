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
            <div class="container">
                <h3 className="font-weight-bold mb-5 text-center">🔔 Notifications</h3>
                <ul class="list-group col-lg-5 col-sm-8 mx-auto ">
                    {
                        notificationsStore.notifications.length > 0 && notificationsStore.notifications.map((notif) => <li class="list-group-item" key={notif.id}>{notif.content}</li>)
                    }
                </ul>
            </div>
        )
    else
        return (<div></div>)
}

export default Notifications

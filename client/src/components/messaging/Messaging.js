import React from 'react';

import MatchesList from './MatchesList'
import Conversation from './Conversation'

import './messaging.css';

const Messaging = () => {
    return (
        <div className='main'>
            <div className='matches'>
                <MatchesList />
            </div>
            <div className='messages'>
                <Conversation />
            </div>
        </div>
    )
}

export default Messaging

import React from 'react';

import MatchesList from './MatchesList'
import Conversation from './Conversation'

import './messaging.css';

const Messaging = () => {
	return (
		<div>
			<h3 className="font-weight-bold mb-5 text-center">Start Your Story!</h3>
			<div className='main'>
				<div className='matches'>
					<MatchesList />
				</div>
				<div className='messages'>
					<Conversation />
				</div>
			</div>
		</div>
	)
}

export default Messaging

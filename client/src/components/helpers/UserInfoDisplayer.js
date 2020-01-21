import React from 'react'

import UserImagesDisplay from './UserImagesDisplay'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Tooltip from '@material-ui/core/Tooltip';
import { Progress } from "shards-react";
import './helper.css';

const UserInfoDisplayer = ({ user }) => {
	return (
		<div className="w-100 p-10 profileContainer p-4 mx-auto text-center">
			<UserImagesDisplay className="w-100" imgs={user.images} />
			<Tooltip
				TransitionProps={{ timeout: 600 }}
				title={user.is_online === 1 ? "Online." : user.last_connection}
			>
				<FiberManualRecordIcon className={user.is_online === 1 ? "text-success" : "text-dark"} />
			</Tooltip>
			<h3>{user.username} <span className="badge badge-secondary">{user.age}</span></h3>
			<p className="mt-2  fs-10 mb-0">{user.gender}</p>
			<p className="mt-2  fs-10 mb-0">Sexual preferences : <b>{user.orientation === "both" ? "everyone" : user.orientation}</b></p>
			<Progress className="w-50 mx-auto" theme="warning" value={user.fame_rate * 10}>{user.fame_rate * 10}</Progress>
			<p className="mt-2  fs-10 mb-0">First Name : <b>{user.firstname}</b></p>
			<p className="mt-2 mb-0">Last Name : <b>{user.lastname}</b></p>
			<p className="mt-2 mb-0">{user.bio}</p>
		</div>
	)
}

export default UserInfoDisplayer

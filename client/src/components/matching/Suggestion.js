import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { suggestionsList } from '../../actions/suggestionListAction';
import UserCard from './UserCard'

export default function Suggestion() {

	const dispatch = useDispatch();

	const suggestionList = useSelector(state => state.suggestionList);

	useEffect(() => {

		const test = async () => {
			dispatch(await suggestionsList())
		};

		test();
	}, [dispatch]);

	if (suggestionList.loading === false)
		return (
			<div>
				{suggestionList.list.map((user) =>
					<UserCard user={user} key={user.id} />
				)}
			</div>
		)
	else
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		)
}

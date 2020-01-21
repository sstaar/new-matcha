import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../../actions/registerActions';

export const ValidateEmail = ({ match }) => {

	const dispatch = useDispatch();

	const activationStore = useSelector(state => state.register);

	useEffect(() => {

		const test = async () => {
			dispatch(await validateEmail(match.params.token));
		};

		test();
	}, [dispatch, match.params.token]);

	if (activationStore.activationLoading === true)
		return (<div>LOADING!</div>)

	return (
		<div>
			{activationStore.activationSuccess || activationStore.activationFailure}
		</div>
	)
}

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const NotConnectedComponent = ({ component: Component, ...rest }) => {
	const connection = useSelector(state => state.login);

	//console.log(rest);
	// console.log(typeof connection.connected)

	return (
		<Route {...rest} render={props => {
			if (connection.connected === false)
				return <Component {...props} />
			else
				return <Redirect to="/profile" />
		}} />
	);
		
}

export default NotConnectedComponent;

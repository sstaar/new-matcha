import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//This component takes a component as a prop and includes
//A route to the component if the user is not connected
//If the user is connected it redirect to the profile page
const NotConnectedComponent = ({ component: Component, ...rest }) => {
	const connection = useSelector(state => state.login);

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

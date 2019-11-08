import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//This component takes a component as a prop and includes
//A route to the component if the user is connected
//If not it redirect to the login page
const ConnectedComponent = ({ component: Component, ...rest }) => {
	const connection = useSelector(state => state.login);

	return (
		<Route {...rest} render={props => {
			if (connection.connected === true)
				return <Component {...props} />
			else
				return <Redirect to="/login" />
		}} />
	);
}

export default ConnectedComponent;

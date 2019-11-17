import React from "react";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NavBar from "./components/navbar/NavBar";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import ConnectedComponent from "./components/helpers/ConnectedComponent";
import NotConnectedComponent from "./components/helpers/NotConnectedComponent";
import Profile from "./components/profile/Profile";
import Suggestion from "./components/matching/Suggestion";
import Messaging from "./components/messaging/Messaging";
import Search from "./components/search/Search";
import Notifications from "./components/notification/Notifications";
import History from "./components/history/History";
import UserPage from "./components/userPage/UserPage";

import store from "./store";
import { Provider } from "react-redux";
import { Footer } from "./components/footer/Footer";
import { ValidateEmail } from "./components/auth/ValidateEmail";
import { ResetPassword } from "./components/auth/ResetPassword";
import { ResetPasswordInfo } from "./components/auth/ResetPasswordInfo";

//This app file is the main file where we gonna have the main layout
//It contains the navbar and the router
function App() {
	return (
		<Provider store={store}>
			<Router>
				<NavBar />
				<Switch>
					<NotConnectedComponent
						path="/resetPassword/:token"
						component={ResetPasswordInfo}
					/>
					<NotConnectedComponent
						path="/resetPassword/"
						component={ResetPassword}
					/>

					<NotConnectedComponent
						path="/validateEmail/:token"
						component={ValidateEmail}
					/>
					<NotConnectedComponent path="/register" component={Register} />
					<NotConnectedComponent path="/login" component={Login} />
					<ConnectedComponent path="/profile" component={Profile} />
					<ConnectedComponent path="/suggestions" component={Suggestion} />
					<ConnectedComponent path="/Messaging" component={Messaging} />
					<ConnectedComponent path="/Search" component={Search} />
					<ConnectedComponent path="/notifications" component={Notifications} />
					<ConnectedComponent path="/history" component={History} />
					<ConnectedComponent path="/user/:id" component={UserPage} />
				</Switch>
			</Router>
			{/* <Footer /> */}
		</Provider>
	);
}

export default App;

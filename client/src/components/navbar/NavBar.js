import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../actions/types";
import { recieveNotifications } from "../../actions/notificationsActions";

const NavBar = () => {
	const dispatch = useDispatch();

	const [cusStyle, setCusStyle] = useState("");

	const onClickLogout = e => {
		e.preventDefault();

		dispatch({ type: LOGOUT });
	};

	const connected = useSelector(state => state.login.connected);

	useEffect(() => {
		const test = async () => {
			dispatch(await recieveNotifications());
		};

		if (connected)
			test();
	}, [dispatch, connected]);

	const socketStore = useSelector(state => state.socket.socket);

	const notifsStore = useSelector(state => state.notifications.notifications);

	if (notifsStore.length !== 0 && notifsStore[0].read === 0)
		setCusStyle("text-warning");

	if (socketStore) {
		const array = socketStore.listeners("notification");
		if (array.length === 0) {
			socketStore.on("notification", async msg => {
				setCusStyle("text-warning");
			});
		}
	}

	//A simple navbar containing the logout dispatch
	//Look at the loginReducer for more info
	return (
		<nav className="navbar navbar-expand-lg">
			<Link className="navbar-brand" to="/register">
				Matcha
      </Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				{/* <li className="nav-item active">
                <Link className="nav-link" to="/register">Register <span className="sr-only">(current)</span></Link>
              </li> */}
				{connected === true ? (
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/profile">
								<i className="fas fa-user-circle"></i> Profile
              </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/suggestions">
								<i className="fas fa-user-alt"></i> Suggestion
              </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/Messaging">
								<i className="fas fa-envelope"></i> Messaging
              </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/Search">
								<i className="fas fa-search"></i> Search
              </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/notifications">
								<i className={"fas fa-bell " + cusStyle}></i> Notifications
              </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/history">
								<i className="fas fa-history"></i> History
              </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#" onClick={e => onClickLogout(e)}>
								<i className="fas fa-sign-out-alt"></i> LogOut
              </Link>
						</li>
					</ul>
				) : (
						<div></div>
					)}
				{connected === false ? (
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								<i className="fas fa-sign-in-alt"></i> LogIn
              </Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/register">
								<i className="fas fa-plus"></i> Register
              </Link>
						</li>
					</ul>
				) : (
						<div></div>
					)}
			</div>
		</nav>
	);
};

export default NavBar;

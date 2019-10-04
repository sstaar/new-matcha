import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../actions/types';

const NavBar = () => {
  const dispatch = useDispatch();

  const onClickLogout = e => {
    e.preventDefault();

    dispatch({ type: LOGOUT });
  }

  const connected = useSelector(state => state.login.connected);

  //A simple navbar containing the logout dispatch
  //Look at the loginReducer for more info
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/register">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {/* <li className="nav-item active">
                <Link className="nav-link" to="/register">Register <span className="sr-only">(current)</span></Link>
              </li> */}
          {
            connected === true ?
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li> :
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>

          }
          {
            connected === false ?
              <li className="nav-item">
                <Link className="nav-link" to="/login">LogIn</Link>
              </li> : <div></div>
          }
          <li className="nav-item">
            <Link className="nav-link" to="/suggestions">Suggestion</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Messaging">Messaging</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Search">Search</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notifications">Notifications</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/history">History</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/register" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown</Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/register">Action</Link>
              <Link className="dropdown-item" to="/register">Another action</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/register">Something else here</Link>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#" onClick={e => onClickLogout(e)} >LogOut</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default NavBar;
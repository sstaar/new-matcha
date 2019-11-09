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
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/register">Matcha</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {/* <li className="nav-item active">
                <Link className="nav-link" to="/register">Register <span className="sr-only">(current)</span></Link>
              </li> */}
          {
            connected === true ?
                <span className="liContainer">
                <li className="nav-item">
                  <Link className="nav-link" to="/profile"><i className="fas fa-user-circle"></i> Profile</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to="/suggestions"><i className="fas fa-user-alt"></i> Suggestion</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Messaging"><i className="fas fa-envelope"></i> Messaging</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Search"><i className="fas fa-search"></i> Search</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/notifications"><i className="fas fa-bell"></i> Notifications</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/history"><i className="fas fa-history"></i> History</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#" onClick={e => onClickLogout(e)} ><i className="fas fa-sign-out-alt"></i> LogOut</Link>
                </li>
                </span>             
            : <div></div>


          }
          {
            connected === false ?
              <span className="liContainer">
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> LogIn</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to="/register"><i className="fas fa-plus"></i> Register</Link>
                </li>
              </span>
              : <div></div>
          }
          
        </ul>
      </div>
    </nav>
  )
};

export default NavBar;
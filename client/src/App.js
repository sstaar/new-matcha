import React from 'react';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NavBar from './components/navbar/NavBar';


import { BrowserRouter as Router } from 'react-router-dom';
import ConnectedComponent from './components/helpers/ConnectedComponent';
import NotConnectedComponent from './components/helpers/NotConnectedComponent';
import Profile from './components/profile/Profile'
import store from './store';
import { Provider } from 'react-redux';

//This app file is the main file where we gonna have the main layout
//It contains the navbar and the router
function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <NotConnectedComponent path="/register" component={Register} />
        <NotConnectedComponent path="/login" component={Login} />
        <ConnectedComponent path="/profile" component={Profile} />
      </Router>
    </Provider>
  );
}

export default App;

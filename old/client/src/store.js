import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

//This variable is irrelevant for the moment
const initialState	= {};

//Thunk is a middleware that allows us to write
//async logic that interacts with the store
const middleware	= [thunk];

//This is the store that we will be using to connect all of our pages
//The rootReducer can be found in /client/src/reducers/index.js
const store			= createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store
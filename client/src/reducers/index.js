import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import suggestionListReducer from './suggestionListReducer';
import messagesReducer from './messagesReducer';


//this only comine all the reducers because
//we will be having many reducers in the future
export default combineReducers({
	register		: registerReducer,
	login			: loginReducer,
	user			: userReducer,
	suggestionList	: suggestionListReducer,
	messages		: messagesReducer
})
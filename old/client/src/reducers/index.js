import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import suggestionListReducer from './suggestionListReducer';
import messagesReducer from './messagesReducer';
import searchReducer from './searchReducer';
import notificationsReducer from './notificationsReducer'
import visitedUserReducer from './visitedUserReducer';
import historyReducer from './historyReducer';


//this only comine all the reducers because
//we will be having many reducers in the future
export default combineReducers({
	register		: registerReducer,
	login			: loginReducer,
	user			: userReducer,
	suggestionList	: suggestionListReducer,
	chat			: messagesReducer,
	search			: searchReducer,
	notifications	: notificationsReducer,
	visitedUser		: visitedUserReducer,
	history			: historyReducer
})
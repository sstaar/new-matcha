import { combineReducers } from 'redux';
import registerReducer from './registerReducer';


//this only comine all the reducers because
//we will be having many reducers in the future
export default combineReducers({
	register: registerReducer
})
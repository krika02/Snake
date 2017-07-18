import { combineReducers } from 'redux';
import gameReducer from './game';

const combinedReducer = combineReducers({
	gameReducer,
});

export default combinedReducer;

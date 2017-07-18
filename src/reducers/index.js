import { combineReducers } from 'redux';
import game from './game';

const combinedReducer = combineReducers({
	game,
});

export default combinedReducer;

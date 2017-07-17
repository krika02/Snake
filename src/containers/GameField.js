import { connect } from 'react-redux';
import GameFieldComponent from '../components/GameField/GameField';
import gameActions from '../actions/game';
import gc from '../constants/gameConstants';

let keydownActive;

const boardKeys = Object.keys(gc.KEY_COMMANDS).map(e => parseInt(e, 10));

const mapStateToProps = state => ({
	direction: state.game.direction,
	score: state.game.score,
	running: state.game.running,
	gameOver: state.game.gameOver,
	field: state.game.field,
});

const mapDispatchToProps = dispatch => ({
	keyUp: () => {
		keydownActive = null;
	},
	keyDown: (e) => {
		if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
			return;
		}
		const type = gc.KEY_COMMANDS[e.keyCode];
		if (type === keydownActive) {
			return;
		}
		keydownActive = type;

		switch (type) {
			case gc.KEYS.ENTER:
				dispatch(gameActions.newGame);
				break;
			case gc.KEYS.UP:
				dispatch(gameActions.moveUp);
				break;
			case gc.KEYS.DOWN:
				dispatch(gameActions.moveDown);
				break;
			case gc.KEYS.LEFT:
				dispatch(gameActions.moveLeft);
				break;
			case gc.KEYS.RIGHT:
				dispatch(gameActions.moveRight);
				break;
			default:
				dispatch(gameActions.moveLeft);
		}
	},
	update: () => {
		dispatch(gameActions.update);
	},
	newGame: () => {
		dispatch(gameActions.newGame);
	},
});

const GameField = connect(mapStateToProps, mapDispatchToProps)(GameFieldComponent);

export default GameField;

import { connect } from 'react-redux';
import GameFieldComponent from '../components/GameField/GameField';
import gameActions from '../actions/game';
import gameConstants from '../constants/game';

let keydownActive;

const boardKeys = Object.keys(gameConstants.KEY_COMMANDS).map(e => parseInt(e, 10));

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
		const type = gameConstants.KEY_COMMANDS[e.keyCode];
		if (type === keydownActive) {
			return;
		}
		keydownActive = type;

		switch (type) {
			case gameConstants.KEYS.ENTER:
				dispatch(gameActions.newGame);
				break;
			case gameConstants.KEYS.UP:
				dispatch(gameActions.moveUp);
				break;
			case gameConstants.KEYS.DOWN:
				dispatch(gameActions.moveDown);
				break;
			case gameConstants.KEYS.LEFT:
				dispatch(gameActions.moveLeft);
				break;
			case gameConstants.KEYS.RIGHT:
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

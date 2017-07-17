import gameConstants from '../constants/game';

const game = {
	moveUp: { type: gameConstants.DIRECTION_UP },
	moveDown: { type: gameConstants.DIRECTION_DOWN },
	moveLeft: { type: gameConstants.DIRECTION_LEFT },
	moveRight: { type: gameConstants.DIRECTION_RIGHT },
	newGame: { type: gameConstants.GAME_NEW },
	update: { type: gameConstants.GAME_UPDATE },
};

export default game;

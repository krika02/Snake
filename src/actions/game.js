import gc from '../constants/gameConstants';

const game = {
	moveUp: { type: gc.DIRECTION_UP },
	moveDown: { type: gc.DIRECTION_DOWN },
	moveLeft: { type: gc.DIRECTION_LEFT },
	moveRight: { type: gc.DIRECTION_RIGHT },
	newGame: { type: gc.GAME_NEW },
	update: { type: gc.GAME_UPDATE },
};

export default game;

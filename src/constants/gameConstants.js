
const gameInitialState = {
	running: false,
	gameOver: false,
	score: 0,
	field: [],
	position: [{
		x: 15,
		y: 15,
	}],
	length: 10,
	direction: null,
	powerUp: null,
};

const keys = {
	ENTER: 'ENTER',
	LEFT: 'LEFT',
	UP: 'UP',
	RIGHT: 'RIGHT',
	DOWN: 'DOWN',
};

const gameConstants = {
	SPACE: 0,
	BLOCK: 1,
	POWER_UP: 2,
	POWER_UP_SCORE: 30,
	DIRECTION_UP: 'DIRECTION_UP',
	DIRECTION_DOWN: 'DIRECTION_DOWN',
	DIRECTION_LEFT: 'DIRECTION_LEFT',
	DIRECTION_RIGHT: 'DIRECTION_RIGHT',
	GAME_UPDATE: 'GAME_UPDATE',
	GAME_NEW: 'GAME_NEW',
	GAME_OVER: 'GAME_OVER',
	GAME_SPEED: 100,
	GAME_ROWS: 25,
	GAME_COLS: 25,
	GAME_INITIAL_STATE: gameInitialState,
	COMBINED_INITIAL_STATE: {
		game: gameInitialState,
	},
	KEYS: keys,
	KEY_COMMANDS: {
		13: keys.ENTER,
		37: keys.LEFT,
		38: keys.UP,
		39: keys.RIGHT,
		40: keys.DOWN,
	},
};

export default gameConstants;

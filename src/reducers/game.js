import gc from '../constants/gameConstants';

const isGameOver = (state, newPosition) => {
	const headPosition = newPosition[0];

	if (state.field[headPosition.y][headPosition.x] === gc.BLOCK) {
		return true;
	}

	if (newPosition.filter(p => p.x === headPosition.x && p.y === headPosition.y).length > 1) {
		return true;
	}

	return false;
};

const random = max => Math.floor((Math.random() * max) + 1);

module.exports = (state = {}, action) => {
	switch (action.type) {

		case gc.GAME_UPDATE: {
			if (!state.running) {
				return state;
			}

			let gameOver = false;
			let running = true;
			let score = state.score;
			let length = state.length;
			let powerUp = state.powerUp;

			const newField = [...state.field];
			const headPosition = state.position[0];
			const newPosition = [...state.position];

			switch (state.direction) {
				case gc.DIRECTION_UP:
					newPosition.unshift({
						y: headPosition.y - 1,
						x: headPosition.x,
					});
					break;
				case gc.DIRECTION_DOWN:
					newPosition.unshift({
						y: headPosition.y + 1,
						x: headPosition.x,
					});
					break;
				case gc.DIRECTION_LEFT:
					newPosition.unshift({
						y: headPosition.y,
						x: headPosition.x - 1,
					});
					break;
				case gc.DIRECTION_RIGHT:
					newPosition.unshift({
						y: headPosition.y,
						x: headPosition.x + 1,
					});
					break;
				default: break;
			}

			const newHeadPosition = newPosition[0];

			if (state.length < newPosition.length) {
				const lastBlock = newPosition.slice(-1).pop();
				newField[lastBlock.y][lastBlock.x] = gc.SPACE;
				newPosition.splice(-1, 1);
			}

			if (isGameOver(state, newPosition)) {
				gameOver = true;
				running = false;
			} else {
				if (powerUp !== null
				&& newHeadPosition.x === powerUp.x
				&& newHeadPosition.y === powerUp.y) {
					score += gc.POWER_UP_SCORE;
					length += 2;
					powerUp = null;
				}

				if (powerUp === null) {
					let x = random(gc.GAME_COLS - 1);
					let y = random(gc.GAME_ROWS - 1);

					while (newField[y][x] === gc.BLOCK
						|| (newHeadPosition.x === x && newHeadPosition.y === y)) {
						x = random(gc.GAME_COLS - 1);
						y = random(gc.GAME_ROWS - 1);
					}

					powerUp = {
						x,
						y,
					};
				}

				newField[powerUp.y][powerUp.x] = gc.POWER_UP;
			}

			for (let i = 0; i < newPosition.length; i += 1) {
				const snakeBlock = newPosition[i];
				newField[snakeBlock.y][snakeBlock.x] = gc.BLOCK;
			}

			return Object.assign({}, state, {
				position: newPosition,
				score,
				length,
				gameOver,
				running,
				powerUp,
				field: newField });
		}

		case gc.DIRECTION_UP:
		case gc.DIRECTION_DOWN:
		case gc.DIRECTION_LEFT:
		case gc.DIRECTION_RIGHT:
			if (!state.running) {
				return state;
			}
			if (state.direction === action.type
				|| (state.direction === gc.DIRECTION_UP && action.type === gc.DIRECTION_DOWN)
				|| (state.direction === gc.DIRECTION_DOWN && action.type === gc.DIRECTION_UP)
				|| (state.direction === gc.DIRECTION_LEFT && action.type === gc.DIRECTION_RIGHT)
				|| (state.direction === gc.DIRECTION_RIGHT && action.type === gc.DIRECTION_LEFT)) {
				return state;
			}
			return Object.assign({}, state, { direction: action.type });

		case gc.GAME_NEW: {
			if (state.running) {
				return state;
			}
			const field = [];
			for (let y = 0; y < gc.GAME_ROWS; y += 1) {
				field[y] = [];
				for (let x = 0; x < gc.GAME_COLS; x += 1) {
					if (y === 0 || y === gc.GAME_ROWS - 1 || x === 0 || x === gc.GAME_COLS - 1) {
						field[y][x] = gc.BLOCK;
					} else {
						field[y][x] = gc.SPACE;
					}
				}
			}

			return Object.assign({}, gc.GAME_INITIAL_STATE, {
				field,
				running: true,
				direction: gc.DIRECTION_LEFT,
			});
		}

		case gc.GAME_OVER:
			return Object.assign({}, state, {
				gameOver: true,
				running: false,
			});

		default:
			return state;

	}
};

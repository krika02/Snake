import gameConstants from '../constants/game';

const isGameOver = (state, newPosition) => {
	const headPosition = newPosition[0];

	// Check if first snake block is colliding with a block

	if (state.field[headPosition.y][headPosition.x] === gameConstants.BLOCK) {
		return true;
	}

	// Check if first snake block is colliding with any snake blocks

	if (newPosition.filter(p => p.x === headPosition.x && p.y === headPosition.y).length > 1) {
		return true;
	}

	return false;
};

const random = max => Math.floor((Math.random() * max) + 1);

module.exports = (state = {}, action) => {
	switch (action.type) {

		case gameConstants.GAME_UPDATE: {
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

			// Get next position depending on direction

			switch (state.direction) {
				case gameConstants.DIRECTION_UP:
					newPosition.unshift({
						y: headPosition.y - 1,
						x: headPosition.x,
					});
					break;
				case gameConstants.DIRECTION_DOWN:
					newPosition.unshift({
						y: headPosition.y + 1,
						x: headPosition.x,
					});
					break;
				case gameConstants.DIRECTION_LEFT:
					newPosition.unshift({
						y: headPosition.y,
						x: headPosition.x - 1,
					});
					break;
				case gameConstants.DIRECTION_RIGHT:
					newPosition.unshift({
						y: headPosition.y,
						x: headPosition.x + 1,
					});
					break;
				default: break;
			}

			const newHeadPosition = newPosition[0];

			// If snake legnth is longer than expected (state.length),
			// then remove last block from snake

			if (state.length < newPosition.length) {
				const lastBlock = newPosition.slice(-1).pop();
				newField[lastBlock.y][lastBlock.x] = gameConstants.SPACE;
				newPosition.splice(-1, 1);
			}

			if (isGameOver(state, newPosition)) {
				// Game is over, set game over state

				gameOver = true;
				running = false;
			} else {
				if (powerUp !== null
				&& newHeadPosition.x === powerUp.x
				&& newHeadPosition.y === powerUp.y) {
					// Snake is colliding with power up
					// Add score, length and remove power up

					score += gameConstants.POWER_UP_SCORE;
					length += 2;
					powerUp = null;
				}

				if (powerUp === null) {
					// Create a new power up in an empty position

					let x = random(gameConstants.GAME_COLS - 1);
					let y = random(gameConstants.GAME_ROWS - 1);

					while (newField[y][x] === gameConstants.BLOCK
						|| (newHeadPosition.x === x && newHeadPosition.y === y)) {
						x = random(gameConstants.GAME_COLS - 1);
						y = random(gameConstants.GAME_ROWS - 1);
					}

					powerUp = {
						x,
						y,
					};
				}

				newField[powerUp.y][powerUp.x] = gameConstants.POWER_UP;
			}

			// Update snake blocks in the field

			for (let i = 0; i < newPosition.length; i += 1) {
				const snakeBlock = newPosition[i];
				newField[snakeBlock.y][snakeBlock.x] = gameConstants.BLOCK;
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

		case gameConstants.DIRECTION_UP:
		case gameConstants.DIRECTION_DOWN:
		case gameConstants.DIRECTION_LEFT:
		case gameConstants.DIRECTION_RIGHT:
			if (!state.running) {
				return state;
			}
			if (state.direction === action.type
				|| (state.direction === gameConstants.DIRECTION_UP &&
						action.type === gameConstants.DIRECTION_DOWN)
				|| (state.direction === gameConstants.DIRECTION_DOWN &&
						action.type === gameConstants.DIRECTION_UP)
				|| (state.direction === gameConstants.DIRECTION_LEFT &&
						action.type === gameConstants.DIRECTION_RIGHT)
				|| (state.direction === gameConstants.DIRECTION_RIGHT &&
						action.type === gameConstants.DIRECTION_LEFT)) {
				return state;
			}
			return Object.assign({}, state, { direction: action.type });

		case gameConstants.GAME_NEW: {
			if (state.running) {
				return state;
			}

			// Generate a new game field with blocks and spaces

			const field = [];
			for (let y = 0; y < gameConstants.GAME_ROWS; y += 1) {
				field[y] = [];
				for (let x = 0; x < gameConstants.GAME_COLS; x += 1) {
					if (y === 0 || y === gameConstants.GAME_ROWS - 1
						|| x === 0 || x === gameConstants.GAME_COLS - 1) {
						field[y][x] = gameConstants.BLOCK;
					} else {
						field[y][x] = gameConstants.SPACE;
					}
				}
			}

			return Object.assign({}, gameConstants.GAME_INITIAL_STATE, {
				field,
				running: true,
				direction: gameConstants.DIRECTION_LEFT,
			});
		}

		default:
			return state;

	}
};

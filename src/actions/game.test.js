import gameActions from './game';
import gameConstants from '../constants/game';

describe('actions/game moveUp', () => {
	it('moveUp should create DIRECTION_UP action', () => {
		expect(gameActions.moveUp.type === gameConstants.DIRECTION_UP);
	});
});

describe('actions/game moveDown', () => {
	it('moveDown should create DIRECTION_DOWN action', () => {
		expect(gameActions.moveDown.type === gameConstants.DIRECTION_DOWN);
	});
});

describe('actions/game moveLeft', () => {
	it('moveLeft should create DIRECTION_LEFT action', () => {
		expect(gameActions.moveLeft.type === gameConstants.DIRECTION_LEFT);
	});
});

describe('actions/game moveRight', () => {
	it('moveRight should create DIRECTION_RIGHT action', () => {
		expect(gameActions.moveRight.type === gameConstants.DIRECTION_RIGHT);
	});
});

describe('actions/game newGame', () => {
	it('newGame should create GAME_NEW action', () => {
		expect(gameActions.newGame.type === gameConstants.GAME_NEW);
	});
});

describe('actions/game update', () => {
	it('update should create GAME_UPDATE action', () => {
		expect(gameActions.update.type === gameConstants.GAME_UPDATE);
	});
});

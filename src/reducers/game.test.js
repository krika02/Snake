import gameActions from '../actions/game';
import gameReducer from './game';
import gameConstants from '../constants/game';

describe('reducers/game newGame & update', () => {

  let state = gameReducer(undefined, gameActions.newGame);

	it('newGame should return correct state', () => {
		expect(state.running === true);
    expect(state.direction === gameConstants.DIRECTION_LEFT);
    expect(state.field.length === gameConstants.GAME_ROWS);
    expect(state.field[0].length === gameConstants.GAME_COLS);
	});

  let oldState = state;
  state = gameReducer(state, gameActions.update);

  it('update should return correct state', () => {
		expect(state.running === true);
    expect(oldState.field === state.field);
    expect(state.powerUp.x > 0 && state.powerUp.x < gameConstants.GAME_COLS);
    expect(state.powerUp.y > 0 && state.powerUp.y < gameConstants.GAME_ROWS);
    expect(state.field.length === gameConstants.GAME_ROWS);
    expect(state.field[0].length === gameConstants.GAME_COLS);
	});

  oldState = state;
  state = gameReducer(state, gameActions.moveUp);

  it('moveUp should return correct state', () => {
    expect(state.running === true);
    expect(state.direction === gameConstants.DIRECTION_UP);
  });

  oldState = state;
  state = gameReducer(state, gameActions.newGame);

  it('newGame should return same state (not possible while game is running)', () => {
    expect(oldState).toEqual(state);
  });
});

import actions from '../actions/game';
import reducer from './game';
import gameConstants from '../constants/game';

describe('reducers/game newGame & update', () => {

  let state = reducer(undefined, actions.newGame);

	it('newGame should return correct state', () => {
		expect(state.running === true);
    expect(state.direction === gameConstants.DIRECTION_LEFT);
    expect(state.field.length === gameConstants.GAME_ROWS);
    expect(state.field[0].length === gameConstants.GAME_COLS);
	});

  let oldState = state;
  state = reducer(state, actions.update);

  it('update should return correct state', () => {
		expect(state.running === true);
    expect(oldState.field === state.field);
    expect(state.powerUp.x > 0 && state.powerUp.x < gameConstants.GAME_COLS);
    expect(state.powerUp.y > 0 && state.powerUp.y < gameConstants.GAME_ROWS);
    expect(state.field.length === gameConstants.GAME_ROWS);
    expect(state.field[0].length === gameConstants.GAME_COLS);
	});

  oldState = state;
  state = reducer(state, actions.moveUp);

  it('moveUp should return correct state', () => {
    expect(state.running === true);
    expect(state.direction === gameConstants.DIRECTION_UP);
  });

  oldState = state;
  state = reducer(state, actions.newGame);

  it('newGame should return same state (not possible while game is running)', () => {
    expect(oldState).toEqual(state);
  });
});

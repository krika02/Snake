import React from 'react';
import PropTypes from 'prop-types';
import Block from '../Block/Block';
import gc from '../../constants/gameConstants';

require('./GameField.css');

class GameField extends React.Component {

	componentDidMount() {
		this.timer = window.setInterval(this.props.update, gc.GAME_SPEED);
		document.addEventListener('keyup', this.props.keyUp, true);
		document.addEventListener('keydown', this.props.keyDown, true);
		document.addEventListener('keyup', this.props.keyDown, true);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		document.removeEventListener('keyup', this.props.keyUp, true);
		document.removeEventListener('keydown', this.props.keyDown, true);
		document.removeEventListener('keyup', this.props.keyDown, true);
	}

	render() {
		return (
			<div id="snake-game">
				<div className="header">
					<b>SNAKE</b>
					<span className="score">Score: {this.props.score}</span>
				</div>
				<div className="game-field">
					{this.props.gameOver &&
						<p>Game Over</p>
					}
					{!this.props.running &&
						<p>Press Enter To Play</p>
					}
					{this.props.running &&
					<div>
						{this.props.field.map(blocks =>
							(blocks.map(block =>
								(<Block
									type={block}
								/>))),
						)
						}
					</div>
				}
				</div>
			</div>
		);
	}
}

GameField.propTypes = {
	gameOver: PropTypes.bool.isRequired,
	running: PropTypes.bool.isRequired,
	score: PropTypes.number.isRequired,
	field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	keyUp: PropTypes.func.isRequired,
	keyDown: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired,
};

export default GameField;

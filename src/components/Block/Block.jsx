import React from 'react';
import PropTypes from 'prop-types' ;

require('./Block.css');

const Block = props =>
	(<div className={`block block-${props.type}`} />);

Block.propTypes = {
	type: PropTypes.number.isRequired,
};

export default Block;

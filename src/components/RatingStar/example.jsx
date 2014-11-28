/**
 * @jsx React.DOM
 */

'use strict';

var RatingStarComponent = require('./index.jsx');

var RatingStarComponentOnChange = function(val) {

	console.log('changed', val);

};

module.exports = <RatingStarComponent rating={3} onChange={RatingStarComponentOnChange} />
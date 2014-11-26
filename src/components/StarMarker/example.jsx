/**
 * @jsx React.DOM
 */

'use strict';

var StarComponent = require('./index.jsx');

var StarComponentOnChange = function(val) {
	console.log('changed', val);
};

module.exports = <StarComponent value={true} onChange={StarComponentOnChange} />;
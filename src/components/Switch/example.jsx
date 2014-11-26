/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var SwitchComponent = require('./index.jsx');

var SwitchComponentOnChange = function(val) {
	console.log('changed', val);
};

module.exports = <SwitchComponent value={true} disabled={false} onChange={SwitchComponentOnChange} />;
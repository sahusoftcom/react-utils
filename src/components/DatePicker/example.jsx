/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var dateTimePicker = require('./index.jsx');

var onSelection = function(val) {
	console.log('changed', val);
};

var dateFormat = 'YYYY-MM-DD';
var defaultDate = '2013-12-15';

module.exports = <dateTimePicker format={dateFormat} onChange={onSelection} defaultValue={defaultDate} />;
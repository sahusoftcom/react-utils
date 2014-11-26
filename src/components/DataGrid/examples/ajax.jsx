/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var ajaxGrid = require('./ajax/plain');
var ajaxGridDetailed = require('./ajax/detailed');
module.exports = <div>

	<h1>Ajax Plain Grid example</h1>
	<p>(using only Array of objects)</p>
	{ajaxGrid}

	<h1>Ajax Detailed Grid example</h1>
	<p>(using only Array of objects)</p>
	{ajaxGridDetailed}
</div>
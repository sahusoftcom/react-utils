/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var plain = require('./basic/plain');
var detailedExample = require('./basic/detailed');

module.exports = <div>
	
	<h1>Plain example</h1>
	<p>(using only Array of objects)</p>
	{plain}
	
	<hr />
	<h1>Detailed example</h1>
	{detailedExample}	
	
</div>
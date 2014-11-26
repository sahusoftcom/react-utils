/**
 * @jsx React.DOM
 */

'use strict';

var PieChartComponent = require('./index.jsx');

var data = [
	{
		data:70,
		label:"Water"
	},
	{
		data:27,
		label:"Land"
	},
	{
		data:3,
		label:"Unknown"
	}

];

module.exports = <PieChartComponent data={data} />
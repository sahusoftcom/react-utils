/**
 * @jsx React.DOM
 */

'use strict';

var BarChartComponent = require('./index.jsx');

var data = [
	[1, 150],
	[2, 350],
	[3, 87],
	[4, 101],
	[5, 170],
	[6, 180],
	[7, 190],
	[8, 200],
	[9, 10],
	[10, 110],
	[11, 125]
]

module.exports = <BarChartComponent data={data} />
/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip = require('react-bootstrap/Tooltip');

var BasicDataGrid = require('../../BasicDataGrid.jsx');

var data = [
		{
			name: "Kumar Sanket",
			interest: "PHP / JavaScript",
			music: 'Rock',
			joining_date: '19th August'
		},
		{
			name: "Saurabh Sahu",
			interest: "JavaScript / C++",
			music: 'Pop',
			joining_date: '20th August'
		}
	];

module.exports = <BasicDataGrid
					data={data} />;


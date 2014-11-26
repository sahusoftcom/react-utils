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

var columns = [
	{
		header: 'Name',
		render: function(row){ return row.name; }
	},
	{
		header: 'Interest',
		render: 'row.interest'
	},
	'music'
];


var actions = [
	{
		type: 'remove',
		callback: function(row){
			alert('Deleting '+row.name);
		}
	},
	{
		type: 'edit',
		callback: function(row){
			alert('Editing '+row.name);
		}
	},
	{
		type: 'view',
		callback: function(row){
			alert('Viewing '+row.name);
		}
	},
	{
		render: function(row){
			return <OverlayTrigger placement="top" overlay={<Tooltip>Custom</Tooltip>}>
					<button className="btn green"><i className="fa fa-star"></i></button>
				</OverlayTrigger>;
		},
		callback: function(row){
			alert('Custom '+row.name);
		}
	}
];


var selectCallback = function(rows){
	console.log('Selected rows', rows);
}

module.exports = <BasicDataGrid
					data={data}
					columns={columns}
					actions={actions}
					checkbox={true}
					onSelect={selectCallback} />;


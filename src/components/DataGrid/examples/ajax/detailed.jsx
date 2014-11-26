/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var AjaxDataGrid = require('../../AjaxDataGrid.jsx');

var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip = require('react-bootstrap/Tooltip');

var url = 'http://market-notify.local.sahusoft.info/api/v1/user';

var columns = [
	'id',
	{
		header: 'First Name',
		render: function(row){ return row.first_name; }
	},
	{
		header: 'Last Name',
		render: 'row.last_name'
	},
	'email',
	'created_at'
];
var actions = [
	{
		type: 'remove',
		callback: function(row){
			alert('Deleting '+row.first_name);
		}
	},
	{
		type: 'edit',
		callback: function(row){
			alert('Editing '+row.first_name);
		}
	},
	{
		type: 'view',
		callback: function(row){
			alert('Viewing '+row.first_name);
		}
	},
	{
		render: function(row){
			return <OverlayTrigger placement="top" overlay={<Tooltip>Custom</Tooltip>}>
					<button className="btn green"><i className="fa fa-star"></i></button>
				</OverlayTrigger>;
		},
		callback: function(row){
			alert('Custom '+row.first_name);
		}
	}
];
var selectCallback = function(rows){
	console.log('Selected rows', rows);
}
module.exports = <AjaxDataGrid
					url= {url}
					columns = {columns}
					actions = {actions} 
					checkbox={true}
					onSelect={selectCallback} />;


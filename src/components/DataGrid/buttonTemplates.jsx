/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip = require('react-bootstrap/Tooltip');

module.exports = {

	view: (
		<OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
			<button className="btn green"><i className="fa fa-eye"></i></button>
		</OverlayTrigger>
	),
	edit: (
		<OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
			<button className="btn green"><i className="fa fa-edit "></i></button>
		</OverlayTrigger>
	),
	remove: (
		<OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
			<button className="btn red"><i className="fa fa-trash-o "></i></button>
		</OverlayTrigger>
	)

};
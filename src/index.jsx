/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/less/font-awesome.less');
require('./main.less');

window.jQuery = require('jquery');
window.$ = window.jQuery;

React.renderComponent(
	<h1>React Utils</h1>,
    document.getElementById('content')
);

module.exports = {};
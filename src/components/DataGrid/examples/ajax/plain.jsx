/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var AjaxDataGrid = require('../../AjaxDataGrid.jsx');

var url = 'http://market-notify.local.sahusoft.info/api/v1/user';

module.exports = <AjaxDataGrid
					url= {url} />;


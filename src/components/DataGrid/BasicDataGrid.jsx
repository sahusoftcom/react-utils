/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Table = require('react-bootstrap/Table');
var _ = require('lodash');
var buttonTemplates = require('./buttonTemplates');

module.exports = React.createClass({

	getDefaultProps: function() {

		return {
			columns: [],
			data: {},
			checkbox: false,
			actions: [],
			onSelect: function() {}
		};

	},

	getInitialState: function() {

		return {
			_selectedRows: []
		};

  	},

  	getGridData: function() {

  		if(_.isArray(this.props.data))
  			return this.props.data;

  		else if(_.isArray(this.props.data.result))
  			return this.props.data.result;

  	},

  	prepareColumnsFromGridData: function() {

  		var cols = [];

		_.forEach(this.getGridData(), function(obj) {
			cols = _.union(_.keys(obj), cols);
		});

		return cols;

  	},

  	getActions: function() {

		return this.props.actions;

  	},

  	getColumns: function() {

  		if(!this.props.columns || this.props.columns.length==0)
  			return this.prepareColumnsFromGridData();
		else
			return this.props.columns;

  	},

  	selectAll: function() {

  		var that = this;

  		this.state._selectedRows.length = 0;

  		_.forEach(this.getGridData(), function(row) {
  			that.state._selectedRows.push(row);
  		});

  		this.emitSelectEvent();

  		this.forceUpdate();

  	},

  	deselectAll: function() {

  		this.state._selectedRows.length = 0;

  		this.emitSelectEvent();

  		this.forceUpdate();

  	},

  	selectRow: function(e, row) {

  		var _selectedRows = this.state._selectedRows;

  		var index = _selectedRows.indexOf(row);
  		var exists = (index !== -1);

  		if(e.target.checked && !exists)
  			_selectedRows.push(row);
  		else if(!e.target.checked && exists)
  			_selectedRows.splice(index, 1);

  		this.emitSelectEvent();

  		this.forceUpdate();

  	},

  	emitSelectEvent: function() {

  		this.props.onSelect(this.state._selectedRows);

  	},

	render: function() {

		var that = this;

		var capitalize = function(input) {

	  		if(!input)
	  			return '';

	  		var str = '';
	  		var arr = input.split('_');

	  		for(var i in arr) {
	  			var v = arr[i];
	  			str += v.substr(0, 1).toUpperCase() + v.substr(1) + ' ';
	  		}

	  		return str.substr(0, str.length-1);

		};

		var renderButton = function(row, action) {

			if(typeof action.render == 'function')
				var btn = action.render(row);
			else if(typeof action.type == 'string' && _.contains(_.keys(buttonTemplates), action.type))
				var btn = buttonTemplates[action.type];

			return <span onClick={action.callback.bind(null, row)}>{btn}</span>

		};

		var renderActions = function(row) {

			return <div>
				{that.getActions().map(function(action) {
					return renderButton(row, action);
				})}
			</div>;

		};

		var renderTh = function(col) {

			if(typeof col == 'string')
				return capitalize(col);
			else if(typeof col == 'object' && col.header)
				return col.header;
			else
				return '';

		};

		var renderTd = function(row, col) {

			if(typeof col == 'string')
				return eval('row.'+col);
			else if(typeof col == 'object' && typeof col.render == 'string')
				return eval(col.render);
			else if(typeof col == 'object' && typeof col.render == 'function')
				return col.render(row);

		};

		var renderRow = function(row) {

			var isChecked = that.state._selectedRows.indexOf(row) !== -1;

			return (
				<tr>
					{that.props.checkbox?<td>
						<input type="checkbox" checked={isChecked} readOnly onClick={function(e) {
							that.selectRow(e, this);
						}.bind(row)} />
					</td>:null}
					{that.getColumns().map(function(col) {
						return <td>
							{renderTd(row, col)}
						</td>;
					})}
					{that.props.actions.length>0?
					<td>
						{renderActions(row)}
					</td>
					:null}
				</tr>
			);

		};

		var totalColumns = 0;

		return (
			<div className="table-scrollable">
				<Table striped bordered hover className="table-advance">
					<thead>
						<tr>
							{this.props.checkbox?<th>
								<input type="checkbox" onClick={function(e) {
									if(e.target.checked)
										that.selectAll();
									else
										that.deselectAll();
								}}/>
								</th>:null}
							{this.getColumns().map(function(column) {
								totalColumns++;
								return <th>
									{renderTh(column)}
								</th>;
							})}
							{this.props.actions.length>0?<th></th>:null}
						</tr>
					</thead>
					<tbody>
						{
							((this.getGridData().length == 0)?
								<tr>
									<td colSpan={totalColumns}><h3>No entries found</h3></td>
								</tr>
							:(this.getGridData().map(function(row) {
								return renderRow(row);
							}))
							)
						}
					</tbody>
				</Table>
			</div>
		);

	}

});
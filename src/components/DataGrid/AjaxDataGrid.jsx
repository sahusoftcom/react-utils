/**
 * @jsx React.DOM
 */

'use strict';

var request = require('superagent');

var React = require('react');
var BasicDataGrid = require('./BasicDataGrid');
var PaginationComponent = require('components/Pagination');

module.exports = React.createClass({

	getDefaultProps: function() {

		return {
			url:null,
			columns: [],
			checkbox: false,
			actions: [],
			onSelect: function(){ },
			maxSize : 4,
			loadingElement: <div>Loading...</div>
		};

	},

	getInitialState: function() {

		return {
			loading : true,
			data : [],
			totalItems : 0,
			pageNo : null,
			perPage : null
		};

  	},

	componentDidMount: function () {

	  	this.getDataByUrl(this.props.url, 1);

	},

	getDataByUrl: function(url, pageNo) {

		var that = this;
		request.get(url, function(err, res) {

			if (err) throw err;

			that.setState({
				loading : false,
				data : res.body.result,
				totalItems : res.body.meta.total,
				pageNo : res.body.meta.current_page,
				perPage : res.body.meta.per_page
			});

		});

	},

	pageChange: function(pageNo) {

		var url = this.props.url+'?page='+pageNo;

		this.setState({
			loading : true
		});

		this.getDataByUrl(url, pageNo);

	},

	render: function() {

		var loader = this.props.loadingElement;

		var start = (this.state.pageNo-1)*(this.state.perPage)+1;
		var end = start + this.state.perPage - 1;

		if(end > this.state.totalItems)
			end = this.state.totalItems;

		var body = <div>
			<BasicDataGrid data={this.state.data}
				columns={this.props.columns}
				actions={this.props.actions}
				checkbox={this.props.checkbox}
				onSelect={this.props.selectCallback} />

			<div className="pull-right">Showing {start} to {end} of {this.state.totalItems} entries</div>

			<PaginationComponent 
				totalItems={this.state.totalItems}
				perPage={this.state.perPage}
				currentPage={this.state.pageNo}
				maxSize={this.props.maxSize}
				onSelect={this.pageChange} />
		</div>;

		return <div>{this.state.loading ? loader : body }</div>;

	}

});
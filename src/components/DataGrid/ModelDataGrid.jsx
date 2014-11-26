/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var BasicDataGrid = require('./BasicDataGrid.jsx');
var PaginationComponent = require('components/Pagination');
var AppDispatcherMixin = require("mixins/AppDispatcher");

module.exports = React.createClass({

	mixins: [AppDispatcherMixin],

	getDefaultProps: function() {

		return {
			dataProvider: {},
			relations: null,
			params: {},
			columns: [],
			checkbox: false,
			actions: [],
			onSelect: function() {},
			maxSize: 4,
			loadingElement: <div>Loading...</div>
		};

	},

	getInitialState: function() {

		return {
			loading: true,
			data: [],
			totalItems: 0,
			pageNo: null,
			perPage: null
		};

  	},

	componentDidMount: function () {

		var that = this;

		this.getGridData();

		this.registerAppDispatcher(function(payload) {

			var resourceName = that.props.dataProvider.name;

			switch(payload.actionType) {
				case resourceName+'.updated':
				case resourceName+'.removed':
				case resourceName+'.created':
					that.getGridData();
				break;
			}

		});

	},

	getGridData: function(pageNo) {

		var that = this;

		pageNo = pageNo || this.state.pageNo || 1;

		var params = {
			page: pageNo,
			relations: this.props.relations
		};

		var mergedParams = _.merge(params, this.props.params);

		this.props.dataProvider.getList(mergedParams).then(function(response) {

			that.setState({
				loading: false,
				data: response.result,
				totalItems: response.meta.total,
				pageNo: response.meta.current_page,
				perPage: response.meta.per_page
			});

		}, function(errors) {

			that.setState({
				loading: false
			});

		});

	},

	pageChange: function(pageNo) {

		var dataProvider = this.props.dataProvider;

		this.setState({
			loading: true
		});

		this.getGridData(pageNo);

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

			{parseInt(this.state.totalItems) == 0 ? null :
				<div>
					<div className="pull-right">Showing {start} to {end} of {this.state.totalItems} entries</div>

					<PaginationComponent 
						totalItems={this.state.totalItems}
						perPage={this.state.perPage}
						currentPage={this.state.pageNo}
						maxSize={this.props.maxSize}
						onSelect={this.pageChange} />
				</div>
			}

		</div>;

		return <div>{this.state.loading ? loader : body }</div>;

	}

});
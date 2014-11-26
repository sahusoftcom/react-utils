/**
 * @jsx React.DOM
 */

'use strict';

var PaginationComponent = require('./index.jsx');
var React = require('react');

var ExampleComponent = React.createClass({

	getInitialState: function(){
		return {pageNo: 2};
	},

	pageChange: function(pageNo){
		this.setState({
			pageNo: pageNo
		});
	},

	render: function(){
		return <PaginationComponent
				totalItems={20}
				perPage={3}
				currentPage={this.state.pageNo}
				maxSize={3}
				onSelect={this.pageChange} />
	}
})



module.exports = <ExampleComponent />;
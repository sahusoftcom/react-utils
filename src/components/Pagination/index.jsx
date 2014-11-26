/**
 * @jsx React.DOM
 */

'use strict';

/**
 * Inspired from http://angular-ui.github.io/bootstrap/#/pagination
 * Thanks to AngularUI Bootstrap team
 */

var React = require('react');

module.exports = React.createClass({

	getDefaultProps: function() {

		return {
			totalItems: 10,
			perPage: 2,
			currentPage: 1,
			maxSize: 4,
			onSelect: function() {}
		};

	},

	getInitialState: function() {

	    return {};

  	},

  	emitOnSelect: function(pageNo) {

  		this.props.onSelect(pageNo);

  	},

  	previousPage: function() {

  		var prev = this.getCurrentPage()-1;

  		if(prev < 1)
  			return;
  		else
  			this.emitOnSelect(prev);

  	},

  	nextPage: function() {

  		var next = this.getCurrentPage()+1;

  		if(next > this.getTotalPages())
  			return;
  		else
  			this.emitOnSelect(next);

  	},

  	jumpToPage: function(pageNo) {

		this.emitOnSelect(pageNo);

  	},

  	getTotalPages: function() {

  		return Math.ceil(this.props.totalItems/this.props.perPage);

  	},

  	getCurrentPage: function() {

  		return this.props.currentPage;

  	},

  	getPages: function() {

  		var totalPages = this.getTotalPages();
  		var currentPage = this.getCurrentPage();
  		var maxSize = this.props.maxSize;

  		var pages = [];

  		if(totalPages < maxSize) {
  			var start = 1;
  			var end = totalPages;
  		} else {

  			var start = Math.ceil(currentPage - maxSize/2);
  			if(start < 1)
  				start = 1;

  			var end = start + maxSize - 1;

  			if(end>totalPages) {
  				end = totalPages;
  			}

  			var currentLength = (end-start)+1;

  			if(currentLength < maxSize) {
  				var pullStart = start - (maxSize - currentLength);
  				if(pullStart >= 1)
  					start = pullStart;
  			}

  		}

		for(var i=start;i<=end;i++)
			pages.push(i);

		return pages;

  	},

	render: function() {

		var that = this;

		return (
            <nav>
    			<ul className="pagination">
    				<li onClick={this.previousPage}><a href="#">&laquo;</a></li>
    				{this.getPages().map(function(pageNo) {

    					var cssClass = '';
    					if(pageNo == that.getCurrentPage())
    						cssClass='active';

    					return <li className={cssClass} onClick={that.jumpToPage.bind(null, pageNo)}><a href="#">{pageNo}</a></li>;
    				})}
    				<li onClick={this.nextPage}><a href="#">&raquo;</a></li>
    			</ul>
            </nav>
        );

	}

});
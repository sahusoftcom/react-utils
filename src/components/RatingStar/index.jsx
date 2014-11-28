/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

require('./RatingStar.less');

module.exports = React.createClass({

	getInitialState: function() {

	    return {
		    rating: this.props.rating
	 	};

  	},

  	onChange: function(i) {

  		if(this.props.disabled)
  			return;

  		this.setState({rating: i});
  		this.props.onChange(i);

  	},

	render: function() {

		var stars = [];
		for (var i = 1; i <= 5; i++) {
			if(i <= this.state.rating)
				stars.push(<i onClick={this.onChange.bind(null, i)} className="start fa fa-star active"></i>);
			else
				stars.push(<i onClick={this.onChange.bind(null, i)} className="start fa fa-star"></i>);
		};

		return (
			<div>
				{stars}
			</div>
		);

	}

});
/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

require('./StarMarker.less');

module.exports = React.createClass({

	getInitialState: function() {

	    return {
		    value: this.props.value
	 	};

  	},

  	onChange: function(val) {

  		if(this.props.disabled)
  			return;

  		this.setState({value: val});

  		if(this.props.onChange)
  			this.props.onChange(val);

  	},

	render: function() {

		var that = this;

		return (
			<div>
				{((this.state.value)?(
					<i onClick={function(){
						that.onChange(false);
					}} className="fa fa-star"></i>
				):(
					<i onClick={function(){
						that.onChange(true);
					}} className="start fa fa-star"></i>
				))}
			</div>
		);
	}

});
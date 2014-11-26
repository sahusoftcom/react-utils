/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

require('./switch.less');

var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');

module.exports = React.createClass({

	getDefaultProps: function() {

		return {
			trueValue: true,
			falseValue: false,
			trueText: "ON",
			falseText: "OFF",
			defaultValue: true,
			onChange: function() {}
		};

	},

	getInitialState: function() {

	    return {
		    value: this.props.defaultValue,
		    trueValue:  this.props.trueValue,
		    falseValue: this.props.falseValue,
		    trueText: this.props.trueText,
		    falseText: this.props.falseText
	 	};

  	},

  	componentDidMount: function() {

  		if(this.props.defaultValue == this.props.trueValue)
  			this.state.value = true;
  		else
  			this.state.value = false;

  		this.forceUpdate();

  	},

  	onChange: function(e) {

  		this.setState({value: e.target.checked});

  		if(this.props.onChange) {

  			if(e.target.checked)
  				this.props.onChange(this.props.trueValue);
  			else
  				this.props.onChange(this.props.falseValue);

  		}

  	},

	render: function() {

		return (
			<div className="onoffswitch">
			    <input
			    	type="checkbox"
			    	className="onoffswitch-checkbox"
			    	checked={this.state.value}
			    	disabled={this.props.disabled}
			    	onChange={this.onChange} />

			    <label className="onoffswitch-label">
			        <span className="onoffswitch-inner"></span>
			        <span className="onoffswitch-switch"></span>
			    </label>
			</div>
		);

	}

});
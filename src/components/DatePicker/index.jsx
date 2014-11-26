/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

require('./datePicker.less');

require('./bootstrapDateTimePicker/build/js/bootstrap-datetimepicker.min.js');
require('./bootstrapDateTimePicker/build/css/bootstrap-datetimepicker.min.css');

module.exports = React.createClass({

	getDefaultProps: function() {

    	var today = new Date();

    	var dd = today.getDate();
    	var mm = today.getMonth()+1;
    	var yyyy = today.getFullYear();

    	today = yyyy+'-'+mm+'-'+dd;

		return {
			format: 'YYYY-MM-DD',
			defaultDate: today
		}

	},

  	handleChange: function(e) {

  		var inputBox = this.getInputElement();

  		if (this.props.onChange)
  			this.props.onChange(inputBox.val());

  	},

	getElement: function () {

	    return jQuery(this.refs.datetimepickernode.getDOMNode());

	},

	getInputElement: function() {

		return jQuery(this.refs.datetimepickerinputbox.getDOMNode());

	},

    componentDidMount: function () {

    	var defaultValue = this.props.defaultValue;

    	var inputElement = this.getElement();

    	inputElement.datetimepicker({
    		pickTime: false,
    		defaultDate: defaultValue
    	});

    	inputElement.on('dp.change', this.handleChange);

    },

	render: function() {

		var format = this.props.format;

		return (
            <div className="input-group date" ref="datetimepickernode">
                <input type="text" className="form-control" ref="datetimepickerinputbox" data-date-format={format} />
                <span className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
        );

	}

});
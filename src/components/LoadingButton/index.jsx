/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Button = require('react-bootstrap/Button');
var Spinner = require('components/Spinner');

module.exports = React.createClass({

	getDefaultProps: function() {

		return {
            title: 'Submit',
            bsStyle: 'primary',
            showSpinner: false
		};

	},

	getInitialState: function() {

	    return {};

  	},

    onClick: function() {

        console.log('onClick called');

    },

	render: function() {

		var that = this;

		return (
			<span>
				<Button type="submit" disabled={this.props.showSpinner} bsStyle={this.props.bsStyle}>
					{this.props.title}&nbsp;&nbsp;{(this.props.showSpinner?(<Spinner />):(null))}
				</Button>
			</span>;
        );

	}

});
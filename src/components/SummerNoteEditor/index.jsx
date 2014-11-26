/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('./source/codemirror.css');
require('./source/codemirror-theme.css');
require('./source/codemirror.min.js');

require('./source/xml.min.js');
require('./source/formatting.min.js');
require('./source/summernote.css');
require('./source/summernote.js');

require('bootstrap');

module.exports = React.createClass({

	componentDidMount: function() {

		var that = this;

		// Editor configuration
		$(this.refs['editor'].getDOMNode()).summernote({
			height: 300,
			focus: false,
			tabsize: 2,
			codemirror: {
				mode: 'text/html',
				htmlMode: true,
				lineNumbers: true,
				theme: 'monokai'
			},
			onChange: function(contents, $editable) {

				if(that.props.onChange)
					that.props.onChange(contents);

			}
		});

	},

	render: function() {

		return (
		    <div ref="editor" dangerouslySetInnerHTML={{__html: this.props.defaultValue}}></div>
		);

	}

});
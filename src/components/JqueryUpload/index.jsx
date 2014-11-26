/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');

require('jquery.ui.widget');
require('./jQuery-File-Upload-9.8.0/js/jquery.iframe-transport.js');
require('./jQuery-File-Upload-9.8.0/js/jquery.fileupload.js');
require('./jQuery-File-Upload-9.8.0/js/jquery.fileupload-process.js');
require('./jQuery-File-Upload-9.8.0/js/jquery.fileupload-process.js');

require('./jQuery-File-Upload-9.8.0/css/jquery.fileupload.css');
require('./jQuery-File-Upload-9.8.0/css/style.css');

module.exports = React.createClass({

	componentDidMount: function () {

		var that = this;

		this.getInputElem().fileupload({

			url: that.getApiUrl(),
			dataType: 'json',
			add: function(e, data) {

				data.submit();

				if(that.props.onUploadStart)
				that.props.onUploadStart(e, data);

			},
			done: function (e, data) {

				if(that.props.onUploadEnd)
				that.props.onUploadEnd(e, data.result.result);

			},
			progressall: function (e, data) {

				var progress = parseInt(data.loaded / data.total * 100, 10);

				if(that.props.onProgress)
				that.props.onProgress(e, progress);

			}

	   });

	},

	getInputElem: function () {

    	return jQuery(this.refs.uploader.getDOMNode());

	},

	getApiUrl: function() {

		return '/api/v1/user/me/profile-photo';

	},

    render: function () {

        return (
            <div>
	            <span className="btn btn-success fileinput-button">
	                <i className="glyphicon glyphicon-plus"></i>
	                <span>{ (this.props.uploadText) ? this.props.uploadText : 'Add Files' }</span>
	                <input ref="uploader" type="file" name="file" multiple />
	            </span>
            </div>
        );
    }

});
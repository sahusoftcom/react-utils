require('./jquery.growl/javascripts/jquery.growl.js');
require('./jquery.growl/stylesheets/jquery.growl.css');

module.exports = {
	error: function(title, message){
		title = title || '';
		message = message || '';
		$.growl.error({title: title, message: message});
	},
	warning: function(title, message){
		title = title || '';
		message = message || '';
		$.growl.warning({title: title, message: message});
	},
	notice: function(title, message){
		title = title || '';
		message = message || '';
		$.growl.notice({title: title, message: message});
	}
}
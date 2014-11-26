'use strict';

var Growl = require('services/GrowlService');
var _ = require('lodash');

module.exports = function(errorObj) {

	if(!errorObj)
		return;

	var message = errorObj.message;

	message +='<ul>';

	_.forEach(errorObj.errors, function(err,key) {
		message += '<li>'+err+'</li>';
	});

	message +='</ul>';

	Growl.error(message);

};
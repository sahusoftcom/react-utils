'use strict';

var Q = require("q");

module.exports = {

	alert: function(message) {

		var deferred = Q.defer();

		alert(message);

		setTimeout(function() {

			deferred.resolve();

		}, 100);

		return deferred.promise;

	},

	confirm: function(question) {

		var deferred = Q.defer();

		var answer = confirm(question);

		setTimeout(function() {

			if(answer)
				deferred.resolve();
			else
				deferred.reject();

		}, 100);

		return deferred.promise;

	},

	prompt: function(question) {

		var deferred = Q.defer();

		var answer = prompt(question);

		setTimeout(function() {

			if(answer)
				deferred.resolve(answer);
			else
				deferred.reject();

		}, 100);

		return deferred.promise;

	}

};
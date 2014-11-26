'use strict';

var Q = require("q");
var Request = require("superagent");

var AppDispatcher = require("dispatcher/AppDispatcher");

var _baseUrl = null;
var _urlPrefix = null;
var _urlSuffix = null;

module.exports = {

	setBaseUrl: function(baseUrl) {
		_baseUrl = baseUrl;
	},

	setUrlPrefix: function(prefix) {
		_urlPrefix = prefix;
	},

	setUrlSuffix: function(suffix) {
		_urlSuffix = suffix;
	},

	create: function(resource) {

		var dispatchUpdated = function(type, data) {
			AppDispatcher.dispatch({
				actionType: resource+'.'+type,
				data: data
			});

		};

		var ResourceApiService = {
			name: resource,
			getList: function(params) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource;

				Request
					.get(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('fetchedList', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;

			},

			get: function(id, params) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+id;

				Request
					.get(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('fetched', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;
				
			},

			post: function(data) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource;

				Request
					.post(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.send(data)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('created', res.body);
						} else {
							deferred.reject(res.body);
						}


					})
				;

				return deferred.promise;

			},
			remove: function(id) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+id;
				
				Request
					.del(url)
					.set('X-Requested-With', 'XMLHttpRequest')
				  	.end(function(res){
						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('removed', res.body);
						} else {
							deferred.reject(res.body);
						}

					});

				return deferred.promise;

			},
			put: function(id, data) {

				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+id;
				
				Request
					.put(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.send(data)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('updated', res.body);
						} else {
							deferred.reject(res.body);
						}


					});

				return deferred.promise;

			},

			customGet: function(suffix, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				
				Request
					.get(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customGet', res.body);
						} else {
							deferred.reject(res.body);
						}


					});

				return deferred.promise;

			},

			customDelete: function(suffix, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				
				Request
					.del(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customDelete', res.body);
						} else {
							deferred.reject(res.body);
						}

					});

				return deferred.promise;

			},

			customPost: function(suffix, payload, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				
				Request
					.post(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.send(payload)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customPost', res.body);
						} else {
							deferred.reject(res.body);
						}


					});

				return deferred.promise;


			},

			customPut: function(suffix, payload, params){
				
				var deferred = Q.defer();

				var url = _urlPrefix+"/"+resource+"/"+suffix;
				Request
					.put(url)
					.set('X-Requested-With', 'XMLHttpRequest')
					.query(params)
					.send(payload)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customPut', res.body);
						} else {
							deferred.reject(res.body);
						}


					});

				return deferred.promise;

			}

		};

		return ResourceApiService;

	}

};
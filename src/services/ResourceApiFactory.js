'use strict';

var Q = require("q");
var Request = require("superagent");

var _dispatcher = null;

var _baseUrl = null;
var _urlPrefix = null;
var _urlSuffix = null;
var _requestHeader = {};

module.exports = {

	attachDispatcher: function(dispatcher) {

		_dispatcher = require("dispatcher/App");

	},

	setBaseUrl: function(baseUrl) {

		_baseUrl = baseUrl;

	},

	setUrlPrefix: function(prefix) {

		_urlPrefix = prefix;

	},

	setUrlSuffix: function(suffix) {

		_urlSuffix = suffix;

	},

	setRequestHeader: function(obj) {

		_requestHeader = obj;

	},

	create: function(resource) {

		var dispatchUpdated = function(type, data) {

			if (!_dispatcher)
				return;

			_dispatcher.dispatch({
				actionType: resource+'.'+type,
				data: data
			});

		};

		var ResourceApiService = {

			name: resource,

			getList: function(params) {

				var deferred = Q.defer();

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource;
				if (_urlSuffix) url = url + "/" + _urlSuffix;

				Request
					.get(url)
					.set(_requestHeader)
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

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource + "/" + id;
				if (_urlSuffix) url = url + "/" + _urlSuffix;

				Request
					.get(url)
					.set(_requestHeader)
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

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource;
				if (_urlSuffix) url = url + "/" + _urlSuffix;

				Request
					.post(url)
					.set(_requestHeader)
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

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource + "/" + id;
				if (_urlSuffix) url = url + "/" + _urlSuffix;

				Request
					.del(url)
					.set(_requestHeader)
				  	.end(function(res) {
						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('removed', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;

			},

			put: function(id, data) {

				var deferred = Q.defer();

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource + "/" + id;
				if (_urlSuffix) url = url + "/" + _urlSuffix;

				Request
					.put(url)
					.set(_requestHeader)
					.send(data)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('updated', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;

			},

			customGet: function(suffix, params) {

				var deferred = Q.defer();

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource;
				if (_urlSuffix) url = url + "/" + _urlSuffix;
				url = url + "/" + suffix;

				Request
					.get(url)
					.set(_requestHeader)
					.query(params)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customGet', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;

			},

			customDelete: function(suffix, params) {

				var deferred = Q.defer();

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource;
				if (_urlSuffix) url = url + "/" + _urlSuffix;
				url = url + "/" + suffix;

				Request
					.del(url)
					.set(_requestHeader)
					.query(params)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customDelete', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;

			},

			customPost: function(suffix, payload, params) {

				var deferred = Q.defer();

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource;
				if (_urlSuffix) url = url + "/" + _urlSuffix;
				url = url + "/" + suffix;

				Request
					.post(url)
					.set(_requestHeader)
					.query(params)
					.send(payload)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customPost', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;

			},

			customPut: function(suffix, payload, params) {

				var deferred = Q.defer();

				var url = _baseUrl;
				if (_urlPrefix) url = url + "/" + _urlPrefix;
				url = url + "/" + resource;
				if (_urlSuffix) url = url + "/" + _urlSuffix;
				url = url + "/" + suffix;

				Request
					.put(url)
					.set(_requestHeader)
					.query(params)
					.send(payload)
					.end(function(res) {

						if (res.status == 200) {
							deferred.resolve(res.body);
							dispatchUpdated('customPut', res.body);
						} else {
							deferred.reject(res.body);
						}

					})
				;

				return deferred.promise;

			}

		};

		return ResourceApiService;

	}

};
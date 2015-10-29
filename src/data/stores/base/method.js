var config = require("config"),
	_ = require("lodash"),
	ajax = require("components/ajax"),
	auth = require("data/auth");

module.exports = function(verb, collection) {
	var _subscribers = [], _result;

	this.execute = function(params) {
        var url = config.api + collection;
		params = params || {};
		if (!params.handle)
			params.handle = (auth.getUser() || {}).handle;

		return ajax[verb](config.api + collection, params).then(function(response) {
			_result = response;
			_notify();
		}).catch(function(r) {
			console.log(r);
		});
	};

	this.subscribe = function(callback) {
		_subscribe(callback);
	};

	this.subscribeAndNotify = function(callback) {
		_subscribe(callback);
		_notify();
	};

	this.unsubscribe = function(callback) {
		_.remove(_subscribers, function(c) { return c == callback; });
	};

	function _subscribe(callback) {
		_subscribers.push(callback);
	};

	function _notify() {
		if (!_result)
			return;

		_.each(_subscribers, function(subscriber) {
			if (subscriber)
				subscriber(_result);
		});
	};
};

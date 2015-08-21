var config = require("config"),
	_ = require("lodash"),
    qwest = require("qwest"),
	auth = require("data/auth");

module.exports = function(verb, collection) {
	var _subscribers = {}, _result;

	this.execute = function(params) {
        var url = config.api + collection;
		params = params || {};
		if (!params.handle)
			params.handle = (auth.getUser() || {}).handle;

		return qwest[verb](config.api + collection, params).then(function(response) {
			_result = response;
			_notify();
		});
	};

	this.subscribe = function(key, callback) {
		_subscribe(key, callback);
	};

	this.subscribeAndNotify = function(key, callback) {
		_subscribe(key, callback);
		_notify();
	};

	this.unsubscribe = function(key) {
		delete _subscribers[key];
	};

	function _subscribe(key, callback) {
		_subscribers[key] = callback;
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

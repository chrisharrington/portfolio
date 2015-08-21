"use strict";

var qwest = require("qwest"),
    config = require("config"),
    query = require("query-string"),
    Promise = require("ayepromise");

var SIGNED_IN_USER = "signed-in-user";

module.exports = new function() {
    this.getUser = function() {
        if (!this.user)
            this.user = JSON.parse(window.localStorage.getItem(SIGNED_IN_USER));
        return this.user;
    },

    this.getRequestToken = function() {
        window.location.href = config.api + "auth/request-token";
    };

    this.getAccessToken = function(token, verifier) {
        var user = this.getUser();
        if (user)
            return Promise.resolve(user);

        return qwest.get(config.api + "auth/access-token", {
            oauth_token: token,
            oauth_verifier: verifier
        }).then(function(user) {
            this.user = user;
			window.localStorage.setItem(SIGNED_IN_USER, JSON.stringify(user));
			return user;
        }.bind(this));
    };
};

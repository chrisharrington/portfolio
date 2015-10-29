"use strict";

var ajax = require("components/ajax"),
    config = require("config"),
    Promise = require("es6-promise").Promise;

var SIGNED_IN_USER = "logsalot-user";

module.exports = new function() {
    this.getUser = function() {
        if (!this.user)
            this.user = JSON.parse(window.localStorage.getItem(SIGNED_IN_USER));
        return this.user;
    },

    this.setUser = function(user) {
        this.user = user;
        window.localStorage.setItem(SIGNED_IN_USER, JSON.stringify(this.user));
    },

    this.getRequestToken = function() {
        window.location.href = config.api + "sign-in/twitter/request-token";
    };

    this.getAccessToken = function(token, verifier) {
        var user = this.getUser();
        if (user)
            Promise.resolve(user);

        return ajax.get(config.api + "sign-in/twitter/access-token", {
            oauth_token: token,
            oauth_verifier: verifier
        }).then(function(user) {
            this.user = user;
			window.localStorage.setItem(SIGNED_IN_USER, JSON.stringify(user));
			return user;
        }.bind(this));
    };
};

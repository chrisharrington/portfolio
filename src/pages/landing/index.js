"use strict";

var React = require("react"),
	_ = require("lodash"),

	config = require("config"),

	SignInWithTwitter = require("components/sign-in-buttons/twitter"),
	SignInWithGoogle = require("components/sign-in-buttons/google"),
	SignInWithFacebook = require("components/sign-in-buttons/facebook"),

	Auth = require("data/auth"),
	Header = require("components/header");

require("./style.less");

var landing = require("assets/landing.jpg");

module.exports = React.createClass({
	getInitialState: function() {
		return {
		};
	},

	componentWillMount: function() {
		if (Auth.getUser())
			window.location.hash = "/";

		var body = document.querySelector("body");
		body.className += " landing";
		body.style.backgroundImage = "url(" + landing + ")";
	},

	componentWillUnmount: function() {
		var body = document.querySelector("body");
		body.className -= " landing";
		body.style.backgroundImage = "";
	},

	render: function() {
		return <div className="landing-page">

        </div>;
	}
});

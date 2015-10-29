"use strict";

var React = require("react"),
	_ = require("lodash"),

	TwitterButton = require("components/sign-in-buttons/twitter"),
	GoogleButton = require("components/sign-in-buttons/google"),
	FacebookButton = require("components/sign-in-buttons/facebook");

require("./style.less");

module.exports = React.createClass({
	render: function() {
		return <div className="sign-in">
			<h3>Sign In</h3>
			<span>Select a provider with which to sign in.</span>
			<div className="buttons-container">
				<TwitterButton text="Sign in with Twitter" />
				<GoogleButton text="Sign in with Google" />
				<FacebookButton text="Sign in with Facebook" />
			</div>
			<div className="clearfix"></div>
		</div>;
	}
});

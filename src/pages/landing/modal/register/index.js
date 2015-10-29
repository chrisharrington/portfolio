"use strict";

var React = require("react"),
	_ = require("lodash"),

	TwitterButton = require("components/sign-in-buttons/twitter"),
	GoogleButton = require("components/sign-in-buttons/google"),
	FacebookButton = require("components/sign-in-buttons/facebook"),
	PlanSelector = require("./plan-selector");

require("./style.less");

module.exports = React.createClass({
	render: function() {
		var plan = this.props.plan;
		return <div className="register">
			<h3>Register</h3>
			<span>To register, please sign in with one of the providers on the right. If you happen to already have an account with us, <a onClick={this.props.onSignIn}>sign in here</a>.</span>
			<span>Interested in seeing our plans in detail? <a onClick={this.props.onPlans}>Take a look</a>.</span>
			<div className="button-container">
				<TwitterButton text="Register with Twitter" register={true} />
				<GoogleButton text="Register with Google" register={true} />
				<FacebookButton text="Register with Facebook" register={true} />
			</div>
			<span className="privacy"><b>A note on privacy.</b> The only information we'll keep from the provider you select will be a unique identifier (email, usually, but it'll be your handle for Twitter). We won't ever share this information with anyone. We will, however, contact you from time to time regarding the status of your account.</span>
		</div>;
	}
});

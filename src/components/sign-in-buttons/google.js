"use strict";

var React = require("react"),
	config = require("config"),
	ajax = require("components/ajax"),
	google = require("data/google"),

	Auth = require("data/auth"),
	Loader = require("components/loader");

require("./style.less");

module.exports = React.createClass({
	getInitialState: function() {
		this._loaded = false;
		return {
			loading: false
		};
	},

	componentWillMount: function() {
		google.getAuthInstance().then(function(api) {
			api.attachClickHandler(this.refs.button.getDOMNode(), {}, this.onSignedIn, function(error) {
				console.log(error);
				alert("error with google sign in");
		  	});
		}.bind(this));
	},

	onSignedIn: function(googleUser) {
		var profile = googleUser.getBasicProfile();

		this.setState({ loading: true });
		ajax.post(config.api + "sign-in/account", {
			name: profile.getName(),
			email: profile.getEmail(),
			image: profile.getImageUrl(),
			accountType: "google"
		}).then(function(saved) {
			Auth.setUser(saved);
			window.location.hash = "logs";
		}).catch(function(e) {
			this.setState({ loading: false });
			alert("Error while saving user.");
		}.bind(this));
	},

	render: function() {
		return <div ref="button" className={"sign-in-button sign-in-with-google-button" + (this.state.loading ? " loading" : "")} onClick={this.props.onClick}>
			<div className="loader-container">
				<Loader style="dark" />
			</div>
            <i className="fa fa-google logo" />
			<span className="text">{this.props.text}</span>
		</div>;
	}
});

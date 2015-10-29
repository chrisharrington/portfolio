"use strict";

var React = require("react"),
	config = require("config"),
	Promise = require("es6-promise").Promise,
	ajax = require("components/ajax"),
	Auth = require("data/auth"),
	Loader = require("components/loader");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			loading: false
		};
	},

	componentDidMount: function() {
		if (typeof FB !== undefined)
			this.initFacebook;
		else
			window.fbAsyncInit = this.initFacebook;
	},

	initFacebook: function() {
		FB.init({
			appId: config.facebook.appId,
			xfbml: true,
			version: 'v2.4'
		});
	},

	facebookLogin: function() {
		FB.login(function(response) {
			this.getFacebookProfile();
		}.bind(this), { scope: "email" });
	},

	getFacebookProfile: function() {
		Promise.all([
			this.getUserInfo(),
			this.getImage()
		]).then(function(result) {
			return this.saveUser({
				name: result[0].name,
				email: result[0].email,
				image: result[1],
				accountType: "facebook"
			});
		}.bind(this));
	},

	getUserInfo: function() {
		return new Promise(function(resolve, reject) {
			FB.api("/me?fields=first_name,last_name,email", function(response) {
				if (!response || response.error)
					reject();
				else
					resolve({
						name: response.first_name + " " + response.last_name,
						email: response.email
					});
			});
		});
	},

	getImage: function() {
		return new Promise(function(resolve, reject) {
			FB.api("/me/picture", function(response) {
				if (!response || response.error)
					reject();
				else
					resolve(response.data.url);
			});
		});
	},

	saveUser: function(facebookUser) {
		this.setState({ loading: true });
		return ajax.post(config.api + "sign-in/account", {
			name: facebookUser.name,
			email: facebookUser.email,
			image: facebookUser.image,
			accountType: "facebook"
		}).then(function(saved) {
			Auth.setUser(saved);
			window.location.hash = "logs";
		}).catch(function(e) {
			console.log(e);
			this.setState({ loading: false });
			alert("Error while saving user.");
		}.bind(this));
	},

	render: function() {
		return <div className={"sign-in-button sign-in-with-facebook-button" + (this.state.loading ? " loading" : "")} onClick={this.facebookLogin}>
			<div className="loader-container">
				<Loader style="dark" />
			</div>
            <i className="fa fa-facebook logo" />
			<span className="text">{this.props.text}</span>
		</div>;
	}
});

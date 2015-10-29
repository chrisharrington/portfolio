"use strict";

var React = require("react"),

	Auth = require("data/auth"),
	Loader = require("components/loader");

require("./style.less");

module.exports = React.createClass({
	render: function() {
		return <div className="sign-in-button sign-in-with-twitter-button" onClick={this.onClick}>
            <i className="fa fa-twitter logo" />
			<span className="text">{this.props.text}</span>
		</div>;
	},

	onClick: function() {
		Auth.getRequestToken();
	}
});

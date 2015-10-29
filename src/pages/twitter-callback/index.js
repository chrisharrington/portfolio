"use strict";

var React = require("react"),
	_ = require("lodash"),
    config = require("config"),
	query = require("querystring"),

	Auth = require("data/auth");

require("./style.less");

module.exports = React.createClass({
    componentDidMount: function() {
		var parsed = query.parse(location.search);
		Auth.getAccessToken(parsed.oauth_token, parsed.oauth_verifier).then(function(user) {
			window.location.href = "/#/" + (!user.plan ? "register" : "logs");
		}).catch(function(err) {
			alert(err);
		});
    },

	render: function() {
		return <div className="redirect">
            Redirecting...
		</div>;
	}
});

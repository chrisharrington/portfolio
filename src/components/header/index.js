"use strict";

var React = require("react");

require("./style.less");

module.exports = React.createClass({
	render: function() {
		var user = this.props.user;
		if (!user)
			return <div className="header">
				<span className={"logo" + (this.props.user ? "" : " hidden")}>Logsalot</span>
			</div>;

		return <div className="header">
            <span className={"logo" + (this.props.user ? "" : " hidden")}>Logsalot</span>
			<div className="account">
				<img src={user.image} />
				<div>
					<span className="name">{user.name}</span>
					<br />
					<span className="identifier">
						<i className={"fa " + this.getAccountTypeIcon(user.accountType)} />
						{user.identifier}
					</span>
				</div>
			</div>
			<div className="buttons">
				<a href="#" title="Settings">
					<i className="fa fa-cog"></i>
				</a>
			</div>
		</div>;
	},

	getAccountTypeIcon: function(type) {
		switch (type) {
			case "twitter":
				return "fa-twitter";
			case "google":
				return "fa-google";
			case "facebook":
				return "fa-facebook";
		}
	}
});

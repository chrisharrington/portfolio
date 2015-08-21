"use strict";

var React = require("react"),

    Header = require("components/header"),
    Menu = require("components/menu"),
    Auth = require("data/auth");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            user: Auth.getUser()
        };
    },

    componentDidMount: function() {
        if (!this.state.user)
            window.location.hash = "#";
    },

	render: function() {
        var user = this.state.user;
		return <div>
			<Header user={user} />
            <Menu user={user} />
            <div className="container-fluid padding-25 page-container">
                {this.props.children}
            </div>
		</div>;
	}
});

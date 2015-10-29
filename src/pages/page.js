"use strict";

var React = require("react"),

    Auth = require("data/auth"),
    Header = require("components/header");

require("./style.less");

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
		return <div>
            <Header user={this.state.user} />
            <div className="content">
                {this.props.children}
            </div>
		</div>;
	}
});

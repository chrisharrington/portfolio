"use strict";

var React = require("react");

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },

    componentDidMount: function() {
        if (!this.state.user)
            window.location.hash = "#";
    },

	render: function() {
		return <div>
            <div className="container-fluid padding-25 page-container">
                {this.props.children}
            </div>
		</div>;
	}
});

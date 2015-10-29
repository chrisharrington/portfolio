"use strict";

var React = require("react"),
	_ = require("lodash");

require("./style.less");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            message: "",
            type: "error",
            visible: false
        }
    },

    error: function(message) {
        this.message(message, "error");
    },

    success: function(message) {
        this.message(message, "success");
    },

    message: function(message, type) {
        this.setState({
            message: message,
            type: type
        });

        console.log(type + ": " + message);
    },

	render: function() {
		return <div className={"feedback " + this.state.type + " " + (this.state.visible ? "feedback-show" : "feedback-hide")}>
            <i className="fa fa-times" />
            <span>{this.state.message}</span>
		</div>;
	}
});

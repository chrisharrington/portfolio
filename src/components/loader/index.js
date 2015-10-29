"use strict";

var React = require("react");

require("./style.less");

module.exports = React.createClass({
	render: function() {
		return <div className={"loader " + this.props.style}></div>;
	}
});
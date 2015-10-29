"use strict";

var React = require("react"),
	_ = require("lodash");

require("./style.less");

module.exports = React.createClass({
	render: function() {
		var plan = this.props.plan || {};
		return <div className={"plan-option " + (this.props.className || "") + (this.props.selected ? " selected" : "")}>
			<div className="click-container" onClick={this.props.onClick.bind(null, plan)}>
				<div className="price">
					<span className="dollars">{"$" + plan.cost}</span>
					<span className="cents">00</span>
				</div>
				<div className="info">
					<h3>{plan.name}</h3>
					<span>{(plan.apps === -1 ? "Unlimited" : plan.apps) + " app" + (plan.apps === 1 ? "" : "s") + ", " + plan.logs + " daily logs, " + (plan.retentionString ? plan.retentionString.toLowerCase() : "") + " retention."}</span>
				</div>
				<i className={"fa" + (this.props.className === "plan-selector" ? " fa-chevron-down" : "") + (this.props.selected ? " fa-check" : "")}></i>
			</div>
		</div>;
	}
});

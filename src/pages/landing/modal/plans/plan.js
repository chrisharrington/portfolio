"use strict";

var React = require("react"),
	_ = require("lodash"),
	moment = require("moment");

module.exports = React.createClass({
	render: function() {
		var plan = this.props.plan;
		return <div className="plan">
            <h2>{plan.name}</h2>
            <div className="features">
                <div>
                    <span className="feature">Apps</span>
                    <span className="value">{plan.apps === -1 ? "Unlimited" : plan.apps}</span>
                </div>
                <div>
                    <span className="feature">Daily logs</span>
                    <span className="value">{plan.logs}</span>
                </div>
                <div>
                    <span className="feature">Retention</span>
                    <span className="value">{plan.retentionString}</span>
                </div>
            </div>
			<div className="price">
				<span className="price">{"$" + plan.cost}</span>
				<span className="cents">00</span>
				<span className="details">per month. USD.</span>
			</div>
			<a onClick={this.props.onRegister.bind(null, plan)}>{"Register with the " + plan.name + " plan."}</a>
		</div>;
	}
});

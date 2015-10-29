"use strict";

var React = require("react"),
	_ = require("lodash"),

	Modal = require("components/modal"),
	Plan = require("./plan"),

	Plans = require("data/stores/plans");

require("./style.less");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			plans: []
		};
	},

	componentWillMount: function() {
		Plans.get.subscribeAndNotify(function(plans) {
			this.setState({
				plans: plans
			});
		}.bind(this));
	},

	componentDidMount: function() {
		if (this.state.plans.length === 0)
			Plans.get.execute();
	},

	render: function() {
		return <div className="plans container-fluid">
			<h3>Plans</h3>
			<span>We have a broad range of different plans that should fit any logging needs you may have. If none of the plans below match what you're looking for, <a href="#">let us know</a> and we'll see if we can come up with something that works for everyone.</span>
			<span>All of our plans come with a <b>free</b> trial period. Sign up with any of the plans below and you won't be billed for the first month.</span>
        	<div className="row">
				{_.map(this.state.plans, function(p, i) {
					return <div className="col-md-3" key={i}>
						<Plan plan={p} onRegister={this.props.onRegister} />
					</div>;
				}.bind(this))}
        	</div>
		</div>;
	}
});

"use strict";

var React = require("react"),
	_ = require("lodash"),

	Plan = require("./plan"),

	Plans = require("data/stores/plans");

require("./style.less");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			plans: [],
			visible: false
		};
	},

	componentWillMount: function() {
		Plans.get.subscribeAndNotify(function(plans) {
			this.setState({
				plans: plans
			});

			if (!this.props.selected)
				this.select(plans[0]);
		}.bind(this));

		document.addEventListener("click", this.hideOnDocumentClick);
	},

	componentWillUnmount: function() {
		document.removeEventListener("click", this.hideOnDocumentClick);
	},

	componentDidMount: function() {
		if (this.state.plans.length === 0)
			Plans.get.execute();
	},

	hideOnDocumentClick: function(e) {
		if (e.target.className !== "plan-selector" && !this.parentsHaveClassName(e.target, "plan-selector"))
			this.hide();
	},

	parentsHaveClassName: function(element, className) {
		var parent = element;
		while (parent) {
			if (parent.className && parent.className.indexOf(className) > -1)
				return true;

			parent = parent.parentNode;
		}

		return false;
	},

	hide: function() {
		this.setState({
			visible: false
		});
	},

	show: function() {
		this.setState({
			visible: true
		});
	},

	select: function(plan) {
		this.setState({
			visible: false
		});

		this.props.onSelect(plan);
	},

	render: function() {
		var selected = this.props.selected || this.state.plans[0] || {};
		return <div className="plan-selector">
            <Plan plan={selected} className="plan-selector" onClick={this.show} />
			<div className={"selector " + (this.state.visible ? "selector-show" : "selector-hide")}>
				{_.map(this.state.plans, function(p, i) {
					return <Plan key={i} plan={p} selected={selected.name === p.name} onClick={this.select} />;
				}.bind(this))}
			</div>
		</div>;
	}
});

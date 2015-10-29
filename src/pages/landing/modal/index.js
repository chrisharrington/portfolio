"use strict";

var React = require("react"),
	_ = require("lodash"),

	Modal = require("components/modal").Modal,
	ModalContent = require("components/modal").ModalContent,
	Plans = require("./plans"),
	Register = require("./register"),
	SignIn = require("./sign-in"),
	Billing = require("./billing");

require("./style.less");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			selectedPlan: this.props.selectedPlan
		};
	},

	componentWillReceiveProps: function(props) {
		if (props.selectedPlan !== null)
			this.setState({
				selectedPlan: props.selectedPlan
			});
	},

	onPlanSelected: function(plan) {
		this.setState({
			selectedPlan: plan
		});
	},

	render: function() {
		return <Modal shown={this.props.shown}>
			<ModalContent id="plans" width={1000} height={378}>
				<Plans onRegister={this.props.showRegister} />
			</ModalContent>
			<ModalContent id="register" width={500} height={348}>
				<Register onSignIn={this.props.showSignIn} onPlans={this.props.showPlans} onBilling={this.props.showBilling} onPlanSelected={this.onPlanSelected} plan={this.state.selectedPlan} />
			</ModalContent>
			<ModalContent id="sign-in" width={500} height={236}>
				<SignIn />
			</ModalContent>
			<ModalContent id="billing" width={500} height={600}>
				<Billing plan={this.props.selectedPlan} />
			</ModalContent>
		</Modal>;
	}
});

"use strict";

var React = require("react"),
	_ = require("lodash"),
	moment = require("moment");

require("./style.less");

module.exports = React.createClass({
	renderExpiryYears: function() {
		var year = moment().year(),
			years = [];

		for (var i = 0; i < 8; i++)
			years.push(<option key={i}>{year + i}</option>);

		return years;
	},

	render: function() {
		return <div className={"credit-card " + (this.props.visible ? "credit-card-show" : "credit-card-hide")}>
			<span>Seeing that you've selected a plan that you'll need to pay for, please enter your biling information below.</span>
            <div className="number">
				<label>Credit card number</label>
				<input type="text" />
            </div>
			<div className="expiry">
				<label>Expiry date</label>
				<select className="expiry-month">
					<option>01</option>
					<option>02</option>
					<option>03</option>
					<option>04</option>
					<option>05</option>
					<option>06</option>
					<option>07</option>
					<option>08</option>
					<option>09</option>
					<option>10</option>
					<option>11</option>
					<option>12</option>
				</select>
				<select className="expiry-year">
					{this.renderExpiryYears()}
				</select>
			</div>
			<div className="security-code">
				<label>Security code</label>
				<input type="text" />
			</div>
		</div>;
	}
});

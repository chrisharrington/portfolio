"use strict";

var React = require("react"),
	_ = require("lodash"),

    Page = require("../page"),
	FavouritesChart = require("./favourites-chart");

require("./style.less");

module.exports = React.createClass({
	render: function() {
		return <Page>
			<div className="row">
				<div className="col-xs-12">
					example!
				</div>
			</div>
        </Page>;
	}
});

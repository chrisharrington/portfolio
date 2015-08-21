var React = require("react"),
	Router = require("react-router"),
	RouteHandler = Router.RouteHandler;

require("../style/app.less");

module.exports = React.createClass({
	render: function() {
		return <div>
			<RouteHandler />
		</div>;
	}
});

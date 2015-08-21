var React = require("react"),
	Router = require("react-router"),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,

	Base = require("./pages/base"),

	Example = require("./pages/example");

var routes = (
	<Route handler={Base} path="/">
		<DefaultRoute handler={Example} />
		<Route name="example" handler={Example} />
	</Route>
);

Router.run(routes, function(Handler, state) {
	React.render(<Handler params={state.params} />, document.body);
});

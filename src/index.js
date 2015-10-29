var React = require("react"),
	Router = require("react-router"),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,

	Base = require("./pages/base"),

	Landing = require("./pages/landing"),
	TwitterCallback = require("./pages/twitter-callback");

require("file?name=index.html!./index.html");

require("!style!css!less!./style/app.less");

require("!style!css!./assets/bootstrap.css");

require("data/google").init();
require("extensions").init();

var routes = (
	<Route handler={Base} path="/">
		<DefaultRoute handler={Landing} />
		<Route name="landing" handler={Landing} />
		<Route name="twitter-callback" handler={TwitterCallback} />
	</Route>
);

Router.run(routes, function(Handler, state) {
	React.render(<Handler params={state.params} />, document.body);
});

function wrapComponent (Component, props) {
	return React.createClass({
		render: function() {
			console.log(props);
			return <Component {...props} />;
		}
	});
}

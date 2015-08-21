var React = require("react"),
	Router = require("react-router"),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,

	Auth = require("./data/auth"),

	Base = require("./pages/base"),
	Dashboard = require("./pages/dashboard"),
	Phrases = require("./pages/phrases"),
	Landing = require("./pages/landing"),
	OAuthCallback = require("./pages/oauth-callback"),
    Setup = require("./pages/setup"),
	Logs = require("./pages/logs");

var routes = (
	<Route handler={Base} path="/">
		<DefaultRoute handler={Landing} />
		<Route name="oauth_callback" handler={OAuthCallback} />
		<Route name="dashboard" handler={Dashboard} />
		<Route name="phrases" handler={Phrases} />
        <Route name="setup" handler={Setup} />
		<Route name="logs" handler={Logs} />
	</Route>
);

Router.run(routes, function(Handler, state) {
	React.render(<Handler params={state.params} />, document.body);
});

"use strict";

import React from "react";
import ReactDOM from "react-dom";

import "file?name=index.html!./index.html";

import "file?name=grid.min.css!./assets/grid.min.css";

class HelloWorld extends React.Component {
	render() {
		return <div>Hello, world!</div>;
	};
};

ReactDOM.render(<HelloWorld />, document.querySelector("#container"));

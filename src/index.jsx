"use strict";

import React from "react";
import ReactDOM from "react-dom";

import "file-loader?name=index.html!./index.html";

import "./assets/grid.min.css";

class HelloWorld extends React.Component {
	render() {
		return <div className='container'>
			<div className='row'>
				<div className='col-md-12'>
					Hello, world!
				</div>
			</div>
		</div>;
	};
};

ReactDOM.render(<HelloWorld />, document.querySelector("#container"));

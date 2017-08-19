'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from 'components/sidebar';

import 'file-loader?name=index.html!./index.html';

import './assets/grid.min.css';

class Application extends React.Component {
	render() {
		return <div className='container'>
			<div className='row'>
				<div className='col-md-3'>
					<Sidebar />
				</div>
				<div className='col-md-9'>
					the rest
				</div>
			</div>
		</div>;
	};
};

ReactDOM.render(<Application />, document.querySelector('#container'));

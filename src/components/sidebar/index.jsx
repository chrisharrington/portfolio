'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

export default class Template extends React.Component {
	render() {
		return <div className='sidebar'>
			<div className='sidebar-inner'>the sidebar</div>
		</div>;
	};
};

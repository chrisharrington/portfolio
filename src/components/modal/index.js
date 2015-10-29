"use strict";

var React = require("react"),
	_ = require("lodash");

require("./style.less");

var Modal = React.createClass({
	getInitialState: function() {
		this._target = null;

		return {
			visible: this.props.shown !== null,
			current: this.props.shown,
			dimensions: { width: 0, height: 0 }
		};
	},

	componentWillMount: function() {
		document.addEventListener("keyup", this.hideOnEscape);
	},

	componentWillUnmount: function() {
		document.removeEventListener("keyup", this.hideOnEscape);
	},

	hideOnEscape: function(e) {
		if (e.keyCode === 27)
			this.hide();
	},

	hide: function() {
		this.setState({
			visible: false,
			current: null,
			dimensions: { width: 0, height: 0 }
		});
	},

	componentWillReceiveProps: function(props) {
		this._target = props.shown;
		this.setState({
			visible: props.shown !== null,
			dimensions: props.shown === null ? { width: 0, height: 0 } : this.getDimensions(props.shown)
		});
	},

	onTransitionEnd: function(e) {
		if (e.target.className.indexOf("modal-content target") > -1) {
			this.setState({
				current: this._target
			});

			this._target = null;
		}
	},

    render: function() {
		return <div className={"modal" + (this.state.visible ? " fade-in" : " fade-out")}>
			<div className="overlay"></div>
			{this.renderChildren(this.state.dimensions)}
		</div>;
	},

	renderChildren: function(dimensions) {
		return <div className="modal-children">
			<ModalTransition width={dimensions.width} height={dimensions.height} />
			{React.Children.map(this.props.children, function(child) {
				return React.addons.cloneWithProps(child, {
					isCurrent: this.state.current === child.props.id,
					isTarget: this.state.current !== this._target && this._target === child.props.id,
					isTransitioning: this.state.current !== this._target,
					hiddenWidth: dimensions.width,
					hiddenHeight: dimensions.height,
					onTransitionEnd: this.onTransitionEnd,
					onClose: this.hide
				});
			}.bind(this))}
		</div>;
	},

	getDimensions: function(shown) {
		var dimensions;// = { width: 0, height: 0 };
		React.Children.forEach(this.props.children, function(child) {
			if (shown === child.props.id)
				dimensions = { width: parseInt(child.props.width), height: parseInt(child.props.height) };
		}.bind(this));
		return dimensions;
	}
});

var ModalContent = React.createClass({
	componentDidMount: function() {
		this.refs.content.getDOMNode().addEventListener("transitionend", this.props.onTransitionEnd);
	},

	componentWillUnmount: function() {
		this.refs.content.getDOMNode().removeEventListener("transitionend", this.props.onTransitionEnd);
	},

	getClassName: function() {
		var className = "modal-content";
		if (this.props.isCurrent) {
			className += " current";
			if (this.props.isTransitioning)
				className += " transition-out";
		}
		if (this.props.isTarget) {
			className += " target";
			if (this.props.isTransitioning)
				className += " transition-in";
		}
		if (this.props.className)
			className += " " + this.props.className;
		return className;
	},

	render: function() {
		return <div ref="content" className={this.getClassName()} style={this.style()}>
			<i className="fa fa-times" onClick={this.props.onClose}></i>
			{this.props.children}
		</div>;
	},

	style: function() {
		var scaleX = this.props.hiddenWidth / this.props.width,
			scaleY = this.props.hiddenHeight / this.props.height;

		return {
			width: this.props.width,
			height: this.props.height,
			left: window.outerWidth/2 - this.props.width/2,
			transform: "scale(" + scaleX + ", " + scaleY + ")",
			"WebkitTransform": "scale(" + scaleX + ", " + scaleY + ")"
		};
	}
});

var ModalTransition = React.createClass({
	render: function() {
		return <div className="modal-transition" style={this.style()}></div>
	},

	style: function() {
		return {
			left: window.outerWidth/2 - 50,
			transform: "scale(" + (this.props.width/100) + ", " + (this.props.height/100) + ")",
			"WebkitTransform": "scale(" + (this.props.width/100) + ", " + (this.props.height/100) + ")"
		};
	}
});

module.exports = {
	Modal: Modal,
	ModalContent: ModalContent
};

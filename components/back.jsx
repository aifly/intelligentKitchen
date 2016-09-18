import React, { Component } from 'react';
import './css/back.css';

export default class FlyBack extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {

		return (
			<span className='fly-back' onTouchTap={this.props.callBack}>
				<span></span>
			</span>
		);
	}
}


import React from 'react';

export default class FlyDone extends React.Component{
	constructor(option){
		super(option);
		this.done = this.done.bind(this);

	}
	render(){
		return (
			<div className="fly-close-drag" ref='fly-close-drag' onTouchTap={this.done}>
				完成
			</div>
		)
	}
	done(){
	}
}

import React from 'react';

export default class FlyDone extends React.Component{
	constructor(option){
		super(option);
		this.done = this.done.bind(this);
		this.showDone = this.showDone.bind(this);

	}
	render(){
		return (
			<div className="fly-close-drag "  ref='fly-close-drag' onTouchTap={this.done}>
				完成
				<div ref='aa'></div>
			</div>
		)
	}

	componentDidMount(){

		let {obserable} = this.props;
		
		obserable.on('showDone',()=>{//注册兼听事件。
			this.showDone();
		});
	}

	showDone(){
		let s =this;
		s.refs['fly-close-drag'].classList.add('active');
	}

	done(){
		this.refs['fly-close-drag'].classList.remove('active');
		let {obserable} = this.props;
		obserable.trigger({type:'closeDrag'});
	}
}
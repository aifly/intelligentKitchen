import React, { Component } from 'react';
import './css/timeline.css';
export default class FlyTimeLine extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 steps:[
	  	 	'第一步',
	  	 	'第二步',
	  	 	'第三步',
	  	 	'第四步',
	  	 	'第五步',
	  	 ],
	  	 progressLeft:0,

	  	 width:20
	  };
	}
	render() {
		return (
			<section className='fly-time-line-C'>
				<div className='line'></div>
				<div className='fly-progress' style={{marginLeft:this.state.progressLeft,width:this.state.width}}></div>
				<section className='fly-points-C' ref='fly-points-C'>
					<article className='prepare' ref='prepare'>
						<span></span>
						<label>准备食材</label>
					</article>
					{this.state.steps.map((step,i)=>{
						return(
							<article key={i}>
								<span></span>
								<label>{step}</label>
							</article>
						)
					})}
				</section>
			</section>
		);
	}
	componentDidMount() {
		setTimeout(()=>{
			/*this.setState({
				progressLeft:this.refs['prepare'].offsetWidth / 2
			});*/

			let {obserable} = this.props;

			let points = this.refs['fly-points-C'].querySelectorAll('article');

			let posArr = [],
				width =this.refs['prepare'].offsetWidth+10;


			for(var i =1 ,len = points.length;i<len;i++){
				posArr.push({x:width});
			}

			this.isStop = false;

			obserable.on('prepareFood',()=>{
				let currentStep = obserable.trigger({type:"getCurrentStep"});
				if(currentStep <= -1){//当前还没有开始第一步。
					return;	
				}
				
				let x = this.state.width + 1;
				x>= posArr[currentStep].x && (x = 0 );
				
				!this.isStop &&	this.setState({
					width:x,
					progressLeft:currentStep*width
				});
			});
		},1);


	}
}

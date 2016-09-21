import React, { Component } from 'react';
import './css/timeline.css';
import {PublicMethods} from './public-methods.jsx';

class FlyTimeLine extends Component {
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
		 currentStep:-1,
	  	 width:20

	  };

	  this.updateStep = this.updateStep.bind(this);
	}
	render() {
		return (
			<section className='fly-time-line-C'>
				<div className='line'></div>
				<div className='fly-progress' style={{marginLeft:this.state.progressLeft,width:this.state.width}}></div>
				<section className='fly-points-C' ref='fly-points-C' onTouchTap={this.updateStep}>
					<article className='prepare' ref='prepare'>
						<span className='active'></span>
						<label>准备食材</label>
					</article>
					{this.state.steps.map((step,i)=>{
						return(
							<article key={i}>
								<span className={this.state.currentStep >= i+1?'active':''}></span>
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
				width =this.refs['prepare'].offsetWidth + 10;




			for(var i =1 ,len = points.length;i<len;i++){
				posArr.push({x:width});
			}

			this.isStop = false;

			let lastCurrentStep = -1;

			obserable.on('initProgress',(data)=>{//初始化进度条
				let state = {
					width:0,
					currentStep : data
				}
				if(data === -1){
					state.progressLeft = 20;
				}
				this.setState(state);

			});

			obserable.on('stopProgress',()=>{
				this.isStop =  true;
				this.setState({
					width:posArr[this.state.currentStep].x,
					progressLeft:this.state.currentStep*width - 30
				});
			});

			obserable.on('pauseProgress',(step)=>{
				this.isStop =  true;
				this.setState({
					width:posArr[this.state.currentStep].x,
					progressLeft:this.state.currentStep*width 
				});
			});

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

	updateStep(e){//点击圆点的时候切换步骤
		
		if(e.target.nodeName === "ARTICLE"){
			return;
		}

		let {obserable,index} = this.props,
			iNow = index(e.target.parentNode,null,'article');
		obserable.trigger({type:'updateStep',data:iNow-1});
	}
}


export default PublicMethods(FlyTimeLine);
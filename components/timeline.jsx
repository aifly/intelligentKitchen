import React, { Component } from 'react';
import './css/timeline.css';
import {PublicMethods} from './public-methods.jsx';
import $ from 'jquery';
import Time from '../libs/canvas';

class FlyTimeLine extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 steps:[
	  	 	
	  	 ],
	  	 progressLeft:0,
		 currentStep:-1,
	  	 width:0,
	  	 articleWidth:0,
	  	 allTime:-1,
	  	 timespan:[

	  	 ]
	  };

	  this.updateStep = this.updateStep.bind(this);
	}
	render() {
		return (
			<section className='fly-time-line-C' style={{opacity:this.state.steps.length ? 1:0}}>
				<div className='line'></div>
				<div className='fly-progress' style={{left:40+this.state.articleWidth - (document.documentElement.clientWidth / 10 * .1) / 2,marginLeft:this.state.progressLeft}}>
					<span style={{WebkitTransform:'translate3d('+this.state.width+'px,0,0)'}}></span>
				</div>
				<section className='fly-points-C' ref='fly-points-C' onTouchTap={this.updateStep}>
					<article className='prepare' ref='prepare'>
						<span className='active'></span>
						<label>准备食材</label>
					</article>
					{this.state.steps.map((step,i)=>{
						
						return(
							<article key={i}>
								<span className={this.state.currentStep >= i+1?'active':''}></span>
								<label>{step.stepName} {step.timespan}</label>
								{/*<div style={{left:-this.state.articleWidth}} className="fly-step-C">{step.stepContent}</div>*/}
							</article>
						)
					})}
				</section>
				{this.state.allTime !== -1 && <section className='fly-all-time'>总共用时: {this.state.allTime}</section>}
			</section>
		);
	}
	componentDidMount() {

		this.lastIndex = 0;
		let {obserable,URL,userId} = this.props;
 
		this.isStop = false;

		obserable.on('initProgress',(data)=>{//初始化进度条

			let state = {
				width:0,
				currentStep : data
			}
			if(data === -1){
				state.progressLeft = 0;
			}
			this.setState(state);

		});


		obserable.on('fillSteps',(steps)=>{

			this.setState({
				steps:steps
			},()=>{

				let points = this.refs['fly-points-C'].querySelectorAll('article');
			 	this.posArr = [];
				this.width =this.refs['prepare'].offsetWidth;
				for(var i =1 ,len = points.length;i<len;i++){
					this.posArr.push({x:this.width});
				}

				this.setState({
					articleWidth:points[0].offsetWidth/2 //> 320 ? 320 : points[0].offsetWidth/2
				});
			});
		});

		obserable.on('stopProgress',()=>{
			this.isStop =  true;
			this.setState({
				width:this.posArr[this.state.currentStep].x,
				progressLeft:this.state.currentStep*this.width
			});
		});



		obserable.on('showAllTime',()=>{

			let time = 0;
			this.state.steps.forEach(step=>{
				
				if(step.timespan){
					let hour = step.timespan.split(':')[0]*1,
						mins = step.timespan.split(':')[1]*1;
					time += hour*60 + mins;
				}
			});
			let s=  this,
				foodId = obserable.trigger({type:'getFoodId'});
			


			//清空盘子。
			obserable.trigger({
				type:'clearPlates'
			});

			time = ((time / 60 | 0) < 10 ? '0'+(time / 60 | 0):(time / 60 | 0)) + " : " +  (time % 60 < 10 ? '0' + time % 60 : time % 60)

			this.setState({
				allTime:time
			});

			
			var times = [];
			this.state.steps.forEach((item)=>{
				times.push(item.timespan.split(':')[0]*10 + item.timespan.split(':')[1]*1);
			});
			
			$.ajax({
				url:URL.getimespan,
				type:"POST",
				data:{
					Userid:userId,
					Id:foodId,
					Timespan:times+'' , //字符串类似于 => '1,2,3,4'
				},
				success(data){
					console.log(data);
				}
			});
		});

		obserable.on('pauseProgress',(step)=>{
			this.isStop =  true;
			this.setState({
				width:this.posArr[this.state.currentStep].x,
				progressLeft:this.state.currentStep * this.width 
			});
		});

		obserable.on('startProgress',()=>{
			this.isStop =  false;
		});
			

		obserable.on('prepareFood',()=>{
			let currentStep = obserable.trigger({type:"getCurrentStep"});
			if(currentStep <= -1){//当前还没有开始第一步。
				return;	
			}


			let x = this.state.width + 1;

			//x>= this.posArr[currentStep].x && (x =  20 && return false);

			if(x>= this.posArr[currentStep].x){
				x = 0;
			}
			
			!this.isStop &&	this.setState({
				width:x,
				progressLeft:currentStep*this.width
			});
		});

		obserable.on('clearTimespan',(data)=>{

			this.state.steps[data].timespan = "00:00";

			this.forceUpdate();
		});


		obserable.on('showTimespan',(timespan)=>{//每一个步骤完成后显示时间
			var result = '';
			if(timespan*1 === 0 ){
				result = "00:00";
			}
			else{
				result = ((timespan / 60 | 0) < 10 ? '0'+(timespan / 60 | 0):(timespan / 60 | 0)) + " : " +  (timespan % 60 < 10 ? '0' + timespan % 60 : timespan % 60);
			}
			this.state.steps[this.state.currentStep].timespan = result;
			this.forceUpdate();
		});



		obserable.on('clearAllTime',()=>{
			this.state.steps.forEach((item)=>{
				item.timespan='';
			});

			this.state.allTime = -1;
			this.forceUpdate();
		});

	}

	updateStep(e){//点击圆点的时候切换步骤
		
		if(e.target.nodeName === "ARTICLE" || e.target.nodeName === "CANVAS"){
			return;
		}

		

		let {obserable,index} = this.props,
			iNow = index(e.target.parentNode,null,'article');

		obserable.trigger({type:'updateStep',data:iNow-1});

		if(iNow - this.lastIndex  !== 1){
			for(var i = 0; i < iNow  ;i++){

				//this.state.steps[i].timespan = '00:00';
				obserable.trigger({type:'clearTimespan',data:i});//从头开始了 ，记时清0
			}
			obserable.trigger({type:'enableTimespan',data:iNow});//防止点击了圆点，后面又点上一步，下一步
		}

		this.lastIndex = iNow;


		this.forceUpdate();


	}
}


export default PublicMethods(FlyTimeLine);
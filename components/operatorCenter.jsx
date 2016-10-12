import React, { Component } from 'react';
import './css/operator-center.css';
import { PublicShadow } from './public-shadow.jsx';
import numberData from '../libs/number';
import Time from '../libs/canvas';
import FlyCountdown from './countdown.jsx';
import $ from 'jquery';

 class FlyOperatorCenter extends Component {
	constructor(option){
		super(option);

		this.state = {
			showBoard:false,
			showWeight:false,
			isShow:false,
			showCanvas:false,
			showCountdown:false
		}
		this.showWeight = this.showWeight.bind(this);
		this.showBoard = this.showBoard.bind(this);
		this.netWeight = this.netWeight.bind(this);//去皮
		this.getWeight = this.getWeight.bind(this);//称重
		this.hideCanvas = this.hideCanvas.bind(this);
		this.showCountdown = this.showCountdown.bind(this);
	}
	
	render() {

		return (
			<li className='fly-operator-item fly-weight' style={{position:'relative'}}>
				<div style={{opacity:this.state.isShow ? 1:0}}>
					<div className='fly-btns-C'>
						<figure>
							<img  src='./assets/images/weight-btn.png' onTouchTap={this.showWeight} onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}/>
						</figure>
						<figure>
							<img  src='./assets/images/broad-btn.png' onTouchTap={this.showBoard} onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}/>
						</figure>
						<figure>
							<img  src='./assets/images/time-info.png' onTouchTap={this.showCountdown} onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}/>
						</figure>
					</div>
					<div className='fly-show-countdown-top' style={{display:this.state.showCanvas?'block':'none'}}>
						<canvas ref='clock-ico'></canvas>						
						<span className='fly-close-countdown' onTouchTap={this.hideCanvas}></span>
						<canvas ref='canvas'></canvas>
					</div>
					<div className='fly-operator-C' >
						<div className='operator-C'  ref='fly-operator-C'>
							 <div style={{display:this.state.showBoard ? 'block':'none'}} className='fly-img-board'>
								<img src='./assets/images/board.png' className='board'/>	
							</div>
							<div style={{opacity:this.state.showWeight ? 1:0}} className='fly-img-weight'>
								<img src='./assets/images/weight.png'/>
								<div className='fly-weight-display'>
									<div onTouchTap={ this.netWeight}>去皮</div>
									<div className='weight'><canvas ref='weight'></canvas></div>
									<div onTouchTap={this.getWeight}>确定</div>
								</div>
							</div>
							<div className="fly-countdown-C" style={{display:this.state.showCountdown?'block':'none'}}>
								<FlyCountdown {...this.props}></FlyCountdown>
							</div>
						</div>
					</div>
				</div>
			</li>
		);
	}

	hideCanvas(){
		this.setState({
			showCanvas:false
		});
	}

	showCountdown(){
		this.setState({
			showCountdown:true,
			showWeight:false,
			showBoard:false
		})
	}

	componentDidMount(){
		let canvas = this.refs['weight'];
		setTimeout(()=>{
			canvas.width = canvas.parentNode.offsetWidth;
			canvas.height = canvas.parentNode.offsetHeight;
			this.initCanvas(canvas,0);


			//this.renderCanvas(1234,canvas);
		},1);


		let {obserable} = this.props;

		

		obserable.on('getTopCountdownCanvas',()=>{
			setTimeout(()=>{
				let canvasIco = this.refs['clock-ico'];
				let size =this.refs['canvas'].height;
				canvasIco.width = size;
				canvasIco.height = size;
				this.drawClockIco(canvasIco,size);
			},10);
			return this.refs['canvas'];
		});

		obserable.on('controlCanavsDisplay',flag=>{
			this.setState({showCanvas:flag});
		});

/*
		setTimeout(()=>{//测试称重返回结果重新计算


			//this.initCanvas(canvas,13);

		},2000)*/


		obserable.on('showOperater',(flag)=>{
			this.setState({
				isShow:flag
			})
		});
	}

	drawClockIco(canvas,size){ //绘制时钟图标。
		var context = canvas.getContext('2d');
		let r = size / 2.8;
		let center = size/2;
		context.strokeStyle='#fff';
		context.lineWidth = 3;
		context.beginPath();
		context.arc(center,center,r,0,Math.PI*2,false);
		context.closePath();
		context.stroke();


		context.beginPath();
		context.moveTo(center,r / 1.5);
		context.lineTo(center,center);
		context.lineTo(r/1+r,center*1.2);
		context.stroke();

		context.beginPath();
		context.arc(center,center,r*1.3,-70*Math.PI/180,-40*Math.PI/180,false);
		context.stroke();

		context.beginPath();
		context.arc(center,center,r*1.3,220*Math.PI/180,250*Math.PI/180,false);
		context.stroke();



	}

	netWeight(e){//去皮
		let {URL} = this.props;
		if(this.state.isShow){
			this.props.shadow(e.target);
			$.ajax({
				type:'POST',
				url:URL.weightstart,
				success(data){
					if(data.getret === 1){
						//console.log('success');
					}
				}
			});
		}	
	}


	getWeight(e){
		//开始称重。
		let {obserable,URL} = this.props;
		if(this.state.isShow){
			this.props.shadow(e.target);
			let s = this;
			let canvas = this.refs['weight'];
			$.ajax({
				type:'POST',
				url:URL.weightend,
				success(data){
					if(data.getret === 1){
						let weight= data.foodweight*1|0;
						console.log(weight)
						var iNow = weight - 10 < 0?0:weight-10;
						var t = setInterval(()=>{
							s.initCanvas(canvas,++iNow);
							if(iNow >=weight){
								obserable.trigger({ //填充饼图
									type:'fillAlimentationData',
									data:{
										scaleData:data.scaleData
									}
								});
								clearInterval(t);
								s.initCanvas(canvas,weight);
							}
						},20);
					}
				}
			});
		}	
	}

	initCanvas(canvas,number,color="",bgColor='#e7e6e6'){//

		let numberArr = [
			number / 1000 | 0,//千位
			(number % 1000 / 100) | 0,//百位
			(number % 1000 % 100 / 10) | 0,//十位
			number % 10 | 0//个位
		];

		this.weight  = this.weight || new Time({
			canvas:canvas,
			obserable:this.props.obserable,
			isTime:false
		});
		this.weight.initWeight(numberArr,null,bgColor);

	}

	

	renderCanvas(number,canvas){
		let context = canvas.getContext('2d');
		let numberArr = [
			number / 1000 | 0,//千位
			(number % 1000 / 100) | 0,//百位
			(number % 1000 % 100 / 10) | 0,//十位
			number % 10 | 0//个位
		];
		this.draw(numberArr[0],context,2);


		
	}



	showWeight(){
		
		this.setState({
			showWeight:true,
			showBoard:false,
			showCountdown:false
		});
		
	}

	showBoard(){
		this.setState({
			showWeight:false,
			showBoard:true,
			showCountdown:false
		});
	}
	closeWeight (){

	}

}

export default PublicShadow(FlyOperatorCenter);
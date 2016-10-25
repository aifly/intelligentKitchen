import React, { Component } from 'react';
import './css/operator-center.css';
import { PublicShadow } from './public-shadow.jsx';
import numberData from '../libs/number';
import Time from '../libs/canvas';
import FlyCountdown from './countdown.jsx';
import $ from 'jquery';
import Ico from '../libs/ico';

 class FlyOperatorCenter extends Component {
	constructor(option){
		super(option);

		this.state = {
			showBoard:false,
			showWeight:false,
			isShow:false,
			showCanvas:false,
			showCountdown:false,
			netWeightShadow:0,
			weightShadow:0,
			weightIcoShadow:0,
			broadIcoShadow:0,
			timeInfoIcoShadow:0,
			weightData:[] //称重后的数据。
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
					<h1></h1>
					<div className='fly-btns-C'>
						<figure className={this.state.weightIcoShadow?'shadow':''}>
							{/*<img  src='./assets/images/weight-btn.png' onTouchTap={this.showWeight} />*/}
							<canvas width='140' height='140' ref='weight-ico' onTouchStart={this.showWeight}></canvas>
						</figure>
						<figure className={this.state.broadIcoShadow?'shadow':''}>
							<canvas width='140' height='140' ref='broad-ico'  onTouchStart={this.showBoard}></canvas>
						</figure>
						<figure className={this.state.timeInfoIcoShadow?'shadow':''}>
							<canvas width='140' height='140' ref='time-ico'  onTouchStart={this.showCountdown}></canvas>
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
									<div onTouchStart={this.netWeight} className={this.state.netWeightShadow ? 'shadow1':''}>去皮</div>
									<div className='weight'><canvas ref='weight'></canvas></div>
									<div onTouchStart={this.getWeight} className={this.state.weightShadow ? 'shadow1':''}>确定</div>
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


	 

	showCountdown(e){

		//this.props.shadow(e.target.parentNode);
		this.setState({
			showCountdown:true,
			showWeight:false,
			showBoard:false,
			timeInfoIcoShadow:1
		},()=>{
			setTimeout(()=>{
				this.setState({
					timeInfoIcoShadow:0
				})
			},100);
		})
	}


	componentDidMount(){
		let canvas = this.refs['weight'];
		setTimeout(()=>{
			canvas.width = canvas.parentNode.offsetWidth;
			canvas.height = canvas.parentNode.offsetHeight;
			this.initCanvas(canvas,0);

			new Ico({canvas:this.refs['weight-ico']}).drawWeightIco();
			new Ico({canvas:this.refs['broad-ico']}).drawBroadIco();
			new Ico({canvas:this.refs['time-ico']}).drawCountdownIco();
			//this.renderCanvas(1234,canvas);
		},1);


		let {obserable} = this.props;

		obserable.on('getWeightData',()=>{
			return this.state.weightData;
		});

		

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
		if(this.state.isShow){

			let canvas = this.refs['weight'];
			this.initCanvas(canvas,0);
			this.t && clearInterval(this.t);
			//this.props.shadow(e.target,'shadow1');
			this.setState({
				netWeightShadow:1
			});

			setTimeout(()=>{
				this.setState({
					netWeightShadow:0
				})
			},100);
		
		  this.requestTimer && clearTimeout( this.requestTimer );
		
		  this.requestTimer = setTimeout(()=>{
				
				let {URL} = this.props;
				let canvas = this.refs['weight'];
				let s = this;
				$.ajax({
					type:'POST',
					url:URL.weightstart,
					error(e){
						console.log(e)
					},
					success(data){
						if(data.getret === 1){
							//console.log('success');
							//s.initCanvas(canvas,0);
							//weight
							console.log(data)
						}
					}
				});
			},100);
			
		}	
	}
	getWeight(e){
		//开始称重。
		let {obserable,URL,r} = this.props;
		if(this.state.isShow){
			
			this.setState({
				weightShadow:1
			});
			 
			let s = this;
			let canvas = this.refs['weight'];
			var iNow = 0;
			this.t && clearInterval(this.t);
			this.t = setInterval(()=>{
				if(iNow === 0){
					this.setState({
						weightShadow:0
					})
				};
				iNow++;
				s.initCanvas(canvas,r(40,55)|0);
			},100);
			
			this.weightTimer && clearTimeout(this.weightTimer);
			this.weightTimer =  setTimeout(()=>{
				$.ajax({
				type:'POST',
				url:URL.weightend,
				error(e){
					clearInterval(s.t);
					s.initCanvas(canvas,0);
				},
				success(data){
					console.log(data);
					clearInterval(s.t);
					if(data.getret === 1){
						let weight= data.foodweight*1|0;
						

						data.scaleData.forEach(item=>{
							//item.scale*1<0 && (item.scale = 0);
							item.weight < 0 && (item.weight = 0);
						});
					
						obserable.trigger({ //填充饼图
							type:'fillAlimentationData',
							data:{
								scaleData:data.scaleData
							 }
						});
						var hasMaterialsId = false;
						s.state.weightData.forEach((item)=>{
							if(item.Materiaid*1 === data.Materiaid*1){
								item.scaleData = data.scaleData;
								item.weight = weight;
								hasMaterialsId = true;
							}
						});

						!hasMaterialsId && s.state.weightData.push(data.scaleData); 
						obserable.trigger({
							type:"updateCurrentMaterialsId",
							data:data.Materiaid*1 //服务器返回的识别到的食材的ID。
						});
						weight > 9999 && (weight = 9999);
						s.initCanvas(canvas,weight);
					}
					else{
						s.initCanvas(canvas,0);
					}
				}
			});
			},2000);
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

	showWeight(e){
		
		this.setState({
			showWeight:true,
			showBoard:false,
			weightIcoShadow:1,
			showCountdown:false
		},()=>{
			setTimeout(()=>{
				this.setState({
					weightIcoShadow:0
				})
			},100);
		});
		//this.props.shadow(e.target.parentNode);
	}

	showBoard(e){
		//this.props.shadow(e.target.parentNode);
		this.setState({
			showWeight:false,
			showBoard:true,
			showCountdown:false,
			broadIcoShadow:1
		},()=>{
			setTimeout(()=>{
				this.setState({
					broadIcoShadow:0
				})
			},100);
		});
	}
	closeWeight (){

	}

}

export default PublicShadow(FlyOperatorCenter);
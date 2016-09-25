import React, { Component } from 'react';
import './css/operator-center.css';
import { PublicShadow } from './public-shadow.jsx';
import numberData from '../libs/number';
import Time from '../libs/canvas';
import FlyCountdown from './countdown.jsx';
 class FlyOperatorCenter extends Component {
	constructor(option){
		super(option);

		this.state = {
			showBoard:false,
			showWeight:false,
			isShow:true,
			showCanvas:false
		}
		this.showWeight = this.showWeight.bind(this);
		this.showBoard = this.showBoard.bind(this);
		this.netWeight = this.netWeight.bind(this);//去皮
		this.getWeight = this.getWeight.bind(this);//去皮
		this.hideCanvas = this.hideCanvas.bind(this);
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
							<img  src='./assets/images/time-info.png' onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}/>
						</figure>
					</div>
					<div className='fly-show-countdown-top' style={{display:this.state.showCanvas?'block':'none'}}>
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
							<div className="fly-countdown-C">
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
			return this.refs['canvas'];
		});

		obserable.on('controlCanavsDisplay',flag=>{
			this.setState({showCanvas:flag});
		});


		setTimeout(()=>{//测试称重返回结果重新计算


			//this.initCanvas(canvas,123);

		},2000)


		obserable.on('showOperater',(flag)=>{
			this.setState({
				isShow:flag
			})
		});
	}

	netWeight(e){//去皮
		if(this.state.isShow){
			this.props.shadow(e.target);
		}	
	}


	getWeight(){
		//开始称重。
		if(this.state.isShow){
			this.props.shadow(e.target);
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
			showBoard:false
		});
		
	}

	showBoard(){
		this.setState({
			showWeight:false,
			showBoard:true
		});
	}
	closeWeight (){

	}

}

export default PublicShadow(FlyOperatorCenter);
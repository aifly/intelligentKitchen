import React from 'react';
import './css/bookitem.css';
import IScroll from 'iscroll';
import { PublicShadow } from './public-shadow.jsx';
import $ from 'jquery';
import FlyBack from './back.jsx';
//最右侧的组件。具体的每一道菜的步骤。
 class FlyCookBookItem extends React.Component{
	constructor(option){
		super(option);
		this.state = {
			currentStep:-1,//当前的步骤 .-1表示未开始
			defaultWidth:2.5*384,
			foodData : {
				
			},
			steps:[
				{
			        stepName:'第一步',
			        imgSrc:'./assets/images/food1.png',
			        stepContent:'西红柿切成片1'
			      },
			      {
			        stepName:'第二步',
			        imgSrc:'./assets/images/food2.png',
			        stepContent:'打好鸡蛋并且搅拌均匀1'
			      },
			      {
			        stepName:'第三步',
			        imgSrc:'./assets/images/food3.png',
			        stepContent:'鸡蛋入锅，翻炒，剩出备用1'
			      },
			      {
			        stepName:'第四步',
			        imgSrc:'./assets/images/food4.png',
			        stepContent:'西红柿入锅'
			      },
			      {
			        stepName:'第五步',
			        imgSrc:'./assets/images/food5.png',
			        stepContent:'倒入备用鸡蛋翻炒1'
			      }
			]
		};
		this.getDetail = this.getDetail.bind(this);
		this.closeCook = this.closeCook.bind(this);
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.closeStep = this.closeStep.bind(this);
		this.beginDo = this.beginDo.bind(this);
	}


	render(){

		let foodData = this.state.foodData,
			steps = this.state.steps;
		let background = {
			background:foodData.detailSrc?'url('+foodData.detailSrc+') no-repeat center  / cover':'none'
		};

		return (
			<li className="fly-cook-detail fly-cook-book-item">
				<div className="fly-cook-book-item-C book-item">
					{foodData.name && this.state.currentStep === -1  && <section className='book-item-C'>
						<ul className='book-item-ul'>
							<li className='book-item-ul-li' onTouchTap={this.getDetail}>
								<div className='book-item-detail-src' style={background}>
									<span onTouchTap={this.closeCook} className='fly-exit'></span>
									<div className='book-item-content'>
										<span className='book-item-name'>{foodData.name}</span>
										<span className='book-item-pageview'>{foodData.pageView}<em>浏览</em></span>
										<span className="book-item-discuss">
											<span>
												<b></b>
												<b></b>
												<b></b>
											</span>
											<span>{foodData.discuss}</span>
										</span>
									</div>										
								</div>
							</li>	
							<li className='book-item-detail book-item-ul-li'>
								
								<div className='material' ref='material'>
									<h1>材料</h1>
									<section className='material-scroll' ref='material-scroll'>
										
										<ul>
											{foodData.foodMaterial && foodData.foodMaterial.map((item,i)=>{
												return (
													<li key={i}>
														<span>{item.name}</span>
														<span>{item.weight}</span>
													</li>
												);
											})}
										</ul>
										
									</section>
									<section onTouchTap={this.beginDo} className='begin-do'><span>开始制作</span></section>
								</div>
							</li>	
						</ul>
					</section>}

					 <div className='fly-cook-steps-C' ref='fly-cook-steps-C' style={{display:steps.length && this.state.currentStep>-1 ? 'block':'none'}}>
						<aside className='fly-prev' onTouchTap={this.prev} style={{display:this.state.currentStep <=0 ? 'none':'block'}}></aside>					
						<div className='fly-history'>
							<FlyBack callBack={()=>{}}></FlyBack>
						</div>
						<div className='fly-cook-steps-scroll'>
							<ul className='active' ref='steps-C' style={{width:steps.length * this.state.defaultWidth}}>
								{steps.map((step,i)=>{
									return <li key={i}>
										<article style={{background:'url('+ step.imgSrc + ') no-repeat center  / cover'}}></article>
										<footer>{step.stepContent}</footer>
									</li>
								})}							
							</ul>
						</div>
						<aside className='fly-next' onTouchTap={this.next} style={{display:this.state.currentStep >= this.state.steps.length-1 ? 'none':'block'}}>下一步</aside>
						<div className='fly-close' onTouchTap={this.closeStep}>
							
						</div>
					</div>
				</div>

			}
			</li>
		)
	}

	prev(e){
		this.props.shadow(e.target);

		if(this.state.currentStep <=0){
			return;
		}
		this.setState({
			currentStep:this.state.currentStep-1
		},()=>{
			this.stepScroll();
		});
	}
	next(e){
		this.props.shadow(e.target);
		if(this.state.currentStep >=this.state.steps.length-1){
			return;
		}
		this.setState({
			currentStep:this.state.currentStep+1
		},()=>{
			this.stepScroll();
		});

		//
	}

	beginDo(){
		this.setState({
			currentStep:0
		});
	}

	closeStep(e){//
		this.closeCook(e);
	}

	stepScroll(){
		this.refs['steps-C'].style.WebkitTransform='translate3d(-'+(this.state.currentStep*this.state.defaultWidth)+'px,0,0)';
	}

	getDetail(){
		/*this.iNow = this.iNow || 1;
		if(this.iNow++%2===1){
			
			this.refs['detail'].parentNode.classList.add('active')
		}
		else{
			this.refs['detail'].parentNode.classList.remove('active')
		}*/
		
	}

	closeCook(e){ //关闭。
		e.preventDefault();
		this.setState({
			foodData:{}
		});
	}

	componentDidMount(){
		let {obserable} = this.props;
		obserable.on('fillFood',(data)=>{
			this.setState({
				foodData:data,
				//steps:data.steps
			},()=>{
				this.scroll = this.scroll || new IScroll(this.refs['material-scroll']);
				this.scroll && this.scroll.refresh();//重新刷新滚动条。

			});
		});

		setTimeout(()=>{
			this.setState({
				defaultWidth:this.refs['fly-cook-steps-C'].offsetWidth
			});
			
		},1);


		let scrollC = this.refs['steps-C'];
		$(scrollC).on('touchstart',(e)=>{
			var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			var disX = e.pageX;//
			scrollC.classList.remove('active');//去除transition动画
			let currentStep = this.state.currentStep,
				defaultWidth = this.state.defaultWidth,
				stepsLen = this.state.steps.length;
			$(document).on('touchmove',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0],
					x = e.pageX - disX;

				if(currentStep === 0){//第一步里面滑动的时候
					if(x > 0){
					 	//x /= 3;
					 	x = 0 ;
					 	return;
					}
				}
				else if(currentStep === stepsLen - 1){
					if(x<0){
						//x /= 3;
						return;
					}
				}
				scrollC.style.WebkitTransform='translate3d('+(x - currentStep*defaultWidth)+'px,0,0)';

			}).on('touchend',e=>{
				

				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0],
					x = e.pageX - disX;

				if(currentStep === 0){//第一步里面滑动的时候
					if(x > 0){
				 	//x /= 3;
					 	x = 0 ;
					 	return;
					}
				}
				else if(currentStep === stepsLen - 1){
					if(x<0){
						//x /= 3;
						return;
					}
				}
				scrollC.classList.add('active');

				if(x < 0 ){
					if(-x > defaultWidth / 3){

						this.setState({
							currentStep:this.state.currentStep + 1
						},()=>{
							this.stepScroll();
						});
					}
					else{
						this.stepScroll();
					}	
				}
				else{

					if(x > defaultWidth / 3){
						this.setState({
							currentStep:this.state.currentStep - 1
						},()=>{
							this.stepScroll();
						});
					}
					else{
						this.stepScroll();
					} 
				}

				
				

				/*if(currentStep === 0){//第一步里面滑动的时候
					if(x > 0){
						scrollC.style.WebkitTransform='translate3d('+(currentStep*defaultWidth)+'px,0,0)';
					}
				}
				else if(currentStep === stepsLen - 1){
					if(x<0){
						scrollC.style.WebkitTransform='translate3d('+(currentStep*defaultWidth)+'px,0,0)';
					}
				}*/

				$(document).off('touchmove touchend');
			});
		});

		
		
	}
}

export default PublicShadow(FlyCookBookItem);
import React from 'react';
import './css/bookitem.css';
import IScroll from 'iscroll';
import { PublicShadow } from './public-shadow.jsx';
import $ from 'jquery';
import FlyBack from './back.jsx';
import FlyVideo from './video.jsx';
//import videojs from 'video.js'
//最右侧的组件。具体的每一道菜的步骤。
 class FlyCookBookItem extends React.Component{
	constructor(option){
		super(option);
		this.state = {
			currentStep:-1,//当前的步骤 .-1表示未开始
			defaultWidth:2.5*384,
			foodData : {

			},
			stepTimeSpan:[
			],
			steps:[
				
			],
			type:'',
			isEnableDrag:false
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
			background:foodData.imgSrc?'url('+foodData.imgSrc+') no-repeat center  / cover':'none'
		};
		let videoProps= {};
		if(this.state.foodData.steps){
			videoProps = {
				imgSrc:this.state.foodData.steps[0].imgSrc,
				poster:this.state.foodData.steps[0].poster,
				steps : this.state.foodData.steps

			};	
		};
		
		return (
			<li className="fly-cook-detail fly-cook-book-item">
				<div style={{width:'100%',height:'100%',position:'relative'}}>

					<div style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',zIndex:foodData.type && this.state.isEnableDrag ? 1000:-1}}></div>
						{foodData.type === 'image' && <div className="fly-cook-book-item-C book-item">
							{foodData.name && this.state.currentStep === -1 && <span onTouchTap={this.closeCook} className='fly-exit'></span>}
						{foodData.name && this.state.currentStep === -1  && <section className='book-item-C'>

							<ul className='book-item-ul'>
								<li className='book-item-ul-li' onTouchTap={this.getDetail}>
									<div className='book-item-detail-src' style={background}>
										
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
							<aside className='fly-prev' onTouchTap={this.prev} style={{display:this.state.currentStep <=0 ? 'none':'block'}}><canvas width='115' height='115'></canvas>上一步</aside>
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
							<aside className='fly-next' onTouchTap={this.next}>{this.state.currentStep >= this.state.steps.length-1?'完成':'下一步'}<canvas width='115' height='115'></canvas></aside>
							<div className='fly-close' onTouchTap={this.closeStep}>
								
							</div>
						</div>
					</div>}
					{foodData.type === 'video' && <div className="fly-cook-book-item-C book-item">
						<FlyVideo {...videoProps} {...this.props}></FlyVideo>
					</div>}
				</div>
				
			</li>
		)
	}

	prev(e){
		e && this.props.shadow(e.target.parentNode);

		let {obserable} = this.props;
		if(this.state.currentStep <=0){
			return;
		}
		this.setState({
			currentStep:this.state.currentStep-1
		},()=>{
			this.stepScroll();
			this.state.steps[this.state.currentStep].timeError = true;
			obserable.trigger({type:'clearTimespan',data:this.state.currentStep});
		});
		
	}
	next(e){

		let {obserable} = this.props;
		
		//this.state.stepTimeSpan.push(((new Date().getTime() - this.startTime) / 1000|0 + 1)/ 60|0 + 1);// /60换算成分。+1是不足一分钟按一分钟算。
		if(!this.state.steps[this.state.currentStep].timeError){
			obserable.trigger({type:'showTimespan',data:((new Date().getTime() - this.startTime) / 1000|0 + 1)/ 60|0 + 1});
		}
		e && this.props.shadow(e.target.parentNode);
		if(this.state.currentStep >=this.state.steps.length-1){

			//this.state.stepTimeSpan.push(new Date().getTime() - this.startTime);//	
			obserable.trigger({type:'stopProgress'});

			obserable.trigger({type:'showAllTime'});//

			this.setState({
				currentStep:-1
			});
			
			obserable.trigger({
				type:'initProgress',
				data:-1
			});
			return;
		}
		this.setState({
			currentStep:this.state.currentStep  + 1
		},()=>{
			this.stepScroll();
			obserable.trigger({type:"initProgress",data:this.state.currentStep});
		});

		//

		

		this.startTime = new Date().getTime();

	}

	beginDo(){

		let {obserable} = this.props;
		//清空时间.
		setTimeout(()=>{
			this.setState({
				currentStep:0,
				defaultWidth:$(".fly-cook-steps-C").width()
			},()=>{
				obserable.trigger({type:"initProgress",data:this.state.currentStep});
			});
		},1);
		this.startTime = new Date().getTime();
	}

	closeStep(e){//
		this.closeCook(e);
	}

	stepScroll(){
		let scrollC = this.refs['steps-C'];
		scrollC && (scrollC.style.WebkitTransform='translate3d(-'+(this.state.currentStep*this.state.defaultWidth)+'px,0,0)');
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
			foodData:{},
			currentStep:-1
		});

		let {obserable} = this.props;
		obserable.trigger({
			type:'clearAlimentationData'
		});
		obserable.trigger({
			type:'clearMaterialsData'
		})
	}

	componentDidMount(){

		let {obserable} = this.props,
			foodId = -1;

		obserable.on('closeStep',(e)=>{
			this.closeCook(e);
		})

		obserable.on('showBookDetailIsEnableDrag',(flag)=>{
			this.setState({
				isEnableDrag:flag
			});
		});

		obserable.on('getCurrentStep',()=>{
			
			return this.state.currentStep;	

		});

		obserable.on('enableTimespan',(len)=>{
			for(var i = 0; i < len;i++){
				this.state.steps[i].timeError = true;
			}
		})
		

		obserable.on('updateStep',(step)=>{

			this.setState({
				currentStep:step
			},()=>{
				this.stepScroll();
				obserable.trigger({type:"initProgress",data:this.state.currentStep});
				//this.state.stepTimeSpan = this.state.stepTimeSpan.slice(0,step);

			});
		});

		obserable.on('fillFood',(data)=>{
			foodId = data.id;
			this.setState({
				foodData:data,
				steps:data.steps,
				currentStep : -1
			},()=>{
				
				this.scroll = this.scroll || new IScroll(this.refs['material-scroll']);
				this.scroll && this.scroll.refresh();//重新刷新滚动条。
			/*	let scrollC = this.refs['steps-C'];
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
								x =0 ;
								return;
							}
						}
						scrollC.classList.add('active');

						if(x < 0 ){
							if(-x > defaultWidth / 3){

								this.next();
							}
							else{
								this.stepScroll();
							}	
						}
						else{

							if(x > defaultWidth / 3){
								this.prev();
							}
							else{
								this.stepScroll();
							} 
						}

						$(document).off('touchmove touchend');
					});
				});*/

			});
		});



		obserable.on('updateTimeSpan',(timespan)=>{
			this.state.stepTimeSpan.push(timespan);
		});

		obserable.on('getTimespan',()=>{
			return this.state.stepTimeSpan;
		});

		obserable.on('fillFoodByVideo',data=>{
			foodId = data.id;
			this.setState({
				foodData:data,
				steps:data.steps,
				currentStep : -1
			});
		}); 

		obserable.on('getFoodId',()=>{//返回当前菜谱的ID
			return foodId;
		});


		
	}
}

export default PublicShadow(FlyCookBookItem);
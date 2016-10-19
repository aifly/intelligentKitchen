	import React, { Component } from 'react';
import './css/countdown.css';
import   '../libs/touchScroll.js';
import $ from 'jquery';

import Time from '../libs/canvas';


export default class FlyCountdown extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	timing:0,//倒计时
	  	hours:0,
	  	mins:0,
	  	isTiming:false,//是否开始计时。
	  };
	  this.beginTiming = this.beginTiming.bind(this);
	  this.cancelTiming = this.cancelTiming.bind(this);
	}
	render() {
		return (
			 <article id="timeWarp">
	            <section style={{display:this.state.isTiming?'none':'block'}} id="round" className="fly-round" ref='fly-round'> 
	            	<div className='fly-line'></div>
	            	<div className='fly-time-unit-C'>
                		<span>小时</span>
                		<span>分钟</span>
                	</div>
                	<div className='fly-line1'></div>
	                <section className="roundWrap" ref='roundWrap'>
	                	
	                </section>
	                <section className="roundWrap roundWrap1" ref='roundWrap1'>

	                </section>
	               	<div className='fly-begin-clock' onTouchStart={this.beginTiming}>开始</div>
	            </section>
	            <section className='fly-countdown-canvas' ref='fly-countdown-canvas' style={{display:this.state.isTiming?'block':'none'}}>
	            	<canvas ref='canvas'></canvas>
	            	<div className='fly-cancel' onTouchStart={this.cancelTiming}>取消</div>
	            </section>
       		 </article>
		);
	}
	componentDidMount() {
		this.setLayout();
		this.bindScroll();
		
	}
	cancelTiming(){
		this.timer = 1;//取消倒计时。
		this.iNow = 60;
		this.setState({
			isTiming:false
		});
		let {obserable} = this.props;
		obserable.trigger({type:'controlCanavsDisplay',data:false});
	}

	initCanvas(){//初始化canvas
		let docWidth = window.innerWidth;
		let {obserable} = this.props;
		this.timer = null;
		this.iNow = 0;
		setTimeout(()=>{
			const canvas = this.refs['canvas'];
			const canvas1 = obserable.trigger({type:'getTopCountdownCanvas'})
			let width = this.refs['fly-countdown-canvas'].offsetWidth ;
			canvas.width =width / 1.5;
			canvas.height = width /3.3/2;
			canvas1.width =width / 1.5;
			canvas1.height = width /3.3/2;
			let timing = new Time({
				canvas:canvas,
				obserable:obserable,
				isTime:false,
				r:3*docWidth/3840
			});

			let timing1 = new Time({
				canvas:canvas1,
				obserable:obserable,
				isTime:false,
				r:3*docWidth/3840
			});
			timing.initTiming([this.state.hours,this.mins/10|0,this.mins%10,0,0]);
			timing1.initTiming([this.state.hours,this.mins/10|0,this.mins%10,0,0]);
			
 			obserable.on('timingdown',()=>{
 				if(this.state.timing <= 0){//定时小于等于0
 					this.timer = 1;
 				}
 				if(!this.timer){
 					this.iNow--;
	 				let st = 0; 
					let so = 0;
					let mt = 0;
					let mo = 0;
					let mh = 0;

	 				if(this.iNow <= 0){


	 					if(this.state.hours<=0 && this.state.mins <= 0 && this.iNow <=0){
 							console.log('倒计时结束');
 							this.timer = 1;
	 					}
	 					else{

	 						this.state.mins--;
		 					if(this.state.mins<=0){
		 						if(this.state.housr>0){
		 							this.state.mins = 59;
		 							this.state.hours--;	
		 						}
	 						}
	 						this.iNow = 59;
	 						
	 					}
	 				}

	 				 st = this.iNow / 10 | 0;
	 				 so = this.iNow % 10;
	 				 mt = this.state.mins / 10 | 0;  //w分钟的十位数
	 				 mo = this.state.mins % 10; //分钟的个位
	 				 mh = this.state.hours;
	 				 

					timing.initTiming([mh,mt,mo,st,so]);
					timing1.initTiming([mh,mt,mo,st,so]);
 				}
 			});
		},1);
	}

	beginTiming(){//开始记时
		//alert(this.hours+'===' + this.mins)
		let {obserable} = this.props;
		this.setState({
			timing:this.hours*60+this.mins,
			hours:this.hours,
			mins:this.mins,
			isTiming:true
		},()=>{
			this.initCanvas();
			obserable.trigger({type:'controlCanavsDisplay',data:true});
		});	

	}

	bindScroll(){

		this.hours = 0;
		this.mins = 0;

		let size = 120,
			roundWrap1 = this.refs['roundWrap1'],
			roundWrap = this.refs['roundWrap'],
			round =  roundWrap.querySelector('.round'),
			round1 =  roundWrap1.querySelector('.round');

		roundWrap1.querySelector('.mins-1').style.opacity = .5;
	 	roundWrap1.querySelector('.mins-59').style.opacity = .5;

	 	roundWrap1.querySelector('.mins-2').style.opacity = .3;
	 	roundWrap1.querySelector('.mins-58').style.opacity = .3;
	 	roundWrap1.querySelector('.mins-57').style.opacity = .1;
	 	roundWrap1.querySelector('.mins-3').style.opacity = .1;

	 	roundWrap.querySelector('.hours-1').style.opacity = .5;
	 	roundWrap.querySelector('.hours-59').style.opacity = .5;

	 	roundWrap.querySelector('.hours-2').style.opacity = .3;
	 	roundWrap.querySelector('.hours-58').style.opacity = .3;
	 	roundWrap.querySelector('.hours-57').style.opacity = .1;
	 	roundWrap.querySelector('.hours-3').style.opacity = .1;



		this.rotateY1  = 348;
		this.rotateY  = 348;
		$(roundWrap).on('touchstart',e=>{
			var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			let startY = e.pageY;
			this.rotateY = this.rotateY |0;
			$(document).on('touchmove',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				let lastY = e.pageY;
				this.rotateY = this.rotateY + (startY - lastY)/size;
				let t = this.rotateY;
					t = t > 360 ? t-360 : t;
				let t1 =t|0;

				t1 = t1 > 360 ? t1-360 : t1;
				//t1= t1 < 0 ? 360+t1 :t1;
				/*if( t1 % 6 > 3){
					t1 += 6 - t1 % 6;
					console.log((t1+12)/6%60+' ---->3');
				}else{
					t1 -= t1 % 6;
				}*/

				t1 -= t1 % 6;

				let spans = roundWrap.querySelectorAll('span');
				for(var  i = 0; i < spans.length; i++){
					spans[i].style.opacity = 0;
				}

			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6)%60).style.opacity = 1;
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6-1)%60).style.opacity = .5;
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6+1)%60).style.opacity = .5;

			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6-2)%60).style.opacity = .3;
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6+2)%60).style.opacity = .3;

			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6-3)%60) && (roundWrap.querySelector('.hours-'+((t1 + 12) / 6-3)%60).style.opacity = .1);
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6+3)%60) && (roundWrap.querySelector('.hours-'+((t1 + 12) / 6+3)%60).style.opacity = .1);

			 	
			 	/*
			 	for(var i = 3;i<4;i++){

			 		roundWrap.querySelector('.mins-'+((t1 + 12) / 6+i)).style.opacity = .1;
			 		roundWrap.querySelector('.mins-'+((t1 + 12) / 6-i)).style.opacity = .1;
			 	}*/
				round.style.WebkitTransform = 'rotateX('+t+'deg)';
			});
			$(document).on('touchend',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				let lastY = e.pageY;
				this.rotateY = this.rotateY + ( startY - lastY) / size;
				let t = this.rotateY| 0;
				t = t > 360 ? t-360 : t;

				t= t < 0 ? 360+t :t;
				if(t%6>3){
					t += 6 - t % 6;
				}else{
					t -= t % 6;
				}

				let t1=t;
				

				roundWrap.querySelector('.hours-'+((t1 + 12) / 6)%60).style.opacity = 1;
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6-1)%60).style.opacity = .5;
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6+1)%60).style.opacity = .5;

			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6-2)%60).style.opacity = .3;
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6+2)%60).style.opacity = .3;

			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6-3)%60) && (roundWrap.querySelector('.hours-'+((t1 + 12) / 6-3)%60).style.opacity = .1);
			 	roundWrap.querySelector('.hours-'+((t1 + 12) / 6+3)%60) && (roundWrap.querySelector('.hours-'+((t1 + 12) / 6+3)%60).style.opacity = .1);
				round.style.WebkitTransform = 'rotateX('+t+'deg)';
				this.hours = (t1 + 12) / 6 % 60 % 10;
				
				$(document).off('touchmove touchend');
			});			

		});


		$(roundWrap1).on('touchstart',e=>{
			var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			let startY = e.pageY;
			this.rotateY1 = this.rotateY1 |0;
			$(document).on('touchmove',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				let lastY = e.pageY;
				this.rotateY1 = this.rotateY1 + (startY - lastY)/size;
				let t = this.rotateY1;
					t = t > 360 ? t-360 : t;
				let t1 =t|0;

				t1 = t1 > 360 ? t1-360 : t1;
				//t1= t1 < 0 ? 360+t1 :t1;
				/*if( t1 % 6 > 3){
					t1 += 6 - t1 % 6;
					console.log((t1+12)/6%60+' ---->3');
				}else{
					t1 -= t1 % 6;
				}*/

				t1 -= t1 % 6;

				let spans = roundWrap1.querySelectorAll('span');
				for(var  i = 0; i < spans.length; i++){
					spans[i].style.opacity = 0;
				}



			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6)%60).style.opacity = 1;
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-1)%60).style.opacity = .5;
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+1)%60).style.opacity = .5;

			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-2)%60).style.opacity = .3;
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+2)%60).style.opacity = .3;

			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-3)%60) && (roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-3)%60).style.opacity = .1);
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+3)%60) && (roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+3)%60).style.opacity = .1);

			 
			 	/*
			 	for(var i = 3;i<4;i++){

			 		roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+i)).style.opacity = .1;
			 		roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-i)).style.opacity = .1;
			 	}*/
				round1.style.WebkitTransform = 'rotateX('+t+'deg)';
			});
			$(document).on('touchend',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				let lastY = e.pageY;
				this.rotateY1 = this.rotateY1 + ( startY - lastY) / size;
				let t = this.rotateY1| 0;
				t = t > 360 ? t-360 : t;

				t= t < 0 ? 360+t :t;
				if(t%6>3){
					t += 6 - t % 6;
				}else{
					t -= t % 6;
				}

				let t1=t;
				

				roundWrap1.querySelector('.mins-'+((t1 + 12) / 6)%60).style.opacity = 1;
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-1)%60).style.opacity = .5;
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+1)%60).style.opacity = .5;

			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-2)%60).style.opacity = .3;
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+2)%60).style.opacity = .3;

			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-3)%60) && (roundWrap1.querySelector('.mins-'+((t1 + 12) / 6-3)%60).style.opacity = .1);
			 	roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+3)%60) && (roundWrap1.querySelector('.mins-'+((t1 + 12) / 6+3)%60).style.opacity = .1);
				round1.style.WebkitTransform = 'rotateX('+t+'deg)';
				this.mins = (t1 + 12) / 6 % 60;
				$(document).off('touchmove touchend');
			});
		});
	}

	toTime(){

		//sTime.innerHTML=""+arrNow[0]+arrNow[1]+":"+arrNow[2]+arrNow[3];

	}

	toDB(nub){
		return nub < 10 ? "0" + nub : "" + nub;
	}

	setLayout(){
		var rounds = this.refs['roundWrap'],
			rounds1 = this.refs['roundWrap1'];
		let roundsArr =[rounds,rounds1];

		for(var i = 0; i< roundsArr.length;i++){

			var str="";
			for(var j=0; j<=59; j++){
				if(i===0){

					str =  "<div><span class='hours-"+(59-j)+"'>"+((59-j)%10)+"</span>"+str+"</div>";	
				}
				else{

					str =  "<div><span class='mins-"+(59-j)+"'>"+(59-j)+"</span>"+str+"</div>";
				}
				
			}
			str="<div class='round' style='-webkit-transform:rotateX(348deg)'>"+str+"</div>";
			roundsArr[i].innerHTML+=str;
		}

	}
}

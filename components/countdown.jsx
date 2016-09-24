import React, { Component } from 'react';
import './css/countdown.css';
import   '../libs/touchScroll.js';
import $ from 'jquery';



export default class FlyCountdown extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		return (
			 <article id="timeWarp">
	            <section id="round" className="fly-round">
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
	                <div id="mask"></div>
	            </section>
       		 </article>
		);
	}
	componentDidMount() {
		this.setLayout();
		this.bindScroll();
	}

	bindScroll(){


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

					str =  "<div><span class='hours-"+(59-j)+"'>"+((59-j)%11)+"</span>"+str+"</div>";	
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

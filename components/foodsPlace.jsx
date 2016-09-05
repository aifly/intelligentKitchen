import React, { Component } from 'react';
import './css/foodsplace.css';
import $ from 'jquery';

export default class FlyFoodsPlace extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	plates:[
	  		
	  	],
	  	plateDemoStyle:{
	  		left:"80%",
	  		top:0
	  	}
	  };
	  this.onTouchStart = this.onTouchStart.bind(this);
	}
	getUid(){
   	   var s = [];
	    var hexDigits = "0123456789abcdef";
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    s[8] = s[13] = s[18] = s[23] = "-";
	 
	    var uuid = s.join("");
	    return uuid;
	}
	render() {
		return (
			<li className='fly-operator-item fly-plate-C' ref='fly-plate-C'>
				<div className='fly-plate-demo' ref='fly-plate-demo' style={this.state.plateDemoStyle} ></div>
				{this.state.plates.map((item,i)=>{
					return <div key={i}  style={{left:this.state.plates[i].left,top:this.state.plates[i].top}} className='fly-plate-item'></div>
				})}
			</li>
		);
	}
	componentDidMount() {

		 

		var target = this.refs['fly-plate-demo'];
		target.addEventListener('touchstart', e=>{
			var e = e.changedTouches[0];

			 var disX = e.pageX - target.offsetLeft ,
				 disY = e.pageY - target.offsetTop ;

			 this.state.plates.push({
				left:this.state.plateDemoStyle.left,
				top:this.state.plateDemoStyle.top
			});
			this.forceUpdate();
			
			
			$(document).on('touchmove',e=>{
				var e =	e.originalEvent.changedTouches[0];
				let index = this.state.plates.length-1;
				this.state.plates[index].left = e.pageX - disX;
				this.state.plates[index].top = e.pageY - disY;
				this.forceUpdate();

			}).on('touchend',e=>{
				var e =	e.originalEvent.changedTouches[0];
				$(document).off('touchend touchmove');
				if(e.pageX - disX + target.offsetWidth >= this.refs['fly-plate-C'].offsetWidth){
					this.state.plates.pop();
					this.forceUpdate();
				}
			});
			 
		},false);


		$(this.refs['fly-plate-C']).on('touchstart',e=>{
			if(!e.target.classList.contains('fly-plate-item')){
				return;
			}
			let target = e.target;
			var e = e.changedTouches[0];
			let index = this.index(document.querySelectorAll('.fly-plate-item'),target);
			 var disX = e.pageX - target.offsetLeft ,
				 disY = e.pageY - target.offsetTop ;

			$(document).on('touchmove',e=>{
				var e =	e.originalEvent.changedTouches[0];
				this.state.plates[index].left = e.pageX - disX;
				this.state.plates[index].top = e.pageY - disY;
				this.forceUpdate();
			}).on('touchend',e=>{
				$(document).off('touchmove touchend');
			});
		});

	}
	index(source,target){
		var index = -1;
		for(var i = 0,len = source.length;i<len;i++){
			if(target === source[i]){
				index = i;

			}
		}
		return index;
	}
	onTouchStart(e){
		let s = this;
		var e = e.nativeEvent.changedTouches[0];
		document.addEventListener('touchmove', this.removeHandler);
		document.addEventListener('touchend', this.endHanlder);
		/*this.state.plates.push({
			name:s.getUid()
		});
		this.forceUpdate();*/
		
	    this.disX = e.pageX - e.target.offsetLeft - this.refs['fly-plate-C'].offsetLeft;
		this.disY = e.pageY - e.target.offsetTop - this.refs['fly-plate-C'].offsetTop;

		

	}
 	moveHandler(e){
 		console.log(1)
		var e = e.changedTouches[0];
						
	}
	endHanlder(e){
		var e = e.changedTouches[0];

		document.removeEventListener('touchmove',this.moveHanlder);
		document.removeEventListener('touchend',this.endHanlder);
	}
	

}

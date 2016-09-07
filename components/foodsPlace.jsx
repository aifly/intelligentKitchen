import React, { Component } from 'react';
import './css/foodsplace.css';
import $ from 'jquery';

export default class FlyFoodsPlace extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	plates:[
	  		
	  	],
	  	trashClass:'',
	  	plateDemoStyle:{
	  		left:"94%",
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
				
				{/*垃圾桶图标实现*/}
				<div ref='fly-draw-trash-C' className={this.state.trashClass+' fly-draw-trash-C'} >
					<div className='trash-header'></div>
					<div className='trash-header-bar'></div>
					<div className='trash-body'>

					</div>
					<div className='trash-line'></div>
					<div className='trash-line1'></div>
					<div className='trash-line2'></div>
				</div>
				<div className='fly-broken-plate' ref='fly-broken-plate'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
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
				var x = e.pageX - disX;
				var y = e.pageY - disY;
				x < 0 && (x = 0);
				y < 0 && (y = 0);
				this.state.plates[index].left = x;
				this.state.plates[index].top = y;
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


		//拖拽盘子。

		let data = {
			viewHeight : document.documentElement.clientHeight,
			viewWidth  : document.documentElement.clientWidth
		}

		$(this.refs['fly-plate-C']).on('touchstart',e=>{
			if(!e.target.classList.contains('fly-plate-item')){
				return;
			}
			this.plateWidth = this.plateWidth || e.target.offsetWidth;
			this.maxX = this.maxX || this.refs['fly-plate-C'].offsetWidth - this.plateWidth - 30;
			this.maxY = this.maxY || this.refs['fly-plate-C'].offsetHeight - this.plateWidth - 30;

			
			let target = e.target;
			var e = e.changedTouches[0];
			let index = this.index(document.querySelectorAll('.fly-plate-item'),target);
			 var disX = e.pageX - target.offsetLeft ,
				 disY = e.pageY - target.offsetTop ;

			this.setState({
				trashClass:'active'
			});

			this.trashWidth = this.trashWidth|| this.refs['fly-draw-trash-C'].offsetWidth / 2;
			this.trashHeight =this.trashHeight || this.refs['fly-draw-trash-C'].offsetHeight / 2;


			$(document).on('touchmove',e=>{
				var e =	e.originalEvent.changedTouches[0];
				let x = e.pageX - disX,
					y = e.pageY - disY;
				x < 0 && (x = 0);
				y < 0 && (y = 0);
				x > this.maxX && (x = this.maxX);
				y > this.maxY && (y = this.maxY);
				this.state.plates[index].left = x;
				this.state.plates[index].top = y;
				if(e.pageX > data.viewWidth - this.trashWidth
					&& e.pageY > data.viewHeight - this.trashHeight
					){
					if(this.state.trashClass.indexOf('begin-trashed') <= -1){
						this.state.trashClass = this.state.trashClass + ' begin-trashed'

						this.refs['fly-plate-C'].querySelectorAll('.fly-plate-item')[index].classList.add('will-delete');

					}

				}
				else{
					if(this.state.trashClass.indexOf('begin-trashed') > -1){
						 let classList = this.state.trashClass.split(' ');
						 classList.pop();
 						 this.state.trashClass = classList.join(' ');
 						this.refs['fly-plate-C'].querySelectorAll('.fly-plate-item')[index].classList.remove('will-delete');
					}
 						
				}
				this.forceUpdate();
			}).on('touchend',e=>{

				$(document).off('touchmove touchend');
				var e =	e.originalEvent.changedTouches[0];

				if(e.pageX > data.viewWidth - this.trashWidth
					&& e.pageY > data.viewHeight - this.trashHeight
					){ //开始删除操作。
					//todo


					this.refs['fly-plate-C'].querySelectorAll('.fly-plate-item')[index].classList.add('delete');
					this.refs['fly-broken-plate'].classList.add('active');

					/*
					Array.from(this.refs['fly-plate-C'].querySelectorAll('.fly-plate-item')).forEach(item=>{
							item.classList.remove('will-delete');
							item.classList.remove('delete');
					});*/
					
					setTimeout(()=>{

						////this.state.plates.splice(index,1);
						this.state.trashClass = '';
						this.forceUpdate();
						this.refs['fly-broken-plate'].classList.remove('active');

					},400);	
				}
				else{
					setTimeout(()=>{
						this.setState({
							trashClass:''
						});

					},100);	
				}

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

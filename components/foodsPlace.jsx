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
	  		left:1235,
	  		top:0,
	  		background:'url(./assets/images/plat.png) no-repeat center center',
	  		backgroundSize:'contain'
	  	},
	  	plateSMStyle:{
	  		left:'95%',
	  		top:'10vw',
	  		background:'url(./assets/images/plat.png) no-repeat center center',
	  		backgroundSize:'contain'
	  	}
	  };
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
			<li className='fly-operator-item fly-plate-C' ref='fly-plate-C' onTouchTap={this.removePlat.bind(this)}>
				<div className='fly-plate-demo' ref='fly-plate-demo' style={this.state.plateDemoStyle} ></div>
				<div className='fly-plate-demo fly-plate-sm' ref='fly-plate-sm' style={this.state.plateSMStyle} ></div>
				
				<ol className='fly-grid-C' ref='fly-grid-C'>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
					<li className='fly-grid'></li>
				</ol>

				{this.state.plates.map((item,i)=>{
					return <div key={i}  style={{transform:'translate3d('+this.state.plates[i].left+'px,'+this.state.plates[i].top+'px,0) scale('+(this.state.plates[i].className?.7:1)+')',background:'url(./assets/images/plat.png) no-repeat center center',
	  		backgroundSize:'contain'}} className={'fly-plate-item '+ this.state.plates[i].className}></div>
				})}
				
				{/*垃圾桶图标实现*/}
				{/*<div ref='fly-draw-trash-C' className={this.state.trashClass+' fly-draw-trash-C'} >
					<div className="trash-hat hat" ref='trash-hat'>
						<div className='trash-header'></div>
						<div className='trash-header-bar'></div>
					</div>
					<div className='trash-body'>

					</div>
					<div className='trash-line'></div>
					<div className='trash-line1'></div>
					<div className='trash-line2'></div>
				</div>*/}
			{/*	<div className='fly-broken-plate' ref='fly-broken-plate'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>*/}
			</li>
		);
	}

	removePlat(e){//移除盘子
		var target= e.target;
		target.classList.add('delete');
		--this.plateNum;
		this.plateNum<=0 &&(this.plateNum=0);
		
	}
	getDis(x1,y1,x2,y2){
		const m =  Math;
		return m.sqrt(m.pow((x1-x2),2)+m.pow((y1-y2),2));
	}

	dragPlate(target,gridsPos,flag=true){


		target.addEventListener('touchstart', e=>{

		
			var e = e.changedTouches[0];

			 var disX = e.pageX - target.offsetLeft ,
				 disY = e.pageY - target.offsetTop ;

			 this.state.plates.push({
				left:this.state.plateDemoStyle.left,
				top:this.state.plateDemoStyle.top,
				className:target.classList.contains('fly-plate-sm')?'sm':''
			});
			;
			++this.plateNum;
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
				/*if(e.pageX - disX + target.offsetWidth >= this.refs['fly-plate-C'].offsetWidth){
					--this.plateNum;
					this.plateNum<=0 &&(this.plateNum=0);
				}
				else{
					
				}*/


				if(this.plateNum>9){
					this.state.plates.pop();
					this.forceUpdate();
					--this.plateNum;
					return
				}
				var s = this;
				if(flag){

					if(this.worker && 0){
/*
							this.worker.postMessage({x1:e.pageX-this.refs['fly-plate-C'].offsetLeft,y1:e.pageY-this.refs['fly-plate-C'].offsetTop,x2:gridsPos[0].x,y2:gridsPos[0].y});
					
							this.worker.onmessage = function(event){
								var  minDis = event.data;
								var cIndex  = 0;
								gridsPos.forEach((grid,i)=>{
									if(i>0){
										var work = new Worker('../libs/worker.js');

										work.postMessage({x1:e.pageX-s.refs['fly-plate-C'].offsetLeft,y1:e.pageY-s.refs['fly-plate-C'].offsetTop,x2:grid.x,y2:grid.y});
										work.onmessage = events =>{
												var currentDis = events.data;	
												if(minDis > currentDis){
													minDis = currentDis;
													cIndex = i;

												}
										}
										//let currentDis = s.getDis(e.pageX-s.refs['fly-plate-C'].offsetLeft,e.pageY-s.refs['fly-plate-C'].offsetTop,grid.x,grid.y);
									}
								});
								setTimeout(()=>{
										s.state.plates[s.state.plates.length-1].left = gridsPos[cIndex].x - gridsPos[cIndex].halfW;
											s.state.plates[s.state.plates.length-1].top = gridsPos[cIndex].y - gridsPos[cIndex].halfH*10/7;
											s.forceUpdate();
								},100);
							}
*/
					
						//	let minDis = this.getDis(e.pageX-this.refs['fly-plate-C'].offsetLeft,e.pageY-this.refs['fly-plate-C'].offsetTop,gridsPos[0].x,gridsPos[0].y),
								
					}
					else{

							let minDis = this.getDis(e.pageX-this.refs['fly-plate-C'].offsetLeft,e.pageY-this.refs['fly-plate-C'].offsetTop,gridsPos[0].x,gridsPos[0].y);
								var cIndex  = 0;

								gridsPos.forEach((grid,i)=>{
									if(i>0){
										
										let currentDis = this.getDis(e.pageX-this.refs['fly-plate-C'].offsetLeft,e.pageY-this.refs['fly-plate-C'].offsetTop,grid.x,grid.y);
										
										if(minDis > currentDis){
											minDis = currentDis;
											cIndex = i;
										}

									}
								});

						this.state.plates[this.state.plates.length-1].left = gridsPos[cIndex].x - gridsPos[cIndex].halfW;
						this.state.plates[this.state.plates.length-1].top = gridsPos[cIndex].y - gridsPos[cIndex].halfH*10/7;
						this.forceUpdate();
					}

					

				
				}
			});
			 
		},false);
	}

	componentDidMount() {
		this.plateNum = 0;
		let data = {
			viewHeight : document.documentElement.clientHeight,
			viewWidth  : document.documentElement.clientWidth
		}
		if(typeof Worker === 'function' && 0){
			this.worker = new Worker('../libs/worker.js');
			
		}
		 let {obserable} = this.props;
		 obserable.on('clearPlates',()=>{
		 	this.setState({
		 		plates:[]
		 	});
		 });


		 let grids = this.refs['fly-grid-C'].querySelectorAll('.fly-grid'),
		 	gridsPos = [];

		 setTimeout(()=>{
			 for(var i = 0,len = grids.length ; i < len; i++){
			 	
			 	gridsPos.push({
			 		x:grids[i].offsetWidth / 2 + grids[i].offsetLeft,
			 		y:grids[i].offsetHeight / 2 + grids[i].offsetTop,
			 		halfW:(grids[i].offsetWidth ) / 2,
			 		halfH : (grids[i].offsetHeight)/ 2
			 	});
			 }

		},1);


		var target = this.refs['fly-plate-demo'],
			target1 = this.refs['fly-plate-sm'];
		this.dragPlate(target,gridsPos,false);
		this.dragPlate(target1,gridsPos);



		//拖拽盘子。

		var targetWidth = 1306;

		$(this.refs['fly-plate-C']).on('touchstart',e=>{
			if(!e.target.classList.contains('fly-plate-item')){
				return;
			}
			
			let target = e.target;
			this.plateWidth = this.plateWidth || e.target.offsetWidth;
			var plate = this.refs['fly-plate-C'];
			this.maxX = this.maxX || plate.offsetWidth - this.plateWidth - 30;
			this.maxY = this.maxY || plate.offsetHeight - this.plateWidth - 30;

			
			
			var e = e.changedTouches[0];
			let index = this.index(document.querySelectorAll('.fly-plate-item'),target);
			var startX = this.state.plates[index].left,
				startY = this.state.plates[index].top;
			 var disX = e.pageX - startX ,
				 disY = e.pageY - startY;


		/*	this.trashWidth = this.trashWidth|| this.refs['fly-draw-trash-C'].offsetWidth / 2;
			this.trashHeight =this.trashHeight || this.refs['fly-draw-trash-C'].offsetHeight / 2;
*/
			var isSm = target.classList.contains('sm');
			$(document).on('touchmove',e=>{
				var e =	e.originalEvent.changedTouches[0];
				let x = e.pageX - disX,
					y = e.pageY - disY;
				x < 0  && (x = 0);
				y < 0 && (y = 0);
				x > this.maxX && (x = this.maxX);
				y > this.maxY && (y = this.maxY);

				this.state.plates[index].left = x;
				this.state.plates[index].top = y;
				this.forceUpdate();

			}).on('touchend',e=>{

				$(document).off('touchmove touchend');
				var e =	e.originalEvent.changedTouches[0];
				 if(isSm){
				 	var plate = this.refs['fly-plate-C'];
				 	var s = this;
				 	if(typeof Worker === 'function' && 0){
				 		
				 	}
				 	else{
						 let minDis = this.getDis(e.pageX-plate.offsetLeft,e.pageY-plate.offsetTop,gridsPos[0].x,gridsPos[0].y),
								cIndex  = 0;
				 	

							gridsPos.forEach((grid,i)=>{
								if(i>0){
									let currentDis = this.getDis(e.pageX-plate.offsetLeft,e.pageY-plate.offsetTop,grid.x,grid.y);
									
									if(minDis > currentDis){
										minDis = currentDis;
										cIndex = i;
									}
								}
							});

							this.state.plates[index].left = gridsPos[cIndex].x - gridsPos[cIndex].halfW;
							this.state.plates[index].top = gridsPos[cIndex].y - gridsPos[cIndex].halfH*10/7;
							this.forceUpdate();
						 }
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


	

}

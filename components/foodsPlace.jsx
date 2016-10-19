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
					return <div key={i}  style={{left:this.state.plates[i].left,top:this.state.plates[i].top,background:'url(./assets/images/plat.png) no-repeat center center',
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
				<div className='fly-broken-plate' ref='fly-broken-plate'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</li>
		);
	}

	removePlat(e){//移除盘子
		var target= e.target;
		if(target.classList.contains('fly-plate-item')){
			target.classList.add('delete');
		};
	}
	getDis(x1,y1,x2,y2){
		const m =  Math;
		return m.sqrt(m.pow((x1-x2),2)+m.pow((y1-y2),2));
	}

	dragPlate(target,gridsPos){
		target.addEventListener('touchstart', e=>{
			var e = e.changedTouches[0];

			 var disX = e.pageX - target.offsetLeft ,
				 disY = e.pageY - target.offsetTop ;

			 this.state.plates.push({
				left:this.state.plateDemoStyle.left,
				top:this.state.plateDemoStyle.top,
				className:target.classList.contains('fly-plate-sm')?'sm':''
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
				else{
					let minDis = this.getDis(e.pageX-this.refs['fly-plate-C'].offsetLeft,e.pageY-this.refs['fly-plate-C'].offsetTop,gridsPos[0].x,gridsPos[0].y),
							cIndex  = 0;

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
					this.state.plates[this.state.plates.length-1].top = gridsPos[cIndex].y - gridsPos[cIndex].halfH;
					this.forceUpdate();
				}
			});
			 
		},false);
	}

	componentDidMount() {

		let data = {
			viewHeight : document.documentElement.clientHeight,
			viewWidth  : document.documentElement.clientWidth
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
		this.dragPlate(target,gridsPos);
		this.dragPlate(target1,gridsPos);



		//拖拽盘子。

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


		/*	this.trashWidth = this.trashWidth|| this.refs['fly-draw-trash-C'].offsetWidth / 2;
			this.trashHeight =this.trashHeight || this.refs['fly-draw-trash-C'].offsetHeight / 2;
*/

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
				//target.style.WebkitTransform = 'translate3d('+x+'px,'+y+'px,0)';
				/*if(e.pageX > data.viewWidth - this.trashWidth
					&& e.pageY > data.viewHeight - this.trashHeight
					){
					if(this.state.trashClass.indexOf('begin-trashed') <= -1){
						//this.state.trashClass = this.state.trashClass + ' begin-trashed'

						//this.refs['fly-plate-C'].querySelectorAll('.fly-plate-item')[index].classList.add('will-delete');

					}

				}
				else{
					if(this.state.trashClass.indexOf('begin-trashed') > -1){
						 //let classList = this.state.trashClass.split(' ');
						 //classList.pop();
 						 //this.state.trashClass = classList.join(' ');
 						 //this.refs['fly-plate-C'].querySelectorAll('.fly-plate-item')[index].classList.remove('will-delete');
					}
 						
				}*/
				this.forceUpdate();
			}).on('touchend',e=>{

				$(document).off('touchmove touchend');
				var e =	e.originalEvent.changedTouches[0];
				
				 let minDis = this.getDis(e.pageX-this.refs['fly-plate-C'].offsetLeft,e.pageY-this.refs['fly-plate-C'].offsetTop,gridsPos[0].x,gridsPos[0].y),
							cIndex  = 0;

				gridsPos.forEach((grid,i)=>{
					if(i>0){
						let currentDis = this.getDis(e.pageX-this.refs['fly-plate-C'].offsetLeft,e.pageY-this.refs['fly-plate-C'].offsetTop,grid.x,grid.y);
						
						if(minDis > currentDis){
							minDis = currentDis;
							cIndex = i;
						}
					}
				});
				this.state.plates[index].left = gridsPos[cIndex].x - gridsPos[cIndex].halfW;
				this.state.plates[index].top = gridsPos[cIndex].y - gridsPos[cIndex].halfH;
				this.forceUpdate();
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

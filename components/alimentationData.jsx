import React, { Component } from 'react';
import $ from 'jquery';
import IScroll from 'iscroll';

import {Sector} from '../libs/sector';

import './css/alimentationdata.css';

import { PublicShadow } from './public-shadow.jsx';

 class FlyAlimentationData extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	liWidth:0,
	  	 alimentatonData : {
	  	 	materials:[
	  	 		
	  	 	],
	  	 	colors : ['#f3e5dc','#f1e0d6'],
	  	 	currentFoodData:[
	  	 		{
	  	 			unit:'g',
	  	 			weight:'60',
	  	 			scale:.89,
	  	 			name:'热量'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'40',
	  	 			scale:.88,
	  	 			name:'蛋白质'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'29',
	  	 			scale:.80,
	  	 			name:'脂肪'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'24',
	  	 			scale:.69,
	  	 			name:'碳水化合物'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'30',
	  	 			scale:.58,
	  	 			name:'膳食纤维'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'36',
	  	 			scale:.65,
	  	 			name:'微量元素'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'20',
	  	 			scale:.83,
	  	 			name:'维生素'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'20',
	  	 			scale:.7,
	  	 			name:'其它'
	  	 		}
	  	 	],
	  	 	scaleData:[
	  	 		{
	  	 			unit:'g',
	  	 			weight:'60',
	  	 			scale:.11,
	  	 			name:'热量'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'40',
	  	 			scale:.14,
	  	 			name:'蛋白质'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'29',
	  	 			scale:.12,
	  	 			name:'脂肪'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'24',
	  	 			scale:.14,
	  	 			name:'碳水化合物'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'30',
	  	 			scale:.11,
	  	 			name:'膳食纤维'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'36',
	  	 			scale:.12,
	  	 			name:'微量元素'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'20',
	  	 			scale:.16,
	  	 			name:'维生素'
	  	 		},{
	  	 			unit:'g',
	  	 			weight:'20',
	  	 			scale:.1,
	  	 			name:'其它'
	  	 		}
	  	 	]

	  	 }
	  };

	  this.checkMaterial = this.checkMaterial.bind(this);
	}


	render() {
		return (
			<li className='fly-operator-item fly-alimentation-data' ref='fly-operator-item'>
				<div ref='fly-data-C' className='fly-data-C'>
					<canvas  id='alimentation-canvas'></canvas>
				</div>

				<div className='fly-all' style={{display:this.state.alimentatonData.materials.length ? 'block':'none'}}>显示全部</div>
				<div className='fly-m-name' ref='fly-m-name'>
					<ul ref='fly-m-scroll' onTouchTap={this.checkMaterial} style={{width:this.state.alimentatonData.materials.length*this.state.liWidth}}>
						{this.state.alimentatonData.materials.map((item,i)=>{
							return (
								<li className={i===0 ? 'active':''} key={i}>{item.name}</li>
							);
						})}
					</ul>
				</div>
				<div className='fly-circle' id='fly-circle'></div>
				<div className='fly-circle-center' id='fly-circle-center'></div>

			</li>
		);
	}


	checkMaterial(e){
		this.props.shadow(e.target);
		

		Array.from(this.refs['fly-m-scroll'].querySelectorAll('li')).forEach((item)=>{
			item.classList.remove('active');
		});
		e.target.classList.add('active');
	}

	setSize(){
		let canvas=  document.getElementById('alimentation-canvas');
		canvas.width = this.refs['fly-data-C'].offsetWidth;
		canvas.height = this.refs['fly-data-C'].offsetHeight;
		this.canvas = canvas;
		this.stage = new createjs.Stage(canvas);
	}

	drawLine(x,y,r,len,rotation){
		let line2 = new createjs.Shape();
		line2.graphics.setStrokeStyle(2).beginStroke('#fff').moveTo(x-r-len,y).lineTo(x+r+len,y);
		line2.rotation = rotation;
		line2.regX = x;
		line2.regY = y;
		line2.x = x;
		line2.y = y;

		return line2;
	}

	drawCorner(){//绘制对角线。
		
		let container = new createjs.Container();
		
		let x = this.canvas.width/2,
			y = this.canvas.height/2,
			r = 300,
			len = 40;

		let domCircle = document.getElementById("fly-circle-center");
		domCircle.style.width = r*2 +'px';
		domCircle.style.height = r*2 +'px';
		let circle = new createjs.DOMElement(domCircle);
		circle.x= x -r;
		circle.y = y -r ;

		//circle.graphics.beginStroke('#fff').drawCircle(x,y,r);
		
		container.addChild(this.drawLine(x,y,r,len,0),this.drawLine(x,y,r,len,90),this.drawLine(x,y,r,len,45),this.drawLine(x,y,r,len,-45),circle);

		this.stage.addChild(container);

		return r;


	}
	
	drawCircle(r){

		let domBall = document.getElementById('fly-circle');
		let dom = new createjs.DOMElement(domBall);
		let ballWidth = domBall.offsetWidth,
			ballHeight = domBall.offsetHeight;
		this.stage.addChild(dom);
		dom.x = this.canvas.width/2 - ballWidth/2;
		dom.y = this.canvas.height/2-r - ballHeight/2;
		dom.r = r;
		dom.domBall= domBall;
		dom.ballWidth = ballWidth;
		dom.ballHeight = ballHeight;
		dom.centerX = this.canvas.width/2;
		dom.centerY = this.canvas.height/2;

		this.ball = dom;
	}

	ballCircularMotion(ball){//小球做圆周运动
		this.iNow = this.iNow===undefined? 180 : this.iNow;
		
		if((this.iNow+180)%45 === 0 ){
			var index =8-(this.iNow+180)/45|0;
			index === 8 && (index = 0);
			let textArr = [];
			this.allDataContainer.children.forEach(item=>{
				if(item.color){
					textArr.push(item);
				}
			});
			textArr[index-1<0?7:index-1].color ='#fff';
			textArr[index-1<0?7:index-1].font ="38px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif";
			textArr[index].font ="46px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif";
			textArr[index].color='#f90';

		}


		ball.x =ball.centerX - ball.ballWidth/2 + ball.r * Math.sin(this.iNow/180*Math.PI);
		ball.y =ball.centerY - ball.ballHeight/2 + ball.r * Math.cos(this.iNow/180*Math.PI);

		this.iNow -=.5;
		if(this.iNow<-180){
			this.iNow = 180;

		}


		
	}

	componentDidMount() {



		setTimeout(()=>{

			this.setSize();

			let colors =  ['#f3e5dc','#f1e0d6'];
			
			//this.drawSector(true,'',this.drawCorner());
			
			//this.showCurrentFoodData(this.drawCorner(true));
			

			let {obserable} = this.props;

			obserable.on('fillAlimentationData',(data)=>{

				this.state.alimentatonData.currentFoodData = [];
				this.state.alimentatonData.scaleData = data.scaleData;

				this.forceUpdate();
				
				this.stage.removeAllChildren();
				this.drawSector(true,'',this.drawCorner());
			});

			obserable.on('fillMaterialsData',(data)=>{
				this.state.alimentatonData.materials = data.materials;
				//this.state.alimentatonData.currentFoodData = [];
				this.forceUpdate();

				setTimeout(()=>{
					this.setState({
						liWidth :this.refs['fly-m-scroll'].children[0].offsetWidth+50
					});

					if(this.scroll ===undefined){
						this.scroll = new IScroll(this.refs['fly-m-name'],{
							scrollX:true,
							scrollY:false,
						});
					}
					else{
						this.scroll.refresh();
					}
				},10);
			});

			createjs.Ticker.timingMode = createjs.Ticker.RAF;

			createjs.Ticker.on("tick", ()=>{
				this.ball &&  this.ballCircularMotion(this.ball);
				obserable.trigger({type:'prepareFood'})
				this.stage.update();
			});

		},1);


		
		
		
	}
 
	showCurrentFoodData(r){
		
		this.state.alimentatonData.currentFoodData.length>0 && this.drawSector(false,'#fff',r);
	}

	bindEvent(obj=this.shapeArr,textArr){


		let last = -1;
		let iNow = 0;
		obj.forEach(container=>{

			createjs.Tween.get(container,{loop:false}).wait(Math.random()*200|0+200).to({
					scaleX:1,
					scaleY:1,
					alpha:1
			},Math.random()*1000|0+500, createjs.Ease.easeIn);


			container.on('mousedown',e=>{
				let index = e.currentTarget.name*1;
				if (last>-1 && last !== index) {
					createjs.Tween.get(obj[last],{loop:false})
					.to({scaleX:1,scaleY:1},500, createjs.Ease.elasticOut).call(()=>{
						
					});

					textArr[last].color="#fff";
					textArr[last].font="38px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif";
					
				}

				if(last !== index){
 					createjs.Tween.get(obj[index],{loop:false})
						.to({scaleX:1.4,scaleY:1.4},500, createjs.Ease.elasticOut).call(()=>{
						});

					textArr[index].color="#f90";
					textArr[index].font="46px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif";			
				}
				else{
					iNow++;
					let flag =iNow % 2 > 0;
					createjs.Tween.get(obj[index],{loop:false})
					.to({scaleX:flag?1:1.4,scaleY:flag?1:1.4},500, createjs.Ease.elasticOut).call(()=>{
					});
					textArr[index].color=flag?"#fff":"#f90";
					textArr[index].font=flag?"38px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif":"46px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif";	
				}

				last = index;
				 
			});
		});
	}

	drawSector(flag=true,color,radius){

		this.drawCircle(radius);//绘制圆周运动的小球。
 		this.allDataContainer = this.allDataContainer || new createjs.Container();
 		this.allDataContainer.removeAllChildren();

 		this.stage.removeChild(this.allDataContainer);
 		
 		this.stage.addChild(this.allDataContainer);
		
		let data = this.state.alimentatonData.scaleData;
		    
		let height = this.canvas.height,
			width = this.canvas.width;
		let R =radius*1.5;
		if(flag){//绘制单个菜的营养成份
			this.shapeArr =  [];
			let textArr = [];
			
			let shapeContainer = new createjs.Container();
			this.stage.addChild(shapeContainer);		

			for(var i =0;i<8;i++){
			
				let sector = new Sector({
						x:width/2,
						y:height/2,
						r:data[i].scale*height*.8,
						color:this.state.alimentatonData.colors[i%2],
						rotate:i*45,
						scale:0,
						alpha:0
					}).shape;
				sector.name = i;
				shapeContainer.addChild(
					sector
				);

				this.shapeArr.push(sector);

				let index = i;

				var text = new createjs.Text(data[index].name+data[index].weight+data[index].unit, "38px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif", "#fff");
						
					text.x= width/2 + Math.sin((22.5+45*index)/180*Math.PI)*R;
					
					text.y= R - Math.cos((22.5+45*index)/180*Math.PI)*R  ;

					switch(index){
							case 0:
							case 7:
								text.y+=60;
							break;
							case 2:
							break;
							case 3:
								text.y -=50;
								text.x +=60;
							break;
							case 4:
								text.y-=50;
							break;
							case 5:
								text.x -=30;
							break;
							case 6:
								text.x-=60;
							break;
					}

					text.textAlign= 'center';	
					this.allDataContainer.addChild(text);
					textArr.push(text);
					
			}

			shapeContainer.regX = width/2;
			shapeContainer.regY = height/2;
			shapeContainer.x = width/2;

			shapeContainer.y = height/2;
			shapeContainer.rotation = -90;
			
			this.bindEvent(this.shapeArr,textArr);

		}
	}

}


export default PublicShadow(FlyAlimentationData);
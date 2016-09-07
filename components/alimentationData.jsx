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
	  	 		/*{name:'小番茄',weight:'30g'},
				{name:'鸡蛋',weight:'40g'},
				{name:'生菜',weight:'70g'},
				{name:'生菜',weight:'70g'},
				{name:'生菜',weight:'70g'},
				{name:'生菜',weight:'70g'},
				{name:'生菜',weight:'70g'},
				{name:'培根',weight:'50g'},
				{name:'吐丝',weight:'25g'}*/
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
				<div className='fly-m-name' ref='fly-m-name'>
					<ul ref='fly-m-scroll' onTouchTap={this.checkMaterial} style={{width:this.state.alimentatonData.materials.length*this.state.liWidth}}>
						{this.state.alimentatonData.materials.map((item,i)=>{
							return (
								<li key={i}>{item.name}</li>
							);
						})}
					</ul>
				</div>
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

		let circle = new createjs.Shape();
		
		let x = this.canvas.width/2,
			y = this.canvas.height/2,
			r = 300,
			len = 40;

		circle.graphics.beginStroke('#fff').drawCircle(x,y,r);
		
		container.addChild(this.drawLine(x,y,r,len,0),this.drawLine(x,y,r,len,90),this.drawLine(x,y,r,len,45),this.drawLine(x,y,r,len,-45),circle);

		this.stage.addChild(container);

		return r;


	}
	
	componentDidMount() {

		setTimeout(()=>{

			this.setSize();

			let colors =  ['#f3e5dc','#f1e0d6'];
			
			//this.drawSector(true,'',this.drawCorner());
			//this.showCurrentFoodData(this.drawCorner(true));
			this.stage.update();


			createjs.Ticker.timingMode = createjs.Ticker.RAF;

			createjs.Ticker.on("tick", this.stage);
		},1);


		let {obserable} = this.props;

		obserable.on('fillAlimentationData',(data)=>{
			this.state.alimentatonData.materials = data.materials;
			this.state.alimentatonData.currentFoodData = [];
			this.state.alimentatonData.scaleData = data.scaleData;

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

			

			this.drawSector(true,'',this.drawCorner());
		})
		


		
	}

	showCurrentFoodData(r){

		this.state.alimentatonData.currentFoodData.length>0 && this.drawSector(false,'#fff',r);
	}

	bindEvent(obj=this.shapeArr,textArr){
		let last = -1;
		let iNow = 0;
		obj.forEach(container=>{
			container.on('mousedown',e=>{
				let index = e.currentTarget.name*1;


				if (last>-1 && last !== index) {
					createjs.Tween.get(obj[last],{loop:false})
					.to({scaleX:1,scaleY:1},500, createjs.Ease.elasticOut).call(()=>{
						
					});

					textArr[last].color="#fff";
					textArr[last].font=".1rem Arial";
					
				}

					if(last !== index){
 					createjs.Tween.get(obj[index],{loop:false})
						.to({scaleX:1.4,scaleY:1.4},500, createjs.Ease.elasticOut).call(()=>{
						});

					textArr[index].color="#f90";
					textArr[index].font=".12rem Arial";			
					}
					else{
						iNow++;
						let flag =iNow%2 > 0;
						createjs.Tween.get(obj[index],{loop:false})
						.to({scaleX:flag?1:1.4,scaleY:flag?1:1.4},500, createjs.Ease.elasticOut).call(()=>{
						});
						textArr[index].color=flag?"#fff":"#f90";
						textArr[index].font=flag?".1rem Arial":".12rem Arial";	
					}
				last = index;
				 
			});
		});
	}

	drawSector(flag=true,color,radius){



		//this.stage.removeAllChildren();
		let data = this.state.alimentatonData.scaleData;
		    
		let height = this.canvas.height,
			width = this.canvas.width;
		let R =radius*1.4;
		if(flag){//
			this.shapeArr = this.shapeArr || [];
			let textArr = [];
			
			let shapeContainer = new createjs.Container();
			this.stage.addChild(shapeContainer);		
			for(var i =0;i<8;i++){
				let sector = new Sector({
						x:width/2,
						y:height/2,
						r:data[i].scale*height*1.8,
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

				var text = new createjs.Text(data[index].name+data[index].weight+data[index].unit, ".1rem Arial", "#fff");
						
					text.x= width/2 + Math.sin((22.5+45*index)/180*Math.PI)*R;
					
					text.y= R - Math.cos((22.5+45*index)/180*Math.PI)*R  ;
					text.textAlign= 'center';	
					this.stage.addChild(text);
					textArr.push(text);
					
			}

			shapeContainer.regX = width/2;
			shapeContainer.regY = height/2;
			shapeContainer.x = width/2;

			shapeContainer.y = height/2;
			shapeContainer.rotation = -90;

			this.shapeArr.forEach((shape,i)=>{
				createjs.Tween.get(shape,{loop:false}).wait(i*300).to({
					scaleX:1,
					scaleY:1,
					alpha:1
				},300+i*100, createjs.Ease.easeIn);
			});
			
			
			this.bindEvent(this.shapeArr,textArr);
			

		}
		else{
			let currentData = this.state.alimentatonData.currentFoodData,
				containerData =  [];

				this.textArr = this.textArr || [];

			for(var i =0;i<16;i++){

				let isEven = i % 2 === 0;

				if(isEven){
					var name = (i/2|0);
					var c = new createjs.Container();
					c.name = name;
					containerData.push(c);
				}

				let index =  containerData.length -1;
				let r = isEven ? data[index].scale*height*1.8:
										data[index].scale*height*1.8*currentData[index].scale;


				containerData[index].addChild(
					new Sector({
						x:width/2,
						y:height/2,
						r:r,
						color: !isEven ? this.state.alimentatonData.colors[index % 2]: color,
						rotate:index*45
					}).shape
				);

				containerData[index].x = width/2;
				containerData[index].y = height/2;

				containerData[index].regX = width/2;
				containerData[index].regY = height/2;

				containerData[index].rotation = -90;


			  	isEven && this.stage.addChild(containerData[index]);

			  	if(isEven){
					var text = new createjs.Text(data[index].name+data[index].weight+data[index].unit+'--'+currentData[index].weight+currentData[index].unit, ".1rem Arial", "#fff");
						
						text.x= width/2 + Math.sin((22.5+45*index)/180*Math.PI)*R;
						
						text.y= R - Math.cos((22.5+45*index)/180*Math.PI)*R  ;
						text.textAlign= 'center';	
						this.stage.addChild(text);

						this.textArr.push(text);
				}
			  	
			}

			this.bindEvent(containerData,this.textArr);
			 

		}

	}

}


export default PublicShadow(FlyAlimentationData);
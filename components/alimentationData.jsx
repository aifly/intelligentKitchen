import React, { Component } from 'react';
import $ from 'jquery';


import {Sector} from '../libs/sector';

import './css/alimentationdata.css';

export default class FlyAlimentationData extends Component {
	render() {
		return (
			<li className='fly-operator-item fly-alimentation-data' ref='fly-operator-item'>
				<div ref='fly-data-C' className='fly-data-C'>
					<canvas  id='alimentation-canvas'></canvas>
				</div>
				<div className='fly-m-name'>111</div>
			</li>
		);
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

	drawCorner(){
		
		let container = new createjs.Container();

		let circle = new createjs.Shape();
		
		let x = this.canvas.width/2,
			y = this.canvas.height/2,
			r = 400,
			len = 40;

		circle.graphics.beginStroke('#fff').drawCircle(x,y,r);
		
		let line1 = new createjs.Shape();
		line1.graphics.setStrokeStyle(2).beginStroke('#fff').moveTo(x-r-len,y).lineTo(x+r+len,y);
		

		

		container.addChild(line1,this.drawLine(x,y,r,len,90),this.drawLine(x,y,r,len,45),this.drawLine(x,y,r,len,-45));

		container.addChild(circle);

		this.stage.addChild(container);


	}
	
	componentDidMount() {

		setTimeout(()=>{

			this.setSize();
			this.drawCorner();
			for(var i =0;i<8;i++){
				new Sector({
					x:this.canvas.width/2,
					y:this.canvas.height/2,
					r:25*i+200,
					stage:this.stage,
					color:'#f3e5dc',
					startAngle:0,
					rotate:i*45
				});	
			}
			
			this.stage.update();

		},1);




		  var data = [
		    {year: '热量/234.5kal',总成份:111.0 ,当前成份:56 },
		    {year: '蛋白质/59.6g',总成份:55.0 ,当前成份:16 },
		    {year: '脂肪/34.5g',总成份:35.0 ,当前成份:15 },
		    {year: '碳水化合物/251.1g',总成份:85.0 ,当前成份:14 },
		    {year: '12g/膳食纤维',总成份:15.0 ,当前成份:14 },
		    {year: '32.3g/微量元素',总成份:64.0 ,当前成份:13 },
		    {year: '维生素/12.2g',总成份:84.0 ,当前成份:14 },
		    {year: '其它/.3g',总成份:26.0 ,当前成份:16 }
		  ];

		/*  var Stat = G2.Stat;
		  var Frame = G2.Frame;
		  let self = this;
		  var frame = new Frame(data); // 加工数据
		  
		  setTimeout(()=>{

		  		frame = Frame.combinColumns(frame, ['总成份', '当前成份'], 'count', '营养成分', 'year');
				  var chart = new G2.Chart({
				    id: 'alimentation-canvas',
				    width: self.refs['fly-data-C'].offsetWidth,
				    height:self.refs['fly-data-C'].offsetHeight
				  });

				  chart.source(frame);
				  chart.coord('polar', {inner: .01});//中心圆的大小。
				  chart.legend('bottom');
				  chart.intervalStack().position('year*count')
				    .shape('stroke')
				    .color('营养成分',['#f3e5dc','#fff']);
				  chart.render();
		  },1)*/
		  
	}

}

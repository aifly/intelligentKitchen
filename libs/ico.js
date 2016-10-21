
export default class Ico {
	constructor(props) {
		this.canvas = props.canvas;
		this.color = props.color || '#fff';
		this.colors = ['#e89e79','#fff'];
	}

	public(){
		var canvas = this.canvas;
		var color = this.color;
		var width = canvas.width;
		var center = width / 2 ;
		var stage = new createjs.Stage(canvas);

		return {canvas,width,center,stage,color};
	}

	fillWeightIco(flag=0){

		let {canvas,width,center,stage} = this.public();

		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(this.colors[flag]).drawRoundRect(30,30,80,80,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);


		stage.addChild(circle,rect);
		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.strokeStyle = this.colors[flag];
		context.beginPath();
		context.arc(center,center-10,20,0,Math.PI,true);
		
		context.stroke();

		context.beginPath();
		context.moveTo(center,center-10);
		context.lineTo(center-10,center-20);
		context.stroke();

		return this;
	}

	drawWeightIco(){ //称重的图标

	 	let {canvas,width,center,stage,color} = this.public();


		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(color).drawRoundRect(30,30,80,80,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(4).beginStroke(color).drawCircle(center,center,center);


		stage.addChild(rect,circle);
		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.strokeStyle = color;
		context.beginPath();
		context.arc(center,center-10,20,0,Math.PI,true);
		
		context.stroke();

		context.beginPath();
		context.moveTo(center,center-10);
		context.lineTo(center-10,center-20);
		context.stroke();
	}

	fillBroadIco(flag = 0){//菜板的图标
		let {canvas,width,center,stage} = this.public();


		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).drawRoundRect(30,40,80,60,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		var text = new createjs.Text('+',"50px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif",this.colors[flag|0]);
		text.x = center - 18;
		text.y = center - 35;
		stage.addChild(circle,rect,text);
		stage.update();
		return this;
	}

	drawBroadIco(){//菜板的图标
	

		let {canvas,width,center,stage,color} = this.public();

		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(color).drawRoundRect(30,40,80,60,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(4).beginStroke(color).drawCircle(center,center,center);

		var text = new createjs.Text('+',"50px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif",color);
		text.x = center - 18;
		text.y = center - 34;
		stage.addChild(rect,circle,text);
		stage.update();
	}


	fillCountdownIco(flag=0){//填充提示的图标
		
		let {canvas,width,center,stage} = this.public();

		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).drawCircle(center,center,center/2);

		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		stage.addChild(circle,rect);

		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.strokeStyle= this.colors[flag|0];
		context.beginPath();
		context.arc(center,center,center-26,210*Math.PI/180,240*Math.PI/180,false);
		context.stroke();

		context.beginPath();
		context.arc(center,center,4,0,Math.PI*2,false);
		context.fillStyle =this.colors[flag|0];
		context.fill();

		context.beginPath();
		context.arc(center,center,center/2-10,200*Math.PI/180,260*Math.PI/180,false);
		context.stroke();

		context.beginPath();
		context.arc(center,center,center/2-10,20*Math.PI/180,80*Math.PI/180,false);
		context.stroke();
		return this;
	}


	drawCountdownIco(){//提示的图标
		
		let {canvas,width,center,stage,color} = this.public();
		
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(color).drawCircle(center,center,center/2);

		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(4).beginStroke(color).drawCircle(center,center,center);

		stage.addChild(rect,circle);

		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.strokeStyle= color;
		context.beginPath();
		context.arc(center,center,center-26,210*Math.PI/180,240*Math.PI/180,false);
		context.stroke();

		context.beginPath();
		context.arc(center,center,4,0,Math.PI*2,false);
		context.fillStyle =color;
		context.fill();

		context.beginPath();
		context.arc(center,center,center/2-10,200*Math.PI/180,260*Math.PI/180,false);
		context.stroke();

		context.beginPath();
		context.arc(center,center,center/2-10,20*Math.PI/180,80*Math.PI/180,false);
		context.stroke();
	}

	fillStatisticsIco(flag=0){
		
		let {canvas,width,center,stage,color} = this.public();

		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).drawRoundRect(35,30,70,80,10);

		var rect1 = new createjs.Shape();
		rect1.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).beginStroke(this.colors[flag|0]).drawRoundRect(55,24,6,12,2);

		var rect2 = new createjs.Shape();
		rect2.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).beginStroke(this.colors[flag|0]).drawRoundRect(78,24,6,12,2);

		var line = new createjs.Shape();
		line.graphics.setStrokeStyle(2).beginStroke(this.colors[flag|0]).moveTo(45,70).lineTo(60,50).lineTo(75,70).lineTo(90,60).lineTo(104,65);
		line.x=-4;

		var line1 = new createjs.Shape();
		line1.graphics.setStrokeStyle(2).beginStroke(this.colors[flag|0]).moveTo(45,85).lineTo(91,85);

		var line2 = new createjs.Shape();
		line2.graphics.setStrokeStyle(2).beginStroke(this.colors[flag|0]).moveTo(45,95).lineTo(71,95);

		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		stage.addChild(circle,rect,rect1,rect2,line,line1,line2);
		stage.update();

		return this;
	}

	fillWifiIco(flag=0){
		let {canvas,width,center,stage,color} = this.public();

		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		stage.addChild(circle);
		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.strokeStyle = this.colors[flag|0];
		context.beginPath();
		context.arc(center,center*1.8,center*1.2,-120*Math.PI/180,-60/180*Math.PI,false);
		context.stroke();

		context.beginPath();
		context.arc(center,center*1.8,center*.8,-120*Math.PI/180,-60/180*Math.PI,false);
		context.stroke();

		context.beginPath();
		context.arc(center,center*1.6,center*.2,-100*Math.PI/180,-80/180*Math.PI,false);
		context.stroke();

		return this;
	}

	fillTimeIco(flag=0){
		let {canvas,width,center,stage,color} = this.public();
		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		stage.addChild(circle);
		stage.update();


		var context = canvas.getContext('2d');
		context.strokeStyle = this.colors[flag|0];
		context.lineWidth = 4;
		context.beginPath();

		context.arc(center,center,center*.6,0,Math.PI*2,false);
		context.closePath();
		context.stroke();
		context.beginPath();
		context.moveTo(center,center*.58);
		context.lineTo(center,center);
		context.lineTo(center*1.3,center);
		context.stroke();
		return this;
	}

	fillWeatherIco(flag = 0){
		let {canvas,width,center,stage,color} = this.public();
		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);


		stage.addChild(circle);
		stage.update();

		var context = canvas.getContext('2d'),
			r = 20;

		context.strokeStyle = this.colors[flag|0];
		context.lineWidth = 4;
		context.translate(2,10);
		context.beginPath();
		context.arc(center*.65,center,r,-30*Math.PI/180,-270*Math.PI/180,true);
		context.moveTo(center*.65,center+r);
		context.lineTo(center*1.3,center+r);
		context.stroke();
		context.beginPath();
		context.arc(center*1.3,center*1.02,r*.9,-90*Math.PI/180,90*Math.PI/180,false);
		context.stroke();
		context.beginPath();
		context.arc(center*.98,center-r*.9,r*1.20,0,-Math.PI*180/180,true);
		context.stroke();
		return this;
	}

	fillFoodBookIco(flag=0){
		let {canvas,width,center,stage,color} = this.public();

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).drawRoundRect(35,30,70,80,10);


		stage.addChild(circle,rect);
		stage.update();

		var context = canvas.getContext('2d');
		var x = 50,
			y = 55;
		context.strokeStyle = this.colors[flag|0];
		context.lineWidth = 2;
		for(var i = 0;i<3;i++){
			context.moveTo(x,y+i*15);
			context.lineTo(x+40,y+i*15);
			context.stroke();
		}
		
		return this;
	}

	fillCollectIco(flag = 0){
		let {canvas,width,center,stage,color} = this.public();

			var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);
		


		stage.addChild(circle);
		stage.update();

		var context = canvas.getContext('2d'),
			r = 24;

		context.translate(1,4);
		context.lineWidth = 4;
		context.strokeStyle = this.colors[flag|0];
		context.beginPath();
		context.arc(center-r,center-r/2,r,-20*Math.PI/180,-200*Math.PI/180,true);
		context.stroke();


		context.beginPath();
		context.moveTo(r-1,center-5);
		context.quadraticCurveTo(65,105,center,center+r*1.5); 
		context.stroke();

		context.beginPath();
		context.moveTo(r+19+center,center-5);
		context.quadraticCurveTo(68,105,center,center+r*1.5+2); 
		context.stroke();

		context.beginPath();
		context.arc(center+r-4,center-r/2,r,-160*Math.PI/180,20*Math.PI/180,false);
		context.stroke();

		return this;
	}

	fillSwitchIco(flag=0){
		let {canvas,width,center,stage,color} = this.public();

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);


		stage.addChild(circle);
		stage.update();

		var context = canvas.getContext('2d'),
			r = center - 30;

		context.beginPath();
		context.lineWidth = 4;
		context.strokeStyle = this.colors[flag|0];
		context.beginPath();
		context.arc(center,center,r,-80*Math.PI/180,260*Math.PI/180,false);
		context.stroke();

		context.beginPath();
		context.moveTo(center,center);
		context.lineTo(center,center-r-10);
		context.stroke();

		return this;
	}

	fillSettingIco(flag=0){
		let {canvas,width,center,stage,color} = this.public();

		var circle = new createjs.Shape();
		var r =center / 2;
		circle.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		var circle1 = new createjs.Shape();
		circle1.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).drawCircle(center,center,center/2);

		var rect1 = new createjs.Shape();
		rect1.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).beginFill(this.colors[!flag|0]).drawRoundRect(center-10,center-r-10,20,2*r+20,4);

		var rect2 = new createjs.Shape();
		rect2.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).beginFill(this.colors[!flag|0]).drawRoundRect(0,0,20,2*r+20,4);
		rect2.x=center-10;
		rect2.y=center-r-10;
		rect2.regX = -30;
		rect2.regY = 22;
		rect2.rotation = 45;
		

		var rect3 = new createjs.Shape();
		rect3.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).beginFill(this.colors[!flag|0]).drawRoundRect(center-r-10,center-10,2*r+20,20,4);
		//rect3.rotation = 90;

		var rect4 = new createjs.Shape();
		rect4.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).beginFill(this.colors[!flag|0]).drawRoundRect(0,0,2*r+20,20,4);
		rect4.x=center-10;
		rect4.y=center-r-10;
		rect4.regX = 6;
		rect4.regY = -17;
		rect4.rotation = 42;

		var circle2 = new createjs.Shape();

		circle2.graphics.setStrokeStyle(4).beginFill(this.colors[!flag|0]).beginStroke(this.colors[!flag|0]).drawCircle(center,center,center/2-3);

		var circle3 = new createjs.Shape();
		circle3.graphics.setStrokeStyle(4).beginStroke(this.colors[flag|0]).drawCircle(center,center,center/2-10);

		stage.addChild(circle,circle1,rect1,rect2,rect3,rect4,circle2,circle3);
		stage.update();

		var context = canvas.getContext('2d');


		return this;
	}

}
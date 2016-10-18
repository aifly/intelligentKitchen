
export default class Ico {
	constructor(props) {
		this.canvas = props.canvas;
		this.color = props.color || '#fff';
		this.colors = ['#e89e79','#fff'];
	}

	fillWeightIco(flag=0){
		var canvas = this.canvas;
		var color = this.color;
		var width = canvas.width;
		var center = width / 2 ;
		var stage = new createjs.Stage(canvas);
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(3).beginStroke(this.colors[flag]).drawRoundRect(30,30,80,80,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(3).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);


		stage.addChild(circle,rect);
		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 3;
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

		var canvas = this.canvas;
		var color = this.color;
		var width = canvas.width;
		var center = width / 2 ;
		var stage = new createjs.Stage(canvas);
		var rect = new createjs.Shape();
		console.log(color)
		rect.graphics.setStrokeStyle(3).beginStroke(color).drawRoundRect(30,30,80,80,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(3).beginStroke(color).drawCircle(center,center,center);


		stage.addChild(rect,circle);
		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 3;
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
		var canvas = this.canvas;
		var color = this.color;
		var width = canvas.width;
		var center = width / 2 ;
		var stage = new createjs.Stage(canvas);
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(3).beginStroke(this.colors[flag|0]).drawRoundRect(30,40,80,60,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(3).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		var text = new createjs.Text('+',"50px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif",this.colors[flag|0]);
		text.x = center - 18;
		text.y = center - 35;
		stage.addChild(circle,rect,text);
		stage.update();
		return this;
	}

	drawBroadIco(){//菜板的图标
		var canvas = this.canvas;
		var color = this.color;
		var width = canvas.width;
		var center = width / 2 ;
		var stage = new createjs.Stage(canvas);
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(3).beginStroke(color).drawRoundRect(30,40,80,60,10);

		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(3).beginStroke(color).drawCircle(center,center,center);

		var text = new createjs.Text('+',"50px 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif",color);
		text.x = center - 18;
		text.y = center - 40;
		stage.addChild(rect,circle,text);
		stage.update();
	}


	fillCountdownIco(flag=0){//填充提示的图标
		var color = this.color;
		var canvas = this.canvas;
		var width = canvas.width;
		var center = width / 2 ;

		var stage = new createjs.Stage(canvas);
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(3).beginStroke(this.colors[flag|0]).drawCircle(center,center,center/2);

		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(3).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		stage.addChild(circle,rect);

		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 3;
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
		var color = this.color;
		var canvas = this.canvas;
		var width = canvas.width;
		var center = width / 2 ;

		var stage = new createjs.Stage(canvas);
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(3).beginStroke(color).drawCircle(center,center,center/2);

		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(3).beginStroke(color).drawCircle(center,center,center);

		stage.addChild(rect,circle);

		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 3;
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
		var color = this.color;
		var canvas = this.canvas;
		var width = canvas.width;
		var center = width / 2 ;

		var stage = new createjs.Stage(canvas);
		var rect = new createjs.Shape();
		rect.graphics.setStrokeStyle(3).beginStroke(this.colors[flag|0]).drawRoundRect(35,30,70,80,10);

		var rect1 = new createjs.Shape();
		rect1.graphics.setStrokeStyle(3).beginFill(this.colors[!flag|0]).beginStroke(this.colors[flag|0]).drawRoundRect(55,24,6,12,2);

		var rect2 = new createjs.Shape();
		rect2.graphics.setStrokeStyle(3).beginFill(this.colors[!flag|0]).beginStroke(this.colors[flag|0]).drawRoundRect(78,24,6,12,2);

		var line = new createjs.Shape();
		line.graphics.setStrokeStyle(2).beginStroke(this.colors[flag|0]).moveTo(45,70).lineTo(60,50).lineTo(75,70).lineTo(90,60).lineTo(104,65);
		line.x=-4;

		var line1 = new createjs.Shape();
		line1.graphics.setStrokeStyle(2).beginStroke(this.colors[flag|0]).moveTo(45,85).lineTo(91,85);

		var line2 = new createjs.Shape();
		line2.graphics.setStrokeStyle(2).beginStroke(this.colors[flag|0]).moveTo(45,95).lineTo(71,95);

		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(3).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		stage.addChild(circle,rect,rect1,rect2,line,line1,line2);
		stage.update();

		return this;
	}

	fillWifiIco(flag=0){
		var color = this.color;
		var canvas = this.canvas;
		var width = canvas.width;
		var center = width / 2 ;

		var stage = new createjs.Stage(canvas);
		var circle = new createjs.Shape();

		circle.graphics.setStrokeStyle(3).beginFill(this.colors[!flag|0]).drawCircle(center,center,center);

		stage.addChild(circle);
		stage.update();

		var context = canvas.getContext('2d');
		context.lineWidth = 3;
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

}
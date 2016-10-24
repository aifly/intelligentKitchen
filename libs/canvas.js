
import numberData from './number.js';

let docWidth = window.innerWidth;

export default class Time{
	constructor(options = {}){
		let s = this;
		s.canvas = options.canvas;
		s.obserable = options.obserable;
		s.margin  = 9*docWidth/3840;
		s.isTime = options.isTime;
		s.r = options.r || 5*docWidth/3840;
		var num = numberData[10];
		var context = s.canvas.getContext('2d');
		if(s.isTime){
			var index = s.init();

			setInterval(()=>{
				var isShow = s.obserable.trigger({type:'getfunctionCenterShow'});

				if(isShow){
					var D = new Date();
					var hours = D.getHours(),
						mins = D.getMinutes(),
						seconds = D.getSeconds();
					//!new Date().getSeconds() && (index = s.init());//当前秒数为0的时候，重新绘制时间。
					
					context.fillStyle = '#f8f3ef';
					context.beginPath();//f8f3ef
					context.arc((s.margin + .61 + s.r)*(index-3),(s.margin + s.r)*7.8,s.r+.2,0,Math.PI*2,false);
					context.closePath();
					context.fill();
					context.beginPath();
					context.arc((s.margin+ .61 + s.r)*(index-3),(s.margin + s.r)*5.8,s.r+.2,0,Math.PI*2,false);
					context.closePath();
					context.fill();
					setTimeout(()=>{
						index = s.init();
					},500);
				}

				hours === 0 && mins === 0 && seconds === 0 && s.obserable.trigger({type:'updateCalendar'});

				s.obserable.trigger({type:"timingdown"});//倒计时
				s.obserable.trigger({type:'videoPlay'});
			},1000);
		}
		
	}

	timeLoop(index){
		var s = this;

		var context = s.canvas.getContext('2d');
		s.draw(10,context,index);
	}


	initWeight(numbers){ //体重数据

		let s = this;
		let id = 0;
		var context = s.canvas.getContext('2d');
		context.clearRect(0,0,s.canvas.width,s.canvas.height);
		let D =new Date();
		var ten = numbers[0],
			one = numbers[1],
			minsTen =  numbers[2],
			minsOne =  numbers[3];
		var tenFirst = (ten === 0);
		s.drawWeight(ten,context,id,false,true,tenFirst);

		var oneFirst = (tenFirst && one === 0);
		id += numberData[ten][0].length+1;
		s.drawWeight(one,context,id,false,true,oneFirst);
		

		id += 2;
		var minsTenFirst = oneFirst && minsTen === 0;
		id += numberData[10][0].length+1;
		s.drawWeight(minsTen,context,id,false,true,minsTenFirst);
		

		id += numberData[minsTen][0].length+1;
		s.drawWeight(minsOne,context,id,true);

		id += numberData[minsOne][0].length;
		s.drawWeight(12,context,id);		

	}

	initTiming(numbers){
		let s = this;
		let id = 0;
		var context = s.canvas.getContext('2d');
		context.clearRect(0,0,s.canvas.width,s.canvas.height);
		let D =new Date();
		var ten = numbers[0],
			one = numbers[1],
			minsTen =  numbers[2],
			minsOne = numbers[3],
			seconds = numbers[4];
		s.drawTiming({
			num:ten,
			context,
			id,
			flag:true
		});

		id += numberData[ten][0].length;
		s.drawTiming({
			num:10,
			context,
			id
		});

		id += numberData[ten][0].length;
		s.drawTiming({
			num:one,
			context,
			id,
			flag:true
		});
		
		id +=3;
		
		id += numberData[10][0].length;
		s.drawTiming({
			num:minsTen,
			context,
			id,
			flag:false
		});
		var index = id;


		id += numberData[minsTen][0].length+1;
		s.drawTiming({
			num:10,
			context,
			id
		});

		id += numberData[10][0].length;
		s.drawTiming({
			num:minsOne,
			context,
			id,
			flag:false
		});

		id += numberData[minsOne][0].length+1;
		s.drawTiming({
			num:seconds,
			context,
			id,
			flag:false
		});

	}

	init(){

		let s = this;
		let id = 2;
		var context = s.canvas.getContext('2d');
		context.clearRect(0,0,s.canvas.width,s.canvas.height);
		let D =new Date();
		var ten = D.getHours()/ 10 | 0,
			one = D.getHours() % 10,
			minsTen =  D.getMinutes()/10|0,
			minsOne =  D.getMinutes()%10;
		s.draw(ten,context,id);

		id += numberData[ten][0].length+1;
		s.draw(one,context,id);
		

		id += numberData[one][0].length+1;
		s.draw(10,context,id);
		
		id += numberData[10][0].length+1;
		s.draw(minsTen,context,id);
		var index = id;

		id += numberData[minsTen][0].length+1;
		s.draw(minsOne,context,id);

		return index;

	}

	drawTiming(options={}){
		let s = this;

		let {num,context,id,flag } = options;
		
		for(var i = 0;i<15;i++){
			for(var j = 0;j<38;j++){
				context.save();
				context.beginPath();
				context.arc((s.margin + s.r)*(j+id) + s.margin,i*(s.margin+s.r)+s.margin,s.r,0,Math.PI*2,false);
				
				context.closePath();

				context.fillStyle  = "#e9d3c1";//f8f3ef

				if(numberData[num][i] && numberData[num][i][j]){
					let color = '#fff'
					context.fillStyle = color;

				}

				context.fill();
				context.restore();
			}
		}
	}


	drawWeight(num,context,id,flag = false, isNeedTop = true,isFirst=false){
		let s = this;

		
		for(var i = 0;i<15;i++){
			for(var j = 0;j<38;j++){
				context.save();
				isNeedTop && context.translate(0,30);
				context.beginPath();

				context.arc((s.margin + s.r)*(j+id) + s.margin,i*(s.margin+s.r)+s.margin,s.r,0,Math.PI*2,false);
				
				context.closePath();

				context.fillStyle  = "#f8f3ef";//f8f3ef

				if(numberData[num][i] && numberData[num][i][j]){
					
					if(s.isTime){
						context.fillStyle = "#df9977";
					}
					else{
						if(num >= 0 || flag){
							if(isFirst){
								if(num>0){
									context.fillStyle = "#df9977";
								}
							}
							else{
								if(num>=0){
									context.fillStyle = "#df9977";
								}
							}
						};
						
					}

				}

				context.fill();
				context.restore();
			}
		}
	
	}

	draw(num,context,id,flag = false, isNeedTop = true){
		let s = this;

		
		for(var i = 0;i<15;i++){
			for(var j = 0;j<38;j++){
				context.save();
				isNeedTop && context.translate(0,30);
				context.beginPath();

				context.arc((s.margin + s.r)*(j+id) + s.margin,i*(s.margin+s.r)+s.margin,s.r,0,Math.PI*2,false);
				
				context.closePath();

				context.fillStyle  = "#f8f3ef";//f8f3ef

				if(numberData[num][i] && numberData[num][i][j]){
					
					if(s.isTime){
						context.fillStyle = "#df9977";
					}
					else{
						if(num > 0 || flag){
							context.fillStyle = "#df9977";
						};
						
					}

				}

				context.fill();
				context.restore();
			}
		}
	
	}



}

import numberData from './number.js';


export default class Time{
	constructor(options = {}){
		let s = this;
		s.canvas = options.canvas;
		s.obserable = options.obserable;
		s.margin  = 9;
		s.r = 5;
		var index = s.init();

		

		var num = numberData[10]
		setInterval(()=>{
			var D = new Date();
			var hours = D.getHours(),
				mins = D.getMinutes(),
				seconds = D.getSeconds();


			//!new Date().getSeconds() && (index = s.init());//当前秒数为0的时候，重新绘制时间。
			s.canvas.getContext('2d').clearRect((s.margin + s.r)*(index-3),0,20,s.canvas.height);
			setTimeout(()=>{
				index = s.init();
			},500);
			hours === 0 && mins === 0 && seconds === 0 && s.obserable.trigger({type:'updateCalendar'});
			
		},1000);
	}

	timeLoop(index){
		var s = this;

		var context = s.canvas.getContext('2d');
		s.draw(10,context,index);
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

	draw(num,context,id){
		let s = this;

		
		
		for(var i = 0;i<9;i++){
			for(var j = 0;j<34;j++){
				context.save();
				context.translate(0,30);
				context.beginPath();

				context.arc((s.margin + s.r)*(j+id)+s.margin,i*(s.margin+s.r)+s.margin,s.r,0,Math.PI*2,false);
				
				context.closePath();

				context.fillStyle='#f8f3ef';
				if(numberData[num][i] && numberData[num][i][j]){
					context.fillStyle='#df9977';	
				}
				
				context.fill();
				context.restore();
			}
		}
	
	}



}
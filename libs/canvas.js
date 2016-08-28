let id = 0;
import numberData from './number.js';

export default class Time{
	constructor(options = {}){
		let s = this;
		s.canvas = options.canvas;
		s.hours = new Date().getHours();
		s.mins = new Date().getMinutes(); 
		s.margin  = 9;
		s.r = 5;
		s.draw();
	}
	draw(){
		let s = this;
		var context = s.canvas.getContext('2d');
		var ten = s.hours / 10 | 0,
			one = s.hours % 10,
			minsTen = s.mins/10|0,
			minsOne = s.mins%10;


		for(var i = 0;i<9;i++){
			for(var j = 0;j<34;j++){
				context.beginPath();
				context.arc((s.margin+s.r)*j+s.margin,i*(s.margin+s.r)+s.margin,s.r,0,Math.PI*2,false);
				context.closePath();
				
				context.fillStyle='#f8f3ef';
				if(numberData[ten][i] && numberData[ten][i][j]){
					context.fillStyle='#df9977';	
				}

				context.fill();
			}
		}
		id = numberData[ten][0].length;


		for(var i = 0;i<9;i++){
			for(var j = 0;j<34;j++){
				context.beginPath();

				context.arc((s.margin + s.r)*(j+id)+s.margin,i*(s.margin+s.r)+s.margin,s.r,0,Math.PI*2,false);
				
				context.closePath();

				context.fillStyle='#f8f3ef';
				if(numberData[one][i] && numberData[one][i][j]){
					context.fillStyle='#df9977';	
				}
				
				context.fill();
			}
		}
			
		/*numberData[ten].forEach((item,i)=>{

			item.forEach((it,j)=>{

				
			});
		});*/

	}
}
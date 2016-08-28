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
			one = s.hours % 10;


		for(var i = 0,len = 20;i<len;i++){
			for(var j = 0,len1 = 34;j<len1;j++){
				context.beginPath();
				context.arc((s.margin+s.r)*j+s.margin,i*(s.margin+s.r)+s.margin,s.r,0,Math.PI*2,false);
				context.closePath();
				
				context.fillStyle='#e89e79';
				if(numberData[ten][i][j]){
					context.fillStyle='red';	
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
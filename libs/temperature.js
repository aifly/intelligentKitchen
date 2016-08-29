
import numberData from './number.js';

export default class Temperature{
	constructor(options = {}){
		let s = this;
		s.canvas = options.canvas;
		s.margin  = 9;
		s.r = 5;
		

		
	}

	init(temperature){

		let s = this;
		let id = 2;
		var context = s.canvas.getContext('2d');
		context.clearRect(0,0,s.canvas.width,s.canvas.height);
		var ten = temperature/ 10 | 0,
			one = temperature % 10;
			
		s.draw(ten,context,id);
		id += numberData[ten][0].length+1;
		s.draw(one,context,id);
		id += numberData[one][0].length+1;
		s.draw(11,context,id);
		

	}

	draw(num,context,id){
		let s = this;

		
		
		for(var i = 0;i<9;i++){
			for(var j = 0;j<34;j++){
				context.save();
				context.translate(0,0);
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

 class Sector{
	constructor(props={}) {
		let s = this;
		s.x = props.x;
		s.y = props.y;
		s.r = props.r;
		s.startAngle = (props.startAngle||0)/180*Math.PI;
		s.endAngle = (props.startAngle||0 + 45)/180*Math.PI;
		s.color = props.color||'#fff';
		s.rotate = props.rotate;
		

		s.draw();
	}

	draw(){
		let shape = new createjs.Shape(),
			s = this;
		shape.graphics.beginFill(s.color)
			.moveTo(s.x,s.y)
			.lineTo(s.x+s.r*Math.cos(s.startAngle),s.y+s.y*Math.sin(s.startAngle))
			.arc(s.x,s.y,s.r,s.startAngle,s.endAngle,0)
			.lineTo(s.x,s.y)
			.endFill().endStroke();
		//s.stage.addChild(shape);
		this.shape = shape;
		shape.rotation = s.rotate;
		shape.x = s.x;
		shape.y = s.y;
		shape.regX = s.x;
		shape.regY = s.y;

	}

}


export default {Sector};
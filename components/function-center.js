
import React from 'react';
import Time from '../libs/canvas.js';
import Temperature from '../libs/temperature.js';
import $ from 'jquery';
import '../libs/jquery.tap.js';
import Sortable from '../libs/Sortable.js';

export default class FlyFunctionCenter extends React.Component{
	constructor(option){
		super(option)
	}
	render(){
		return (
			<li className="fly-food fly-cook-book-item">
				<div className="fly-cook-book-item-C" ref='fly-cook-book-item-C'> 
					<div className="fly-weather  fly-food-item fly-top3" ref='weather'>
						<ol className="fly-weather-C">
							<li>
								<img src="./assets/images/sun.png" />
								<span>08/28</span>
							</li>
							<li>
								<img src="./assets/images/rain.png" />
								<span>08/29</span>
							</li>
							<li>
								<img src="./assets/images/cloud.png" />
								<span>08/30</span>
							</li>
							<li>
								<img src="./assets/images/sun1.png" />
								<span>08/31</span>
							</li>
							<li>
								<img src="./assets/images/rain.png" />
								<span>09/01</span>
							</li>
						</ol>
						<div className="fly-time-C">
							<div className="fly-time">
								<canvas ref='fly-timer-canvas' width="100%" ></canvas>
								<canvas ref='fly-temperature-canvas' width="100%"></canvas>
							</div>
							<div className="fly-date">
								<h1>七月二十六</h1>
								<h1>夏至食物推荐</h1>
								<div className="fly-rec-food-container">
									<ul>
										<li>夏至饼</li>
										<li>夏至羹</li>
										<li>豌豆糕</li>
										<li>夏至蛋</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="fly-city-C">
							<div className="fly-city-scroll-C" id="fly-city-scroll-C">
							<ul>
								<li>Beijing</li>
								<li>Beijing</li>
								<li>Beijing</li>
								<li>Beijing</li>
								<li>Beijing</li>
								<li>Beijing</li>
								<li>Beijing</li>
							</ul>
						</div>
						<div className="fly-add">+</div>
						</div>
					</div>
					<div className="fly-rec-food fly-food-item fly-top2" ref='rec-food'>推荐食材</div>
					<div className="fly-rec-menu fly-food-item fly-top1" ref='rec-menu'>
						推荐菜谱
					</div>	
				</div>

				<div className="mask"></div>
			</li>
		)
	}
	componentDidMount(){
		this.init();
	}

	setSize(){
		
		let timerCanvas =this.refs['fly-timer-canvas'],
			temperatureCanvas = this.refs['fly-temperature-canvas']; 

		setTimeout(()=>{
			let width = timerCanvas.parentNode.offsetWidth,
				height = timerCanvas.parentNode.offsetHeight /2;
			timerCanvas.width = temperatureCanvas.width =  width;
			timerCanvas.height = temperatureCanvas.height=  height;

			this.timerCanvasStart(timerCanvas);
			this.temperatureCanvasStart(temperatureCanvas,27);

	/*		let width = data.timeCanvas.parent().width(),
				height = data.timeCanvas.parent().height()/2;
			data.timeCanvas[0].width = data.temperatureCanvas[0].width = width;
			data.timeCanvas[0].height = data.temperatureCanvas[0].height =  height;


			this.canvasStart(data.timeCanvas[0]);
			this.temperatureStart(data.temperatureCanvas[0],26);
			

			var scrollC = data.cityScrollC.find('ul');
			this.fillCity(cityData,scrollC);
			let li = data.cityScrollC.find('ul li');

			scrollC.width(li.length*li.width());

			new IScroll(data.cityScrollC[0],{
				disableMouse:true,
				invertWheelDirection:true,
				scrollX: true,
		 		scrollY: false
			});
*/
		},1);

	}
	timerCanvasStart(canvas){
		new Time({
			canvas:canvas
		});
	}
	temperatureCanvasStart(canvas,temperature){
		new Temperature({
			canvas:canvas
		}).init(temperature);
	}
	init(){	
		this.iNow = 0;
		this.isEnableDrag = false;
		this.bindEvent(document);
		this.setSize();
	}

	setClass(){
		this.removeTopClass();//去掉所有的fly-top的class
		this.iNow++;
		var index = this.iNow % 3;
		switch(index){
			case 0:
				this.refs['weather'].classList.add('fly-top3');
				this.refs['rec-food'].classList.add('fly-top2');
				this.refs['rec-menu'].classList.add('fly-top1');

			break;
			case 1:

				this.refs['weather'].classList.add('fly-top1');
				this.refs['rec-food'].classList.add('fly-top3');
				this.refs['rec-menu'].classList.add('fly-top2');

			break;
			case 2:

				this.refs['weather'].classList.add('fly-top2');
				this.refs['rec-food'].classList.add('fly-top1');
				this.refs['rec-menu'].classList.add('fly-top3');

			break;
		}
		
	}



	bindEvent(document){

		let self = this;
		var sort = null;
		this.foods = $('#fly-main .fly-food-item');
		this.programa = $('#fly-main .fly-cook-book-C .fly-cook-book-item');
		this.cookBookC = $('#fly-main .fly-cook-book-C')
		var data = this;

		/*data.closeBar.on('tap',()=>{
			data.closeBar.removeClass('active');
			data.programa.removeClass('active');

			sort && sort.destroy();
			self.isEnableDrag = false;
		});*/

		data.foods.on('tap',(e)=>{
			if(self.isEnableDrag){//
				return;
			}
			var target = $(e.target).hasClass('fly-food-item')?$(e.target):$(e.target).parents('.fly-food-item');
			var isTop = target.hasClass('fly-top3');
			if(isTop){return;}

			//self.startChangeMenu($(e.target),$(e.target).index('.fly-food-item'));
			let $target = $(e.target),
				index = $target.index('.fly-food-item')*1,
				iNow = this.iNow % 3;
				this.removeTopClass();
				data.foods.eq(index).css({
					WebkitTransitionDuration:'.5s',
					//WebkitTransform:'translate3d(100%,0,0)',
					opacity:0.3
				}).addClass('fly-top3');
				setTimeout(()=>{
					data.foods.eq(index).css({
						//WebkitTransform:'translate3d(0,0,0)',
						opacity:1
					});
				},300);
				
				this.iNow = index;

				switch(index){
					case 0:
					
						data.foods.eq(1).addClass('fly-top2');
						data.foods.eq(2).addClass('fly-top1');

						
					break;
					case 1:
						
						data.foods.eq(0).addClass('fly-top1');
						data.foods.eq(2).addClass('fly-top2');


					break;
					case 2:

						data.foods.eq(0).addClass('fly-top2');
						data.foods.eq(1).addClass('fly-top1');

					break;
				}
		});
		
		
		$(this.refs['fly-cook-book-item-C']).on('touchstart',(e)=>{

			var target = $(e.target).hasClass('fly-food-item')?$(e.target):$(e.target).parents('.fly-food-item');
			var isTop = target.hasClass('fly-top3');
			if(!isTop || $(e.target).hasClass('fly-city-scroll-C')||$(e.target).parents('.fly-city-scroll-C').length>0){
				return;
			}


			var $target = $('.fly-top3');
			var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			var disX = e.pageX;// - $target.offset().left;

			data.foods.css({
				WebkitTransition:'none',
			});
			$(document).on('touchmove',e=>{

				e.preventDefault();
				if(self.isEnableDrag){
					return; //启用了拖拽操作。
				}
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;

				x > 0 && ( x = 0 );
				$target.css({
					WebkitTransform:'translate3d(' + x + 'px,0,0)'
				});

				//return 0;
			}).on('touchend',e=>{
				if(self.isEnableDrag){
					return; //启用了拖拽操作。
				}

				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;
				$(document).off('touchend touchmove');
				if(x>= 0){
					return;
				}

				if(-x>=100){//
					self.startChangeMenu($target);
				}
				else{
					$target.css({
						WebkitTransition:'.3s',
						WebkitTransitionTimingFunction:"cubic-bezier(0, 0.9, 0.17, 1.01)",
						WebkitTransform:'translate3d(0,0,0)'
					});
				 
				}
				
			});

		});
		
		data.programa.on('touchstart',e=>{

			
			var timer = setTimeout(()=>{
			
				self.isEnableDrag = true;
		
				data.programa.addClass('active');
				
				sort = new Sortable(data.cookBookC[0],{group:'omega'});
				//data.closeBar.addClass('active');

			},1000);
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			let $target = $(e.target).hasClass('fly-cook-book-item')?$(e.target):$(e.target).parents('.fly-cook-book-item'),
				iNow = 0;

			$(document).on('touchmove',e=>{
				clearTimeout(timer);
				if(self.isEnableDrag){
					if(iNow++ ===1){
						$target.removeClass('active');	
						
					}else{
						
					}
					
				}
			}).on('touchend',e=>{
				
				clearTimeout(timer);
				if(!self.isEnableDrag){
					return;
				}

				setTimeout(()=>{
					
					//data.programa.removeClass('active');
					//sort && sort.destroy();					
					$(document).off('touchmove touchend');
					return;
					
				},1)
			});

		});
		

	}

	removeTopClass(){
		this.foods.removeClass('fly-top1 fly-top2 fly-top3')
	}

	startChangeMenu($target){

		let self =this;
		this.foods.css({WebkitTransition:'.3s',WebkitTransitionTimingFunction:"cubic-bezier(0, 0.9, 0.17, 1.01)"})
		$target.css({
			WebkitTransform:'translate3d(-100%,0,0)',
			opacity:0
		});
		setTimeout(()=>{
			self.setClass();
			$target.css({
				WebkitTransform:'translate3d(0,0,0)',
				opacity:1
			});

		},200)
	}
	

	
}
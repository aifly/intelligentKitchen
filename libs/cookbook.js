import $ from 'jquery';
import './jquery.tap.js';

import Sortable from './Sortable.js';
import Time from './canvas.js';


let data = {
	cookBookC:$('#fly-main .fly-cook-book-C'),
	foods:$('#fly-main .fly-food-item'),
	programa:$('#fly-main .fly-cook-book-C .fly-cook-book-item'),
	closeBar:$("#fly-close-drag"),
	timeCanvas:$('#fly-timer-canvas')
}

let util = {
	init(){	
		this.bindEvent(document);
		this.setSize();
	},
	iNow : 0,
	setClass(){
		this.removeTopClass();//去掉所有的fly-top的class
		this.iNow++;
		var index = this.iNow % 3;
		switch(index){
			case 0:

				data.foods.eq(0).addClass('fly-top3');
				data.foods.eq(1).addClass('fly-top2');
				data.foods.eq(2).addClass('fly-top1');

			break;
			case 1:
				
				data.foods.eq(0).addClass('fly-top1');
				data.foods.eq(1).addClass('fly-top3');
				data.foods.eq(2).addClass('fly-top2');

			break;
			case 2:

				data.foods.eq(0).addClass('fly-top2');
				data.foods.eq(1).addClass('fly-top1');
				data.foods.eq(2).addClass('fly-top3');

			break;
		}
		
	},

	removeTopClass(){

		data.foods.removeClass('fly-top1 fly-top2 fly-top3');
	},

	isEnableDrag : false,

	bindEvent(document){

		let self = this;
		var sort = null;

		data.closeBar.on('tap',()=>{
			data.closeBar.removeClass('active');
			data.programa.removeClass('active');
			sort && sort.destroy();
			self.isEnableDrag = false;
		});

		data.foods.on('tap',(e)=>{
			if(self.isEnableDrag){//
				return;
			}
			var isTop = $(e.target).hasClass('fly-top3');
			if(isTop){return;}
			//self.startChangeMenu($(e.target),$(e.target).index('.fly-food-item'));
			let $target = $(e.target),
				index = $target.index('.fly-food-item')*1,
				iNow = this.iNow % 3;
				this.removeTopClass();
				data.foods.eq(index).css({
					WebkitTransitionDuration:'.5s',
					WebkitTransform:'translate3d(100%,0,0)',
					opacity:0.3
				}).addClass('fly-top3');
				setTimeout(()=>{
					data.foods.eq(index).css({
						WebkitTransform:'translate3d(0,0,0)',
						opacity:1
					});
				},700);
				
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

		data.cookBookC.on('touchstart',(e)=>{

			
			var isTop = $(e.target).hasClass('fly-top3');
			if(!isTop){
				return;
			}
			var $target = $('.fly-top3');
			var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			var disX = e.pageX - $target.offset().left;
			data.foods.css({
				WebkitTransition:'none',
			});
			$(document).on('touchmove',e=>{

				if(self.isEnableDrag){
					return; //启用了拖拽操作。
				}
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;
				x>0&&(x=0);
				$target.css({
					WebkitTransform:'translate3d('+x+'px,0,0)'
				});
			}).on('touchend',e=>{
				if(self.isEnableDrag){
					return; //启用了拖拽操作。
				}
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;

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
				$(document).off('touchend touchmove');
			});

		});
		
		data.programa.on('touchstart',e=>{

			
			var timer = setTimeout(()=>{
			
				self.isEnableDrag = true;
		
				data.programa.addClass('active');
				!sort && (sort = new Sortable(data.cookBookC[0],{group:'omega'}));	
				data.closeBar.addClass('active');

			},1000);
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			let $target = $(e.target).hasClass('fly-cook-book-item')?$(e.target):$(e.target).parents('.fly-cook-book-item'),
				iNow = 0;

			$(document).on('touchmove',e=>{

				if(self.isEnableDrag){
					if(iNow++ ===1){
						$target.removeClass('active');	
						
					}else{
						/*
							return;
						var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
						$target.css({left:e.pageX - disX,top:e.pageY - disY});
						var arr = [];
						data.programa.each((i,n)=>{
							if($target[0] === n){
								return;
							}
							let left = $target.offset().left+$target.width(),
								top = $target.offset().top+$target.height(),
								right = $target.offset().left,
								bottom = $target.offset().top;

								
							if(left<$(n).offset().left 
								|| right > $(n).offset().left+$(n).width()
								|| top < $(n).offset().top 
								|| bottom > $(n).offset.top+$(n).height()
								){
								//没有碰撞上
							}
							else{
								//console.log('ok');
								//碰撞上了。
								var disX = self.getDis(
									$target.offset().left+$target.width()/2,
									$target.offset().top+$target.height()/2,
									$(n).offset().left+$(n).width()/2,
									$(n).offset().top+$(n).height()/2
									);
								arr.push({disX,target:$(n)});
							}

						});	

						let len = arr.length;
						if(len > 1){//有两个碰撞
							if(arr[0].disX <= arr[1].disX){
								//开始交换位置
								arr[0].target.addClass('near');
							}
							else{
								arr[1].target.addClass('near');
							}
						}else if(len === 1){//只有一个
						 let tar =	arr[0].target.hasClass('fly-cook-book-item')?arr[0].target:arr[0].target.parents('.fly-cook-book-item');
							tar.addClass('near');
							$target.addClass('near')
						}else if(len <= 0){
								
						}

						arr= null;

						*/
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
					/*var arr = [];
					data.programa.each((i,n)=>{
						if($target[0] === n){
							return;
						}
						let left = $target.offset().left+$target.width(),
							top = $target.offset().top+$target.height(),
							right = $target.offset().left,
							bottom = $target.offset().top;

							
						if(left<$(n).offset().left 
							|| right > $(n).offset().left+$(n).width()
							|| top < $(n).offset().top 
							|| bottom > $(n).offset.top+$(n).height()
							){
							//没有碰撞上
						}
						else{
							//console.log('ok');
							//碰撞上了。
							var disX = self.getDis(
								$target.offset().left+$target.width()/2,
								$target.offset().top+$target.height()/2,
								$(n).offset().left+$(n).width()/2,
								$(n).offset().top+$(n).height()/2
								);
							arr.push({disX,target:$(n)});
						}

					});	
					let len = arr.length;
					if(len > 1){//有两个碰撞

						if(arr[0].disX <= arr[1].disX){
							//开始交换位置
							let  left =arr[0].target.offset().left;
							$target.css({left:arr[0].target.width() + left,top:0});
							arr[0].target.css({left:targetStartX});

						}
						else{
							let  left =arr[1].target.offset().left;
							arr[1].target.css({left:targetStartX});
							$target.css({left:arr[1].target.width() + left,top:0});
						}
					}else if(len === 1){//只有一个
							let  left =arr[0].target.offset().left;
							$target.css({left:arr[0].target.width() ,top:0});
							arr[0].target.css({left:targetStartX});
					}else if(len <= 0){
							
					}
*/
				},1)
			});

		});
		

	},

	getDis(x1,y1,x2,y2){
		return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
	},

	startChangeMenu($target){

		let self =this;
		data.foods.css({WebkitTransition:'.3s',WebkitTransitionTimingFunction:"cubic-bezier(0, 0.9, 0.17, 1.01)"})
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
	},

	setSize(){
		
		setTimeout(()=>{
			data.timeCanvas[0].width = data.timeCanvas.parent().width();
			data.timeCanvas[0].height = data.timeCanvas.parent().height();
			this.canvasStart(data.timeCanvas[0]);
		},1)

	},
	canvasStart(canvas){
		new Time({
			canvas:canvas
		});
	}
}



util.init();
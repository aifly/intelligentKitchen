import $ from 'jquery';
import './jquery.tap.js';
var Sector = require('zrender');

let data = {
	cookBookC:$('#fly-main .fly-cook-book-C'),
	foods:$('#fly-main .fly-food-item'),
	programa:$('#fly-main .fly-cook-book-C>section')
}

let util = {
	init(){	
		this.bindEvent(document);
		
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

				if(Math.abs(x)>=100){//
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
		
				data.programa.find('.fly-cook-book-item-C').addClass('active');
		
			},1000);
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			let $target = $(e.target).hasClass('fly-cook-book-item')?$(e.target):$(e.target).parents('.fly-cook-book-item'),
				index = $target.index(),
				disX = e.pageX - $target.offset().left,
				disY = e.pageY - $target.offset().top;

			$(document).on('touchmove',e=>{

				if(self.isEnableDrag){
					var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
					$target.css({left:e.pageX - disX,top:e.pageY - disY});			
				}
			}).on('touchend',e=>{
				$(document).off('touchmove touchend');
				setTimeout(()=>{
					self.isEnableDrag = false;
					data.programa.find('.fly-cook-book-item-C').removeClass('active');
				},1)
			});

		});

		
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
	}
}



util.init();
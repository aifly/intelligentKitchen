

import $ from 'jquery';
import './jquery.tap.js';
let data = {
	cookBookC:$('#fly-main .fly-cook-book-C'),
	foods:$('#fly-main .fly-food-item'),
	classList:[0,1,2]

}

let util = {
	init(){	
		this.bindEvent(document);
		
	},
	iNow : 0,
	setClass(arr){
		this.removeTopClass();//去掉所有的fly-top的class
		arr.push(arr.shift());
		this.iNow++;

		data.foods.each((i,n)=>{
			
			data.foods[arr[i]].addClass('fly-top'+(3-i));
		});
		
	},

	removeTopClass(){

		data.foods.removeClass('fly-top1 fly-top2 fly-top3');
	},

	bindEvent(document){

		let self = this;

		data.foods.on('tap',(e)=>{
			var isTop = $(e.target).hasClass('fly-top3');
			if(isTop){return;}
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
				transition:'none',
			});
			$(document).on('touchmove',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;
				x>0&&(x=0);
				$target.css({
					transform:'translate3d('+x+'px,0,0)'
				});
			}).on('touchend',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;

				if(Math.abs(x)>=100){//
					
					$target.css({
						transition:'.3s',
						transform:'translate3d(-100%,0,0)',
						opacity:0
					});
					setTimeout(()=>{
						self.setClass(data.classList);
						$target.css({
							transform:'translate3d(0,0,0)',
							opacity:1
						});

					},200)

				}
				$(document).off('touchend touchmove');
			});

		});


	}
}



util.init();
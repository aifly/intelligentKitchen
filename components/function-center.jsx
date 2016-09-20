
import React from 'react';
import Time from '../libs/canvas.js';
import Temperature from '../libs/temperature.js';
import $ from 'jquery';
import Sortable from '../libs/Sortable.js';
import cityData from '../libs/city.js';
import '../libs/jquery.tap';
import IScroll from 'iscroll';
import FlyFoodList from './foodlist.jsx';
import hotCity from '../libs/hotcity';
import FlyBack  from './back.jsx';

import {PublicShadow} from './public-shadow.jsx';

import {GetLunarDay,GetDateStr,getFurtureDate,getMonthAndDate} from '../libs/Calendar.js';

//最左侧的控制中心组件。
 class FlyFunctionCenter extends React.Component{
	constructor(option){
		super(option);
		this.closeDrag=this.closeDrag.bind(this);
		this.state ={
			activeCityData : [
				{"cn_name": "北京","pinyin": "BEIJING"},
			],
			weatherData:[
				
			],
			currentData:'',
			
		}
		this.getCityBySpell = this.getCityBySpell.bind(this);
		this.back = this.back.bind(this);
		this.showCityList = this.showCityList.bind(this);
		this.activeCity = this.activeCity.bind(this);
	}

	index(elems, parent, selector) {
        var parent = parent || elems.parentNode,
            cindex = -1,
            selector = selector || "*";
        Array.from(parent.querySelectorAll(selector)).forEach(function (item, i) {
            "use strict";
            if (item === elems) {
                cindex = i;
            }
        });
        return cindex;
    }


	getCityBySpell(spell){
		let citys = [];
		hotCity.forEach((city,i)=>{
			if(city.pinyin.charAt(0) === spell){
				let c =  {
					className:'',
					cn_name:city.cn_name,
					pinyin:city.pinyin
				}
				this.state.activeCityData.forEach((item,k)=>{
					if(item.pinyin === city.pinyin && item.cn_name === city.cn_name){
						c.className = 'active';
					}
				});
				citys.push(c);
			}
		}); 

		return	citys.map((city,i)=>{
			return <li data-spell={city.pinyin} className={'fly-city-item '+city.className} key={i}>{city.cn_name}</li>
		});


	}

	activeCity(e){//选中or取消选中城市
		let target = e.target,
			classList = target.classList;
		if(classList.contains('fly-city-item')){
			if(classList.contains('active')){//已经选中了，去掉选中
				//let index =this.index(e.target,null,'.fly-city-item');
				this.state.activeCityData.forEach(( item , i )=>{
					if(target.innerHTML === item.cn_name && target.getAttribute('data-spell') === item.pinyin){
						this.state.activeCityData.splice(i,1);
					}
				});
			}
			else{
				this.state.activeCityData.push({
					pinyin:target.getAttribute('data-spell'),
					className:'active',
					cn_name:target.innerHTML
				})
			}
			this.renderScroll();
			this.forceUpdate();
		}

	}

	back(){
		this.refs['fly-hotcity-list'].classList.remove('active');
	}

	showCityList(){
		this.refs['fly-hotcity-list'].classList.add('active');
	}
	
	render(){

		let hotCityData = hotCity.map((item,i)=>{
			return <li key={i}>{item.cn_name}</li>
		});

		let recProps = {
			tags:['肉类','蔬菜','水产'],
			type:'rec-food',
			obserable:this.props.obserable
		},
		recMenuProps = {
			tags:['口味','营养','颜色'],
			type:'rec-menu',
			obserable:this.props.obserable
		}


		return (
			<li className="fly-food fly-cook-book-item">
				<div className="fly-cook-book-item-C" ref='fly-cook-book-item-C'> 
					<div className="fly-weather  fly-food-item fly-top3" ref='weather'>
						<article style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'hidden'}}>
							<section>
							<ol className="fly-weather-C">
								{this.state.weatherData.map((item,i)=>{
									return (
										<li key={i}>
											<img src={item.src} />
											<span>{item.date}</span>
										</li>
									)	
								})}
							</ol>
							<div className="fly-time-C">
								<div className="fly-time">
									<canvas ref='fly-timer-canvas' width="100%" ></canvas>
									<canvas ref='fly-temperature-canvas' width="100%"></canvas>
								</div>
								<div className="fly-date">
									<h1>{this.state.currentData}</h1>
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
								<div className="fly-city-scroll-C" ref="fly-city-scroll-C">
									<ul>
										{this.state.activeCityData.map((item,i)=>{

											return <li key={i}>{item.cn_name}</li>
										})}
									</ul>
								</div>
								<div className="fly-add" onTouchTap={this.showCityList}>+</div>
							</div>
						</section>	
						<section className='fly-hotcity-list' ref='fly-hotcity-list'>
							<h1 className='fly-hotcity-title'>
								<FlyBack callBack={this.back}></FlyBack>
								<span>热门城市</span>
								<span onTouchTap={this.back}>确定</span>
							</h1>
							<div className='fly-hotcity-C'>
								<div className='fly-hotcity-scroll' ref='fly-hotcity-scroll'>
									<ul onTouchTap={this.activeCity}>
										<li className="fly-first-spell">A</li>
										{this.getCityBySpell("A")}
										<li className="fly-first-spell">B</li>
										 {this.getCityBySpell("B")}
										<li className="fly-first-spell">C</li>
									 	{this.getCityBySpell("C")}
										<li className="fly-first-spell">D</li>
										{this.getCityBySpell("D")} 
										<li className="fly-first-spell">E</li>
										 {this.getCityBySpell("E")}
										<li className="fly-first-spell">F</li>
										 {this.getCityBySpell("F")}
										<li className="fly-first-spell">G</li>
										 {this.getCityBySpell("G")}
										<li className="fly-first-spell">H</li>
									 	{this.getCityBySpell("H")}
										<li className="fly-first-spell">I</li>
										{this.getCityBySpell("I")} 
										<li className="fly-first-spell">J</li>
										 {this.getCityBySpell("J")}
										<li className="fly-first-spell">K</li>
										 {this.getCityBySpell("K")}
										<li className="fly-first-spell">L</li>
										 {this.getCityBySpell("L")}
										<li className="fly-first-spell">M</li>
										 {this.getCityBySpell("M")}
										<li className="fly-first-spell">N</li>
										 {this.getCityBySpell("N")}
										<li className="fly-first-spell">O</li>
										 {this.getCityBySpell("O")}
										<li className="fly-first-spell">P</li>
										{this.getCityBySpell("P")}										 
										<li className="fly-first-spell">Q</li>
										 {this.getCityBySpell("Q")}
										<li className="fly-first-spell">R</li>
										 {this.getCityBySpell("R")}
										<li className="fly-first-spell">S</li>
										 {this.getCityBySpell("S")}
										<li className="fly-first-spell">T</li>
										 {this.getCityBySpell("T")}
										<li className="fly-first-spell">U</li>
										 {this.getCityBySpell("U")}
										<li className="fly-first-spell">V</li>
										 {this.getCityBySpell("V")}
										<li className="fly-first-spell">W</li>
										 {this.getCityBySpell("W")}
										<li className="fly-first-spell">X</li>
										 {this.getCityBySpell("X")}
										<li className="fly-first-spell">Y</li>
										 {this.getCityBySpell("Y")}
										<li className="fly-first-spell">Z</li>
										 {this.getCityBySpell("Z")}
									</ul>
								</div>
								<ul className='fly-hotcity-spell'>
									<li>A</li>
									<li>B</li>
									<li>C</li>
									<li>D</li>
									<li>E</li>
									<li>F</li>
									<li>G</li>
									<li>H</li>
									<li>I</li>
									<li>J</li>
									<li>K</li>
									<li>L</li>
									<li>M</li>
									<li>N</li>
									<li>O</li>
									<li>P</li>
									<li>Q</li>
									<li>R</li>
									<li>S</li>
									<li>T</li>
									<li>U</li>
									<li>V</li>
									<li>W</li>
									<li>X</li>
									<li>Y</li>
									<li>Z</li>
								</ul>
							</div>

						</section>	
						</article>
					</div>
					<div className="fly-rec-food fly-food-item fly-top2" ref='rec-food'>
						<FlyFoodList {...recProps}></FlyFoodList>
					</div>
					<div className="fly-rec-menu fly-food-item fly-top1" ref='rec-menu'>
						<FlyFoodList {...recMenuProps}></FlyFoodList>
					</div>	
				</div>

				<div className="mask"></div>
			</li>
		)
	}

	componentDidMount(){



		this.init();

		/*this.state.cityData = cityData.map((item,i)=>{
			return <li key={i}>{item.city}</li>
		});*/

		let weatherIcos=[
			'./assets/images/sun.png',
			'./assets/images/rain.png',
			'./assets/images/cloud.png',
			'./assets/images/sun1.png',
			'./assets/images/rain.png'
		]

		for(var i =0;i<5;i++){
			this.state.weatherData.push({
				src:weatherIcos[i],
				date:getFurtureDate(i)
			})
		}

		var dd=  new Date();
		this.state.currentData= getMonthAndDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());

		this.forceUpdate();

		let scrollUl = this.refs['fly-city-scroll-C'];

		setTimeout(()=>{
			
			this.renderScroll();
			this.activeCityScroll = new IScroll(scrollUl,{
				disableMouse:true,
				invertWheelDirection:true,
				scrollX: true,
		 		scrollY: false
			});
			let cityScroll = new IScroll(this.refs['fly-hotcity-scroll']);
		},1);

	}

	renderScroll(){

		let scrollUl = this.refs['fly-city-scroll-C'];
		let width =scrollUl.children[0].children[0].offsetWidth;
			scrollUl.children[0].style.width = (width+2) * this.state.activeCityData.length +'px';

		this.activeCityScroll && this.activeCityScroll.refresh();
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

			 
			

	/*
			var scrollC = data.cityScrollC.find('ul');
			this.fillCity(cityData,scrollC);
			let li = data.cityScrollC.find('ul li');

			scrollC.width(li.length*li.width());

			
*/
		},1);

	}
	timerCanvasStart(canvas){
		let self = this;
		new Time({
			canvas:canvas,
			obserable:self.props.obserable,
			isTime:true
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

	closeDrag(){

		this.programa.removeClass('active');
		this.sort && this.sort.destroy();
		this.isEnableDrag = false;
	}

	bindEvent(document){

		let self = this;

		this.sort =  null;
		this.foods = $('#fly-main .fly-food-item');
		this.programa = $('#fly-main .fly-cook-book-C .fly-cook-book-item');
		this.cookBookC = $('#fly-main .fly-cook-book-C');
		//this.closeBar = $();

		let {obserable} = this.props;

		obserable.on('closeDrag',()=>{
			self.closeDrag();
		});



		var data = this;
 

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
				},140);
				
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
			
			if(!isTop || $(e.target).hasClass('fly-city-scroll-C')||$(e.target).parents('.fly-city-scroll-C').length>0
				|| $(e.target).hasClass('foodlist-content')|| $(e.target).parents('.foodlist-content').length>0
				 || $(e.target).hasClass("fly-hotcity-list") || $(e.target).parents('.fly-hotcity-list').length){
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
				
				self.sort = new Sortable(data.cookBookC[0],{group:'omega'});
				self.props.obserable.trigger({type:'showDone'})

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

export default PublicShadow(FlyFunctionCenter);
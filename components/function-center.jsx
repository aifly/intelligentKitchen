
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
			currentFoodId:-1,
			activeCityData : [
				{"cn_name": "北京","pinyin": "BEIJING",className:'active'},
				{"cn_name": "广州","pinyin": "GUANGZHOU",className:'active'}
			], 
			recFoods:[
				
			],
			weatherData:[
				
			],
			BJShow:true,
			GZShow:true,
			showCityList:false,
			currentData:'',
			currentPannel:[3,2,1],
			isShow:false,
			isEnableDrag:false //是否启用了拖拽
			
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
						c.className = item.className;
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
		e.preventDefault();
		let target = e.target,
			classList = target.classList;
		if(classList.contains('fly-city-item')){
			var json = {};
			this.state.activeCityData.forEach((item,i) =>{
				if(target.innerHTML === item.cn_name && target.getAttribute('data-spell') === item.pinyin){
					json.pinyin = item.pinyin;
					json.iNow = i;
					json.cn_name = item.cn_name;
				}
			});

			if(json.pinyin){
				this.state.activeCityData.splice(json.iNow,1);
			}else{

				this.state.activeCityData.push({
					pinyin:target.getAttribute('data-spell'),
					className:'active',
					cn_name:target.innerHTML
				});

			}
			

			//this.renderScroll();
			this.forceUpdate();
		}

		return 0;

	}

	back(){
		//this.refs['fly-hotcity-list'].classList.remove('active');
		//var data = this.state.activeCityData.concat([]);
		this.state.showCityList = false;

		this.forceUpdate(()=>{
			
			this.renderScroll();
			
		})
	}

	showCityList(){
		
		this.state.showCityList = true;
		this.forceUpdate();

		//this.refs['fly-city-scroll-C'].querySelector('ul').innerHTML ='';
		//this.state.activeCityData.length  = 0;

	
		//this.refs['fly-hotcity-list'].classList.add('active');
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
				{/*<div>{
					this.state.activeCityData.map((f,i)=>{
						return <span>{f.cn_name}</span>
					})
				}</div>*/}
				<div style={{position:'absolute',width:'100%',height:'100%',zIndex:(!this.state.isShow || this.state.isEnableDrag)?1000:-1}}></div>
				<div className="fly-cook-book-item-C" ref='fly-cook-book-item-C' style={{opacity:this.state.isShow?1:0,WebkitTransition:'opacity 1s'}}> 
					<div className={"fly-weather  fly-food-item fly-top"+(this.state.currentPannel[0])} ref='weather'>
						<span className='tag'  onTouchStart={this.timeOrWeather.bind(this)}>时间 / 天气<canvas width='73' height='300'></canvas></span>
						<article style={{borderRadius:30,position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'hidden'}}>
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
									<h1>冬季食物推荐</h1>
									<div className="fly-rec-food-container">
										<ul>
											{
												this.state.recFoods.map((f,i)=>{
													if(i<5){
														return <li className={this.state.currentFoodId === f.id ? 'active':''} onTouchStart={this.getFoodById.bind(this)} key={i} data-index={i}>{f.name.length>3?f.name.substring(0,3)+'...':f.name}</li>;	
													}
													return '';
												})
											}
										</ul>
									</div>
								</div>
							</div>
							<div className="fly-city-C">
								<div className="fly-city-scroll-C" ref="fly-city-scroll-C">

										<ul style={{height:'1.5vw'}}>
											{this.state.activeCityData.map((item,i)=>{
												return <li style={{top:0,left:(i*38.4*6)}} key={i}>{item.cn_name}</li>
											})}
										</ul>
									{/*<div style={{border:'1px solid red'}}>
										{this.state.BJShow && <span>北京</span>}
										{this.state.GZShow && <span>广州</span>}
										
									</div>*/}
									
								</div>
								<div className="fly-add" onTouchStart={this.showCityList}>+</div>
							</div>
						</section>	
						<section className={'fly-hotcity-list '+ (this.state.showCityList?'active':'')} ref='fly-hotcity-list'>
							<h1 className='fly-hotcity-title'>
								<FlyBack callBack={this.back}></FlyBack>
								<span>热门城市</span>
								<span onTouchStart={this.back}>确定</span>
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
					<div className={"fly-rec-food fly-food-item fly-top" + this.state.currentPannel[1]} ref='rec-food'>
						<span className='tag' onTouchStart={this.recMaterials.bind(this)}>推荐食材<canvas width='73' height='250'></canvas></span>
						<FlyFoodList {...recProps} {...this.props}></FlyFoodList>
					</div>
					<div className={"fly-rec-menu fly-food-item fly-top"+this.state.currentPannel[2]} ref='rec-menu'>
						<span className='tag'  onTouchStart={this.recFood.bind(this)}>推荐菜谱<canvas width='73' height='250'></canvas></span>
						<FlyFoodList {...recMenuProps}  {...this.props}></FlyFoodList>
					</div>	
				</div>

				<div className="mask"></div>
			</li>
		)
	}

	getFoodById(e){
		let {obserable} = this.props;
		let target = e.target;

		
		

		var index = target.getAttribute('data-index');


		let targetData =  this.state.recFoods[index];


		switch(targetData.type){
			case "image":
				var food =this.state.recFoods[index];
					window.currentFood = food;
				obserable.trigger({
					type:'fillFood',
					data:food
				});
				this.setState({
					currentFoodId:food.id
				});
			break;
			case "video":
				var food =this.state.recFoods[index];
					window.currentFood = food;
				obserable.trigger({
					type:'fillFoodByVideo',
					data:food
				});

				this.setState({
					currentFoodId:food.id
				});

				/*setTimeout(()=>{
					var video = obserable.trigger({
						type:'getVideo'
					});
					//video && video.play();
				},100);*/
				
				obserable.trigger({type:'updateStep',data:0});
				
			break;
		}

		obserable.trigger({
			type:'fillSteps',
			data:this.state.recFoods[index].steps
		});

		//清空盘子。
		obserable.trigger({
			type:'clearPlates'
		});
		//初始化进度条
		obserable.trigger({
			type:'initProgress',
			data:-1
		});

		obserable.trigger({ //清空当前的单个水果的识别
			type:"clearSingleFood"
		});

		obserable.trigger({
			type:'fillMaterialsData',
			data:{
				materials:this.state.recFoods[index].foodMaterial,
				//scaleData:this.state.addFoods[this.state.currentTimeSlot][index].scaleData
			}
		});


		obserable.trigger({type:'clearAlimentationData'});


		//obserable.trigger({type:'closeStep',data:e});//关闭步骤


		obserable.trigger({type:'clearAllTime'});//清空总时间

	}

	componentDidMount(){

		let {obserable,URL,userId} = this.props;


		obserable.on("clearFoodIdOnRec",()=>{
			this.setState({
					currentFoodId:-1
				}); 
		});

		obserable.on('showfunctionCenter',(flag)=>{
			this.setState({
				isShow:flag
			});
		});

		obserable.on('getfunctionCenterShow',()=>{
			return this.state.isShow;
		});



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
		this.state.recFoods = addFoods;
		this.forceUpdate();
 	


		setTimeout(()=>{

			 let scrollUl = this.refs['fly-city-scroll-C'];
			 this.renderScroll();
				this.activeCityScroll && this.activeCityScroll.destroy();
				this.activeCityScroll = new IScroll(scrollUl,{
					disableMouse:true,
					invertWheelDirection:true,
					scrollX: true,
			 		scrollY: false
				});
			let cityScroll = new IScroll(this.refs['fly-hotcity-scroll']);
		},1000);

		//获取推荐数据
		var s = this;
		$.ajax({
			url:URL.getKeepCookbook,
			data:{
				Userid:userId
			},
			success(data){
					if(!window.isLoadLocalData){
							s.setState({
								recFoods:data
							});
					}
			}
		});

	}

	renderScroll(){

			let scrollUl = this.refs['fly-city-scroll-C'];
			let width =38.4*6 ;//scrollUl.children[0].children[0].children[2].offsetWidth;
			var len = this.state.activeCityData.length || 2;
			scrollUl.children[0].style.width = (width+2) * len +'px';
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
			this.temperatureCanvasStart(temperatureCanvas,17);


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
	 var timer = new Time({
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
		//this.isEnableDrag = false;
		this.bindEvent(document);
		this.setSize();
	}

	/*setClass(){
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
		
	}*/

	closeDrag(){

		this.programa.removeClass('active');
		this.sort && this.sort.destroy();
		let self = this;
		let {obserable} = self.props;
		this.setState({
			isEnableDrag : false
		},()=>{
			obserable.trigger({type:'showIsEnableDrag',data:false});
			obserable.trigger({type:'showBookDetailIsEnableDrag',data:false});
			obserable.trigger({type:'switchMenu',data:false});
		});
	}

	recMaterials(){//点击推荐食材
		this.setState({
			currentPannel:[1,3,2]
		})
	}
	recFood(){//点击推荐菜谱
		this.setState({
			currentPannel:[2,1,3]
		})
	}
	timeOrWeather(){//时间/日期
		this.setState({
			currentPannel:[3,2,1]
		})
	}
	bindEvent(document){

		let self = this;

		this.sort =  null;
		/*this.foods = $('#fly-main .fly-food-item');
		this.programa = $('#fly-main .fly-cook-book-C .fly-cook-book-item');
		this.cookBookC = $('#fly-main .fly-cook-book-C');*/
		//this.closeBar = $();

		let {obserable} = this.props;

		obserable.on('closeDrag',()=>{
			self.closeDrag();
		});



		var data = this;

		/*data.foods.on('touchstart',(e)=>{
			if(self.state.isEnableDrag){//
				return;
			}

			let $target = $(e.target);
			//var target = $target.hasClass('fly-food-item')? $target:$target.parents('.fly-food-item');
			

			let index = $target.parents('.fly-food-item').index('.fly-food-item')*1,
				iNow = this.iNow % 3;
			
				if(index<0){
					return;
				}

				this.iNow = index;

				switch(index){
					case 0:
						this.setState({
							currentPannel:[3,2,1]
						})
					break;
					case 1:
						this.setState({
							currentPannel:[1,3,2]
						})
					break;
					case 2:
						this.setState({
							currentPannel:[2,1,3]
						})
					break;
				}
		});*/
		
		
	/*	$(this.refs['fly-cook-book-item-C']).on('touchstart',(e)=>{

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
				if(self.state.isEnableDrag){
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
				if(self.state.isEnableDrag){
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

			
			if(e.target.nodeName=== "SPAN" && $(e.target).parents('.fly-video-scroll-C').length){
				return;
			}
			var timer = setTimeout(()=>{
			
				self.setState({
					isEnableDrag:true
				},()=>{
					obserable.trigger({type:'showIsEnableDrag',data:self.state.isEnableDrag});
					obserable.trigger({type:'showBookDetailIsEnableDrag',data:self.state.isEnableDrag});
					obserable.trigger({type:'switchMenu',data:self.state.isEnableDrag});
				});


		
				data.programa.addClass('active');
				
				self.sort = new Sortable(data.cookBookC[0],{group:'omega'});
				//self.props.obserable.trigger({type:'showDone'})

			},3000);
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			let $target = $(e.target).hasClass('fly-cook-book-item')?$(e.target):$(e.target).parents('.fly-cook-book-item'),
				iNow = 0;

			$(document).on('touchmove',e=>{
				//clearTimeout(timer);
				if(self.state.isEnableDrag){
					if(iNow++ ===1){
						$target.removeClass('active');	
						
					}else{
						
					}
					
				}
			}).on('touchend',e=>{
				//clearTimeout(timer);
				if(!self.state.isEnableDrag){
					return;
				}
				$(document).off('touchmove touchend');
			});

		});*/
		

	}

	removeTopClass(){
		this.foods.removeClass('fly-top1 fly-top2 fly-top3')
	}

	/*startChangeMenu($target){

		let self =this;
		this.foods.css({WebkitTransition:'.3s',WebkitTransitionTimingFunction:"cubic-bezier(0, 0.9, 0.17, 1.01)"})
		$target.css({
			WebkitTransform:'translate3d(-100%,0,0)',
			opacity:0,
		});
		self.setClass();
		setTimeout(()=>{
			$target.css({
				WebkitTransform:'translate3d(0,0,0)',
				opacity:1,

			});

		},200)
	}*/
} 

export default PublicShadow(FlyFunctionCenter);
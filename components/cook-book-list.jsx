import React from 'react';
import {GetLunarDay,GetDateStr,getFullDate} from '../libs/Calendar.js';
/*import addFoods from '../libs/addFoods.js'; //测试数据*/
import './css/booklist.css';
import IScroll from 'iscroll';
import {FlyPublicData} from './public-data.jsx';
import FlyMyCollect from './mycollect.jsx';
import $ from 'jquery';


//已加入菜谱组件。

 class FlyCookBookList extends React.Component{
	constructor(option){
		super(option);
		this.state = {
			liWidth:307,
			currentTimeSlot:0,
			dates1:[],//第一排的日期
			dates2:[],//第二排的日期
			addFoods:[
				[],//早餐
				[],//中餐
				[]　//晚餐
			],//已添加的菜谱
			currentPannel:1,
			isShow:false,
			currentDate:GetDateStr(0),
			isEnableDrag:false,
			currentFoodId:-1
		}
		this.next = this.next.bind(this);
		this.getFoodById = this.getFoodById.bind(this);
		this.changeTimeSlot = this.changeTimeSlot.bind(this);
		this.change = this.change.bind(this);
		this.changeMyCollectTop = this.changeMyCollectTop.bind(this);
	}
	change(e){//切换

		this.setState({
			currentPannel:1
		})
	}

	changeMyCollectTop(e){

		this.setState({
			currentPannel:0
		})	
	}

	changeTimeSlot(e){
		var target = e.target;
		if(target.nodeName === "DIV" ){
			var index =	this.props.getIndex(e.target.parentNode.children,e.target);
			this.setState({
				currentTimeSlot:index
			},()=>{
				var D = new Date();
				let week = D.getDay();
				this.loading14DayData(week);
				this.scroll &&this.scroll.refresh();
			});
		}
		//
	}
	render(){
		let isShow = !this.state.isShow || this.state.isEnableDrag;

		return (
			<li className="fly-cook-list fly-cook-book-item" ref='fly-cook-list'>
				<div style={{position:'relative'}}>
					<div style={{position:'absolute',width:'100%',height:'100%',zIndex:isShow?1000:-1}}></div>
					<div style={{position:'relative',opacity:this.state.isShow?1:0,WebkitTransition:'opacity 1s'}}>
						<div className="fly-cook-book-item-C">
							<article className={"book-list-C add-collect "+(this.state.currentPannel?'active':'') } >
								<span onTouchStart={this.change} className='tag'>已加入菜谱<canvas width='73' height='280'></canvas></span>
								<aside className='booklist-left-C' onTouchStart={this.changeTimeSlot}>
									<div className={this.state.currentTimeSlot===0?'active':''}>早餐</div>
									<div className={this.state.currentTimeSlot===1?'active':''}>中餐</div>
									<div className={this.state.currentTimeSlot===2?'active':''}>晚餐</div>
								</aside>
								<aside className='booklist-right-C'>
									<div className='bl-calendar'>
										<table>
											<thead>
												<tr>
													<th>日</th>
													<th>一</th>
													<th>二</th>
													<th>三</th>
													<th>四</th>
													<th>五</th>
													<th>六</th>
												</tr>
											</thead>
											<tbody onTouchStart={this.getCurrentCookBookByDate.bind(this)}>
												<tr>
													{this.state.dates1.map((item,i)=>{
														return (
															<td key={i} data-date={item.date} className={this.state.currentDate === item.date?'today':''}>
																<div className={item.isHasFood?'hasfood':''}>
																	<span>{item.date}</span>
																	<span>{item.lunar}</span>
																</div>
															</td>
														)
													})}
												</tr>
												<tr>
													{this.state.dates2.map((item,i)=>{
														return (
															<td key={i} data-date={item.date}  className={this.state.currentDate === item.date?'today':''}>
																<div className={item.isHasFood?'hasfood':''}>
																	<span>{item.date}</span>
																	<span>{item.lunar}</span>
																</div>
															</td>
														)
													})}
												</tr>
											</tbody>
										</table>
									</div>
									<div className='bl-food-list'>
										<div className={this.state.addFoods[this.state.currentTimeSlot].length?'bl-food-scroll':'bl-food-scroll no-data'} ref='scroll'>
											<ul ref='foods-C' style={{width:this.state.liWidth*this.state.addFoods[this.state.currentTimeSlot].length}}>
												{this.state.addFoods[this.state.currentTimeSlot].map((item,i)=>{
													return (
														<li key={i} onTouchStart={this.getFoodById}>
															<div data-index={i} style={{background:' url('+item.imgSrc+') no-repeat center top'}} className={this.state.currentFoodId === item.id ? 'active':''}>
																<canvas width='270' height='330'></canvas>
																<span>{item.name}</span>
																{item.type === 'video' && <img className='fly-play-ico' src='./assets/images/play.png'/>}
															</div>	
														</li>
													)
												})}
											</ul>
										</div>
										<div className='bl-food-next' onTouchStart={this.next}>></div>
									</div>
								</aside>
							</article>
						</div>
						<FlyMyCollect changeMyCollectTop={this.changeMyCollectTop} {...this.props} className={this.state.currentPannel?'':'active'}></FlyMyCollect>
					</div>
				</div>
			</li>
		)
	}

	updateCalendar(){

	

		var D =new Date();
		var yy=D.getFullYear();
		var mm=D.getMonth()+1;
		var dd=D.getDate();
		var ww=D.getDay();

		yy<100 && ( yy="19"+yy );

		let week = D.getDay();

		for(var i = -week;i<7-week;i++){
			this.state.dates1.push({
				date:GetDateStr(i),
				lunar:i===0?'今天':(GetLunarDay(yy,mm,dd+i)==='廿'?'廿十':GetLunarDay(yy,mm,dd+i)),
				id:'',
				isToday: i === 0 ? true : false,
				isHasFood:false
			});	
		}


		for(var j = i;j<14-week;j++){
			this.state.dates2.push({
				date:GetDateStr(j),
				lunar:GetLunarDay(yy,mm,dd+j)==='廿'?'廿十':GetLunarDay(yy,mm,dd+j),
				id:'',
				isHasFood:false
			});	

		}

		this.loading14DayData(week);

	}

	loading14DayData(week){

		let {URL,userId} = this.props;
		let s = this;
		$.ajax({
			url:URL.getBookList,
			type:'POST',
			data:{
				eatType:s.state.currentTimeSlot,
				userid:userId,
				bydate:getFullDate(-week)
			},
			success(data){

				for(var i =0,len = data.getdate.length/2 ;i<len;i++){
					s.state.dates1[i].isHasFood = data.getdate[i];
				}
				for(var i =0,len = data.getdate.length/2 ;i<len;i++){
					s.state.dates2[i].isHasFood = data.getdate[i+len];	
				}
				s.forceUpdate();
			}
		});
	}

	getFoodListByDate(date){
		
		let {URL,userId} = this.props,
			s = this;
		s.state.addFoods.forEach((food,i)=>{
			//i>0 && (food.length = 0);
			food.length = 0;
		});
		s.forceUpdate();
		$.ajax({
			type:"POST",
			url:URL.getCookBookList,
			data:{
				food_type:'Join',//注意J大写。
				Userid:userId,
				Typeid:date
			},
			success(data){
				data.forEach(d=>{
					s.state.addFoods[d.foodMtype*1].push(d);	
				});
			
				s.forceUpdate(()=>{
					
					if(s.state.addFoods[s.state.currentTimeSlot].length<=0){
						return;
					}
					let liWidth = s.refs['foods-C'].children[0].offsetWidth;
					s.setState({
						liWidth:liWidth
					});

					s.scroll = new IScroll(s.refs['scroll'],{
						scrollX:true,
						scrollY:false,
					});

					setTimeout(()=>{
						s.scroll.refresh();
					},100)

				});

				
			}
		})
	}

	getCurrentCookBookByDate(e){
		this.lastDate = this.lastDate || this.state.currentDate;
		var date = $(e.target).parents('td').data('date');
		if(!date){
			return;
		}

		if(this.lastDate === date){

			return;
		}

		this.setState({
			currentDate:date
		});
		var D = new Date();
		var year = D.getFullYear()+'',
			month = D.getMonth()+1;
			month<10&&(month='0'+month);
			date<10&&(date='0'+date);
		var d = year + month + date;

		this.lastDate = date;

		this.getFoodListByDate(d);
	}

	componentDidMount() {

		let {obserable,getTimeSlot} = this.props;//getTimeSlot是从高街组件中得到的属性。

		this.getFoodListByDate(getFullDate(0));//获取当天的加入的菜谱列表


		obserable.on("clearCurrentFoodId",()=>{//清空当前的菜谱的ID
			this.setState({
					currentFoodId:-1
			});
		})

		obserable.on('showIsEnableDrag',(flag)=>{
			this.setState({
				isEnableDrag:flag
			})
		});
		obserable.on('showCollect',(flag)=>{
			this.setState({
				isShow:flag
			})
		});

		this.state.currentTimeSlot = getTimeSlot;

		obserable.on('updateCalendar',()=>{
			this.updateCalendar();
		});
		
		this.updateCalendar();

		
	//this.state.addFoods[0] = addFoods;//默认填充早餐

		this.forceUpdate();

		if(this.state.addFoods[this.state.currentTimeSlot].length){
			setTimeout(()=>{
				let liWidth = this.refs['foods-C'].children[0].offsetWidth;
				this.setState({
	 				liWidth:liWidth
				});

				this.scroll = new IScroll(this.refs['scroll'],{
					scrollX:true,
					scrollY:false,
				});
			},1);
		}

		

		/*$(this.refs['fly-cook-list']).on('touchstart',e=>{
			
			let $target=$(e.target);
			//!$(e.target).parents('.active').length && !$(e.target).hasClass('active')) 
			//这里判断是为了不能直接拖拽下面的块。

			if((!$(e.target).parents('.active').length && !$(e.target).hasClass('active')) || $target.hasClass('bl-food-scroll') || $target.parents('.bl-food-scroll').length || $target.hasClass('foodlist-content') || $target.parents('.foodlist-content').length){

				return;
			}

			var target = $(e.target).hasClass('add-collect')?$(e.target):$(e.target).parents('.add-collect');

			var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			var disX = e.pageX;// - $target.offset().left;

			target.css({
				WebkitTransition:'none',
			});

			$(document).on('touchmove',e=>{

				e.preventDefault();
				
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;

				x > 0 && ( x = 0 );
				target.css({
					WebkitTransform:'translate3d(' + x + 'px,0,0)'
				});

				return 0;
			}).on('touchend',e=>{
				
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				var x = e.pageX - disX;
				$(document).off('touchend touchmove');
				if(x>= 0){
					return;
				}

				if(-x>=100){//
					this.setState({
						currentPannel:!this.state.currentPannel
					});										
				}


				target.removeClass('startMove').addClass('startMove').off('webkitAnimationEnd').on('webkitAnimationEnd',()=>{
					target.css({
						WebkitTransform:'translate3d(0,0,0)'
					});
				});
			});

		});*/

	}

	getFoodById(e,obj){
		let {obserable} = this.props;
		let target = '';
		if(e){
			switch(e.target.nodeName){
				case "DIV":
					target = e.target;
				break;
				case "SPAN":
				case "CANVAS":
					target = e.target.parentNode;
				break;
			};
		}else{
			target = obj;
		}

		if(!target.classList){
			return;
		}

		var index = target.getAttribute('data-index');


		let targetData =  this.state.addFoods[this.state.currentTimeSlot][index];


		switch(targetData.type){
			case "image":
				var food =this.state.addFoods[this.state.currentTimeSlot][index];
				obserable.trigger({
					type:'fillFood',
					data:food
				});
				this.setState({
					currentFoodId:food.id
				});
			break;
			case "video":
				var food =this.state.addFoods[this.state.currentTimeSlot][index];
				obserable.trigger({
					type:'fillFoodByVideo',
					data:food
				});

				this.setState({
					currentFoodId:food.id
				});

				setTimeout(()=>{
					var video = obserable.trigger({
						type:'getVideo'
					});
					video && video.play();
				},100);

				obserable.trigger({type:'updateStep',data:0});
				
			break;
		}

		obserable.trigger({
			type:'fillSteps',
			data:this.state.addFoods[this.state.currentTimeSlot][index].steps
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
				materials:this.state.addFoods[this.state.currentTimeSlot][index].foodMaterial,
				//scaleData:this.state.addFoods[this.state.currentTimeSlot][index].scaleData
			}
		});


		obserable.trigger({type:'clearAlimentationData'});


		//obserable.trigger({type:'closeStep',data:e});//关闭步骤


		obserable.trigger({type:'clearAllTime'});//清空总时间


	}

	next(){
		let x = this.scroll.x;
		x -= this.state.liWidth||0;
		x < this.scroll.maxScrollX && (x = this.scroll.maxScrollX);
		this.scroll.scrollTo(x,0,200);
	}
}


export default FlyPublicData(FlyCookBookList);
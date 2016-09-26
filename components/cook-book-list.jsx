import React from 'react';
import {GetLunarDay,GetDateStr} from '../libs/Calendar.js';
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
			isEnableDrag:false
		}
		this.next = this.next.bind(this);
		this.getFoodById = this.getFoodById.bind(this);
		this.changeTimeSlot = this.changeTimeSlot.bind(this);
		this.change = this.change.bind(this);
		this.changeMyCollectTop = this.changeMyCollectTop.bind(this);
	}
	change(e){//切换

		if( !this.state.currentPannel && e.target.classList.contains('book-list-C')){
			this.setState({
				currentPannel:1
			})
		}
	}

	changeMyCollectTop(e){
		if(this.state.currentPannel && e.target.classList.contains('fly-collect-C')){
			this.setState({
				currentPannel:0
			})	
		}
	}

	changeTimeSlot(e){
		var target = e.target;
		if(target.nodeName === "DIV" ){
			var index =	this.props.getIndex(e.target.parentNode.children,e.target);
			this.setState({
				currentTimeSlot:index
			})
		}
		//
	}
	render(){
		let isShow = !this.state.isShow || this.state.isEnableDrag;

		return (
			<li className="fly-cook-list fly-cook-book-item" ref='fly-cook-list'>
				<div style={{position:'relative'}}>
					<div style={{position:'absolute',width:'100%',height:'100%',zIndex:1000,display:isShow?'block':'none'}}></div>
					<div style={{position:'relative',opacity:this.state.isShow?1:0}}>
						<div className="fly-cook-book-item-C">
							<article className={"book-list-C add-collect "+(this.state.currentPannel?'active':'') } onTouchTap={this.change}>
								<aside className='booklist-left-C' onTouchTap={this.changeTimeSlot}>
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
											<tbody>
												<tr>
													{this.state.dates1.map((item,i)=>{
														return (
															<td key={i} className={item.isToday?'today':''}>
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
															<td key={i}>
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
														<li key={i} onTouchTap={this.getFoodById}>
															<div data-index={i} style={{background:'  url('+item.imgSrc+') no-repeat center',backgroundSize:'cover'}}>
																<span>{item.name}</span>
																{item.type === 'video' && <img className='fly-play-ico' src='./assets/images/play.png'/>}
															</div>	
														</li>
													)
												})}
											</ul>
										</div>
										<div className='bl-food-next' onTouchTap={this.next}>></div>
									</div>
								</aside>
							</article>
						</div>
						<FlyMyCollect changeMyCollectTop={this.changeMyCollectTop} obserable={this.props.obserable} className={this.state.currentPannel?'':'active'}></FlyMyCollect>
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
				lunar:i===0?'今天':GetLunarDay(yy,mm,dd+i),
				id:'',
				isToday: i === 0 ? true : false,
				isHasFood:i % 3 === 0
			});	
		}

		for(var j = i;j<14-week;j++){
			this.state.dates2.push({
				date:GetDateStr(j),
				lunar:GetLunarDay(yy,mm,dd+j),
				id:'',
				isHasFood:j % 2 === 0
			});	
		}

	}

	componentDidMount() {

		let {obserable,getTimeSlot} = this.props;//getTimeSlot是从高街组件中得到的属性。


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

		this.state.addFoods[this.state.currentTimeSlot] = addFoods;

		this.forceUpdate();

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


		$(this.refs['fly-cook-list']).on('touchstart',e=>{
			
			let $target=$(e.target);
			if($target.hasClass('bl-food-scroll') || $target.parents('.bl-food-scroll').length || $target.hasClass('foodlist-content') || $target.parents('.foodlist-content').length){
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

				target.addClass('startMove').on('webkitAnimationEnd',()=>{
					target.css({
						WebkitTransform:'translate3d(0,0,0)'
					});
				});
				

				
				
			});

		});

	}

	getFoodById(e,obj){

		let target = '';
		if(e){
			switch(e.target.nodeName){
				case "DIV":
					target = e.target;
				break;
				case "SPAN":
				case "IMG":
					target = e.target.parentNode;
				break;
			};
		}else{
			target = obj;
		}

		if(!target.classList){
			return;
		}

		Array.from(this.refs['foods-C'].querySelectorAll('li div')).forEach((item,i)=>{
			item.classList.remove('active');
		});
		target.classList.add('active');
		
		let {obserable} = this.props;

		var index = target.getAttribute('data-index');


			let targetData =  this.state.addFoods[this.state.currentTimeSlot][index];

		switch(targetData.type){
			case "image":

				obserable.trigger({
					type:'fillFood',
					data:this.state.addFoods[this.state.currentTimeSlot][index]
				});
				
			break;
			case "video":
			
				obserable.trigger({
					type:'fillFoodByVideo',
					data:this.state.addFoods[this.state.currentTimeSlot][index]
				});
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

		obserable.trigger({
			type:'fillAlimentationData',
			data:{
				materials:this.state.addFoods[this.state.currentTimeSlot][index].foodMaterial,
				scaleData:this.state.addFoods[this.state.currentTimeSlot][index].scaleData
			}
		});

		//清空盘子。
		obserable.trigger({
			type:'clearPlates'
		});


	}

	next(){
		let x = this.scroll.x;
		x -= this.state.liWidth||0;
		x < this.scroll.maxScrollX && (x = this.scroll.maxScrollX);
		this.scroll.scrollTo(x,0,200);
	}
}


export default FlyPublicData(FlyCookBookList);
import React, { Component } from 'react';
import './css/foodlist.css';
import {FlyPublicData} from './public-data.jsx';
import IScroll from 'iscroll';
import $ from 'jquery';
/*import addFoods from '../libs/addfoods.js';//*/

//第一部分切换的菜谱和食材列表组件。
 class FlyFoodList extends Component {
	constructor(option){
		super(...option);
		this.state = {
			dataSource:[
				[],//早餐
				[],//中餐
				[]//晚餐
			],
			ulWidth:500,
			currentIndex:-1,//当前选中的菜谱
			currentTimeSlot:0,//当前时间段　0:早餐,1:中餐,2:晚餐。如果type为推荐食材或推荐食谱的时候，currentTimeSlot=-1;
		};
		this.next = this.next.bind(this);
		this.changeTimeSlot = this.changeTimeSlot.bind(this);
		this.getFoodById = this.getFoodById.bind(this);

	}

	changeTimeSlot(e){
		var target = e.target; 

		if(target.nodeName === "LI" ){
			var index =	this.props.getIndex(e.target.parentNode.children,e.target);

			this.setState({
				currentTimeSlot:index,
				ulWidth:(this.refs['foodlist-content'].children[0].children[0].clientWidth+10)*(Math.ceil(this.state.dataSource[index].length/2))+2
			},()=>{
				this.scroll.scrollTo(0,0);
				this.scroll.refresh();
			})

		}
		//
	}
	render() {
		let style ={
			width:((this.state.dataSource.length/2|0)+1)*100
		}
		return (
			
			<div className='foodlist'>

				<div ref='foodlist-C' className='foodlist-C'>
					<section>
						{this.props.isShowTimeline && <ol onTouchStart={this.changeTimeSlot}>
							<li className={this.state.currentTimeSlot === 0 ? 'active':''}>{this.props.tags[0]}</li>
							<li className={this.state.currentTimeSlot === 1 ? 'active':''}>{this.props.tags[1]}</li>
							<li className={this.state.currentTimeSlot === 2 ? 'active':''}>{this.props.tags[2]}</li>
						</ol>}
						<div className={this.state.dataSource[this.state.currentTimeSlot].length?'foodlist-content':'foodlist-content no-data'} ref='foodlist-content'>
							<ul style={{width:this.state.ulWidth}} onTouchTap={this.getFoodById}>
								{this.state.dataSource[this.state.currentTimeSlot].length&&this.state.dataSource[this.state.currentTimeSlot].map((data,i)=>{
									return (
										<li  key={i} className={i<=Math.floor(this.state.dataSource[this.state.currentTimeSlot].length/2)?'':'food-top'}>
											<div data-index={i}  style={{background:'url('+data.imgSrc+') no-repeat center bottom',backgroundSize:'cover'}} className={i===this.state.currentIndex ? 'active':''}>

												<span>{data.name}</span>
												{data.type === 'video' && <img className='fly-play-ico' src='./assets/images/play.png'/>}
											</div>
										</li>
									)
								})}
							</ul>
						</div>
					</section>
				</div>
				<div className='foodlist-next' onTouchStart={this.next}>></div>
			</div>
			
		);
	}
	next(){
		let x = this.scroll.x;
		x-=this.liWidth||0;
		x < this.scroll.maxScrollX && (x = this.scroll.maxScrollX);
		this.scroll.scrollTo(x,0,200);
	}
	componentDidMount(){

		let {type,getTimeSlot,URL,userId} = this.props;

		this.state.currentTimeSlot = getTimeSlot;
		let s = this;
		switch(type){//推荐食材
			case 'rec-food':

				this.state.currentTimeSlot = 0;

				$.ajax({
					url:URL.getCookBookList,
					data:{
						Userid:userId,
						food_type:'rec'
					},
					success(data){
						var i=0;
						data.forEach(d=>{
							s.state.dataSource[d.foodMtype*1-1].push(d);
							if(d.foodMtype*1-1 === 0){
								i++;
							}
						});
						//s.state.dataSource[s.state.currentTimeSlot] = data;
						s.forceUpdate(()=>{
							s.ajaxEnd(s,i);
						});
					}
				})
				
				//this.state.dataSource[this.state.currentTimeSlot]= addFoods;
				//s.ajaxEnd(s);
			break;
			case 'rec-menu'://推荐菜谱
				this.state.currentTimeSlot = 0;
				$.ajax({
					url:URL.getCookBookList,
					data:{
						Userid:userId,
						food_type:'men'
					},
					success(data){
					//	console.log(data);
						var i=0;
						data.forEach(d=>{
							s.state.dataSource[d.foodMtype*1].push(d);	
							if(d.foodMtype*1 === 0){
								i++;
							}
						});
						//s.state.dataSource[s.state.currentTimeSlot] = data;
						s.forceUpdate(()=>{
							s.ajaxEnd(s,i);
						});
					}
				})
				
				//this.state.dataSource[this.state.currentTimeSlot]= addFoods;

				//s.ajaxEnd(s);
			break;
			case 'my-collect': // 我的收藏。

				$.ajax({
					url:URL.getCookBookList,
					data:{ 
						Userid:userId,
						food_type:'collection'
					},
					success(data){
						//console.log(data);
						s.state.dataSource[s.state.currentTimeSlot] = data;
						s.forceUpdate(()=>{
							s.ajaxEnd(s,data.length);
						});
					}
				});

				//s.state.dataSource[s.state.currentTimeSlot] = addFoods;
				
			break;
		}

	}

	ajaxEnd(_this,len){
		setTimeout(()=>{
			_this.setState({
				ulWidth:(_this.refs['foodlist-content'].children[0].children[0].clientWidth+10)*(Math.ceil(len/2))+2
			});
			
			_this.liWidth = _this.refs['foodlist-content'].children[0].children[0].clientWidth;
			_this.scroll = new IScroll(_this.refs['foodlist-content'],{
				scrollX:true,
				scrollY:false,
				click:false,
				disableMouse:true ,//是否关闭鼠标事件探测。如知道运行在哪个平台，可以开启它来加速。
				//momentum:false,//是否开启动量动画，关闭可以提升效率。
				fadeScrollbars:false,//是否渐隐滚动条，关掉可以加速
			});

		},10);
		
	}

	getFoodById(e){



		let target = '';
		switch(e.target.nodeName){
			case "DIV":
			target = e.target.parentNode;
			break;
			case "SPAN":
			case "IMG":
			target = e.target.parentNode.parentNode;
			break;
		};

		if(!target.classList){
			return;
		}


		let {obserable,index} = this.props;

		let cIndex = index(target,null,'li');

		this.setState({
			currentIndex:cIndex
		})



/*
		Array.from(this.refs['foods-C'].querySelectorAll('li div')).forEach((item,i)=>{
			item.classList.remove('active');
		});
		target.classList.add('active');*/
		

		var iNow = target.querySelector('div').getAttribute('data-index');

		let targetData =  this.state.dataSource[this.state.currentTimeSlot][iNow];



		switch(targetData.type){
			case "image":
				obserable.trigger({
					type:'fillFood',
					data:this.state.dataSource[this.state.currentTimeSlot][iNow]
				});
				
			break;
			case "video":
			
				obserable.trigger({
					type:'fillFoodByVideo',
					data:this.state.dataSource[this.state.currentTimeSlot][iNow]
				});
				obserable.trigger({type:'updateStep',data:0});
			break;
		}

		obserable.trigger({
			type:'fillSteps',
			data:this.state.dataSource[this.state.currentTimeSlot][iNow].steps
		});


		/*obserable.trigger({
			type:'fillFood',
			data:this.state.dataSource[this.state.currentTimeSlot][iNow]
		});*/

		obserable.trigger({ //填充饼图
			type:'fillMaterialsData',
			data:{
				materials:this.state.dataSource[this.state.currentTimeSlot][iNow].foodMaterial
			}
		});

		//obserable.trigger({type:'closeStep',data:e});//关闭步骤


		//清空盘子。
		obserable.trigger({
			type:'clearPlates'
		});
		//初始化进度条
		obserable.trigger({
			type:'initProgress',
			data:-1
		});

		obserable.trigger({type:'clearAllTime'});//清空总时间
		 

	}
}

FlyFoodList.defaultProps = {
	isShowTimeline:true,
	tags:['早餐','中餐','晚餐']
}


export default FlyPublicData(FlyFoodList);
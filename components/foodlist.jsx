import React, { Component } from 'react';
import './css/foodlist.css';
import {FlyPublicData} from './public-data.jsx';
import IScroll from 'iscroll';
import addFoods from '../libs/addfoods.js';//

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
			currentTimeSlot:0,//当前时间段　0:早餐,1:中餐,2:晚餐。
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
				currentTimeSlot:index
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
						{this.props.isShowTimeline && <ol onTouchTap={this.changeTimeSlot}>
							<li className={this.state.currentTimeSlot === 0 ? 'active':''}>{this.props.tags[0]}</li>
							<li className={this.state.currentTimeSlot === 1 ? 'active':''}>{this.props.tags[1]}</li>
							<li className={this.state.currentTimeSlot === 2 ? 'active':''}>{this.props.tags[2]}</li>
						</ol>}
						<div className={this.state.dataSource[this.state.currentTimeSlot].length?'foodlist-content':'foodlist-content no-data'} ref='foodlist-content'>
							<ul style={{width:this.state.ulWidth}} onTouchTap={this.getFoodById}>
								{this.state.dataSource[this.state.currentTimeSlot].map((data,i)=>{
									return (
										<li  key={i} className={i<=Math.floor(this.state.dataSource[this.state.currentTimeSlot].length/2)?'':'food-top'}>
											<div data-index={i} style={{background:'url('+data.imgSrc+') no-repeat center',backgroundSize:'cover'}}>
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
				<div className='foodlist-next' onTouchTap={this.next}>></div>
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

		let {type,getTimeSlot} = this.props;
		this.state.currentTimeSlot = getTimeSlot;
		switch(type){
			case 'rec-food':
				this.state.dataSource[this.state.currentTimeSlot]= addFoods;
			break;
			case 'rec-menu':
				this.state.dataSource[this.state.currentTimeSlot]= addFoods;
			break;
			case 'my-collect': // 我的收藏。
				this.state.dataSource[this.state.currentTimeSlot]= addFoods;
			break;
		}


		setTimeout(()=>{
			this.setState({
				ulWidth:this.refs['foodlist-content'].children[0].children[0].clientWidth*(Math.ceil(this.state.dataSource[this.state.currentTimeSlot].length/2))+2
			});
			this.liWidth = this.refs['foodlist-content'].children[0].children[0].clientWidth;
			this.scroll = new IScroll(this.refs['foodlist-content'],{
				scrollX:true,
				scrollY:false,
				click:false,
				disableMouse:true ,//是否关闭鼠标事件探测。如知道运行在哪个平台，可以开启它来加速。
				//momentum:false,//是否开启动量动画，关闭可以提升效率。
				fadeScrollbars:false,//是否渐隐滚动条，关掉可以加速
			});
		},1);
	}
	getFoodById(e){
		let target = '';
		switch(e.target.nodeName){
			case "DIV":
			target = e.target;
			break;
			case "SPAN":
			case "IMG":
			target = e.target.parentNode;
			break;
		};

		if(!target.classList){
			return;
		}

/*
		Array.from(this.refs['foods-C'].querySelectorAll('li div')).forEach((item,i)=>{
			item.classList.remove('active');
		});
		target.classList.add('active');*/
		
		let {obserable} = this.props;

		var index = target.getAttribute('data-index');


		

		let targetData =  this.state.dataSource[this.state.currentTimeSlot][index];

		switch(targetData.type){
			case "image":
				obserable.trigger({
					type:'fillFood',
					data:this.state.dataSource[this.state.currentTimeSlot][index]
				});
				
			break;
			case "video":
			
				obserable.trigger({
					type:'fillFoodByVideo',
					data:this.state.dataSource[this.state.currentTimeSlot][index]
				});
				obserable.trigger({type:'updateStep',data:0});
			break;
		}

		obserable.trigger({
			type:'fillSteps',
			data:this.state.dataSource[this.state.currentTimeSlot][index].steps
		});


		/*obserable.trigger({
			type:'fillFood',
			data:this.state.dataSource[this.state.currentTimeSlot][index]
		});*/

		obserable.trigger({ //填充饼图
			type:'fillAlimentationData',
			data:{
				materials:this.state.dataSource[this.state.currentTimeSlot][index].foodMaterial,
				scaleData:this.state.dataSource[this.state.currentTimeSlot][index].scaleData
			}
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
		 

	}
}

FlyFoodList.defaultProps = {
	isShowTimeline:true,
	tags:['早餐','中餐','晚餐']
}


export default FlyPublicData(FlyFoodList);
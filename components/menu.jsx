import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {PublicMethods} from './public-methods.jsx';

import {gotoActivity} from '../libs/android';
 

injectTapEventPlugin();

 class FlyNav extends React.Component{
	constructor(option){
		super(option);
		this.state = {
			operatorArr:[
				{
					curSrc:'./assets/images/nav10.png',
					src:'./assets/images/nav10.png',
					_src:'./assets/images/nav10-1.png',
					menu:'设置'
				},{
					curSrc:'./assets/images/nav11.png',
					src:'./assets/images/nav11.png',
					_src:'./assets/images/nav11-1.png',
					menu:'开/关'
				}
			],
			menusArr:[
				{	
					curSrc:'./assets/images/nav1.png',
					src:'./assets/images/nav1.png',
					_src:'./assets/images/nav1-1.png',
					menu:'称量'
				},
				{
					curSrc:'./assets/images/nav2.png',
					src:'./assets/images/nav2.png',
					_src:'./assets/images/nav2-1.png',
					menu:'菜板'
				},
				{
					curSrc:'./assets/images/nav3.png',
					src:'./assets/images/nav3.png',
					_src:'./assets/images/nav3-1.png',
					menu:'菜谱'
				},
				{
					curSrc:'./assets/images/nav4.png',
					src:'./assets/images/nav4.png',
					_src:'./assets/images/nav4-1.png',
					menu:'统计'
				},
				{
					curSrc:'./assets/images/nav5.png',
					src:'./assets/images/nav5.png',
					_src:'./assets/images/nav5-1.png',
					menu:'提醒'
				},
				{
					curSrc:'./assets/images/nav6.png',
					src:'./assets/images/nav6.png',
					_src:'./assets/images/nav6-1.png',
					menu:'天气'
				},
				{
					curSrc:'./assets/images/nav7.png',
					src:'./assets/images/nav7.png',
					_src:'./assets/images/nav7-1.png',
					menu:'时间'
				},
				{
					curSrc:'./assets/images/nav8.png',
					src:'./assets/images/nav8.png',
					_src:'./assets/images/nav8-1.png',
					menu:'无线'
				},
				{
					curSrc:'./assets/images/nav9.png',
					src:'./assets/images/nav9.png',
					_src:'./assets/images/nav9-1.png',
					menu:'收藏'
				}
			],
			isShow:false,
			isEnableDrag:false
		}
		this.menuBarHandler = this.menuBarHandler.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.menuChange = this.menuChange.bind(this);
		this.operatorChange = this.operatorChange.bind(this);
	}
	render(){

		let renderArr = this.state.menusArr.map((item,i)=>{
			return (
				<li key={i} style={{background:'url('+item.curSrc+') no-repeat center center'}}>
					<span>{item.menu}</span>
				</li>
			)
		}),
		operatorArr = this.state.operatorArr.map((item,i)=>{
			return (
				<li key={i} style={{background:'url('+item.curSrc+') no-repeat center center'}}>
					<span>{item.menu}</span>
				</li>
			);
		});

		return (
			<nav className={'fly-nav '+ (this.state.isShow?'':'active')} ref='fly-menu'>
				<div style={{overflowY:' hidden',overflowX:' auto',height:'11.5vh'}}>
					<ul ref='fly-menu-C' className={this.state.isShow?'show':''} onTouchStart={this.menuChange}>
						{renderArr}
					</ul>
					<ul ref='fly-menu-C1' className={this.state.isShow?'show':''}  onTouchStart={this.operatorChange}>
						{operatorArr}
					</ul>
				</div>
				<div className='fly-menu-bar' onTouchStart={this.menuBarHandler}>
					<div className={this.state.isEnableDrag ? 'fly-sure':''}>{this.state.isEnableDrag ? '确定':'下拉菜单'}</div>
					<div style={{marginLeft:'-.45vw'}}>{this.state.isEnableDrag ? '':'>'}</div>
				</div>
				<div className={"fly-nav-mask "+ (this.state.isShow?'active':'') } ref="fly-nav-mask" onTouchStart={this.closeMenu}></div>
			</nav>
		)
	}


	getIndex(e,parentNode){
		let {index,obserable} = this.props,
			iNow = -1;
		let parent = e.target.nodeName === "SPAN"?e.target.parentNode:e.target;
		iNow = index(parent,parentNode,'li');

		return iNow;
	}

	operatorChange(e){
		e.preventDefault();
		var iNow = this.getIndex(e,this.refs['fly-menu-C1']);
		if(iNow<=-1){
			return;
		}
		this.state.operatorArr[iNow].curSrc = this.state.operatorArr[iNow].curSrc === this.state.operatorArr[iNow].src? this.state.operatorArr[iNow]._src:this.state.operatorArr[iNow].src;
		if(iNow === 0 ){
			gotoActivity('setting');
		}
		else{
			gotoActivity('openOrClose');
		}
		this.state.isShow = false;
		this.forceUpdate();
	}

	menuChange(e){
		e.preventDefault();
		let {obserable} = this.props;
		var iNow = this.getIndex(e,this.refs['fly-menu-C']);

		if(iNow<=-1 || !this.state.isShow){//this.state.isShow 表示菜单没有展开。不能执行点击事件。

			return;
		}


		
		switch(iNow){
			case 0://称量
			case 1://菜板
			case 4://提醒
				if(this.state.menusArr[0].curSrc === this.state.menusArr[0].src){
					this.state.menusArr[0].curSrc = this.state.menusArr[0]._src;
					this.state.menusArr[1].curSrc = this.state.menusArr[1]._src;
					this.state.menusArr[4].curSrc = this.state.menusArr[4]._src;
				}
				else{
					this.state.menusArr[0].curSrc = this.state.menusArr[0].src;
					this.state.menusArr[1].curSrc = this.state.menusArr[1].src;
					this.state.menusArr[4].curSrc = this.state.menusArr[4].src;
				}
			
				obserable.trigger({type:'showOperater',data:this.state.menusArr[0].curSrc !== this.state.menusArr[0].src});
			break;
			case 2://菜谱
			case 8:

				if(this.state.menusArr[2].curSrc === this.state.menusArr[2].src){
					this.state.menusArr[2].curSrc = this.state.menusArr[2]._src;
					this.state.menusArr[8].curSrc = this.state.menusArr[8]._src;
				}
				else{
					this.state.menusArr[2].curSrc = this.state.menusArr[2].src;
					this.state.menusArr[8].curSrc = this.state.menusArr[8].src;
				}
				obserable.trigger({type:'showCollect',data:this.state.menusArr[2].curSrc !== this.state.menusArr[2].src});
			break;
			case 3://统计
			case 7://无线
				if(this.state.menusArr[3].curSrc === this.state.menusArr[3].src){
					this.state.menusArr[3].curSrc = this.state.menusArr[3]._src;
					this.state.menusArr[7].curSrc = this.state.menusArr[7]._src;
				}
				else{
					this.state.menusArr[3].curSrc = this.state.menusArr[3].src;
					this.state.menusArr[7].curSrc = this.state.menusArr[7].src;
				}
				///this.state.menusArr[iNow].curSrc = this.state.menusArr[iNow].curSrc === this.state.menusArr[iNow].src? this.state.menusArr[iNow]._src:this.state.menusArr[iNow].src;
				if(iNow === 3){
					gotoActivity('nutrition')
				}else{
					gotoActivity('wifi')
				}				
			break;
			case 5://天气
			case 6://时间
				if(this.state.menusArr[5].curSrc === this.state.menusArr[5].src){
					this.state.menusArr[5].curSrc = this.state.menusArr[5]._src;
					this.state.menusArr[6].curSrc = this.state.menusArr[6]._src;
				}
				else{
					this.state.menusArr[5].curSrc = this.state.menusArr[5].src;
					this.state.menusArr[6].curSrc = this.state.menusArr[6].src;
				}
				obserable.trigger({type:'showfunctionCenter',data:this.state.menusArr[5].curSrc !== this.state.menusArr[5].src});
			break;
		}
		this.state.isShow = false;
		this.forceUpdate();

		

	}

	menuBarHandler(){


		if(this.state.isEnableDrag){
			let {obserable} = this.props;
			obserable.trigger({type:'closeDrag'});
		}
		else{
			this.setState({
				isShow:true
			})
		}
	}

	closeMenu(){
		this.setState({
			isShow:false
		});
	}
	componentDidMount(){
		let {obserable} = this.props;
		obserable.on('switchMenu',(flag)=>{
			this.setState({
				isEnableDrag:flag,
			});
		});
	}	
}

export default PublicMethods(FlyNav);
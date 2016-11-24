import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {PublicMethods} from './public-methods.jsx';
import Ico from '../libs/ico';
import {gotoActivity} from '../libs/android';


injectTapEventPlugin();

class FlyNav extends React.Component{
	constructor(option){
		super(option);
		this.state = {
			operatorArr:[
			{
				menu:'设置'
			},{
				menu:'开/关'
			}
			],
			menusArr:[
			{
				menu:'称量'
			},
			{
				menu:'菜板'
			},
			{
				menu:'菜谱'
			},
			{
				menu:'统计'
			},
			{
				menu:'提醒'
			},
			{
				menu:'天气'
			},
			{
				menu:'时间'
			},
			{
				menu:'无线'
			},
			{
				menu:'收藏'
			}
			],
			isShow:false,
			isEnableDrag:false,
			operatorBarShow:0,
			statisticsShow:0,
			wifiShow:0,
			weatherShow:0,
			foodBookShow:0,
			switchShow:0,
			settingShow:0

		}
		this.menuBarHandler = this.menuBarHandler.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.menuChange = this.menuChange.bind(this);
		this.operatorChange = this.operatorChange.bind(this);
	}
	render(){

		let renderArr = this.state.menusArr.map((item,i)=>{
			let style = {

			}
			if(item.curSrc){
				style.background = 'url('+item.curSrc+') no-repeat center center';
			}
			return (
				<li key={i} style={style}>
				{!item.curSrc && <div><canvas width='140' height='140' className={'canvas-'+i}></canvas></div>}
				<span>{item.menu}</span>
				</li>
				)
		}),
		operatorArr = this.state.operatorArr.map((item,i)=>{
			let style = {

			}
			if(item.curSrc){
				style.background = 'url('+item.curSrc+') no-repeat center center';
			}
			return (
				<li key={i} style={style}>
				{!item.curSrc && <div><canvas width='140' height='140' className={'canvas1-'+i}></canvas></div>}
				<span>{item.menu}</span>
				</li>
				);
		});

		return (
			<nav className={'fly-nav '+ (this.state.isShow?'':'active')} ref='fly-menu'>
			<div style={{overflowY:' hidden',overflowX:' auto',height:'11.5vh'}}>
			<ul ref='fly-menu-C' onTouchStart={this.menuChange}>
			{renderArr}
			</ul>
			<ul ref='fly-menu-C1' onTouchStart={this.operatorChange}>
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
		let parent =( e.target.nodeName === "SPAN" || e.target.nodeName === "DIV")?e.target.parentNode:e.target;
		iNow = index(parent,parentNode,'li');
		return iNow;
	}

	operatorChange(e){
		e.preventDefault();
		var iNow = this.getIndex(e,this.refs['fly-menu-C1']);
		if(iNow<=-1){
			return;
		}
		//this.state.operatorArr[iNow].curSrc = this.state.operatorArr[iNow].curSrc === this.state.operatorArr[iNow].src? this.state.operatorArr[iNow]._src:this.state.operatorArr[iNow].src;
		if(iNow === 0 ){
			this.state.settingShow = !this.state.settingShow;
			this.settingIco.fillSettingIco(this.state.settingShow|0);
			gotoActivity('setting');
		}
		else{
			this.state.switchShow = !this.state.switchShow;
			this.switchIco.fillSwitchIco(this.state.switchShow|0);
			gotoActivity('openOrClose');
		}
		//this.state.isShow = false;
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

			this.state.operatorBarShow = !this.state.operatorBarShow;

			this.weightIco.fillWeightIco(this.state.operatorBarShow|0);
			this.broadIco.fillBroadIco(this.state.operatorBarShow|0);
			this.countdownIco.fillCountdownIco(this.state.operatorBarShow|0);
			obserable.trigger({type:'showOperater',data:this.state.operatorBarShow });
			break;
			case 2://菜谱
			case 8://收藏

			this.state.foodBookShow = !this.state.foodBookShow;
			this.foodBookIco.fillFoodBookIco(this.state.foodBookShow|0);
			this.collectIco.fillCollectIco(this.state.foodBookShow|0);

			obserable.trigger({type:'showCollect',data:this.state.foodBookShow});
			break;
			case 3://统计

			this.state.statisticsShow = !this.state.statisticsShow;
			this.statisticsIco.fillStatisticsIco(this.state.statisticsShow|0);
			gotoActivity('nutrition');	

			break;
			case 7://无线WIFi
			this.state.wifiShow =  !this.state.wifiShow;
			this.wifiIco.fillWifiIco(this.state.wifiShow|0);
			gotoActivity('wifi');	
			break;
			case 5://天气
			case 6://时间

			this.state.weatherShow = !this.state.weatherShow;

			this.timeIco.fillTimeIco(this.state.weatherShow|0);
			this.weatherIco.fillWeatherIco(this.state.weatherShow|0);

			obserable.trigger({type:'showfunctionCenter',data:this.state.weatherShow});


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
		var s = this;
		window.closeSetting = function(){
			s.state.settingShow = !s.state.settingShow;
			s.settingIco.fillSettingIco(s.state.settingShow|0);
		}

		window.closeApp = function(){
			s.state.switchShow = !s.state.switchShow;
			s.switchIco.fillSwitchIco(s.state.switchShow|0);
		}
		window.closeNutrition = function(){
			s.state.statisticsShow = !s.state.statisticsShow;
			s.statisticsIco.fillStatisticsIco(s.state.statisticsShow|0);
		}
		window.closeWifi = function(){
			s.state.wifiShow =  !s.state.wifiShow;
			s.wifiIco.fillWifiIco(s.state.wifiShow|0);
		}
		
		let {obserable} = this.props;
		obserable.on('switchMenu',(flag)=>{
			this.setState({
				isEnableDrag:flag,
			});
		});

		var $ = selector=>{
			return document.querySelector(selector);
		}



		this.weightIco = new Ico({color:'#f90',canvas:$('.canvas-0')}).fillWeightIco();
		this.broadIco = new Ico({color:'#f90',canvas:$('.canvas-1')}).fillBroadIco();
		this.countdownIco = new Ico({color:'#f90',canvas:$('.canvas-4')}).fillCountdownIco();
		this.statisticsIco = new Ico({color:'#f90',canvas:$('.canvas-3')}).fillStatisticsIco();
		this.timeIco = new Ico({color:'#f90',canvas:$('.canvas-6')}).fillTimeIco();
		this.wifiIco = new Ico({color:'#f90',canvas:$('.canvas-7')}).fillWifiIco();
		this.weatherIco = new Ico({color:'#f90',canvas:$('.canvas-5')}).fillWeatherIco();
		this.foodBookIco = new Ico({color:'#f90',canvas:$('.canvas-2')}).fillFoodBookIco();
		this.collectIco = new Ico({color:'#f90',canvas:$('.canvas-8')}).fillCollectIco();

		this.switchIco = new Ico({color:'#f90',canvas:$('.canvas1-1')}).fillSwitchIco();
		this.settingIco = new Ico({color:'#f90',canvas:$('.canvas1-0')}).fillSettingIco();
	}	

}

export default PublicMethods(FlyNav);
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {PublicMethods} from './public-methods.jsx';

injectTapEventPlugin();

 class FlyNav extends React.Component{
	constructor(option){
		super(option);
		this.state = {
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
			isEnableDrag:false
		}
		this.menuBarHandler = this.menuBarHandler.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.menuChange = this.menuChange.bind(this);
	}
	render(){

		let renderArr = this.state.menusArr.map((item,i)=>{
			return (
				<li key={i}>
					<img src={item.curSrc}/>
					<span>{item.menu}</span>
				</li>
			)
		});


		return (
			<nav className="fly-nav active" ref='fly-menu'>
				<div style={{overflow:' hidden'}}>
					<ul ref='fly-menu-C' className='' onTouchTap={this.menuChange}>
						{renderArr}
					</ul>
					<ul ref='fly-menu-C1'>
						<li>
							<img src="./assets/images/nav10.png" />
							<span>设置</span>
						</li>
						<li>
							<img src="./assets/images/nav11.png" />
							<span>开/关</span>
						</li>
					</ul>
				</div>
				<div className='fly-menu-bar' onTouchTap={this.menuBarHandler}>
					<div className={this.state.isEnableDrag ? 'fly-sure':''}>{this.state.isEnableDrag ? '确定':'下拉菜单'}</div>
					<div>{this.state.isEnableDrag ? '':'>'}</div>
				</div>
				<div className="fly-nav-mask" ref="fly-nav-mask" onTouchTap={this.closeMenu}></div>
			</nav>
		)
	}

	menuChange(e){
		let {index,obserable} = this.props,
			iNow = -1;
		iNow = index(e.target.parentNode,this.refs['fly-menu-C'],'li');
		if(iNow<=-1){
			return;
		}
		
		switch(iNow){
			case 0://称量
			case 1://菜板
			case 4://提醒

				this.state.menusArr[0].curSrc = this.state.menusArr[0].curSrc === this.state.menusArr[0].src? this.state.menusArr[0]._src:this.state.menusArr[0].src;
				this.state.menusArr[1].curSrc = this.state.menusArr[1].curSrc === this.state.menusArr[1].src? this.state.menusArr[1]._src:this.state.menusArr[1].src;
				this.state.menusArr[4].curSrc = this.state.menusArr[4].curSrc === this.state.menusArr[4].src? this.state.menusArr[4]._src:this.state.menusArr[4].src;
				obserable.trigger({type:'showOperater',data:this.state.menusArr[0].curSrc !== this.state.menusArr[0].src});
			break;
			case 2://菜谱
			case 8:
				this.state.menusArr[2].curSrc = this.state.menusArr[2].curSrc === this.state.menusArr[2].src? this.state.menusArr[2]._src:this.state.menusArr[2].src;
				this.state.menusArr[8].curSrc = this.state.menusArr[8].curSrc === this.state.menusArr[8].src? this.state.menusArr[8]._src:this.state.menusArr[8].src;
				obserable.trigger({type:'showCollect',data:this.state.menusArr[2].curSrc !== this.state.menusArr[2].src});
			break;
			case 3://统计
			case 7://无线
				this.state.menusArr[iNow].curSrc = this.state.menusArr[iNow].curSrc === this.state.menusArr[iNow].src? this.state.menusArr[iNow]._src:this.state.menusArr[iNow].src;
			break;
			case 5://天气
			case 6://时间

				this.state.menusArr[5].curSrc = this.state.menusArr[5].curSrc === this.state.menusArr[5].src? this.state.menusArr[5]._src:this.state.menusArr[5].src;
				this.state.menusArr[6].curSrc = this.state.menusArr[6].curSrc === this.state.menusArr[6].src? this.state.menusArr[6]._src:this.state.menusArr[6].src;
				obserable.trigger({type:'showfunctionCenter',data:this.state.menusArr[5].curSrc !== this.state.menusArr[5].src});
			break;
		}

		this.forceUpdate();

		

	}

	menuBarHandler(){


		if(this.state.isEnableDrag){
			let {obserable} = this.props;
			obserable.trigger({type:'closeDrag'});
		}
		else{
			var menu = this.refs['fly-menu'];
			var hasClass = menu.classList.contains('active');
				menu.classList[hasClass?'remove':'add']('active');
				this.refs['fly-menu-C'].classList[!hasClass?"remove":'add']('show');
				this.refs['fly-menu-C1'].classList[!hasClass?"remove":'add']('show');
				this.refs['fly-nav-mask'].classList[hasClass?'add':'remove']('active');
		}
	

	}

	closeMenu(){
			
			var menu = this.refs['fly-menu'];
			var hasClass = menu.classList.contains('active');
			hasClass && menu.classList.remove('active');
			this.menuBarHandler();

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
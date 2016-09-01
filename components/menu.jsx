import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
export default class FlyNav extends React.Component{
	constructor(option){
		super(option);
		this.state = {

		}
		this.menuBarHandler = this.menuBarHandler.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}
	render(){
		return (
			<nav className="fly-nav active" ref='fly-menu'>
				<div style={{overflow:' hidden'}}>
					<ul ref='fly-menu-C'>
						<li>
							<img src="./assets/images/nav1.png" />
							<span>称量</span>
						</li>
						<li>
							<img src="./assets/images/nav2.png" />
							<span>菜板</span>
						</li>
						<li>
							<img src="./assets/images/nav3.png" />
							<span>菜谱</span>
						</li>
						<li>
							<img src="./assets/images/nav4.png" />
							<span>统计</span>
						</li>
						<li>
							<img src="./assets/images/nav5.png" />
							<span>提醒</span>
						</li>
						<li>
							<img src="./assets/images/nav6.png" />
							<span>天气</span>
						</li>
						<li>
							<img src="./assets/images/nav7.png" />
							<span>时间</span>
						</li>
					</ul>
					<ul ref='fly-menu-C1'>
						<li>
							<img src="./assets/images/nav8.png" />
							<span>设置</span>
						</li>
						<li>
							<img src="./assets/images/nav9.png" />
							<span>开/关</span>
						</li>
					</ul>
				</div>
				<div className='fly-menu-bar' onTouchTap={this.menuBarHandler}>
					<div>下拉菜单</div>
					<div>></div>
				</div>
				<div className="fly-nav-mask" ref="fly-nav-mask" onTouchTap={this.closeMenu}></div>
			</nav>
		)
	}
	menuBarHandler(){

		var menu = this.refs['fly-menu'];
	
		var hasClass = menu.classList.contains('active');
			menu.classList[hasClass?'remove':'add']('active');
			this.refs['fly-menu-C'].classList[!hasClass?"remove":'add']('show');
			this.refs['fly-menu-C1'].classList[!hasClass?"remove":'add']('show');
			this.refs['fly-nav-mask'].classList[hasClass?'add':'remove']('active');
	}

	closeMenu(){
			
			var menu = this.refs['fly-menu'];
			var hasClass = menu.classList.contains('active');

			hasClass && menu.classList.remove('active');
			this.menuBarHandler();

	}
	componentDidMount(){

	}
}
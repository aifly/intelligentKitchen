import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';

import Obserable from './libs/Obserable.js';
/*import './libs/nav.js';
import './libs/cookbook.js';*/
import FlyNav from './components/menu.jsx';
import FlyDone from './components/done.jsx';
import FlyFunctionCenter from './components/function-center.jsx';
import FlyCookBookItem from './components/cook-book-item.jsx';
import FlyCookBookList from './components/cook-book-list.jsx';
let obserable=  new Obserable();



class App extends React.Component{
	constructor(option){
		super(option)
	}
	render(){
		let data= {
			obserable:obserable
		};
		return (
			<div>
				<FlyNav></FlyNav>
				<FlyDone {...data}/>
				<ul className="fly-cook-book-C">
					<FlyFunctionCenter {...data}></FlyFunctionCenter>
					<FlyCookBookList {...data}></FlyCookBookList>
					<FlyCookBookItem {...data}></FlyCookBookItem>
				</ul>
				<section className='fly-time-line-C'></section>
				<ul>
					
				</ul>
			</div>
		)
	}
}

ReactDOM.render(<App></App>,document.getElementById('fly-main'));

let data = {
	viewWidth:document.documentElement.clientWidth,
	viewHeigth:document.documentElement.clientHeight
};

let util = {
	init(){
		this.setDefault();
	},
	setDefault(width = data.viewWidth,height = data.viewHeigth){
		$('html').css({fontSize:width/10});
	}
};

util.init();


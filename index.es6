import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';

import Obserable from './libs/Obserable.js';
/*import './libs/nav.js';
import './libs/cookbook.js';*/
import FlyNav from './components/menu.js';
import FlyDone from './components/done.js';
import FlyFunctionCenter from './components/function-center.js';
import FlyCookBookItem from './components/cook-book-item.js';
import FlyCookBookList from './components/cook-book-list.js';



class App extends React.Component{
	constructor(option){
		super(option)
	}
	render(){
		return (
			<div>
				<FlyNav></FlyNav>
				<FlyDone />
				<ul className="fly-cook-book-C">
					<FlyFunctionCenter></FlyFunctionCenter>
					<FlyCookBookList></FlyCookBookList>
					<FlyCookBookItem></FlyCookBookItem>

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


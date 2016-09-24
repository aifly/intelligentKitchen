import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';

import Obserable from './libs/Obserable.js';
/*import './libs/nav.js';
import './libs/cookbook.js';*/
import FlyNav from './components/menu.jsx';

import FlyFunctionCenter from './components/function-center.jsx';
import FlyCookBookItem from './components/cook-book-item.jsx';
import FlyCookBookList from './components/cook-book-list.jsx';
import FlyAlimentationData from './components/alimentationData.jsx';
import FlyOperatorCenter from './components/operatorCenter.jsx';
import FlyFoodsPlace from './components/foodsPlace.jsx';
import FlyTimeLine from './components/timeline.jsx';


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
				<FlyNav {...data}></FlyNav>
				
				<ul className="fly-cook-book-C">
					<FlyFunctionCenter {...data}></FlyFunctionCenter>
					<FlyCookBookList {...data}></FlyCookBookList>
					<FlyCookBookItem {...data}></FlyCookBookItem>
				</ul>
				<FlyTimeLine {...data}></FlyTimeLine>
				<ul className='fly-main-operator-C'>
					<FlyAlimentationData {...data}></FlyAlimentationData>
					<FlyOperatorCenter {...data}></FlyOperatorCenter>
					<FlyFoodsPlace {...data}></FlyFoodsPlace>
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
		if (!Array.from) {
		    Array.from = (c)=> {
		        return Array.prototype.slice.call(c);
		    }
		}
	},
	setDefault(width = data.viewWidth,height = data.viewHeigth){
		$('html').css({fontSize:width/10});
	}
};

util.init();


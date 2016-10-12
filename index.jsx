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
import URL from './libs/url';

let obserable=  new Obserable();


class App extends React.Component{
	constructor(option){
		super(option);
		this.state = {
			userId:2
		}
	}
	render(){
		let data= {
			obserable:obserable,
			URL:URL
		};
		return (
			<div>
				<FlyNav {...data}></FlyNav>
				
				<ul className="fly-cook-book-C">
					<FlyFunctionCenter {...data} {...this.state}></FlyFunctionCenter>
					<FlyCookBookList {...data}  {...this.state}></FlyCookBookList>
					<FlyCookBookItem {...data}  {...this.state}></FlyCookBookItem>
				</ul>
				<FlyTimeLine {...data}  {...this.state}></FlyTimeLine>
				<ul className='fly-main-operator-C'>
					<FlyAlimentationData {...data}  {...this.state}></FlyAlimentationData>
					<FlyOperatorCenter {...data} {...this.state}></FlyOperatorCenter>
					<FlyFoodsPlace {...data}  {...this.state}></FlyFoodsPlace>
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


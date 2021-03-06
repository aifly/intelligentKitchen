import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import $ from 'jquery';
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
			userId:1
		}
	}
	render(){
		let data= {
			obserable:obserable,
			URL:URL
		};
		
		return (
			<div>
				<div style={{textAlign:'center',color:'#fff',fontSize:'.14rem'}}>{this.state.width}</div>
				<FlyNav {...data}></FlyNav>
				{/*<div style={{position:'absolute',zIndex:10000,top:100}}>{typeof this.state.userId + ' --- '+ this.state.userId+''}</div>*/}
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
	componentDidMount() {
	 		
	 		try{
	 			var userId = gotoActivity('getUserId');	
	 			this.setState({
		 				userId:userId
		 		})
	 		}catch(e){
	 			
	 		}
	 	/*	var userId = gotoActivity('getUserId');
	 		this.setState({
	 				userId:userId
	 		})*/
	    //$('html').css({fontSize:384});
		/*this.setState({
			width:$('html').css('fontSize') +'----'
		});*/

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
		//$('html').css({ fontSize:width / 10});

	}
};

util.init();


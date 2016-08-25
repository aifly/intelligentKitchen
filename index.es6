import $ from 'jquery';
import './assets/css/index.css';

import Obserable from './libs/Obserable.js';
import './libs/menu.js';


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


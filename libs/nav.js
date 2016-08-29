
import $ from 'jquery';
import './jquery.tap.js';
let data = {
	menu:$('#fly-main .fly-nav'),
	menuBar :$('.fly-menu-bar'),
	menuC :$('#fly-main .fly-nav ul'),
	navMask:$("#fly-nav-mask")
}

let util = {
	init(){	
		this.bindEvent();
	},
	bindEvent(){
		data.menuBar.on('tap',()=>{
			var hasClass = data.menu.hasClass('active');
			data.menu[hasClass?"removeClass":'addClass']('active');
			data.menuC[!hasClass?"removeClass":'addClass']('show');
			data.navMask[hasClass?'addClass':'removeClass']('active');
		});

		data.navMask.on("tap",()=>{
			data.menu.hasClass('active')&& data.menu.removeClass('active');
			data.menuBar.trigger('tap');
		});
	}
}



util.init();
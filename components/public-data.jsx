import React, { Component } from 'react';
import getTimeSlot from '../libs/switchtimeslot';

export let  FlyPublicData = ComponsedComponent => class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};

	  this.index1 = this.index1.bind(this);
	}



	index(source,target){
		var index = -1;
		for(var i = 0,len = source.length;i<len;i++){
			if(target === source[i]){
				index = i;

			}
		}
		return index;
	}


	index1(elems, parent, selector) {
	    var parent = parent || elems.parentNode,
	        cindex = -1,
	        selector = selector || "*";

	    Array.from(parent.querySelectorAll(selector)).forEach(function (item, i) {
	    	
	        if (item === elems) {
	            cindex = i;
	        }
	    });
	    return cindex;
	}

	render() {
		let data = {
			getTimeSlot:getTimeSlot(),
			getIndex:this.index,
			index:this.index1
		}
		return <ComponsedComponent {...data}  {...this.props} {...this.state} />;
	}
	componentDidMount() {

	}
 
}

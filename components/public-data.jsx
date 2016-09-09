import React, { Component } from 'react';
import getTimeSlot from '../libs/switchtimeslot';

export let  FlyPublicData = ComponsedComponent => class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};

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

	render() {
		let data = {
			getTimeSlot:getTimeSlot(),
			getIndex:this.index
		}
		return <ComponsedComponent {...data}  {...this.props} {...this.state} />;
	}
	componentDidMount() {

	}
 
}

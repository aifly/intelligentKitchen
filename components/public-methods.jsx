import React, { Component } from 'react';


export let PublicMethods = ComponsedComponent => class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	index(elems, parent, selector) {
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

		let methods = {
			index:this.index
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;

	}
}

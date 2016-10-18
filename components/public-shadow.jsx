import React, { Component } from 'react';


export let PublicShadow = ComponsedComponent => class extends Component{
	constructor(props) {
	  super(props);
	
	 
	};

	touchStart(e){

		e.target.classList.add('shadow');
	}

	touchEnd(e){
		e.target.classList.remove('shadow');
	}

	r(m, n) {
        return (m + Math.random() * (n - m));
    }

	shadow(obj,className='shadow'){
		obj.classList.add(className);
		setTimeout(()=>{
			obj.classList.remove(className);		
		},150);
	}

	render(){

		let methods = {
			touchStart:this.touchStart,
			touchEnd:this.touchEnd,
			shadow:this.shadow,
			r:this.r
		}

	  return <ComponsedComponent {...methods} {...this.props} {...this.state} />;
	}
}
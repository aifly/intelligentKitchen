import React, { Component } from 'react';
import './css/countdown.css';


export default class FlyCountdown extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		return (
			 <article id="timeWarp">
	            <section id="round" className="fly-round">
	                <section className="roundWrap" ref='roundWrap'>

	                </section>
	                <section className="roundWrap roundWrap1" ref='roundWrap1'>

	                </section>
	                <div id="mask"></div>
	            </section>
       		 </article>
		);
	}
	componentDidMount() {
		this.setLayout();
	}

	toTime(){

		//sTime.innerHTML=""+arrNow[0]+arrNow[1]+":"+arrNow[2]+arrNow[3];

	}

	toDB(nub){
		return nub < 10 ? "0" + nub : "" + nub;
	}

	setLayout(){
		var rounds = this.refs['roundWrap'],
			rounds1 = this.refs['roundWrap1'];
		let roundsArr =[rounds,rounds1];

		for(var i = 0; i< roundsArr.length;i++){

			var str="";
			for(var j=0; j<=59; j++){
				if(i===0){

					str =  "<div><span>"+(59-j<=10?(59-j):'')+"</span>"+str+"</div>";	
				}
				else{

					str =  "<div><span>"+(59-j)+"</span>"+str+"</div>";
				}
				
			}
			str="<div class='round'>"+str+"</div>";
			roundsArr[i].innerHTML=str;
		}
	}
}

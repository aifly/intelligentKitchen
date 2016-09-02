import React, { Component } from 'react';
import './css/operator-center.css';
import { PublicShadow } from './public-shadow.jsx';
 class FlyOperatorCenter extends Component {
	constructor(option){
		super(option);
		this.getWeight = this.getWeight.bind(this);
		this.getBoard = this.getBoard.bind(this);
		
	}
	
	render() {

		return (
			<li className='fly-operator-item fly-weight'>
				<div className='fly-btns-C'>
					<figure>
						<img  src='./assets/images/weight-btn.png' onTouchTap={this.getWeight} onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}/>
					</figure>
					<figure>
						<img  src='./assets/images/broad-btn.png' onTouchTap={this.getBoard} onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}/>
					</figure>
					<figure>
						<img  src='./assets/images/time-info.png' onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}/>
					</figure>
				</div>
				<div className='fly-operator-C' >
					<div className='operator-C'  ref='fly-operator-C'>
						<div className='fly-img-C'>
							<img src='./assets/images/weight.png'/>
							<img src='./assets/images/board.png' className='board'/>	
						</div>
					</div>
				</div>
			</li>
		);
	}

	componentDidMount(){

	}

	getWeight(){
		this.refs['fly-operator-C'].classList.remove('active');
		
	}

	getBoard(){
		this.refs['fly-operator-C'].classList.add('active');
	}
	closeWeight (){

	}

}

export default PublicShadow(FlyOperatorCenter);
import React, { Component } from 'react';
import './css/operator-center.css';
import { PublicShadow } from './public-shadow.jsx';
 class FlyOperatorCenter extends Component {
	constructor(option){
		super(option);

		this.state = {
			showBoard:false,
			showWeight:true
		}
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
						{this.state.showBoard && <div className='fly-img-board'>
							<img src='./assets/images/board.png' className='board'/>	
						</div>}
						{this.state.showWeight && <div className='fly-img-weight'>
							<img src='./assets/images/weight.png'/>
						</div>}
					</div>
				</div>
			</li>
		);
	}

	componentDidMount(){

	}

	getWeight(){
		
		this.setState({
			showWeight:true,
			showBoard:false
		});
		
	}

	getBoard(){
		this.setState({
			showWeight:false,
			showBoard:true
		});
	}
	closeWeight (){

	}

}

export default PublicShadow(FlyOperatorCenter);
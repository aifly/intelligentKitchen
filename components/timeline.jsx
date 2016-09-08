import React, { Component } from 'react';
import './css/timeline.css';
export default class FlyTimeLine extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 steps:[
	  	 	'第一步',
	  	 	'第二步',
	  	 	'第三步',
	  	 	'第四步',
	  	 	'第五步',
	  	 ],
	  	 progressLeft:0
	  };
	}
	render() {
		return (
			<section className='fly-time-line-C'>
				<div className='line'></div>
				<div className='fly-progress' style={{marginLeft:this.state.progressLeft}}></div>
				<section className='fly-points-C'>
					<article className='prepare' ref='prepare'>
						<span></span>
						准备食材
					</article>
					{this.state.steps.map((step,i)=>{
						return(
							<article key={i}>
								<span></span>
								{step}
							</article>
						)
					})}
				</section>
			</section>
		);
	}
	componentDidMount() {
		setTimeout(()=>{
			this.setState({
				progressLeft:this.refs['prepare'].offsetWidth/2
			})
		},1)
	}
}

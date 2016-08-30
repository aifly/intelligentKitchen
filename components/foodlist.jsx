import React, { Component } from 'react';
import './css/foodlist.css';
import IScroll from 'iscroll';

export default class FlyFoodList extends Component {
	constructor(option){
		super(...option);
		this.state = {
			dataSource:[],
			ulWidth:500
		};
		this.next = this.next.bind(this);
	}
	render() {
		let style ={
			width:((this.state.dataSource.length/2|0)+1)*100
		}

		return (
			
			<div className='foodlist'>
				<div ref='foodlist-C' className='foodlist-C'>
					<ul style={{width:this.state.ulWidth}} className='foodlist-content'>
						{this.state.dataSource.map((data,i)=>{
							return (
								<li  key={i} data-id={data.id} className={i<=Math.floor(this.state.dataSource.length/2)?'':'food-top'}>
									<div style={{background:'url('+data.imgSrc+') no-repeat center',backgroundSize:'cover'}}>
										<span>{data.name}</span>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
				<div className='foodlist-next' onTouchTap={this.next}>></div>
			</div>
			
		);
	}
	next(){
		let x = this.scroll.x;
		x-=this.liWidth||0;
		x < this.scroll.maxScrollX && (x = this.scroll.maxScrollX);
		this.scroll.scrollTo(x,0,200);
	}
	componentDidMount(){

		let {dataSource} = this.props;
		

		this.setState({dataSource:dataSource},()=>{
			setTimeout(()=>{
				this.setState({
					ulWidth:this.refs['foodlist-C'].children[0].children[0].clientWidth*(Math.ceil(dataSource.length/2))+1
				});
				this.liWidth = this.refs['foodlist-C'].children[0].children[0].clientWidth;
				this.scroll = new IScroll(this.refs['foodlist-C'],{
					scrollX:true,
					scrollY:false,

				});
			},1);
		});
	}
}

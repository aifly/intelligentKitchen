import React from 'react';
import './css/bookitem.css';

//最右侧的组件。具体的每一道菜的步骤。

export default class FlyCookBookItem extends React.Component{
	constructor(option){
		super(option);
		this.state ={
			foodData : {
				name:"面包秀",
				imgSrc:"./assets/images/f4.png",
				id:'',
				detailSrc:'./assets/images/food1.png',
				pageView:333,
				discuss:124,//讨论
				craft:'烤',
				personCount:3,
				taste:'甜',
				difficult:'难',
				time:'60mins',
				foodMaterial:[
					{name:'小番茄',weight:'30g'},
					{name:'鸡蛋',weight:'40g'},
					{name:'生菜',weight:'70g'},
					{name:'培根',weight:'50g'},
					{name:'吐丝',weight:'25g'}
				]
			}
		};
	}
	render(){

		let foodData = this.state.foodData;
		return (
			<li className="fly-cook-detail fly-cook-book-item">
				<div className="fly-cook-book-item-C book-item">
					<section className='book-item-C'>
						<ul className='book-item-ul'>
							<li>
								<div className='book-item-detail-src' style={{background:'url('+foodData.detailSrc+') no-repeat center',backgroundSize:'cover'}}>
									<div className='book-item-content'>
										<span className='book-item-name'>{foodData.name}</span>
										<span className='book-item-pageview'>{foodData.pageView}<em>浏览</em></span>
										<span className="book-item-discuss">
											<span>
												<b></b>
												<b></b>
												<b></b>
											</span>
											<span>{foodData.discuss}</span>
										</span>
									</div>										
								</div>
							</li>	
							<li>2</li>	
						</ul>
					</section>
				</div>
			</li>
		)
	}
	componentDidMount(){
		let {obserable} = this.props;
		obserable.on('fillFood',(data)=>{
			console.log(data)
		});
	}
}
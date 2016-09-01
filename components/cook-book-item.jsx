import React from 'react';
import './css/bookitem.css';
import IScroll from 'iscroll';
//最右侧的组件。具体的每一道菜的步骤。

export default class FlyCookBookItem extends React.Component{
	constructor(option){
		super(option);
		this.state ={
			foodData : {
				
			}
		};
		this.getDetail = this.getDetail.bind(this);
		this.closeCook = this.closeCook.bind(this);
	}
	render(){

		let foodData = this.state.foodData;
		let background = {
			background:foodData.detailSrc?'url('+foodData.detailSrc+') no-repeat center  / cover':'none'
		};
		return (
			<li className="fly-cook-detail fly-cook-book-item">
				<div className="fly-cook-book-item-C book-item" style={{display:foodData.name!== undefined ?'block':'none'}}>
					<section className='book-item-C'>
						<ul className='book-item-ul'>
							<li className='book-item-ul-li' onTouchTap={this.getDetail}>
								<div className='book-item-detail-src' style={background}>
									<span onTouchTap={this.closeCook} className='fly-exit'></span>
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
							<li className='book-item-detail book-item-ul-li'>
								<div className='detail' ref='detail'>
									<ol>
										<li>
											<div>
												<span>工艺</span>
												<span>{foodData.craft}</span>
											</div>
											<div>
												<span>人数</span>
												<span>{foodData.personCount}</span>
											</div>
											<div>
												<span>口味</span>
												<span>{foodData.taste}</span>
											</div>
										</li>
										<li>
											<div>
												<span>难度</span>
												<span>{foodData.difficult}</span>
											</div>
											<div>
												<span>时间</span>
												<span>{foodData.time}</span>
											</div>
											<div></div>
										</li>
									</ol>
								</div>
								<div className='material' ref='material'>
									<h1>材料</h1>
									<section className='material-scroll' ref='material-scroll'>
										<ul>
											{foodData.foodMaterial && foodData.foodMaterial.map((item,i)=>{
												return (
													<li key={i}>
														<span>{item.name}</span>
														<span>{item.weight}</span>
													</li>
												);
											})}
										</ul>
									</section>
									<section className='begin-do'><span>开始制作</span></section>
								</div>
							</li>	
						</ul>
					</section>
				</div>
			</li>
		)
	}

	getDetail(){
		this.iNow = this.iNow || 1;
		if(this.iNow++%2===1){
			
			this.refs['detail'].parentNode.classList.add('active')
		}
		else{
			this.refs['detail'].parentNode.classList.remove('active')
		}
		
	}

	closeCook(e){ //关闭。
		e.preventDefault();
		this.setState({
			foodData:{}
		});
	}

	componentDidMount(){
		let {obserable} = this.props;
		obserable.on('fillFood',(data)=>{
			this.setState({
				foodData:data
			},()=>{
				this.scroll.refresh();//重新刷新滚动条。
			});
		});

		
		this.scroll = new IScroll(this.refs['material-scroll']);
	}
}
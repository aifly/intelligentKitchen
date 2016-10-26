import React, { Component } from 'react';
import './css/mycollect.css';
import FlyFoodList from './foodlist.jsx';

//我的收藏页面
export default class FlyMyCollect extends Component {
	render() {
		return (
			<div className={'fly-collect-C add-collect ' + this.props.className} >
				<span className='tag' onTouchStart={this.props.changeMyCollectTop}>我的收藏<canvas width='73' height='250'></canvas></span>
				<FlyFoodList isShowTimeline={false} type='my-collect' {...this.props}></FlyFoodList>
			</div>
		);
	}
}

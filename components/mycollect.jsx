import React, { Component } from 'react';
import './css/mycollect.css';
import FlyFoodList from './foodlist.jsx';

//我的收藏页面
export default class FlyMyCollect extends Component {
	render() {
		
		return (
			<div className={'fly-collect-C add-collect ' + this.props.className} onTouchTap={this.props.changeMyCollectTop}>
				<FlyFoodList isShowTimeline={false} type='my-collect'  obserable={this.props.obserable}></FlyFoodList>
			</div>
		);
	}
}
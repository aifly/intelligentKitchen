import React, { Component } from 'react';
import './css/video.css';
import IScroll from 'iscroll';
import {PublicMethods} from './public-methods.jsx';

class FlyVideo extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isPlay:true,
	  	currentVideoIndex:0
	  };

	  this.reload = this.reload.bind(this);
	  this.next = this.next.bind(this);
	  this.switchVideo = this.switchVideo.bind(this);
	}
	render() {
		let  {imgSrc,steps} = this.props;
		return (
			<div className="fly-video-C">
				<section>
					<video ref='video' id="vjs_video_3_html5_api" className="" 
						src={steps[this.state.currentVideoIndex].imgSrc}
						controls 
						autoPlay
						>
					</video> 
					<div className='fly-video-list' style={{display:this.state.isPlay?'none':'block'}}>
						<h1></h1>	
						<div className='fly-video-list-scroll' ref='fly-video-list-scroll'>
							<ul onTouchTap={this.switchVideo}>
								{steps.map((item,i)=>{
									return (
										<li className='fly-video-item' key={i} style={{background:'url('+item.poster+') no-repeat center center',backgroundSize:'cover'}}>
											<img src='./assets/images/play.png'/>
											<span>{item.stepName}</span>
										</li>
									)
								})}
							</ul>
						</div>
						<div className='fly-video-operator'>
							<div className='fly-video-reload' onTouchTap={this.reload}>
								<img src='./assets/images/reload.png'/>
							</div>	
							<div className='fly-video-next' onTouchTap={this.next}>
								<img src='./assets/images/next.png'/>
							</div>	
						</div>
					</div>
				</section>
				<footer className='fly-video-control-C'>

				</footer>
			</div>
		);
	}
	componentDidMount() {
		let video = this.refs['video'];
		video.muted =true;
		this.video = video;
		video.addEventListener('play',()=>{
			this.setState({
				isPlay:true
			});

		});
		video.addEventListener('ended',()=>{
			this.setState({
				isPlay:false
			},()=>{

				let scroll =this.refs['fly-video-list-scroll']; 
				scroll.querySelector('ul').style.width = (scroll.querySelector('li').offsetWidth+20) * this.props.steps.length + 'px';
				this.scroll && this.scroll.refresh();

				let {obserable} = this.props;
				obserable.trigger({type:'pauseProgress',data:this.state.currentVideoIndex})
				
			});


		})
		setTimeout(()=>{
			let scroll =this.refs['fly-video-list-scroll']; 
		 	this.scroll = new IScroll(scroll,{
				scrollX:true,
				scrollY:false,
				click:false,
				disableMouse:true ,//是否关闭鼠标事件探测。如知道运行在哪个平台，可以开启它来加速。
				//momentum:false,//是否开启动量动画，关闭可以提升效率。
				fadeScrollbars:false,//是否渐隐滚动条，关掉可以加速
			});
		},1);
	}

	switchVideo(e){
		
		var target = null;
		if(e.target.classList.contains('fly-video-item')){
			target = e.target;
		}
		else if(e.target.parentNode.classList.contains('fly-video-item')){
			target = e.target.parentNode;
		}
		
		let {index} = this.props;

		let iNow = index(target,null,'li');	

		this.setState({
			currentVideoIndex:iNow
		},()=>{
			this.reload();
			let {obserable} = this.props;
			obserable.trigger({type:'updateStep',data:this.state.currentVideoIndex});
		})
	}

	next(){

		if(this.state.currentVideoIndex > this.props.steps.length-1){
				return;
		}
		this.setState({
			currentVideoIndex:this.state.currentVideoIndex + 1
		},()=>{
			let {obserable} = this.props;

			obserable.trigger({type:'updateStep',data:this.state.currentVideoIndex});
			this.reload();
		});
	}
	reload(){
		this.video.play();

	}
}


export  default PublicMethods(FlyVideo);
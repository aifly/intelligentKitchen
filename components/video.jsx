import React, { Component } from 'react';
import './css/video.css';
import IScroll from 'iscroll';
import {PublicMethods} from './public-methods.jsx';
import $ from 'jquery';

class FlyVideo extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isPlay:true,
	  	currentVideoIndex:0,
	  	playing:false,
	  	mins :'00',
	  	seconds:'',
	  	currentMins:'00',
	  	currentSeconds:'',
	  	videoBarTransX:0,
	  	voiceBarTransX:0,
	  	videoProgressScale:1,
	  	voiceProgressScale:1,
	  	volume : 1

	  };

	  this.reload = this.reload.bind(this);
	  this.next = this.next.bind(this);
	  this.prev = this.prev.bind(this);
	  this.switchVideo = this.switchVideo.bind(this);
	  this.playVideo = this.playVideo.bind(this);
	  this.closeStep = this.closeStep.bind(this);
	}
	render() {
		let  {imgSrc,steps} = this.props;
		return (
			<div className="fly-video-C" ref='fly-video-C'>
				<div className='fly-close' onTouchTap={this.closeStep}></div>
				<section>
					<video ref='video' id="vjs_video_3_html5_api" className="" 
						src={steps[this.state.currentVideoIndex].imgSrc}
						autoPlay
						>
					</video> 
					<div className='fly-video-list' style={{display:this.state.isPlay?'none':'block'}}>
						<h1></h1>	
						<div className='fly-video-list-scroll' ref='fly-video-list-scroll'>
							<ul onTouchTap={this.switchVideo}>
								{steps.map((item,i)=>{
									return (
										<li className={'fly-video-item '+ (this.state.currentVideoIndex === i ? 'active':'')} key={i} style={{background:'url('+item.poster+') no-repeat center center',backgroundSize:'cover'}}>
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
					<div className='fly-video-scroll-C'>
						<div className='fly-video-progress' ref='fly-video-progress'  style={{WebkitTransform:'scale('+this.state.videoProgressScale+',1)'}}></div>
						<span ref='fly-scroll-bar' style={{WebkitTransform:'translate3d('+this.state.videoBarTransX+'px,0,0)'}}></span>
					</div>
					<div className="fly-control">
						<section className='fly-voice'>
							<div className='voice-ico'>
								<img src='./assets/images/voice.png'/>
							</div>
							<div className='voice-C' ref='voice-C'>
								<div className='fly-video-progress'ref='fly-voice-progress' style={{WebkitTransform:'scale('+this.state.voiceProgressScale+',1)'}}></div>
								<span ref='fly-voice-bar' style={{WebkitTransform:'translate3d('+this.state.voiceBarTransX+'px,0,0)'}}></span>
							</div>
						</section>
						<section className='fly-video-btns'>
							<div className='fly-prev-btn' onTouchTap={this.prev}>
								<div className='prev-ico'></div>
								<div className='prev-ico'></div>
							</div>
							<div className={'fly-play-btn '+ (this.state.playing ?'':'active')} onTouchTap={this.playVideo}></div>
							<div className='fly-next-btn' onTouchTap={this.next}>
								<div className='prev-ico'></div>
								<div className='prev-ico'></div>
							</div>
						</section>
						<section className='fly-video-time'>
							<span>{this.state.currentMins<10?'0'+this.state.currentMins:this.state.currentMins}</span>:<span>{this.state.currentSeconds<10?'0'+this.state.currentSeconds:this.state.currentSeconds}</span>/
							<span>{this.state.mins<10?'0'+this.state.mins:this.state.mins}</span>:<span>{this.state.seconds<10?'0'+this.state.seconds:this.state.seconds}</span>
						</section>
					</div>
				</footer>
			</div>
		);
	}
	closeStep(e){
		let {obserable} = this.props;
		obserable.trigger({type:'closeStep',data:e});		
	}
	componentDidMount() {
		let video = this.refs['video'];
		//video.muted =true; // 静音
		this.video = video;
		let isEnd = false;
		this.duration = 0;
		let {obserable} = this.props;
		this.isLoad = true;
		obserable.on('videoPlay',()=>{
			if(this.state.isPlay && this.state.playing && this.isLoad){
				this.state.currentSeconds--;
				if(this.state.currentSeconds*1 <0){
					this.state.currentMins--;
					if(this.state.currentMins <=0 && this.state.currentSeconds <= 0){
						this.state.currentSeconds = this.state.currentMins= 0;
					}
					this.state.currentSeconds = 59;
				}
				this.forceUpdate();
			}

		});

		let barWidth = $(this.refs['fly-scroll-bar']).width();
		let videoWidth  = this.refs['fly-video-C'].offsetWidth - barWidth;
		$(video).on('timeupdate',()=>{

			let currentDuration = this.state.currentSeconds + this.state.currentMins*60;
			let scale = 1 - currentDuration / this.duration;
			
			this.setState({
				videoBarTransX:videoWidth*scale,
				videoProgressScale:videoWidth*scale
				
			},()=>{
				this.transX = videoWidth*scale;
			});
			
		});



		$(video).on('loadedmetadata',e=>{
			this.duration = this.video.duration|0;
			this.setState({
				seconds:this.duration % 60,
				mins : this.duration / 60 |0,
				currentMins: this.duration / 60 |0,
				currentSeconds:this.duration % 60,
				voiceBarTransX:this.refs['voice-C'].offsetWidth-barWidth,
				voiceProgressScale:this.refs['voice-C'].offsetWidth-barWidth
			});

		});


		$(video).on('play',()=>{
			this.setState({
				isPlay:true,
				playing:true
			});

			if(!isEnd){
				isEnd = true;
				this.startTime = new Date().getTime();
			}
			
			obserable.trigger({type:'startProgress'});//开始进度条运动
			obserable.trigger({type:'updateStep',data:this.state.currentVideoIndex});
		});

		this.lastCurrentIndex = 0;
		$(video).on('ended',()=>{
			this.setState({
				isPlay:false,
				playing:false,
				currentMins: this.state.mins,
				currentSeconds:this.state.seconds,
				videoBarTransX:0,
				videoProgressScale:0,
			},()=>{

				let scroll =this.refs['fly-video-list-scroll']; 
				scroll.querySelector('ul').style.width = (scroll.querySelector('li').offsetWidth+20) * this.props.steps.length + 'px';
				this.scroll && this.scroll.refresh();

				let {obserable} = this.props;
				obserable.trigger({type:'pauseProgress',data:this.state.currentVideoIndex})
				isEnd = false;

				obserable.trigger({type:'updateTimeSpan',data:new Date().getTime()-this.startTime});

				obserable.trigger({type:'showTimespan',data:((new Date().getTime() - this.startTime) / 1000|0 + 1)/ 60|0 + 1});

				if(this.state.currentVideoIndex === this.props.steps.length-1){
					
					obserable.trigger({type:'showAllTime'});
				}

				this.transX = 0;
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

			let progressBar = $(this.refs['fly-scroll-bar']),
				progressBarWidth = progressBar.width(),
				$doc = $(document),
				videoWidth  = this.refs['fly-video-C'].offsetWidth,
				videoProgress = this.refs['fly-video-progress'],
				voiceProgress = this.refs['fly-voice-progress'],
				vioceWidth = this.refs['voice-C'].offsetWidth;

			this.transX = 0;
			this.transX1 =this.refs['voice-C'].offsetWidth - barWidth;

			this.bindDrag(progressBar,$doc,this.transX,videoProgress,videoWidth,progressBarWidth,'video');
			this.bindDrag($(this.refs['fly-voice-bar']),$doc,this.transX1,voiceProgress,vioceWidth,progressBarWidth,'voice');

		},1);
	}

	bindDrag(progressBar,$doc,transX,videoProgress,videoWidth,progressBarWidth,type){

		progressBar.on('touchstart',(e)=>{
			var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
			let disX = e.pageX ;//- progressBar.offset().left;
			if(type === 'video'){
				this.setState({
					playing:false
				});

				this.video.pause();
			}
			$doc.on('touchmove',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				let x = e.pageX - disX + transX;//- pOffsetLeft;
				x < 0 && (x = 0);
				x > videoWidth - progressBarWidth && (x = videoWidth - progressBarWidth);
				
				videoProgress.style.WebkitTransform = 'scale('+ x +',1)';
				switch(type){
					case "video":
						this.setState({
							videoBarTransX:x,
							videoProgressScale:x
						})
					break;
					case "voice":
						this.setState({
							voiceBarTransX:x,
							voiceProgressScale:x
						},()=>{
							this.video.volume  = x/(videoWidth - progressBarWidth);
						})
					break;
				}
			
			}).on('touchend',e=>{
				var e = e.originalEvent ? e.originalEvent.changedTouches[0]:e.changedTarget[0];
				let x = e.pageX - disX + transX;//- pOffsetLeft;
				transX = x;
				if(type === 'video'){

					let allTime = this.state.mins*60+this.state.seconds;

					this.video.currentTime  = x /videoWidth * allTime;

					let time = (allTime - this.video.currentTime) | 0;

					this.setState({
						currentSeconds:time%60,
						currentMins:time/60|0
					});
					this.video.play();
				}
				
				$doc.off('touchend touchmove');
			})
		});
	}

	componentWillUnmount(){
		this.isLoad = false;
		$(this.video).off();
	}

	switchVideo(e){
		
		var target = null;

		if(e.target.classList.contains('fly-video-item')){
			target = e.target;
		}
		else if(e.target.parentNode.classList.contains('fly-video-item')){
			target = e.target.parentNode;
		}
		
		let {index,obserable} = this.props;

		let iNow = index(target,null,'li');	

		obserable.trigger({type:'updateStep',data:iNow-1});

		if(iNow - this.lastIndex  !== 1){
			for(var i = 0; i < iNow -1  ;i++){
				this.props.steps[i].timespan = '00:00';
			}
			obserable.trigger({type:'enableTimespan',data:iNow});//防止点击了圆点，后面又点上一步，下一步
		}

		this.setState({
			currentVideoIndex:iNow
		},()=>{
			this.reload();
		})
	}

	playVideo(){
		this.video[this.video.paused ?'play':'pause']();
		this.setState({
			playing:!this.video.paused
		});
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

	prev(){
		if(this.state.currentVideoIndex < 1){
			return;
		}
		
		this.setState({
			currentVideoIndex:this.state.currentVideoIndex - 1
		},()=>{
			let {obserable} = this.props;

			obserable.trigger({type:'updateStep',data:this.state.currentVideoIndex});
			this.reload();
		});
	}
	reload(){
		let {obserable} = this.props;
		this.video.play();

		if(Math.abs(this.state.currentVideoIndex  - this.lastCurrentIndex) !== 1 ){

			obserable.trigger({type:'clearTimespan',data:this.state.currentVideoIndex});
		}

		this.lastCurrentIndex = this.state.currentVideoIndex;

	}
}


export  default PublicMethods(FlyVideo);
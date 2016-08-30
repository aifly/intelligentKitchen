import React from 'react';
import GetLunarDay from '../libs/Calendar.js';
import './css/booklist.css';

export default class FlyCookBookList extends React.Component{
	constructor(option){
		super(option);
		this.state = {
			dates:[]
		}
	}
	render(){
		return (
			<li className="fly-cook-list fly-cook-book-item">
				<div className="fly-cook-book-item-C">
					<article className="book-list-C">
						<aside className='booklist-left-C'>
							<div>早餐</div>
							<div className='active'>中餐</div>
							<div>晚餐</div>
						</aside>
						<aside className='booklist-right-C'>
							<div className='bl-calendar'>
								<table>
									<tr>
										<th>日</th>
										<th>一</th>
										<th>二</th>
										<th>三</th>
										<th>四</th>
										<th>五</th>
										<th>六</th>
									</tr>
								</table>
							</div>
							<div className='bl-food-list'>2</div>
						</aside>
					</article>
				</div>
			</li>
		)
	}

	componentWillMount(){

		var D =new Date();
		var yy=D.getFullYear();
		var mm=D.getMonth()+1;
		var dd=D.getDate();
		var ww=D.getDay();

		var ss=parseInt(D.getTime() / 1000);
		yy<100 && ( yy="19"+yy );

		for(var i = -1;i<5;i++){
			this.state.dates.push({
				date:dd+i,
				lunar:GetLunarDay(yy,mm,dd+i),
				id:''
			});	
		}

		console.log(this.state.dates)
		


	}
}
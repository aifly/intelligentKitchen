
let date = new Date(),
	hours = date.getHours();

function getTimeSlot(){
	let  index = 0;
	if(hours<=23){
		index = 2;
	}
	if(hours <= 14){
		index = 1;
	}
	if(hours <= 8){
		index = 0;
	}
	return index;
}

export default getTimeSlot;

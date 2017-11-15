const URL = {
	baseURL: window.baseURL,
	weightstart: window.baseURL + '/kitchen/weighstart.ht', //去皮接口
	weightend: window.baseURL + '/kitchen/weighend.ht', //确定称重。
	getCookBookList: window.baseURL + '/kitchen/getcookbook.ht', //根据类型获取菜谱列表
	getBookList: window.baseURL + '/kitchen/getbooklist.ht', //求取未来14天的菜谱情况
	getimespan: window.baseURL + '/kitchen/getimespan.ht', //上传时间
	setScale: window.baseURL + '/kitchen/setscale.ht', //显示全部营养成分
	getKeepCookbook: window.baseURL + '/kitchen/getKeepCookbook.ht', //冬季推荐菜谱
}

export default URL;
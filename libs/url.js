
const baseURL = 'http://192.168.1.100:8080/bpmx3_dev/'
const URL = {
	baseURL:baseURL,
	weightstart:baseURL + 'kb/kitchen/weighstart.ht',//去皮接口
	weightend:baseURL + 'kb/kitchen/weighend.ht',//确定称重。
	getCookBookList:baseURL + 'kb/kitchen/getcookbook.ht',//根据类型获取菜谱列表
	getBookList:baseURL + 'kb/kitchen/getbooklist.ht',//求取未来14天的菜谱情况
	getimespan:baseURL + 'kb/kitchen/getimespan.ht',//上传时间
	setScale:baseURL + 'kb/kitchen/setscale.ht',//显示全部营养成分
}

export default URL;
var webpack = require('webpack');

module.exports = {
	entry:{
		index:'./index.es6'
	},
	output:{
		path:'./assets/js',
		filename:'[name].js'
	},
	devServer:{
		inline:true,
		hot:true,
		port:3000
	},
	module:{
		loaders:[
			{
				test:/\.es6|\.js$/,
				exclude:/node_modules/,
				loaders:['babel']
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.png|\.jpg|\.gif$/,
				loaders:['url-loader?limit=30720']
			}
		]
	}
};
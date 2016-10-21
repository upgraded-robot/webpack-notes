module.exports = {
	entry: './js/Note.js',
	output: {
		path: './build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: 'node_modules'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	}	
}

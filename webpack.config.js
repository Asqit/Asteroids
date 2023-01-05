const path = require('path');

module.exports = {
	mode: 'production',
	entry: [__dirname + '/src/main.ts', __dirname + '/src/style/main.scss'],
	module: {
		rules: [
			{ test: /.ts?$/, use: 'ts-loader', exclude: /node_modules/ },
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: 'file-loader',
						options: { name: 'main.min.css' },
					},
					'sass-loader',
				],
			},
		],
	},
	resolve: { extensions: ['.ts', '.js'] },
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public', 'static', 'bundle'),
	},
};

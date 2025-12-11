export default [
	{
		context: ['/api'],
		target: 'http://localhost:5181/',
		secure: false,
		changeOrigin: true,
		logLevel: 'info',
	},
];

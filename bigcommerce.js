const https = require('https');

const Bigcommerce = () => {
	console.log('initialized Bigcommerce');
};

let options = {
	host: '',
	path: '/api/v2/',
	method: '',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': '',
		'Accept': 'application/json'
	}
};

Bigcommerce.time = (host, credentials) => {
	return new Promise((resolve, reject) => {

		options.method = 'GET';
		options.path = options.path + 'time';
		options.host = host;
		options.headers.Authorization = credentials;

		https.request(options, response => {
			let response_body = {
				authenticated:'no',
				bigcommerce_return:''
			};
			response.on('data', chunk => {
				response_body.bigcommerce_return += chunk;
			});
			response.on('end', () => {
				let data;
				try {
					data = JSON.parse(response_body.bigcommerce_return);
				} catch (error) {
					console.log('Cannot parse JSON');
				}
				console.log(data);
				if (data.time) {
					response_body.authenticated = 'yes';
					resolve(data);
				} else {
					reject('cannot authenticate user');
				}
			});
		}).end();
	});        
};

Bigcommerce.get = (host, credentials, params) => {
	console.log(params);
	return new Promise((resolve, reject) => {
		if (params !== undefined) {
			options.path = '/api/v2/' + params;
		}
		options.method = 'GET';
		options.host = host;
		options.headers.Authorization = credentials;
		console.log(options);
		https.request(options, response => {
			let response_body = {
				bigcommerce_return:''
			};
			response.on('data', chunk => {
				response_body.bigcommerce_return += chunk;
			});
			response.on('end', () => {
				let data;
				try {
					data = JSON.parse(response_body.bigcommerce_return);
				} catch (error) {
					console.log('Cannot parse JSON');
				}
				if (data) {
					resolve(data);
				} else {
					reject('error occured');
				}
			});
		}).end();
	});       
};
//POST is work in progress
Bigcommerce.post = (options, item, id, payload) => {
	return new Promise((resolve, reject) => {

		const new_path = options.path + item + '/' + id;
		options.path = new_path;
		options.method = 'POST';

		const request = https.request(options, response => {
			let response_body = {
				bigcommerce_return:''
			};
			response.on('data', chunk => {
				response_body.bigcommerce_return += chunk;
			});
			response.on('end', () => {
				let data;
				try {
					data = JSON.parse(response_body.bigcommerce_return);
				} catch (error) {
					console.log('Cannot parse JSON');
				}
				if (data) {
					resolve(data);
				} else {
					reject('error occured');
				}
			});
		}).end();
		request.write(payload);
	});       
};
module.exports = Bigcommerce;
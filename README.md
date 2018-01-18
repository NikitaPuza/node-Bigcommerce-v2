# bigcommerce-node-v2

A very basic Promise library for connecting to the v2 BigCommerce API.
## Example using Express

```
const express = require('express');
const client = require('bigcommerce');
const router = express.Router();

router.post('/', (req, res) => {
	const credentials = new Buffer(`${req.body.user_name}:${req.body.token}`).toString('base64');
	client.config.headers.Authorization = `Basic ${credentials}`;
	client.config.host = req.body.host;
	client.config.path = '/api/v2/coupons/1'
	client.put(client.config, req.body.payload)
	.then((returnedData) => {
		res.json(returnedData);
	})
	.catch((error) => {
		res.json(error);
	});
});
```


const request = require('./lib/request')
const Bigcommerce = {};

Bigcommerce.config = {
  host: "",
  path: "/api/v2/",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
    Accept: "application/json"
  }
};

Bigcommerce.get = async config => {
  config.method = "GET";
  return await request(config);
};
Bigcommerce.put = async (config, payload) => {
  config.method = "PUT";
  return await request(config, payload);
};

Bigcommerce.post = async (config, payload) => {
  config.method = "POST";
  return await request(config, payload);
};

Bigcommerce.delete = async config => {
    config.method = "DELETE";
	return await request(config);
};

module.exports = Bigcommerce;

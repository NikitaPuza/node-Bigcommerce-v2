const https = require("https");

//Export unamed request function//
module.exports = (config, payload) => {
    return new Promise((resolve, reject) => {
      const req = https.request(config, response => {
        if (response.statusCode !== 200) {
          reject(response.statusCode);
        }
        let data = "";
        response.on("data", chunk => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        });
      });
      if (payload) {
        payload = JSON.stringify(payload);
        req.write(payload);
      }
      req.end();
    });
  };
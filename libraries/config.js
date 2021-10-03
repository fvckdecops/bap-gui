const http = require('http');
require('dotenv').config();

exports.apiRequest = function(API_CONFIG, params, headers, cb) {
    http.globalAgent.keepAlive = true;

    var headerObj = {
        "Authorization" : "Basic "+ Buffer.from(API_CONFIG["API_USERNAME"] + ':' + API_CONFIG["API_PASSWORD"]).toString('base64'),
        "Content-Type" : "application/json"
    }
    
    var httpOptions = {
        host: API_CONFIG["API_HOST"],
        method: API_CONFIG["API_METHOD"],
        port: parseInt(API_CONFIG["API_PORT"]),
        path: API_CONFIG["API_PATH"],
        timeout: 60000,
        headers: headerObj
    };

    if (headers && Object.keys(headers).length > 0) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                httpOptions["headers"][key] = headers[key];
            }
        }
    }

    var resultCallback = function(res) {
        var result = '';

        res.on('data', function(data) {
            result += data;
        });

        res.on('end', function() {
            if (result) {
                result = JSON.parse(result);
                cb(result);
            } else {
                cb({"status" : -1, "message" : "No response from API", "error" : "Result null"});
            }
        });

        res.on('error', function(err) {
            cb({"status" : -1, "message" : "No response from API", "error" : JSON.stringify(err)});
        });
    }

    var req = http.request(httpOptions, resultCallback);

    req.on('timeout', () => {
        req.abort();
    });

    req.on('error', function(err) {
        var err = JSON.parse(JSON.stringify(err));
        if ("code" in err && err.code == "ECONNRESET") {
            cb({"code" : -1, "message" : "Request timeout", "error" : JSON.stringify(err)});
        } else {
            cb({"code" : -1, "message" : "No response from API", "error" : JSON.stringify(err)});
        }
    });

    if (httpOptions.method == "GET") {
        req.write("");
    } else {
        req.write(JSON.stringify(params));
    }

    req.end();

}
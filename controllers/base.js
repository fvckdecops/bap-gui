const path      = require('path');
const BASE_DIR  = path.dirname(require.main.filename);
const config    = require('../libraries/config');
const configApi    = require('../config');
require('dotenv').config();

class BaseCtrl {
    static async baseHttp(req, res) {
        var API_CONFIG = {
            "API_HOST": process.env.API_HOST,
            "API_PORT": process.env.API_PORT,
            "API_METHOD": process.env.API_METHOD,
            "API_USERNAME": process.env.API_USERNAME,
            "API_PASSWORD": process.env.API_PASSWORD
        }
        var response = { "status": -1, "message": "Something error" };

        if(req.query.hasOwnProperty('path') && req.query.hasOwnProperty('dest')) {
            var dest = req.query.dest;
            var routeAjax = configApi.httpEndpoint[req.query.path];
            API_CONFIG["API_PATH"] = process.env.API_PATH +'/'+ req.query.path;

            if(routeAjax.hasOwnProperty(dest)) {
                var params = {
                    "typeReq": routeAjax[dest]['action']
                }
                console.log(req);

                Object.entries(req.body).forEach(values => {
                    values.forEach(val => {
                        params[values[0]] = values[1];
                    })
                });
                
                config.apiRequest(API_CONFIG, params, {}, function(resAPI) {
                    res.end(JSON.stringify(resAPI));
                })
            } else {
                response['content'] = null;
                response['message'] = "Destination not found.";

                res.end(JSON.stringify(response));
            }
        } else {
            response['content'] = null;
            response['message'] = "Invalid action!";
            
            res.end(JSON.stringify(response));
        }
    }
}

module.exports = BaseCtrl;
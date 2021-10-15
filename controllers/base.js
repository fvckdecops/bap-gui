const path      = require('path');
const BASE_DIR  = path.dirname(require.main.filename);
const config    = require('../libraries/config');
const configApi    = require('../config');
const sgMail = require('@sendgrid/mail');
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

    static async sendMail(req, res) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        var response = {"status": -1, "message": "Unknown error."};

        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            response['message'] = "Please verify the captcha!";
            res.end(JSON.stringify(response));
        }

        var secretKey = process.env.RECAPTCHA_SECRET_KEY;

        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

        request(verificationUrl,function(error,response,body) {
            body = JSON.parse(body);
            if(body.success !== undefined && !body.success) {
                response['message'] = "Captcha Verification failed!";
                res.end(JSON.stringify(response));
            }

            const msg = {
                to: process.env.MY_MAIL, // Change to your recipient
                from: req.body.fromMail, // Change to your verified sender
                fromname: req.body.name,
                subject: req.body.subject,
                text: req.body.message,
            }
    
            if(!req.body.fromMail.length || !req.body.subject.length || !req.body.message) {
                response['message'] = "Check your input details and try again.";
                res.end(JSON.stringify(response));
            } else {
                sgMail.send(msg).then(() => {
                    response['status'] = 0;
                    response['message'] = "Email sent.";
                    res.end(JSON.stringify(response));
                }).catch((error) => {
                    response['message'] = error;
                    res.end(JSON.stringify(response));
                })
            }
          });
    }
}

module.exports = BaseCtrl;
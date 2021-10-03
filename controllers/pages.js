const path      = require('path');
const BASE_DIR  = path.dirname(require.main.filename);
const BaseCtrl  = require('./base');

class PagesController extends BaseCtrl {
    constructor() {
        super();
    }

    static async index(req, res) {
        res.render('template', {
            req: req,
            page: "home",
            title: "Bagas Adji Pratama",
            logo: "/assets/img/logo.png"
        });
    }
}

module.exports = PagesController;
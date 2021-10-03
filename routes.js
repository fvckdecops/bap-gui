const express   = require('express');
const router    = express.Router();
const BaseCtrl  = require('./controllers/base');
const PagesCtrl = require('./controllers/pages');

router.get('/', PagesCtrl.index);
router.post('/http', BaseCtrl.baseHttp);
router.post('/sendMail', BaseCtrl.sendMail);

module.exports = router;
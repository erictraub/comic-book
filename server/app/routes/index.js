'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/stories', require('./stories'));
router.use('/addons', require('./addons'));
router.use('/squares', require('./squares'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

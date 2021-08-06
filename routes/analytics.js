const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()

router.get('/overview', controller.overview);
router.get('/countbid', controller.countBid);
router.get('/effectivebid', controller.effectiveBid);

module.exports = router;
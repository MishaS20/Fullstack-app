const express = require('express')
const passport = require('passport')
const controller = require('../controllers/bid')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getByIDBid);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteBid);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);


module.exports = router;
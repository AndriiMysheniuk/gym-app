const express = require("express");
const router = express.Router();

// different model routers
router.use('/wishlist', require('./wishlist'));
router.use('/items', require('./items'));
router.use('/user', require('./user'));

module.exports = router;

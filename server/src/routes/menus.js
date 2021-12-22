const express = require('express');
const router = express.Router();

// controllers
const menuAPI = require('../app/controllers/MenusAPI');

router.put('/', menuAPI.edit);
router.get('/', menuAPI.findAll);

module.exports = router;

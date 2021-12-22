const express = require('express');
const router = express.Router();

// controllers
const aboutAPI = require('../app/controllers/AboutAPI');

router.put('/', aboutAPI.edit);
router.get('/', aboutAPI.findByKey);

module.exports = router;

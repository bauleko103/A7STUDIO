const express = require('express');
const router = express.Router();

// controllers
const bannersAPI = require('../app/controllers/BannersAPI');
// middlewares
const upload = require('../app/middlewares/upload');

router.put('/', upload.array('banners'), bannersAPI.edit);
router.get('/', bannersAPI.findByKey);

module.exports = router;

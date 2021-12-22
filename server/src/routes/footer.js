const express = require('express');
const router = express.Router();

// controllers
const footerAPI = require('../app/controllers/FooterAPI');

router.put('/support', footerAPI.editSupport);
router.put('/contact', footerAPI.editContact);
router.put('/connect', footerAPI.editConnect);
router.get('/', footerAPI.findByKey);

module.exports = router;

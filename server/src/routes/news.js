const express = require('express');
const router = express.Router();

// controllers
const newsAPI = require('../app/controllers/NewsAPI');
// middlewares
const upload = require('../app/middlewares/upload');

router.put('/:newsId', upload.single('image'), newsAPI.edit);
router.delete('/:newsId', newsAPI.deleteById);
router.patch('/restore/:newsId', newsAPI.restoreById);
router.patch('/', newsAPI.deleteAll);
router.post('/', upload.single('image'), newsAPI.insert);
router.get('/:page/:number', newsAPI.findAllWithPagination);
router.get('/:newsSlug', newsAPI.findBySlug);
router.get('/', newsAPI.findAll);

module.exports = router;

const express = require('express');
const router = express.Router();

// controllers
const architectsAPI = require('../app/controllers/ArchitectsAPI');
// middlewares
const upload = require('../app/middlewares/upload');

router.put('/:architectId', upload.single('image'), architectsAPI.edit);
router.delete('/:architectId', architectsAPI.deleteById);
router.patch('/', architectsAPI.deleteAll);
router.post('/', upload.single('image'), architectsAPI.insert);
router.get('/:architectId', architectsAPI.findById);
router.get('/', architectsAPI.findAll);

module.exports = router;

const express = require('express');
const router = express.Router();

// controllers
const projectsAPI = require('../app/controllers/ProjectsAPI');
// middlewares
const upload = require('../app/middlewares/upload');

router.put('/:projectId', upload.array('images'), projectsAPI.edit);
router.delete('/:projectId', projectsAPI.deleteById);
router.patch('/restore/:projectId', projectsAPI.restoreById);
router.patch('/', projectsAPI.deleteAll);
router.post('/', upload.array('images'), projectsAPI.insert);
router.get('/:page/:number', projectsAPI.findAllWithPagination);
router.get('/:projectSlug', projectsAPI.findBySlug);
router.get('/', projectsAPI.findAll);

module.exports = router;

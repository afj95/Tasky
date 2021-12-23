const express = require("express");
const router = express.Router();
const Projects = require('../controllers/Controller.Projects');

router.get('/', Projects.getProjects);

router.post('/', Projects.addProject);

router.put('/finish', Projects.finishProject);

router.put('/del', Projects.deleteProject);

router.put('/edit', Projects.editProject);

module.exports = router;
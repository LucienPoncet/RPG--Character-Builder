const express = require('express');
const router = express.Router();

const characterProfileApp = require('./apps/characterProfileApp.js');

router.get('/characterprofile/:id', characterProfileApp.profile);

router.get('/characters', characterProfileApp.init);

module.exports = router;
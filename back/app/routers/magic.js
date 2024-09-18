const {magicController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isAdmin } = require("../services/security.js");
const { isMember } = require("../services/security.js");

router.get('/', isMember, magicController.getAllMagics);
router.post('/', isAdmin, magicController.createOneMagic);
router.get('/:id(\\d+)', isAdmin, magicController.getOneMagic);
router.patch('/:id(\\d+)', isAdmin, magicController.updateOneMagic);
router.delete('/:id(\\d+)', isAdmin, magicController.deleteOneMagic);

module.exports = router;
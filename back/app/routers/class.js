const {classController} = require("../controllers");
const { Router } = require("express");

const router = Router();

const { isAdmin } = require("../services/security.js");
const { isMember } = require("../services/security.js");

router.get('/', isMember, classController.getAllClasses);
router.post('/', isAdmin, classController.createOneClass);
router.get('/:id(\\d+)', isAdmin, classController.getOneClass);
router.patch('/:id(\\d+)', isAdmin, classController.updateOneClass);
router.delete('/:id(\\d+)', isAdmin, classController.deleteOneClass);

module.exports = router;